import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { NewService } from "@/services/new.service";
import NewsCard from "../ui/news-card";

export default async function SectionCategoryNews({ category }) {
  console.log("category ===> ", category);
  const res = await NewService.getAll(
    {
      category: category._id,
      page: 1,
      limit: 4,
      isActive: true,
    },
    {
      cache: "no-store",
    },
  );

  const news = res.data || [];

  if (!news.length) return null;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-red-300 pb-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1 rounded-full bg-[#9c1d22]" />

          <div>
            <h2 className="text-lg lg:text-xl font-bold text-slate-900">
              {category.title}
            </h2>

            <p className="text-sm text-slate-500">{news.length} bài viết mới</p>
          </div>
        </div>

        <Link
          href={`/tin-tuc-va-tai-lieu/danh-muc/${category.slug}`}
          className="group flex items-center gap-2 font-medium text-[#9c1d22]"
        >
          Xem tất cả
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-6">
        {news.map((item) => (
          <NewsCard key={item._id} news={item} />
        ))}
      </div>
    </section>
  );
}
