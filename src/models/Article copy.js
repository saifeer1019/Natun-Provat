const mongoose = require('mongoose');

// Import the previously created VideoLink schema if it's in a separate file
// const VideoLink = require('./videoLink');

const newsArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  videos: [{
    title: {
      type: String,
      
   
    },
    url: {
      type: String,
      required: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please enter a valid URL'
      ]
    },
    platform: {
      type: String,
      enum: ['YouTube', 'Vimeo', 'Other'],
      default: 'Other'
    },
    duration: Number,
    description: String,
    thumbnail: String,
    position: {
      type: Number,
      default: 0  // Order of video in the article
    }
  }],
  images: [{
    title: {
      type: String,
      
   
    },
    url: {
      type: String,
      required: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please enter a valid URL'
      ]
    },
    thumbnail: String,

  }],
  author: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
     
    },
    bio: String
  },
  category: {
    type: String,
   
   
  },
  tags: [{
    type: String,
   
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featuredImage: {
    url: String,
    caption: String,
    altText: String
  },
  publishDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  viewCount: {
    type: Number,
    default: 0
  },
  isFeature: {
    type: Boolean,
    default: false
  }
});

// Create slug from title before saving
newsArticleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  this.updatedAt = Date.now();
  next();
});

// Example usage
const exampleArticle = {
  title: "Breaking News: Major Tech Announcement",
  content: "Full article content here...",
  summary: "Quick summary of the article",
  videos: [{
    title: "Press Conference Highlights",
    url: "https://youtube.com/watch?v=example1",
    platform: "YouTube",
    duration: 300,
    position: 1
  }, {
    title: "Product Demo",
    url: "https://youtube.com/watch?v=example2",
    platform: "YouTube",
    duration: 480,
    position: 2
  }],
  author: {
    name: "John Doe",
    email: "john@example.com",
    bio: "Tech journalist"
  },
  category: "Technology",
  tags: ["tech", "innovation", "news"],
  status: "published",
  publishDate: new Date()
};

const NewsArticle =mongoose.models.NewsArticle ||  mongoose.model('NewsArticle', newsArticleSchema);

export default NewsArticle;

