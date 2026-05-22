import Image from "next/image";
import Link from "next/link";
import React from "react";

export const revalidate = 3600;

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22.5 xl:h-25 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-16 md:w-20 xl:w-24 h-16 md:h-20 xl:h-24 overflow-hidden shrink-0">
            <Image
              src="/assets/logo-minhdental.png"
              alt="Logo Minh Dental"
              fill
              className="object-contain transition-transform duration-300 hover:scale-105
            "
            />
          </div>
        </Link>

        {/* Text block */}
        <div className="text-right leading-tight font-['SVN-Avenir_Next',sans-serif]">
          {/* Line 1 */}
          <div
            className="
            text-[11px] sm:text-[12px] xl:text-[13px]
            font-semibold tracking-[0.08em]
            text-gray-600 uppercase
          "
          >
            DỊCH VỤ BẢO TRÌ, BẢO DƯỠNG
          </div>

          {/* Line 2 */}
          <div
            className="
            text-[16px] sm:text-[18px] xl:text-[20px]
            font-extrabold tracking-wide
            text-[#B71C1C]
          "
          >
            MD PROSERVICE
          </div>

          {/* underline accent */}
          <div className="mt-1 h-[2px] w-full bg-[#B71C1C]/30 rounded" />
        </div>
      </div>
    </header>
  );
}
