import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavLinks } from "@/data/NavLinks";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.svg";
import AuthButtons from "../buttons/AuthButtons";

const NavBarMobile = () => {
  const [navShow, setNavShow] = useState(false);
  const navRef = useRef(null);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current);
      } else {
        // Prevent scrolling
        disableBodyScroll(navRef.current);
      }
      return !status;
    });
  };

  // ✅ Tự động đóng nav khi màn hình >= 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && navShow) {
        setNavShow(false);
        enableBodyScroll(navRef.current); // đảm bảo không khóa scroll desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navShow]);

  return (
    <div className="w-full items-start md:hidden">
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="h-full items-center pl-2.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="hover:text-primary-500 h-8 w-8 text-white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="z-70 fixed inset-0 bg-black/30" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-95"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0 opacity-95"
            leaveTo="translate-x-full opacity-0"
            unmount={false}
          >
            <DialogPanel className="z-[9999] fixed right-0 top-0 h-full w-[40%] bg-red-500 duration-300">
              <nav
                ref={navRef}
                className="flex h-full basis-0 flex-col items-start overflow-y-auto"
              >

                <div className="flex h-16 w-full items-center justify-between mb-2.5 bg-red-400 pl-3 pr-1 shadow-sm">
                  <img
                    src={logo}
                    alt="logo"
                    className="size-[50px] rounded-full bg-red-100 p-1"
                  />
                  <XCircleIcon
                    onClick={onToggleNav}
                    className="hover:text-primary-500 dark:hover:text-primary-400 z-80 h-16 w-16 p-4 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="w-full h-8 bg-red-300 mb-1.5">
                  <AuthButtons />
                </div>

                <div className="w-full px-4 grid gap-3.5">
                  <div className="w-full items-center px-1">
                    <h2 className="font-bold text-lg">DANH MỤC</h2>
                  </div>
                  <ul className="w-full px-2.5 grid gap-3.5">
                  {NavLinks.map((link) => (
                
                      <Link
                      key={link.title}
                      to={link.href}
                      className=" flex border-b border-b-orange-300 mb-1 pb-1 items-center gap-4 text-xl font-semibold text-gray-900 outline outline-0"
                      onClick={onToggleNav}
                    >
                      {link.linkPic}
                      {link.title}
                    </Link>
                   
                  ))}
                  </ul>
                  <div className="w-full items-center px-1">
                    <h2 className="font-bold text-lg">CONTACT</h2>
                  </div>
                  <span className="text-base font-medium px-2.5 w-full">
                    Hotline: <a href="tel:(+84 4) 3852 3643">(+84 4) 3852 3643</a>
                  </span>
                  <span className="text-base font-medium px-2.5  w-full">
                    Mail: <a href="mailto:vatlieunhakhoaminh@gmail.com" className=" flex flex-wrap">vatlieunhakhoaminh@gmail.com</a>
                  </span>
                </div>
              </nav>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NavBarMobile;
