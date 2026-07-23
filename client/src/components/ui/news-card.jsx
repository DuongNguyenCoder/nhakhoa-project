import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NewsCard({ news }) {
  return (
    <Link
      href={`/tin-tuc-va-tai-lieu/${news.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#9c1d22]/30 hover:shadow-lg md:flex-row"
    >
      {/* Image */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden md:w-72">
        <Image
          src={news.newPic}
          alt={news.title}
          fill
          sizes="(max-width:768px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {news.category?.title && (
          <span className="mb-2 text-sm font-medium text-[#9c1d22]">
            {news.category.title}
          </span>
        )}

        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#9c1d22]">
          {news.title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-7 text-slate-600">
          {news.overview}
        </p>

        <div className="mt-5">
          <span className="inline-flex items-center gap-2 font-medium text-[#9c1d22] transition-all group-hover:gap-3">
            Xem chi tiết
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
