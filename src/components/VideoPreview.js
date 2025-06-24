import React from 'react'

const VideoPreview = ({url}) => {
  return (
     
      <div className='relative w-full h-full bg-black  overflow-hidden'>
        <video 
          src={url}
          className="w-full h-full object-cover"
          preload="metadata"
          muted
        >
          <source src={url} />
        </video>
        {/* Video play indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 group-hover:bg-opacity-20 transition-all">
          <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
    );
  
}

export default VideoPreview
