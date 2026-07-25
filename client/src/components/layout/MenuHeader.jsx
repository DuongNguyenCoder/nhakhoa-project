"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { NavLinks } from "../../data/NavLinks";
import { apiGetDirectory } from "../../apis/DirectoryAPI";

import NavBarMobile from "../ui/NavBarMobile";
import CartShopping from "../ui/CartShopping";
import SearchButton from "../buttons/SearchButton";
import { ChevronRight } from "lucide-react";

const MenuHeader = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const res = await apiGetDirectory();

        if (res?.data?.success) {
          setDirectories(res.data.data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDirectories();
  }, []);

  console.log("Directories ===> ", directories);

  return (
    <div className=" h-14 md:h-[60px] border-b border-[#9c1d22]/20 bg-[#9c1d22] shadow-sm">
      <div className=" mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-3 md:px-6 lg:px-2 xl:px-6">
        {/* Desktop */}
        <nav className="hidden lg:flex flex-1">
          <ul className="flex items-center gap-1 xl:gap-2.5">
            {NavLinks.map((link) => {
              if (!link.childItems) {
                return (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="relative flex items-center px-2 xl:px-4 py-5 text-[13px] xl:text-sm font-semibold uppercase text-white
              after:absolute after:bottom-2 after:left-4 after:h-[2px]
              after:w-0 after:bg-yellow-300 after:transition-all
              hover:after:w-[calc(100%-2rem)]"
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              }

              const items = link.childData || directories;
              const isMegaMenu = link.dropdownType === "mega";
              const dropdownClass = `
absolute left-0 top-full z-50
rounded-2xl border border-gray-500 bg-white shadow-xl
transition-all duration-200
${
  openMenu === link.title
    ? "visible translate-y-0 opacity-100"
    : "invisible -translate-y-2 opacity-0"
}
${isMegaMenu ? "w-[900px] xl:w-[1100px] -ml-24 xl:-ml-0" : "min-w-[320px]"}
`;

              return (
                <li
                  key={link.title}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.title)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="relative flex items-center px-2 xl:px-4 py-5 text-[13px] xl:text-sm font-semibold uppercase text-white
            after:absolute after:bottom-2 after:left-4 after:h-[2px]
            after:w-0 after:bg-yellow-300 after:transition-all
            hover:after:w-[calc(100%-2rem)]"
                  >
                    {link.title}
                  </Link>

                  <div className={dropdownClass}>
                    {isMegaMenu ? (
                      <MegaMenu directories={directories} />
                    ) : (
                      <ul className="flex flex-col p-2">
                        {items.map((item) => (
                          <CategoryItem
                            key={item._id ?? item.href}
                            title={item.title}
                            href={item.href}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between lg:hidden">
          <NavBarMobile />

          <div className="flex items-center gap-3 md:hidden">
            <CartShopping />
            <SearchButton />
          </div>
        </div>

        {/* Desktop cart */}
        <div className="hidden md:flex items-center">
          <CartShopping />
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;

function CategoryItem({ title, href, isChild = false }) {
  return (
    <li>
      <Link
        href={href}
        className={`
          flex items-center justify-between transition hover:bg-muted
          ${isChild ? "px-6 py-2 text-[15px] border border-gray-100 bg-gray-50 " : "p-3 border-b border-[#9c1d22]/50"}
        `}
      >
        <span
          className={isChild ? "text-gray-600" : "font-semibold text-[#9c1d22]"}
        >
          {title}
        </span>

        {!isChild && <ChevronRight className="text-[#9c1d22]" />}
      </Link>
    </li>
  );
}

function MegaMenu({ directories }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {directories.map((directory) => (
        <div
          key={directory._id}
          className="overflow-hidden rounded-xl border border-gray-300 bg-white"
        >
          {/* Header */}
          <CategoryItem
            title={directory.title}
            href={`/san-pham/directory/${directory.slug}`}
          />

          {/* Scroll */}
          <div className="max-h-72 overflow-y-auto p-2">
            {directory.category?.map((category) => (
              <CategoryItem
                key={category._id}
                title={category.title}
                href={`/san-pham/category/${category.slug}`}
                isChild
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
