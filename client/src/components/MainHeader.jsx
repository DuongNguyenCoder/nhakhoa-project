import React from "react";
import logo from "../assets/logo.svg";
import CartShopping from "./ui/CartShopping";
import SearchBar from "./ui/SearchBar";
import SearchButton from "./buttons/SearchButton";
import SubHeader from "./SubHeader";
import MenuHeader from "./MenuHeader";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    // <div className='relative bg-gray-100 w-full items-center h-36 md:h-72 lg:h-[300px] xl:h-72'>
    //   <div className='flex flex-col h-full'>
    //     <div className='items-center justify-between h-28 lg:h-full xl:h-[135px] flex px-1 md:px-3 py-1'>
    //       <div className='border-none px-2'>
    //         <a href='#' className='flex items-center gap-x-1.5'>
    //           <img
    //             src={logo}
    //             alt='logo'
    //             className='h-[70px] lg:h-[100px]'
    //           />
    //           <span className='font-semibold text-xl italic tracking-wide'>Đối Tác Tin Cậy Của Nha Sĩ</span>
    //         </a>
    //       </div>
    //       <SearchBar/>
    //       <div className='flex'>
    //         <SearchButton/>
    //         <CartShopping />
    //       </div>
    //     </div>
    //     <SubHeader/>
    //     <MenuHeader />
    //     </div>
    // </div>

    // Code sau khi chỉnh sửa lần 1
    <div className="relative w-full items-center bg-gray-100">
      <div className="flex h-auto flex-col">
        {/* Top logo + slogan + search */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-2 md:px-6">
          {/* Logo + Slogan */}
          <div className="flex items-center gap-x-3">
            <Link to={"/"} className="flex items-center gap-x-2">
              <img
                src={logo}
                alt="logo"
                className="h-[100px] md:h-[110px] xl:h-[120px]"
              />
              <span className="text-xl font-bold italic tracking-wide text-red-700 md:text-2xl xl:text-3xl">
                Đối Tác Tin Cậy Của Nha Sĩ
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <SearchBar />
            <div className="hidden md:flex">
              <SearchButton />
            </div>
          </div>
        </div>

        {/* SubHeader & MenuHeader */}
        <SubHeader />
        <MenuHeader />
      </div>
    </div>
  );
};

export default MainHeader;
