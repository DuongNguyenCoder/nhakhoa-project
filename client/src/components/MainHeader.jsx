import React from "react";
import logo from "../assets/logo.svg";
import CartShopping from "./ui/CartShopping";
import SearchBar from "./ui/SearchBar";
import SubHeader from "./SubHeader";
import { Link } from "react-router-dom";
import Image from "next/image";

const MainHeader = () => {
  return (
    <header className="w-full bg-gray-100">
      {/* Logo + Slogan + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-2 md:px-6">
        {/* Logo + Slogan */}
        <div className="flex items-center gap-x-3">
          <Link to="/" className="flex items-center gap-x-2">
            <div className="w-25 md:w-30 xl:w-35 h-25 md:h-27.5 xl:h-30 relative">
              <Image src={logo} alt="logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold italic tracking-wide text-red-700 md:text-2xl xl:text-3xl">
              Đối Tác Tin Cậy Của Nha Sĩ
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center justify-end">
          <SearchBar />
        </div>
      </div>

      {/* SubHeader */}
      <SubHeader />
    </header>
  );
};

export default MainHeader;
