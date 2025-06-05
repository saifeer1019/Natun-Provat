import React from 'react'
import { useRouter } from 'next/navigation';

const MainContent = ({articles}) => {
  const router = useRouter();

  return (
    <div className="space-y-6 p-2 ">
      {/* Featured Section */}
      <section>
        {/* Main Featured Article */}
        <article 
          onClick={() => router.push(`/article/${articles[0]._id}`)}
          className="flex flex-col md:flex-row gap-6 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img 
            src={articles[0].featuredImage} 
            alt={articles[0].title}
            className="w-full md:w-1/2 aspect-video  object-cover rounded-md"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              {articles[0].title}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed line-clamp-5">
              {articles[0].excerpt}
            </p>
          </div>
        </article>

        {/* Secondary Featured Articles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {articles.slice(1, 4).map((article, index) => (
            <article 
              key={index} 
              onClick={() => router.push(`/article/${article._id}`)}
              className="group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="w-full aspect-video object-cover rounded-md"
              />
              <h3 className="font-semibold mt-2 line-clamp-2 text-sm md:text-base">
                {article.title}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MainContent