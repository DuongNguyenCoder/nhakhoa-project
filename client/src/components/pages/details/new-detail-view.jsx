"use client";

import { apiGetNew } from "@/apis/NewsAPI";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

export default function NewDetailView({ news }) {
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const rs = await apiGetNew();

        if (!rs?.data?.success) return;

        const newsData = rs.data.data || [];

        setAllNews(newsData);
      } catch (err) {
        console.error("Lỗi lấy tin tức:", err);
      }
    };

    fetchNewsDetail();
  }, [news]);

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  const relatedNews = useMemo(() => {
    if (!news?._id) return [];

    return allNews.filter(
      (item) => item.category === news.category && item._id !== news._id,
    );
  }, [allNews, news]);

  if (!news) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-gray-500">
        Bài viết không tồn tại
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 rounded-[32px] bg-slate-50/90 px-5 py-10 md:px-8 md:py-16">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-800 md:text-5xl">
          {news.title}
        </h1>

        <p className="text-sm text-gray-500 md:text-base">
          🗓️ {formatDate(news.createdAt)}
          <span className="mx-2 text-gray-300">|</span>
          🏷️ <span className="font-medium text-blue-600">{news.category}</span>
        </p>
      </div>

      {/* Cover Image */}
      <div className="relative h-[240px] w-full overflow-hidden rounded-[28px] shadow-md md:h-[420px]">
        <Image
          src={news.newPic}
          alt={news.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Content */}
      <article
        className="
          prose prose-gray max-w-none
          prose-headings:text-gray-800
          prose-headings:font-bold
          prose-p:text-gray-700
          prose-p:leading-8
          prose-a:text-blue-600
          prose-strong:text-gray-900
          prose-li:text-gray-700
          prose-img:rounded-2xl
          prose-img:shadow-md
          prose-img:w-full
          prose-img:max-h-[500px]
          prose-img:object-cover
          prose-h1:text-3xl
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-table:block
          prose-table:overflow-x-auto
        "
        dangerouslySetInnerHTML={{
          __html: news.description || "",
        }}
      />

      {/* Related News */}
      <section className="border-t border-gray-200 pt-10">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">
          📰 Tin tức liên quan
        </h2>

        {relatedNews.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            navigation
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!pb-10"
          >
            {relatedNews.map((item) => (
              <SwiperSlide key={item._id}>
                <Link
                  href={`/tin-tuc-va-khuyen-mai/${item._id}`}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.newPic}
                      alt={item.title}
                      fill
                      sizes="400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2 p-4">
                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-800 transition-colors group-hover:text-red-600">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">
            Không có tin tức liên quan...
          </p>
        )}
      </section>
    </div>
  );
}
