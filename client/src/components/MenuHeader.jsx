  import { NavLinks } from "@/data/NavLinks";
  import React, { useEffect, useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  import NavBarMobile from "./ui/NavBarMobile";
  import CartShopping from "./ui/CartShopping";
  import SearchButton from "./buttons/SearchButton";

  const MenuHeader = () => {
    const [isHomePage, setIsHomePage] = useState(false);
    const location = useLocation();

    useEffect(() => {
      setIsHomePage(location.pathname !== "/");
    }, [location.pathname]);

    return (
      <div className="flex h-14 md:h-[60px] items-center border-b border-b-red-500 shadow-sm">
        <div className="flex h-full w-full items-center justify-between bg-gradient-to-r from-red-700 via-red-600 to-red-700 pr-4 pl-2 md:pl-6 md:pr-1.5 lg:pr-5">
          {/* Desktop Links */}
          <div className="no-scrollbar hidden h-full flex-1 items-center md:flex md:gap-x-2 lg:gap-x-5">
            {NavLinks.map((link) => (
              <div
                key={link.title}
                className="group relative flex h-full items-center"
              >
                <Link
                  to={link.href}
                  className="flex h-full items-center justify-center px-3 py-2 text-white text-[15px] font-semibold tracking-wide transition-all duration-300 hover:text-yellow-400"
                >
                  {link.title}
                </Link>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>

          {/* Cart + Mobile */}
          <div className="flex md:hidden w-full justify-between items-center">
            <NavBarMobile />
            <div className="flex items-center gap-3">
              <CartShopping />
              <SearchButton />
            </div>
          </div>

          {/* Cart Desktop */}
          <div className="hidden md:flex items-center ml-1.5">
            <CartShopping />
            <SearchButton />
          </div>
        </div>
      </div>
    );
  };

  export default MenuHeader;
