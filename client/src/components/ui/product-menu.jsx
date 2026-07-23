"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function ProductMenu({
  title,
  href,
  directories,
  onClose,
  childData = [],
}) {
  const [openDirectory, setOpenDirectory] = useState(null);

  const toggleDirectory = (id) => {
    setOpenDirectory((prev) => (prev === id ? null : id));
  };

  const hasChildData = childData.length;

  const items = childData.length > 0 ? childData : directories;

  console.log("Check directory ====> ", directories);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="products" className="bg-gray-100 px-3">
        <AccordionTrigger className="py-4 hover:no-underline">
          <span className="text-[15px] font-medium text-gray-800">{title}</span>
        </AccordionTrigger>

        <AccordionContent className="pb-2">
          {!childData.length && (
            <Link
              href={href}
              onClick={onClose}
              className="mb-2 block rounded-lg px-3 py-2 text-sm font-semibold text-[#9c1d22] hover:bg-gray-50"
            >
              Tất cả sản phẩm
            </Link>
          )}

          <div className="space-y-1">
            {items.map((directory) => {
              const open = openDirectory === directory._id;
              console.log(directory.title, directory.category);

              return (
                <Collapsible
                  key={directory._id}
                  open={open}
                  onOpenChange={(isOpen) => {
                    setOpenDirectory(isOpen ? directory._id : null);
                  }}
                >
                  <div className="flex items-center rounded-lg hover:bg-gray-50">
                    <Link
                      href={
                        hasChildData
                          ? `/${directory.href}`
                          : `/san-pham/directory/${directory.slug}`
                      }
                      onClick={onClose}
                      className="flex-1 px-3 py-2 text-sm font-medium text-gray-800"
                    >
                      {directory.title}
                    </Link>

                    {!!directory.category?.length && (
                      <CollapsibleTrigger asChild>
                        <button
                          type="button"
                          className="rounded-md p-2 hover:bg-gray-100"
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

                  <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                    <div className="ml-4 border-l border-gray-200 pl-3">
                      {directory?.category?.map((category) => (
                        <Link
                          key={category._id}
                          href={`/san-pham/category/${category.slug}`}
                          onClick={onClose}
                          className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#9c1d22]"
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
