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
import MobileMenuItem from "./mobile-menu-items";
import ProductMenu from "./product-menu";

const NavBarMobile = () => {
  const [open, setOpen] = useState(false);
  const [directories, setDirectories] = useState([]);

  const fetchDirectories = async () => {
    try {
      const res = await apiGetDirectory();

      if (res?.data?.success) {
        setDirectories(res.data.data ?? []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDirectories();
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <div className="lg:hidden">
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
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin">
                <div className="px-4 py-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9c1d22]/70">
                    Điều hướng
                  </p>
                </div>

                <div className="space-y-1 px-0 pb-5">
                  {NavLinks.map((link) =>
                    link.childItems ? (
                      <ProductMenu
                        key={link.title}
                        href={link.href}
                        title={link.title}
                        childData={link?.childData || []}
                        directories={directories}
                        onClose={handleClose}
                      />
                    ) : (
                      <MobileMenuItem
                        key={link.title}
                        href={link.href}
                        title={link.title}
                        onClick={handleClose}
                      />
                    ),
                  )}
                </div>

                {/* Contact */}
                {/* <div className="mt-auto border-t border-gray-100 px-4 py-5">
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
                </div> */}
              </div>

              <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-5">
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
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NavBarMobile;
