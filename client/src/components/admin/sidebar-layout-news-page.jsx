import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";

import { CategoryService } from "@/services/category.service";
import { NewService } from "@/services/new.service";

export default async function SideBarNews() {
  const [categoryRes, newsRes] = await Promise.all([
    CategoryService.getAll({ isNews: true }, { cache: "no-store" }),
    NewService.getAll(
      {
        limit: 6,
        page: 1,
        isActive: true,
      },
      { cache: "no-store" },
    ),
  ]);

  const categoriesNews = categoryRes.data || [];
  const listNews = newsRes.data || [];

  return (
    <aside className=" top-6 space-y-6">
      {/* Danh mục */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b bg-[#9c1d22] px-5 py-4">
          <h2 className="text-lg font-bold text-white">Danh mục tin tức</h2>
        </div>

        <nav className="p-2">
          {categoriesNews.map((category) => (
            <Link
              key={category._id}
              href={`/tin-tuc-va-tai-lieu/danh-muc/${category.slug}`}
              className="group flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-[#9c1d22]/5"
            >
              <div className="rounded-md bg-[#9c1d22]/10 p-2 text-[#9c1d22] transition group-hover:bg-[#9c1d22] group-hover:text-white">
                <Newspaper size={18} />
              </div>

              <span className="text-sm font-medium text-slate-700 group-hover:text-[#9c1d22]">
                {category.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Tin mới */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b px-5 py-4 bg-[#9c1d22]">
          <h2 className="text-lg font-bold text-white">Tin mới nhất</h2>
        </div>

        <div className="divide-y">
          {listNews.map((item) => (
            <Link
              key={item._id}
              href={`/tin-tuc-va-tai-lieu/${item.slug}`}
              className="group flex gap-3 p-4 transition hover:bg-gray-50"
            >
              <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.newPic}
                  alt={item.title}
                  fill
                  sizes="112px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 items-center">
                <h3 className="line-clamp-2 text-sm font-medium leading-6 text-slate-700 transition-colors group-hover:text-[#9c1d22]">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
