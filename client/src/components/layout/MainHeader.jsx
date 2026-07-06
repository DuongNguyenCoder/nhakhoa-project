import React from "react";
import SearchBar from "../ui/SearchBar";
import SubHeader from "./SubHeader";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <header className="top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Main header */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 xs:px-5 md:px-6 lg:px-8">
        <div className="xs:flex gap-4 xs:py-4 xs:flex-row xs:items-center xs:justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex flex-col pb-1.5 items-center xs:gap-2 xs:flex-row xs:items-center lg:flex-1"
          >
            {/* Logo */}
            <div className="relative w-28 xs:w-28 md:w-32 xl:w-36 aspect-3/2 shrink-0">
              <Image
                src="/assets/logo-header.png"
                alt="MD ProService"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Brand text */}
            <div className="flex flex-col items-center xs:items-start">
              <span className="text-base xs:text-lg md:text-xl xl:text-2xl font-bold tracking-tight text-[#9c1d22] leading-tight">
                MD ProService
              </span>

              <span className="text-[11px] xs:text-xs md:text-sm italic text-gray-500 tracking-wide">
                The Partner of Dentists
              </span>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:block min-w-75 lg:w-125 shrink-0">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Navigation */}
      {/* <div className="border-t border-gray-100 bg-[#fafafa]">
        <SubHeader />
      </div> */}
    </header>
  );
};

export default MainHeader;
