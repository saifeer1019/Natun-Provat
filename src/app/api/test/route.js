// app/api/articles/route.js
import connectionToDatabase from '@/util/mongodb';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

// Set cache control headers to prevent caching
export const dynamic = 'force-dynamic'; // This prevents route caching

function createSafeExcerpt(htmlContent, maxLength = 88, suffix = '...') {
  if (!htmlContent) return '';
  
  const textContent = htmlContent
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (textContent.length <= maxLength) return textContent;
  
  const truncated = textContent.substr(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace === -1 
    ? truncated + suffix 
    : truncated.substr(0, lastSpace).trim() + suffix;
}

export async function GET() {
  try {
    await connectionToDatabase();
    
    // Get all articles
    const articles = await Article.find();
    
    // Update each article with a new excerpt
    const updatePromises = articles.map(async (article) => {
      // Force new excerpt generation with 88 characters
      const excerpt = createSafeExcerpt(article.content, 88);
      
      // Use { new: true } to get the updated document
      return Article.findByIdAndUpdate(
        article._id,
        { 
          excerpt,
          lastUpdated: new Date() // Add this to force an update
        },
        { 
          new: true,
          timestamps: true // Enable timestamps
        }
      );
    });
    
    // Wait for all updates to complete
    const updatedArticles = await Promise.all(updatePromises);
    
    return NextResponse.json({
      success: true,
      message: `Updated ${updatedArticles.length} articles with new excerpts (88 chars)`,
      articles: updatedArticles
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
    
  } catch (error) {
    console.error('Error updating articles with excerpts:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}