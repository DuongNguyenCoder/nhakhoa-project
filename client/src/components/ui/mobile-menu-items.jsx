"use client";

import Link from "next/link";

const MobileMenuItem = ({ href, title, onClick, className = "" }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex min-h-12 items-center gap-3
        rounded-lg px-3 py-3 bg-gray-50
        text-[15px] font-medium text-gray-800
        transition-colors
        hover:bg-gray-50
        active:bg-gray-100
        ${className}
      `}
    >
      <span className="flex-1">{title}</span>
    </Link>
  );
};

export default MobileMenuItem;
