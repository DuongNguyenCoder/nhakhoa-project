"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useNavigate } from "react-router-dom";

import { apiGetNew } from "@/apis/NewsAPI";
import PageTitle from "@/components/pageTitle";

const News = () => {
  const navigate = useNavigate();

  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiGetNew();

        if (res?.data?.data) {
          setAllNews(res.data.data);
        }
      } catch (error) {
        console.error("Lỗi lấy tin tức:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  const stripHtml = (html = "") => {
    return html
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Group news by category (O(n))
  const groupedNews = useMemo(() => {
    return allNews.reduce((acc, item) => {
      const category = item.category || "Khác";

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(item);

      return acc;
    }, {});
  }, [allNews]);

  return (
    <>
      <PageTitle title="Thư Viện - Minh Dental" />

      <div className="mx-auto max-w-[1400px] space-y-14 px-4 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Thư viện tin tức
          </h1>

          <p className="mx-auto max-w-2xl text-sm text-gray-500 md:text-base">
            Cập nhật các thông tin, kiến thức và hoạt động mới nhất từ Minh
            Dental
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm"
              >
                <div className="h-52 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
                  <div className="space-y-2">
                    <div className="h-4 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          Object.entries(groupedNews).map(([category, newsList]) => (
            <section key={category}>
              {/* Category */}
              <div className="mb-8 flex items-center gap-4">
                <div className="h-10 w-1 rounded-full bg-red-600" />

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {category}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {newsList.length} bài viết
                  </p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {newsList.map((news) => (
                  <article
                    key={news._id}
                    onClick={() => navigate(`/news/${news._id}`)}
                    className="group cursor-pointer overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={news.newPic}
                        alt={news.title}
                        fill
                        sizes="(max-width:768px) 100vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-red-600 shadow-sm backdrop-blur">
                        {news.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 p-5">
                      <p className="text-sm text-gray-400">
                        🗓️ {formatDate(news.createdAt)}
                      </p>

                      <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-red-600">
                        {news.title}
                      </h3>

                      <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                        {stripHtml(news.description)}
                      </p>

                      <div className="pt-2">
                        <span className="inline-flex items-center text-sm font-medium text-red-600 transition-transform duration-300 group-hover:translate-x-1">
                          Xem chi tiết →
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
};

export default News;
