import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavLinks } from "@/data/NavLinks";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.svg";
import AuthButtons from "../buttons/AuthButtons";
import CartShopping from "./CartShopping";

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
    <div className="w-full flex items-start md:hidden">
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="h-full items-center pl-2.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="hover:text-red-400 h-8 w-8 text-white"
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
            <div className="z-70 fixed inset-0 bg-black/40" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
            unmount={false}
          >
            <DialogPanel className="z-[9999] fixed right-0 top-0 h-full w-[70%] bg-red-500 duration-300 rounded-l-2xl">
              <nav
                ref={navRef}
                className="flex h-full flex-col items-start overflow-y-auto"
              >
                <div className="flex h-16 w-full items-center py-1 justify-between bg-red-500 px-3 shadow-lg rounded-tl-2xl">
                  <img
                    src={logo}
                    alt="logo"
                    className="h-14 w-14 rounded-full bg-red-100 p-1"
                  />
                  <XCircleIcon
                    onClick={onToggleNav}
                    className="hover:text-white z-80 h-11 w-11 p-2 text-white cursor-pointer"
                  />
                </div>

                <div className="w-full h-10 bg-red-400 mb-2.5">
                  <AuthButtons />
                </div>

                <div className="w-full px-4 py-2 grid gap-4">
                  <div className="w-full items-center px-1">
                    <h2 className="font-bold text-xl text-white">DANH MỤC</h2>
                  </div>
                  <ul className="w-full px-2.5 grid gap-4">
                    {NavLinks.map((link) => (
                      <Link
                        key={link.title}
                        to={link.href}
                        className="flex items-center gap-4 py-2 px-4 rounded-lg text-lg font-semibold text-white hover:bg-red-400 transition-all"
                        onClick={onToggleNav}
                      >
                        {link.linkPic}
                        {link.title}
                      </Link>
                    ))}
                  </ul>

                  <div className="w-full items-center px-1 mt-4">
                    <h2 className="font-bold text-xl text-white">CONTACT</h2>
                  </div>
                  <span className="text-base font-medium px-2.5 text-white">
                    Hotline: <a href="tel:(+84 4) 3852 3643">(+84 4) 3852 3643</a>
                  </span>
                  <span className="text-base font-medium px-2.5 text-white">
                    Mail: <a href="mailto:vatlieunhakhoaminh@gmail.com" className="flex flex-wrap">vatlieunhakhoaminh@gmail.com</a>
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
