"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "../../data/NavLinks";
import { apiGetDirectory } from "../../apis/DirectoryAPI";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AuthButtons from "../buttons/AuthButtons";

const NavBarMobile = () => {
  const [open, setOpen] = useState(false);
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
    <div className="md:hidden">
      {/* Trigger */}
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center p-2 text-white"
      >
        <Bars3Icon className="size-7" />
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog onClose={() => setOpen(false)} className="relative z-[9999]">
          {/* Overlay */}
          <TransitionChild
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>

          {/* Panel */}
          <TransitionChild
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition duration-200 ease-in"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed flex flex-col right-0 top-0 h-full w-[84%] max-w-sm bg-white shadow-xl">
              {/* Header */}
              <div className="flex h-16 items-center justify-between border-b border-[#9c1d22]/10 bg-[#9c1d22] px-4">
                <Image
                  src="/assets/logo_f.svg"
                  alt="logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />

                <button onClick={() => setOpen(false)}>
                  <XMarkIcon className="size-7 text-white" />
                </button>
              </div>

              <div className="shrink-0">
                <AuthButtons />
              </div>

              {/* Menu */}
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                <div className="px-4 py-5">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9c1d22]/70">
                    Điều hướng
                  </p>

                  <div className="space-y-1">
                    {NavLinks.map((link) => {
                      if (link.childItems) {
                        return (
                          <Accordion key={link.title} type="single" collapsible>
                            <AccordionItem
                              value="products"
                              className="border-b"
                            >
                              <AccordionTrigger className="py-4 text-[15px] font-medium text-gray-800 hover:no-underline">
                                <div className="flex items-center gap-3">
                                  {link.linkPic}
                                  {link.title}
                                </div>
                              </AccordionTrigger>

                              <AccordionContent>
                                <div className="space-y-1 pl-9 pb-2">
                                  <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="block py-2 text-sm font-medium text-[#9c1d22]"
                                  >
                                    Tất cả sản phẩm
                                  </Link>

                                  {directories.map((directory) => (
                                    <Link
                                      key={directory._id}
                                      href={`/san-pham/directory?directory=${directory._id}&title=${encodeURIComponent(directory.title)}`}
                                      onClick={() => setOpen(false)}
                                      className="block py-2 text-sm text-gray-600"
                                    >
                                      {directory.title}
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        );
                      }

                      return (
                        <Link
                          key={link.title}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-[48px] items-center gap-3 border-b border-gray-100 py-3 text-[15px] font-medium text-gray-800"
                        >
                          <span className="text-[#9c1d22]">{link.linkPic}</span>
                          {link.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-auto border-t border-gray-100 px-4 py-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9c1d22]/70">
                    Liên hệ
                  </p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <a href="tel:(+84 4) 3852 3643" className="block">
                      Hotline: (+84 4) 3852 3643
                    </a>

                    <a
                      href="mailto:vatlieunhakhoaminh@gmail.com"
                      className="block break-all"
                    >
                      vatlieunhakhoaminh@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NavBarMobile;
