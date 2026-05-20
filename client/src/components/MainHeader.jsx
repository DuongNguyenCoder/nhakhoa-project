import React from "react";
import CartShopping from "./ui/CartShopping";
import SearchBar from "./ui/SearchBar";
import SubHeader from "./SubHeader";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <header className="w-full bg-gray-100">
      {/* Logo + Slogan + Search */}
      <div className="grid lg:grid-cols-4 content-center justify-self-center gap-4 p-2 md:px-6">
        {/* Logo + Slogan */}
        <div className="w-full lg:col-span-3 flex items-center justify-center sm:justify-normal  gap-x-3">
          <Link
            href="/"
            className="flex flex-col-reverse sm:flex-row items-center gap-2"
          >
            <div className="w-28 sm:w-36 xl:w-44 aspect-[3/2] relative">
              <Image
                src="/assets/logo.svg"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold italic tracking-wide text-red-700 md:text-2xl xl:text-3xl">
              Đối Tác Tin Cậy Của Nha Sĩ
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="hidden lg:flex flex-1 items-center justify-end">
          <SearchBar />
        </div>
      </div>

      {/* SubHeader */}
      <SubHeader />
    </header>
  );
};

export default MainHeader;
