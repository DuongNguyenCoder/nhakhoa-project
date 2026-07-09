"use client";

import { PhoneIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import CartShopping from "./ui/CartShopping";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SupportWidget = () => {
  const { cartItems } = useSelector((state) => state.app);
  const totalQuantity = cartItems.length;
  const [showHotline, setShowHotline] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const hotlineRef = useRef(null);
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hotlineRef.current && !hotlineRef.current.contains(e.target)) {
        setShowHotline(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const hasShownHotline = sessionStorage.getItem("hasShownHotline");

    if (!hasShownHotline) {
      setShowHotline(true);
      sessionStorage.setItem("hasShownHotline", "true");
    }
  }, []);

  const handleCartClick = () => {
    if (window.innerWidth < 768) {
      router.push("/check-out-step1");
    } else {
      setShowCart(!showCart);
    }
  };

  return (
    <>
      <div className="fixed right-3 top-1/3 z-50 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={() => setShowHotline((prev) => !prev)}
            className="
group
flex
h-14
w-14
items-center
justify-center
rounded-2xl
border
border-[#9c1d22]/10
bg-white
text-[#9c1d22]
shadow-lg
shadow-black/5
transition-all
duration-300
hover:-translate-y-1
hover:border-[#9c1d22]/20
hover:bg-[#fff8f8]
hover:shadow-xl
"
            title="Hỗ trợ"
          >
            {showHotline ? (
              <ChevronDoubleLeftIcon className="size-6" />
            ) : (
              <ChatBubbleOvalLeftIcon className="size-7" />
            )}
          </button>
        )}

        <div
          ref={hotlineRef}
          className={`absolute right-[72px] top-0 z-50
  w-[calc(100vw-90px)]
  max-w-sm
  overflow-hidden
  rounded-3xl
  border border-[#9c1d22]/10
  bg-white
  shadow-2xl shadow-black/10
  transition-all duration-300
  ${
    showHotline
      ? "translate-x-0 scale-100 opacity-100"
      : "pointer-events-none translate-x-4 scale-95 opacity-0"
  }`}
        >
          <div className="bg-gradient-to-r from-[#9c1d22] to-[#b92d33] p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                <Image
                  src="/assets/logo.svg"
                  alt="Minh Dental"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              <div className="text-white">
                <h3 className="font-semibold">Minh Dental</h3>
                <p className="text-sm text-white/90">Hotline: 0909 217 885</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div>
              <h4 className="font-semibold text-gray-900">
                Xin chào Bác sĩ 👋
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Để được hỗ trợ nhanh chóng về sản phẩm, đơn hàng hoặc tư vấn kỹ
                thuật, vui lòng liên hệ với Minh Dental qua các kênh bên dưới.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <a
                href="tel:0909217885"
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#9c1d22]/10 bg-[#fff8f8] p-3 transition-all hover:bg-[#9c1d22] hover:text-white"
              >
                <PhoneIcon className="size-6" />
                <span className="text-xs font-medium">Gọi</span>
              </a>

              <a
                href="https://zalo.me/0915858282"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#9c1d22]/10 bg-[#fff8f8] p-3 transition-all hover:bg-[#9c1d22]"
              >
                <Image
                  src="/icons/zalo.png"
                  alt="Zalo"
                  width={24}
                  height={24}
                />
                <span className="text-xs font-medium text-gray-700">Zalo</span>
              </a>

              <a
                href="https://m.me/nhakhoaminhphuong.net"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#9c1d22]/10 bg-[#fff8f8] p-3 transition-all hover:bg-[#9c1d22]"
              >
                <Image
                  src="/icons/messenger.png"
                  alt="Messenger"
                  width={24}
                  height={24}
                />
                <span className="text-xs font-medium text-gray-700">
                  Messenger
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* {showScrollTop && (
          <button
            onClick={handleCartClick}
            className="
group
flex
h-14
w-14
items-center
justify-center
rounded-2xl
border
border-[#9c1d22]/10
bg-white
text-[#9c1d22]
shadow-lg
shadow-black/5
transition-all
duration-300
hover:-translate-y-1
hover:border-[#9c1d22]/20
hover:bg-[#fff8f8]
hover:shadow-xl
"
            title="Giỏ hàng"
          >
            {showCart ? (
              <ChevronDoubleLeftIcon className="size-6" />
            ) : (
              <div className="relative">
                <ShoppingCartIcon className="size-6" />
                <span
                  className="
  absolute
  -right-2
  -top-2
  flex
  h-5
  min-w-5
  items-center
  justify-center
  rounded-full
  bg-[#9c1d22]
  px-1
  text-[11px]
  font-semibold
  text-white
  "
                >
                  {totalQuantity}
                </span>
              </div>
            )}
          </button>
        )} */}

        {/* {showCart && (
          <div
            className="
    absolute
    right-[72px]
    top-16
    z-50
    w-[calc(100vw-90px)]
    max-w-[420px]
    overflow-hidden
    rounded-3xl
    border
    border-[#9c1d22]/10
    bg-white
    shadow-2xl
    shadow-black/10
    "
          >
            <CartShopping />
          </div>
        )} */}

        {showScrollTop && !showHotline && (
          <>
            <a
              href="https://zalo.me/0913783696"
              target="_blank"
              rel="noopener noreferrer"
              className="
group
flex h-14 w-14 items-center justify-center
rounded-2xl
border border-[#9c1d22]/10
bg-white
text-[#9c1d22]
shadow-lg shadow-black/5
backdrop-blur
transition-all duration-300
hover:-translate-y-1
hover:border-[#9c1d22]/20
hover:bg-[#fff8f8]
hover:shadow-xl
"
              title="Chat Zalo"
            >
              <Image
                src="/icons/zalo.png"
                alt="Zalo"
                fill
                className="object-cover p-3 "
              />
            </a>
            <a
              href="https://m.me/nhakhoaminhphuong.net"
              target="_blank"
              rel="noopener noreferrer"
              className="
group
flex h-14 w-14 items-center justify-center
rounded-2xl
border border-[#9c1d22]/10
bg-white
text-[#9c1d22]
shadow-lg shadow-black/5
backdrop-blur
transition-all duration-300
hover:-translate-y-1
hover:border-[#9c1d22]/20
hover:bg-[#fff8f8]
hover:shadow-xl
"
              title="Chat Messenger"
            >
              <Image
                src="/icons/messenger.png"
                alt="Messenger"
                fill
                className="object-cover p-3"
              />
            </a>
          </>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="
fixed
bottom-6
right-3
z-50
flex
h-14
w-14
items-center
justify-center
rounded-2xl
border
border-[#9c1d22]/10
bg-white
text-[#9c1d22]
shadow-xl
shadow-black/5
transition-all
duration-300
hover:-translate-y-1
hover:bg-[#9c1d22]
hover:text-white
"
          title="Lên đầu trang"
        >
          <ChevronDoubleUpIcon className="size-6" />
        </button>
      )}
    </>
  );
};

export default SupportWidget;
