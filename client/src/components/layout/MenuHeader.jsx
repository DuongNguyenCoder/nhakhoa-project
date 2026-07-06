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

const MenuHeader = () => {
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

  return (
    <div className=" h-14 md:h-[60px] border-b border-[#9c1d22]/20 bg-[#9c1d22] shadow-sm">
      <div className=" mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-3 md:px-6">
        {/* Desktop */}
        <NavigationMenu className=" hidden md:flex flex-1">
          <NavigationMenuList className="gap-1 lg:gap-2">
            {NavLinks.map((link) => {
              if (link.childItems) {
                return (
                  <NavigationMenuItem key={link.title}>
                    <NavigationMenuTrigger
                      className="
      relative bg-transparent px-4 py-2 text-sm font-medium text-white
      hover:bg-transparent focus:bg-transparent active:bg-transparent
      data-[state=open]:bg-transparent
      after:absolute after:bottom-0 after:left-4 after:h-[2px]
      after:w-0 after:bg-yellow-300 after:transition-all after:duration-300
      hover:after:w-[calc(100%-2rem)]
    "
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = link.href;
                      }}
                    >
                      {link.title}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid w-[320px] gap-x-12 gap-y-2 p-4 md:w-[100vh] md:grid-cols-3">
                        {directories.map((directory) => (
                          <CategoryItem
                            key={directory._id}
                            href={`/san-pham/directory?directory=${directory._id}&title=${encodeURIComponent(directory.title)}`}
                            title={directory.title}
                            icon={directory.directoryPic || ""}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={link.title}>
                  <Link
                    href={link.href}
                    className="relative flex items-center px-4 py-2 text-sm font-medium text-white after:absolute after:bottom-0 after:left-4 after:h-[2px] after:w-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]"
                  >
                    {link.title}
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

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

function CategoryItem({ title, icon, href }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-xl p-3 transition hover:bg-muted"
        >
          {icon !== "" && (
            <div className="relative w-16 h-16 overflow-hidden border border-gray-200">
              <Image
                src={icon}
                alt={`Icon ${title}`}
                fill
                className="object-cover transition-transform"
              />
            </div>
          )}
          <div className="text-sm font-semibold text-[#9c1d22]">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
