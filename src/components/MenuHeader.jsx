import { NavLinks } from "@/data/NavLinks";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBarMobile from "./ui/NavBarMobile";
import ProductListBar from "./ui/ProductListBar";

const MenuHeader = () => {
  const [isProductListShow, setProductListShow] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(false);
    } else {
      setIsHomePage(true);
    }
  }, [location.pathname]);
  return (
    <div className="flex h-12 items-center space-x-4 border-b border-b-orange-500 md:h-[52px]">
      <div className="flex h-full w-full justify-around gap-x-0 bg-red-800">
        {isHomePage && (
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setProductListShow(true)}
            onMouseLeave={() => setProductListShow(false)}
          >
            <div className="h-full cursor-pointer items-center px-2 text-white hover:bg-red-700 hover:text-yellow-400 xl:px-5">
              <span className="md:text-[15px] md:font-bold lg:text-lg">
                DANH SÁCH SẢN PHẨM
              </span>
            </div>
            {isProductListShow && (
              <div className="absolute left-0 top-full z-50">
                <ProductListBar />
              </div>
            )}
          </div>
        )}
        <div className="no-scrollbar hidden h-full w-full items-center justify-center overflow-x-auto md:flex md:gap-x-2 lg:gap-x-3 xl:gap-x-4">
          {NavLinks.map((link) => (
            <div
              key={link.title}
              className="flex h-full items-center text-white hover:bg-red-700 hover:text-yellow-400 md:px-2 xl:px-5"
            >
              <Link
                to={link.href}
                className="flex h-full items-center justify-center md:text-[15px] md:font-bold lg:text-lg"
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
        <NavBarMobile />
      </div>
    </div>
  );
};

export default MenuHeader;
