"use server"
import { Clock, Share2, User } from 'lucide-react';
import connectionToDatabase from '@/util/mongodb'
import Article from '@/models/Article'
import Link from 'next/link';





const ArticlePage = async ({ params }) => {
  
  const { id } = await params;
  await connectionToDatabase()
 

     let article = await Article.findOne({'_id': id}).populate(('author'))
     let relatedArticles = await Article.find({'category': article.category}).sort({'createdAt': -1})
     .limit(Number(4)).populate(('author'))
     console.log(relatedArticles)
         
  // Mock data - replace with your actual data
  const article_ = {
    title: "Major Climate Agreement Reached at Global Summit",
    excerpt: "World leaders have come together to sign a historic climate accord that aims to significantly reduce global emissions by 2030.",
    featuredImage: "/api/placeholder/1200/600",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <h2>Key Points of the Agreement</h2>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <img src="/api/placeholder/800/400" alt="Climate conference" />
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    `,
    author: "Jane Smith",
    date: "2025-01-29",
    category: "World",
    relatedArticles: [
      {
        title: "Previous Climate Summits and Their Impact",
        excerpt: "A look back at the history of climate agreements...",
        image: "/api/placeholder/400/250",
        date: "2025-01-28"
      },
      // Add more related articles
    ]
  };

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
        <p className="text-xl text-gray-600 mb-6">{article.content.slice(3,80)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="w-6 h-6 mr-2" />
            <span className="font-medium">{article.author}</span>
          </div>
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </button>
        </div>
      </header>

      {/* Featured Image */}
      <img 
        src={article.featuredImage}
        alt={article.title}
        className="w-full h-[32rem] object-cover rounded-lg mb-8"
      />

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      {/* Related Articles */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.map((related, index) => (
            <Link href={`/article/${related._id}`}  key={index} className="group cursor-pointer">
              <img 
                src={related.featuredImage}
                alt={related.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold group-hover:text-blue-600">
                {related.title}
              </h3>
              <p className="text-gray-600 mt-2">{related.content.slice(3,80)}</p>
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