import { apiGetNew } from '@/apis/NewsAPI';
import React, { useEffect, useState } from 'react'

const News = () => {
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await apiGetNew();
      if (res?.data?.data) setAllNews(res.data.data);
    };
    fetchNews();
  }, []);

  // Tách danh sách category duy nhất từ danh sách tin tức
  const categories = [...new Set(allNews.map((item) => item.category))];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6 space-y-12">
      {categories.map((cate) => {
        const filteredNews = allNews.filter((news) => news.category === cate);
        return (
          <div key={cate}>
            <h2 className="text-2xl font-bold text-red-700 mb-4 border-b pb-2 border-red-300">
              {cate}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <div
                  key={news._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4"
                >
                  <img
                    src={news.newPic}
                    alt={news.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    📅 {formatDate(news.createdAt)}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {news.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News
