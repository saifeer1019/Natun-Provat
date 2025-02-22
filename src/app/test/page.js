"use client"
import axios from 'axios'
import { Clock, AlertCircle } from 'lucide-react';
import {  GridWithFeaturedLayout, MagazineLayout, CardsLayout, EditorsPicksCarousel } from '@/components/homepgae/Categories';
import { useRouter } from 'next/navigation';

import { useState,  useEffect } from 'react';

const NewsHomepage = () => {
  const [articles, setArticles] = useState()
  const router = useRouter()
  const mainEl = document.querySelector('main');
const content = document.querySelector('.content');
const images = [...document.querySelectorAll('.img')];

  useEffect(() => {
    const fetchArticles = async () => {
      let response = await axios.get('/api/articles');
      let articles_ = await response.data;
      setArticles(articles_);
    };
    fetchArticles();
  }, []);



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
    <main className=" top-0 left-0 min-h-[100vh] w-[100vw] " >
    <div className="content  top-0 left-0  w-[100vw] " >
   
    {articles.featuredNews.map((article, index) => (
        <div onClick={()=> {router.push(`/article/${article._id}`)}} key={index}
         className=" cursor-pointer overflow-hidden w-[100vw]">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className=" img left-1/4 top-1/4 h-[80vh] object-cover rounded-lg"
          />
          </div>
    ))
    }

    
    </div>
    </main>


  )
}


export default NewsHomepage