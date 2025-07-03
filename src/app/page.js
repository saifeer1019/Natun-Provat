"use client"
import axios from 'axios'
import { Clock, AlertCircle } from 'lucide-react';
import {  GridWithFeaturedLayout, MagazineLayout, CardsLayout, EditorsPicksCarousel } from '@/components/homepgae/Categories';
import { useRouter } from 'next/navigation';

import { useState,  useEffect } from 'react';
import MainContent from '@/components/homepgae/MainContent';
import BreakingNews from '@/components/BreakingNews';
import VideoPreview from '@/components/VideoPreview';

const NewsHomepage = () => {
  const [articles, setArticles] = useState()
  const router = useRouter()

  
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
  useEffect(() => {
    const fetchArticles = async () => {
      let response = await axios.get('/api/articles');
      let articles_ = await response.data;
      setArticles(articles_);
    };
    fetchArticles();
  }, []);

const toBanglaNumber = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (digit) => banglaDigits[digit]);
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
    <div className="flex flex-col mx-auto px-2 md:px-4 pb-4 overflow-x-visible">
      {/* Breaking News Banner */}
     <BreakingNews articles={articles.breakingNews} />


     <div className=" mx-auto md:px-4 md:py-4">
     {/* Main Content Grid */}
     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
       {/* Left Main Content - Full width on mobile, 1/2 width on desktop */}
       <div className="lg:col-span-6 col-span-full">
         <div className="md:min-h-[500px] contain">
           <MainContent articles={articles.featuredNews} />
         </div>
       </div>
       
       {/* Most Viewed Section - Full width on mobile, 1/4 width on desktop */}
       <div className="lg:col-span-3 col-span-full">
         <div className="card-border md:min-h-[500px] ">
           <h2 className="text-xl font-bold mb-4 text-center border-b pb-2 bg-gray-300 p-2 rounded-t-md">সর্বাধিক পঠিত</h2>
           <div className="p-2 space-y-4">
             {articles.featuredNews.slice(0, 4).map((article, index) => (
               <article 
                 key={index}
                 onClick={() => router.push(`/article/${article._id}`)}
                 className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md hover:text-blue-500"
               >
                   {  !isVideoFile(article.featuredImage)?  <img 
                src={article.thumbnailImage || article.featuredImage} 
                alt={article.title}
                className="w-20 h-16 object-cover rounded-md mr-4"
              />: (
          <div className='w-20 h-16 object-cover rounded-md mr-4'>
          <VideoPreview url={article.featuredImage} />
        
        </div>
      )}
                 <h3 className="font-semibold  line-clamp-2">{article.title}</h3>
               </article>
             ))}
           </div>
         </div>
       </div>
       
       {/* Latest News Sidebar - Full width on mobile, 1/4 width on desktop */}
       <div className="lg:col-span-3 col-span-full">
         <div className="card-border md:min-h-[500px]">
           <h2 className="text-xl font-bold bg-red-600 text-white p-3 text-center rounded-t-md">
             সর্বশেষ
           </h2>
           <div className="p-2">
             {articles.latestNews.map((news, index) => (
               <article 
                 key={index} 
                 onClick={() => router.push(`/article/${news._id}`)}
                 className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 hover:text-blue-500"
               >
                 <span className="rounded-full bg-zinc-400 text-white px-3 py-1">
                   {toBanglaNumber(index + 1)}
                 </span>
                 <h3 className="font-semibold text-md">{news.title}</h3>
               </article>
             ))}
           </div>
         </div>
       </div>
     </div>
   </div>


{/*I just need it fixed till here the rest is okay */}

              <div className='flex flex-col md:gap-6 mt-6'>
              {/* Editor's Picks Carousel */}
              <EditorsPicksCarousel articles={articles.বাংলাদেশ} />
           
              {/* International News */}
              <GridWithFeaturedLayout 
                category="রাজশাহী" 
                articles={articles.রাজশাহী} 
              />
              
              {/* Entertainment */}
              <MagazineLayout 
                category="খেলাধুলা" 
                articles={articles.খেলাধুলা} 
              />
              
              {/* Technology */}
              <CardsLayout 
                category="বিশ্ব" 
                articles={articles.বিশ্ব} 
              />
            </div>
    </div>
  );
};

















export default NewsHomepage;