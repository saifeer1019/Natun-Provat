"use server"
import { Clock, Share2, User } from 'lucide-react';
import connectionToDatabase from '@/util/mongodb'
import Article from '@/models/Article'
import Link from 'next/link';

// Helper function to check if URL is a video
const isVideoFile = (url) => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some(ext => lowerUrl.includes(ext)) || 
         lowerUrl.includes('video') || 
         lowerUrl.includes('.mp4') ||
         lowerUrl.includes('youtube') ||
         lowerUrl.includes('vimeo');
};

// Component for rendering featured media (image or video)
const FeaturedMedia = ({ src, alt, title }) => {
  if (isVideoFile(src)) {
    return (
      <video 
        src={src}
        className="w-full h-[32rem] object-cover rounded-lg mb-8"
        controls
        preload="metadata"
        poster="" // You can add a poster image here if available
        style={{ backgroundColor: '#000' }}
      >
        <source src={src} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <img 
      src={src}
      alt={alt || title}
      className="w-full h-[32rem] object-cover rounded-lg mb-8"
    />
  );
};

// Component for rendering related article media
const RelatedArticleMedia = ({ src, alt, title }) => {
  if (isVideoFile(src)) {
    return (
      <div className="relative w-full h-48 bg-black rounded-lg mb-4 overflow-hidden">
        <video 
          src={src}
          className="w-full h-full object-cover"
          preload="metadata"
          muted
        >
          <source src={src} />
        </video>
        {/* Video play indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
          <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src}
      alt={alt || title}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
  );
};

const ArticlePage = async ({ params }) => {
  
  const { id } = await params;
  await connectionToDatabase()
 
  let article = await Article.findOne({'_id': id}).populate(('author'))
  let relatedArticles = await Article.find({'category': article.category}).sort({'createdAt': -1})
     .limit(Number(6)).populate(('author'))

         
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {new Date(article.publishDate).toLocaleDateString()}
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          {article.author && (
            <div className="flex items-center">
              <User className="w-6 h-6 mr-2" />
              <span className="font-medium">{article.author}</span>
            </div>
          )}
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </button>
        </div>
      </header>

      {/* Featured Media (Image or Video) */}
      <FeaturedMedia 
        src={article.featuredImage}
        alt={article.title}
        title={article.title}
      />

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      {/* Related Articles */}
      <section>
        <h2 className="text-2xl font-bold mb-6 font-solaiman">এরকম আরও</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((related, index) => (
            <Link href={`/article/${related._id}`} key={index} className="group cursor-pointer">
              <RelatedArticleMedia 
                src={related.featuredImage}
                alt={related.title}
                title={related.title}
              />
              <h3 className="text-xl font-bold group-hover:text-blue-600">
                {related.title}
              </h3>
              <p className="text-gray-600 mt-2">{related.excerpt}</p>
              <div className="flex items-center mt-4 text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>{new Date(related.publishDate).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;