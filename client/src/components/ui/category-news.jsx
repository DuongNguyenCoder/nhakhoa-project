"use client";

import { useEffect, useState, useTransition } from "react";
import { NewService } from "@/services/new.service";
import NewsCard from "@/components/ui/news-card";
import PaginationCustom from "./pagination-custom";

export default function CategoryNews({ category }) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setLoading(true);

      try {
        const res = await NewService.getAll(
          {
            page,
            limit: 6,
            isActive: true,
            category: category._id,
          },
          {
            cache: "no-store",
          },
        );
        console.log("LIST news => ", res);

        setNews(res.data || []);
        setPagination(res.pagination || {});
      } finally {
        setLoading(false);
      }
    });
  }, [page, category._id]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10">
      {/* Header */}
      <div className="space-y-2 border-b pb-6">
        <p className="text-sm uppercase tracking-widest text-[#9c1d22]">
          Chuyên mục
        </p>

        <h1 className="text-4xl font-bold">{category.title}</h1>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-5">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : news.length ? (
        <>
          <div className="space-y-5">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center pt-6">
              <PaginationCustom
                page={page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-dashed py-16 text-center text-gray-500">
          Chưa có bài viết nào trong chuyên mục này.
        </div>
      )}
    </div>
  );
}
