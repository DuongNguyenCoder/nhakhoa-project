import { apiGetNew } from "@/apis/NewsAPI";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [allNews, setAllNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const res = await apiGetNew();
      if (res?.data?.data) setAllNews(res.data.data);
    };
    fetchNews();
  }, []);

  const categories = [...new Set(allNews.map((item) => item.category))];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-12 p-6">
      {categories.map((cate) => {
        const filteredNews = allNews.filter((news) => news.category === cate);
        return (
          <div key={cate}>
            <h2 className="mb-4 border-b border-red-300 pb-2 text-2xl font-bold text-red-700">
              {cate}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {filteredNews.map((news) => (
                <div
                  key={news._id}
                  className="rounded-lg bg-white p-4 shadow-md transition hover:shadow-xl"
                >
                  <img
                    src={news.newPic}
                    alt={news.title}
                    className="mb-3 h-40 w-full cursor-pointer rounded object-cover"
                    onClick={() => navigate(`/news/${news._id}`)}
                  />
                  <h3
                    className="cursor-pointer text-lg font-semibold text-gray-800 hover:underline"
                    onClick={() => navigate(`/news/${news._id}`)}
                  >
                    {news.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-400">
                    📅 {formatDate(news.createdAt)}
                  </p>
                  <p className="line-clamp-3 text-sm text-gray-600">
                    {(() => {
                      const temp = document.createElement("div");
                      temp.innerHTML = news.description;
                      return temp.textContent || temp.innerText || "";
                    })()}
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

export default News;
