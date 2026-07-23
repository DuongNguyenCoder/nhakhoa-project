"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationCustom({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const createPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {createPages().map((item, index) =>
        item === "..." ? (
          <span
            key={index}
            className="flex h-10 w-10 items-center justify-center text-slate-400"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 font-medium transition ${
              page === item
                ? "border-[#9c1d22] bg-[#9c1d22] text-white"
                : "bg-white hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
