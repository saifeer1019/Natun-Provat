"use server"
import { Clock } from 'lucide-react';
import connectionToDatabase from '@/util/mongodb';
import Article from '@/models/Article';
import Link from 'next/link';

const PAGE_SIZE = 12; // Articles per page

const ArticlePage = async ({ searchParams }) => {
    await connectionToDatabase(); // Ensure DB connection

    // Extract search parameters
    const query = searchParams.query || "";
    const category = searchParams.category || "";
    const latest = searchParams.latest !== undefined; // Check if 'latest' is in the query
    const page = parseInt(searchParams.page) || 1;

    // Build MongoDB filter
    let filter = {};
    if (query) {
        filter.$or = [
            { title: { $regex: query, $options: "i" } }, // Search in title
            { content: { $regex: query, $options: "i" } } // Search in content
        ];
    }
    if (category) {
        filter.category = category;
    }

    // Sort articles
    const sortOption = latest ? { publishDate: -1 } : {};

    // Get total count
    const totalArticles = await Article.countDocuments(filter);

    // Fetch articles with pagination
    const articles = await Article.find(filter)
        .sort(sortOption)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);

    return (
        <div className=" py-6">
            <h1 className="text-2xl font-bold mb-4">অনুসন্ধানের ফলাফল</h1>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {articles.length === 0 ? (
                    <p>কোনো প্রবন্ধ পাওয়া যায়নি।</p>
                ) : (
                    articles.map((article, index) => (
                        <Link href={`/article/${article._id}`} key={index} className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <img 
                                src={article.featuredImage} 
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <span className="text-sm text-blue-600 mb-2 block">{article.category}</span>
                                <h3 className="font-bold hover:text-blue-600">{article.title}</h3>
                                <time className="text-sm text-gray-500 mt-2 block">
                                    <Clock size={14} className="inline-block mr-1" />
                                    {new Date(article.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </time>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-between">
                {page > 1 && (
                    <Link href={`?query=${query}&category=${category}&latest=${latest ? "true" : ""}&page=${page - 1}`} className="text-blue-600">
                        পূর্ববর্তী
                    </Link>
                )}
                {page * PAGE_SIZE < totalArticles && (
                    <Link href={`?query=${query}&category=${category}&latest=${latest ? "true" : ""}&page=${page + 1}`} className="text-blue-600">
                        পরবর্তী
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ArticlePage;
