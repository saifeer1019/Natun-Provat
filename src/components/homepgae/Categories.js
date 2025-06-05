"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Clock, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Layout 1: Grid Layout with Featured Article
const GridWithFeaturedLayout = ({ category, articles }) => (
  <section className="mb-12 contain">
    <div className="flex items-center justify-between mb-6 custom-gradient rounded-md p-2">
      <h2 className="text-2xl text-white font-bold">{category}</h2>
      <button className="flex items-center text-white hover:text-blue-700">
      আরও দেখুন <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Link href={`/article/${articles[0]._id}`} className="lg:col-span-2 cursor-pointer">
        <article>
          <img 
            src={articles[0].featuredImage} 
            alt={articles[0].title}
            className="w-[100%] h-24 md:h-64 object-cover rounded-md mb-4"
          />
          <h3 className="text:lg md:text-2xl font-bold hover:text-blue-600">{articles[0].title}</h3>
          <p className="text-gray-600 mt-2">{articles[0].excerpt}</p>
          <div className="flex items-center mt-4 text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <time className="text-sm text-gray-500 mt-1 ">{new Date(articles[0].publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
          </div>
        </article>
      </Link>
      <div className="space-y-2 flex flex-col justify-between">
        {articles.slice(1, 5).map((article, index) => (
          <Link href={`/article/${article._id}`} key={index} className="block">
            <article className="cursor-pointer flex gap-4 items-center ">
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="w-28 md:w-36 h-20 object-cover rounded-md flex-shrink-0"
              />
              <div>
                <h4 className="font-semibold hover:text-blue-600">{article.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{article.description}</p>
                <time className="text-sm text-gray-500 mt-2 block">{article.time}</time>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="space-y-2 flex flex-col flex-wrap justify-between">
      {articles.slice(5, 9).map((article, index) => (
        <Link href={`/article/${article._id}`} key={index} className="block -300 pb-2">
          <article className="cursor-pointer flex gap-4 items-center ">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-28 md:w-36 h-20  object-cover rounded-md flex-shrink-0"
            />
            <div>
              <h4 className="font-semibold hover:text-blue-600">{article.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{article.description}</p>
              <time className="text-sm text-gray-500 mt-2 block">{article.time}</time>
            </div>
          </article>
        </Link>
      ))}
    </div>
    </div>
  </section>
);

// Editor's Picks Carousel
const EditorsPicksCarousel = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(0, articles.length - 3));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <section className="mb-12 ">
      <div className="flex items-center justify-between mb-6 custom-gradient p-2 rounded-md">
        <div className="flex items-center">

          <h2 className="text-2xl text-white font-bold">বাংলাদেশ</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prev} 
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={next}
            disabled={currentIndex >= articles.length - 3}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out md:h-72"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {articles.map((article, index) => (
            <Link href={`/article/${article._id}`} key={index} className=" card-border ">
              <article className="w-[40vw] md:w-[20vw] h-full overflow-visible ">
              <div className="h-[60%] overflow-hidden">
              <Image 
                src={article.featuredImage} 
                alt={article.title}
                width={100}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
                <div className="h-[40%] p-2 flex flex-col justify-between ">
           
                <h3 className="h-fit font-bold hover:text-blue-600">{article.title}</h3>
                <time className="h-fit text-sm text-gray-500 ">{new Date(article.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
              </div>
            
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
// Layout 2: Magazine Style Layout
const MagazineLayout = ({ category, articles }) => (
  <section className="mb-12">
    <div className="flex items-center justify-between mb-6 custom-gradient p-2 rounded-md text-white">
      <h2 className="text-2xl font-bold">{category}</h2>
      <button className="flex items-center  hover:text-blue-700">
      আরও দেখুন <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        {articles.slice(0, 3).map((article, index) => (
          <Link href={`/article/${article._id}`} key={index} className="border-b border-gray-200 pb-8 cursor-pointer last:border-0">
            <span className="text-sm text-blue-600 mb-2 block">{article.category}</span>
            <h3 className="text-xl font-bold hover:text-blue-600 mb-2">{article.title}</h3>
          
            <time className="text-sm text-gray-500 mt-4 block">{new Date(article.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
          </Link>
        ))}
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-6">{category}: সর্বোচ্চ পাঠিত</h3>
        <div className="space-y-6">
          {articles.slice(3, 7).map((article, index) => (
            <Link href={`/article/${article._id}`} key={index} className="flex cursor-pointer items-start gap-4 ">
              <span className="text-2xl font-bold text-gray-300">0{index + 1}</span>
              <div>
                <h4 className="font-semibold hover:text-blue-600">{article.title}</h4>
                <time className="text-sm text-gray-500 mt-1 block">{new Date(article.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Layout 3: Cards Layout
const CardsLayout = ({ category, articles }) => (
  <section className="mb-12">
    <div className="flex items-center justify-between mb-6 custom-gradient p-2 rounded-md text-white">
      <h2 className="text-2xl font-bold">{category}</h2>
      <button className="flex items-center hover:text-blue-700">
      আরও দেখুন <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {articles.slice(0, 8).map((article, index) => (
        <Link href={`/article/${article._id}`} key={index} className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <span className="text-sm text-blue-600 mb-2 block">{article.subcategory}</span>
            <h3 className="font-bold hover:text-blue-600">{article.title}</h3>
            <time className="text-sm text-gray-500 mt-2 block">{new Date(article.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export { GridWithFeaturedLayout, MagazineLayout, CardsLayout, EditorsPicksCarousel };