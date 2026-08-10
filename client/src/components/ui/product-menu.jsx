"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function ProductMenu({
  title,
  href,
  directories = [],
  onClose,
  childData = [],
}) {
  // ProductMenu parent open/close
  const [openMenu, setOpenMenu] = useState(false);

  // Directory category open/close
  const [openDirectory, setOpenDirectory] = useState(null);

  const hasChildData = childData.length > 0;

  // Nếu có childData thì chỉ dùng childData.
  // Nếu không thì dùng directories.
  const items = hasChildData ? childData : directories;

  const handleMenuToggle = () => {
    setOpenMenu((prev) => {
      const next = !prev;

      // Khi đóng ProductMenu thì đóng luôn directory đang mở
      if (!next) {
        setOpenDirectory(null);
      }

      return next;
    });
  };

  const handleDirectoryChange = (id, isOpen) => {
    setOpenDirectory(isOpen ? id : null);
  };

  return (
    <div className="w-full">
      {/* ================= PARENT ================= */}
      <button
        type="button"
        onClick={handleMenuToggle}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50"
        aria-expanded={openMenu}
      >
        <span>{title}</span>

        {openMenu ? (
          <ChevronDown className="h-4 w-4 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0" />
        )}
      </button>

      {/* ================= CHILD DATA ================= */}
      {openMenu && (
        <div className="mt-1">
          {/* All products */}
          {!hasChildData && (
            <Link
              href={href}
              onClick={onClose}
              className="mb-2 block rounded-lg px-3 py-2 text-sm font-semibold text-[#9c1d22] hover:bg-gray-50"
            >
              Tất cả sản phẩm
            </Link>
          )}

          {/* Directories */}
          <div className="space-y-1">
            {items.map((directory) => {
              const open = openDirectory === directory._id;
              const categories = directory?.category ?? [];

              return (
                <Collapsible
                  key={directory._id}
                  open={open}
                  onOpenChange={(isOpen) =>
                    handleDirectoryChange(directory._id, isOpen)
                  }
                >
                  {/* Directory */}
                  <div className="flex items-center rounded-lg hover:bg-gray-50">
                    <Link
                      href={
                        hasChildData
                          ? `/${directory.href}`
                          : `/san-pham/directory/${directory.slug}`
                      }
                      onClick={onClose}
                      className="min-w-0 flex-1 px-3 py-2 text-sm font-medium text-gray-800"
                    >
                      {directory.title}
                    </Link>

                    {/* Category toggle */}
                    {categories.length > 0 && (
                      <CollapsibleTrigger asChild>
                        <button
                          type="button"
                          aria-label={
                            open
                              ? `Thu gọn ${directory.title}`
                              : `Mở rộng ${directory.title}`
                          }
                          className="shrink-0 rounded-md p-2 hover:bg-gray-100"
                        >
                          {open ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      </CollapsibleTrigger>
                    )}
                  </div>

                  {/* Categories */}
                  <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <div className="ml-4 border-l border-gray-200 pl-3">
                      {categories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/san-pham/category/${category.slug}`}
                          onClick={onClose}
                          className="block rounded-md px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-[#9c1d22]"
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
