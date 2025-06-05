import connectionToDatabase from '@/util/mongodb'
import Article from '@/models/Article'
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectionToDatabase()
    let sort = {'createdAt': -1}
    let limit = 8

    

  

      const breakingNews = await Article.find()
      .sort(sort)
      .limit(Number(limit))
      .populate('author', 'name');


     const latestNews = await Article.find()
     .sort(sort)
     .limit(Number(6))
     .populate('author', 'name');



     const featuredNews = await Article.find({'isFeatured':true,})
      .sort(sort)
      .limit(Number(6))
      .populate('author', 'name');

      async function getCategories(category, lim) {
        const articles = await Article.find({ 'category': category })
          .sort(sort)
          .limit(Number(lim))
          .populate('author', 'name');
        return articles;
      }

      const রাজশাহী = await getCategories('রাজশাহী', 10);
      const বিনোদন = await getCategories('বিনোদন', 4);
      const খেলাধুলা = await getCategories('খেলাধুলা', 8);
      const বিশ্ব = await getCategories('বিশ্ব', 8);
      const বাংলাদেশ = await getCategories('বাংলাদেশ', 8);

      // editorsPicks
      // sportsNews
      // technologyNews
      // entertainmentNews
      // internationalNews
      






    
    
    return NextResponse.json({
      breakingNews,
      latestNews,
      featuredNews,
      রাজশাহী,
      বাংলাদেশ,
      বিশ্ব,
      খেলাধুলা ,
      বিনোদন

    });
  } catch (error) {
    console.error('Error creating applicant:', error);
    return NextResponse.json({ message: 'Internal server error: ' + error }, { status: 500 });
  }
};










