"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { NavLinks } from "../../data/NavLinks";
import { apiGetDirectory } from "../../apis/DirectoryAPI";

import NavBarMobile from "../ui/NavBarMobile";
import CartShopping from "../ui/CartShopping";
import SearchButton from "../buttons/SearchButton";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

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
      <div className=" mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-3 md:px-6">
        {/* Desktop */}
        <nav className="hidden md:flex flex-1">
          <ul className="flex items-center gap-1 lg:gap-2">
            {NavLinks.map((link) => {
              if (!link.childItems) {
                return (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="relative flex items-center px-4 py-5 text-sm font-semibold uppercase text-white
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

              return (
                <li
                  key={link.title}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.title)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="relative flex items-center px-4 py-5 text-sm font-semibold uppercase text-white
            after:absolute after:bottom-2 after:left-4 after:h-[2px]
            after:w-0 after:bg-yellow-300 after:transition-all
            hover:after:w-[calc(100%-2rem)]"
                  >
                    {link.title}
                  </Link>

                  <div
                    className={`
    absolute left-0 top-full z-50 mt-0
    rounded-2xl border bg-white shadow-xl
    transition-all duration-200
    ${
      openMenu === link.title
        ? "visible opacity-100 translate-y-0"
        : "invisible opacity-0 -translate-y-2"
    }
    ${isMegaMenu ? "w-[900px]" : "min-w-[320px]"}
  `}
                  >
                    <ul
                      className={`
      p-5 gap-3
      ${isMegaMenu ? "grid grid-cols-3" : "flex flex-col"}
    `}
                    >
                      {isMegaMenu
                        ? directories.map((directory) => (
                            <div key={directory._id} className="space-y-1">
                              <CategoryItem
                                title={directory.title}
                                href={`/san-pham/directory?directory=${
                                  directory._id
                                }&title=${encodeURIComponent(directory.title)}`}
                              />

                              {directory.category?.map((category) => (
                                <CategoryItem
                                  key={category._id}
                                  title={category.title}
                                  href={`/san-pham/category?category=${
                                    category._id
                                  }&title=${encodeURIComponent(category.title)}`}
                                  isChild
                                />
                              ))}
                            </div>
                          ))
                        : items.map((item) => (
                            <CategoryItem
                              key={item._id ?? item.href}
                              title={item.title}
                              href={item.href}
                            />
                          ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between md:hidden">
          <NavBarMobile />

          <div className="flex items-center gap-3">
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

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function CategoryItem({ title, href, isChild = false }) {
  return (
    <li>
      <Link
        href={href}
        className={`
          flex items-center justify-between rounded-xl transition hover:bg-muted
          ${isChild ? "px-6 py-2 text-[15px]" : "p-3"}
        `}
      >
        <span
          className={isChild ? "text-gray-600" : "font-semibold text-[#9c1d22]"}
        >
          {isChild && <ArrowRight className="mr-2 inline-block h-3 w-3" />}
          {title}
        </span>

        {!isChild && <ChevronRight className="text-[#9c1d22]" />}
      </Link>
    </li>
  );
}
