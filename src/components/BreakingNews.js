import { AlertCircle } from 'lucide-react'
import React from 'react'

const BreakingNews = ({articles}) => {
  return (
    <div className="jsutify-self-center self-center bg-gradient-to-b custom-gradient text-white mb-8 rounded-lg overflow-hidden md:w-[100vw]">
        <div className="flex items-center px-4 py-3">
          <AlertCircle className="w-5 h-5 mr-2" />
          <div className="overflow-hidden whitespace-nowrap relative flex-1">
            <div className="animate-marquee inline-block">
              {articles.map((news, index) => (
                <span key={index} onClick={()=> {router.push(`/article/${news._id}`)}} className="mr-16 inline-block cursor-pointer">
                  {news.title}
                </span>
              ))}
            </div>
            <div className="absolute top-0 animate-marquee2 inline-block">
              {articles.map((news, index) => (
                <span onClick={()=> {router.push(`/article/${news._id}`)}} key={index} className="mr-16 inline-block cursor-pointer">
                  {news.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default BreakingNews
