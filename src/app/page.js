"use client"
import axios from 'axios'
import { Clock, AlertCircle } from 'lucide-react';
import {  GridWithFeaturedLayout, MagazineLayout, CardsLayout, EditorsPicksCarousel } from '@/components/homepgae/Categories';
import { useRouter } from 'next/navigation';

import { useState,  useEffect } from 'react';

const NewsHomepage = () => {
  const [articles, setArticles] = useState()
  const router = useRouter()

  useEffect(() => {
    const fetchArticles = async () => {
      let response = await axios.get('/api/articles');
      let articles_ = await response.data;
      setArticles(articles_);
    };
    fetchArticles();
  }, []);

console.log(articles)

  // Mock data - replace with your actual data
  const breakingNews = [
    "Breaking: Major earthquake strikes Pacific region",
    "Urgent: Central bank announces surprise rate change",
    "Breaking: Breakthrough in peace negotiations",
    "Alert: Severe weather warning issued for coastal areas"
  ];

  const latestNews = [
    {
      title: "Space Agency Announces New Mission to Mars",
      time: "10 minutes ago",
      category: "Science"
    },
    {
      title: "Global Stock Markets Hit New Record High",
      time: "30 minutes ago",
      category: "Finance"
    },
    {
      title: "Novel Treatment Shows Promise in Clinical Trials",
      time: "1 hour ago",
      category: "Health"
    },
    {
      title: "Tech Company Reveals Revolutionary Product",
      time: "2 hours ago",
      category: "Technology"
    },
    {
      title: "Major Sports Team Announces New Coach",
      time: "3 hours ago",
      category: "Sports"
    }
  ];

  const featuredNews = {
    main: {
      title: "Major Climate Agreement Reached at Global Summit",
      excerpt: "World leaders have come together to sign a historic climate accord...",
      image: "/api/placeholder/800/500",
      category: "World",
      date: "2025-01-29"
    },
    secondary: [
      {
        title: "Tech Giants Announce New AI Guidelines",
        excerpt: "Leading technology companies have jointly announced...",
        image: "/api/placeholder/400/250",
        category: "Technology",
        date: "2025-01-29"
      },
      {
        title: "Breakthrough in Renewable Energy Storage",
        excerpt: "Scientists have developed a new method for...",
        image: "/api/placeholder/400/250",
        category: "Science",
        date: "2025-01-29"
      },
      {
        title: "Global Markets React to Economic Data",
        excerpt: "Stock markets worldwide showed mixed reactions...",
        image: "/api/placeholder/400/250",
        category: "Business",
        date: "2025-01-29"
      }
    ]
  };


  if (!articles) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white mb-8 rounded-lg overflow-hidden">
        <div className="flex items-center px-4 py-3">
          <AlertCircle className="w-5 h-5 mr-2" />
          <div className="overflow-hidden whitespace-nowrap relative flex-1">
            <div className="animate-marquee inline-block">
              {articles.breakingNews.map((news, index) => (
                <span key={index} onClick={()=> {router.push(`/article/${news._id}`)}} className="mr-16 inline-block cursor-pointer">
                  {news.title}
                </span>
              ))}
            </div>
            <div className="absolute top-0 animate-marquee2 inline-block">
              {articles.breakingNews.map((news, index) => (
                <span onClick={()=> {router.push(`/article/${news._id}`)}} key={index} className="mr-16 inline-block cursor-pointer">
                  {news.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Featured Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Featured Article */}
              <div className="md:col-span-1">
                <article onClick={()=> {router.push(`/article/${articles.featuredNews[0]._id}`)}} className="relative group cursor-pointer">
                  <img 
                    src={articles.featuredNews[0].featuredImage} 
                    alt={articles.featuredNews[0].title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                    <span className="text-sm font-medium text-blue-400">
                      {articles.featuredNews[0].category}
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-2">
                      {articles.featuredNews[0].title}
                    </h2>
               
                    <div className="flex items-center mt-4 text-gray-300 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{new Date(articles.featuredNews[0].publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              </div>

              {/* Secondary Featured Articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-1">
                {articles.featuredNews.map((article, index) => (
                  <article onClick={()=> {router.push(`/article/${article._id}`)}} key={index} className="relative group cursor-pointer">
                    <img 
                      src={article.featuredImage} 
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                      <span className="text-xs font-medium text-blue-400">
                        {article.category}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">
                        {article.title}
                      </h3>
                      <div className="flex items-center mt-2 text-gray-300 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar - Latest News */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Latest News</h2>
            <div className="space-y-6">
              {articles.latestNews.map((news, index) => (
                <article onClick={()=> {router.push(`/article/${news._id}`)}} key={index} className="group cursor-pointer">
                  <span className="text-xs font-medium text-blue-600 block mb-1">
                    {news.category}
                  </span>
                  <h3 className="text-base font-semibold group-hover:text-blue-600 mb-1">
                    {news.title}
                  </h3>
                  <time className="text-sm text-gray-500">{news.publishDate}</time>
                    <div className="flex items-center mt-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{new Date(news.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  {index < articles.latestNews.length - 1 && (
                    <div className="border-b border-gray-200 mt-4"></div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>



      </div>


      


              <div>
              {/* Editor's Picks Carousel */}
              <EditorsPicksCarousel articles={articles.বাংলাদেশ} />
              
              {/* International News */}
              <GridWithFeaturedLayout 
                category="বিশ্ব" 
                articles={articles.বিশ্ব} 
              />
              
              {/* Entertainment */}
              <MagazineLayout 
                category="রাজশাহী" 
                articles={articles.রাজশাহী} 
              />
              
              {/* Technology */}
              <CardsLayout 
                category="খেলাধুলা" 
                articles={articles.খেলাধুলা} 
              />
            </div>
    </div>
  );
};

export default NewsHomepage;