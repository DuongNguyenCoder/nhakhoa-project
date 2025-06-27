import React from "react";
import logo from "../assets/logo.svg";
import CartShopping from "./ui/CartShopping";
import SearchBar from "./ui/SearchBar";
import SubHeader from "./SubHeader";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="w-full bg-gray-100">
      {/* Logo + Slogan + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-2 md:px-6">
        {/* Logo + Slogan */}
        <div className="flex items-center gap-x-3">
          <Link to="/" className="flex items-center gap-x-2">
            <img
              src={logo}
              alt="logo"
              className="h-[100px] md:h-[110px] xl:h-[120px]"
              loading="lazy"
            />
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
