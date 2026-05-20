import { PhoneIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import CartShopping from "./ui/CartShopping";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SupportWidget = () => {
  const { cartItems } = useSelector((state) => state.app);
  const totalQuantity = cartItems.length;
  const [showHotline, setShowHotline] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const hotlineRef = useRef(null);
  const navigate = useNavigate();
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
      navigate("/check-out-step1");
    } else {
      setShowCart(!showCart);
    }
  };

  return (
    <>
      <div className="fixed right-2 top-1/3 z-50 flex flex-col gap-4">
        {showScrollTop && (
          <button
            onClick={() => setShowHotline((prev) => !prev)}
            className="rounded-full bg-red-700 p-4 text-white shadow-lg transition hover:scale-110"
            title="Hỗ trợ"
          >
            {showHotline ? (
              <ChevronDoubleLeftIcon className="size-6" />
            ) : (
              <ChatBubbleOvalLeftIcon className="size-6" />
            )}
          </button>
        )}

        <div
          ref={hotlineRef}
          className={`absolute right-[80px] top-0 w-80 flex flex-col gap-4 h-[350px] rounded-lg border bg-white p-5 shadow-lg transition-all duration-300 ${
            showHotline
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <div className="bg-red-500 w-full h-20 absolute inset-0 flex gap-3 items-center pl-4 rounded-t-lg">
            <div className="bg-white size-16 rounded-2xl">
              <img
                src="/assets/logo.svg"
                alt="logo Minhdental"
                aria-hidden="true"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-base">minhdental.com</h3>
              <h4 className="font-normal text-sm">Hotline: 0915 858 282</h4>
            </div>
          </div>

          <div className="mt-20">
            <h5>Chào Bác sĩ!</h5>
            <h5>
              Để được hỗ trợ mọi vấn đề (thắc mắc) kịp thời và nhanh chóng.
            </h5>
            <h5>
              Bác sĩ vui lòng gửi tin nhắn về các kênh Chat hoặc liên hệ Hotline
              phía bên dưới!
            </h5>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <a
              href="tel:0915858282"
              className="bg-red-600 p-4 rounded-full transition hover:scale-110"
              aria-label="Gọi 0915 858 282"
              title="Hotline"
            >
              <PhoneIcon className="size-6 text-white" />
            </a>
            <a
              href="https://zalo.me/0915858282"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-600 p-4 shadow-lg transition hover:scale-110"
              title="Chat Zalo"
            >
              <img
                src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
                alt="Zalo"
                className="size-6"
              />
            </a>
            <a
              href="https://m.me/nhakhoaminhphuong.net"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-600 p-4 shadow-lg transition hover:scale-110"
              title="Chat Messenger"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Messenger_logo_2018.svg"
                alt="Messenger"
                className="size-6"
              />
            </a>
          </div>
        </div>

        {showScrollTop && (
          <button
            onClick={handleCartClick}
            className="rounded-full bg-red-700 p-4 text-white shadow-lg transition hover:scale-110"
            title="Giỏ hàng"
          >
            {showCart ? (
              <ChevronDoubleLeftIcon className="size-6" />
            ) : (
              <div className="relative">
                <ShoppingCartIcon className="size-6" />
                <span
                  id="soluong"
                  className="absolute -right-1.5 -top-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-xs text-white"
                >
                  {totalQuantity}
                </span>
              </div>
            )}
          </button>
        )}

        {showCart && (
          <div className="absolute right-14 top-12 z-50 max-w-full rounded-3xl bg-red-700 px-3 sm:max-w-[400px]">
            <CartShopping />
          </div>
        )}

        {showScrollTop && !showHotline && (
          <>
            <a
              href="https://zalo.me/0915858282"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-700 p-4 shadow-lg transition hover:scale-110"
              title="Chat Zalo"
            >
              <img
                src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
                alt="Zalo"
                className="size-6"
              />
            </a>
            <a
              href="https://m.me/nhakhoaminhphuong.net"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-700 p-4 shadow-lg transition hover:scale-110"
              title="Chat Messenger"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Messenger_logo_2018.svg"
                alt="Messenger"
                className="size-6"
              />
            </a>
          </>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-2 z-50 rounded-full bg-gray-500 p-4 text-white shadow-lg transition-opacity duration-300 hover:bg-red-700"
          title="Lên đầu trang"
        >
          <ChevronDoubleUpIcon className="size-6" />
        </button>
      )}
    </>
  );
};

export default SupportWidget;
