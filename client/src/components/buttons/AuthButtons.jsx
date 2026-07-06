"use client";

import useIsMobile from "../../hooks/useIsMobile";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import LoginForm from "../auth/LoginForm";
import { setIsSignOut } from "../../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const popupRef = useRef(null);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.app.isSignIn);
  const currentUser = useSelector((state) => state.app.currentUser);
  const firstName = currentUser?.name?.split(" ")[0];

  const handleLogOut = () => {
    dispatch(setIsSignOut());
    router.push("/");
  };

  const handleLoginClick = () => {
    if (isMobile) {
      router.push("/auth/login");
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLoginModal(false);
      }
    };

    if (showLoginModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginModal]);

  return (
    <div className="relative flex items-center justify-center gap-2 p-1.5 md:p-0 text-sm text-black md:text-gray-700 border-y md:border-none border-y-yellow-500">
      <IdentificationIcon className="size-6 md:size-5 text-primary" />
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/profile")}
            className="font-medium hover:text-primary transition-colors text-base md:text-sm"
          >
            Xin chào, {firstName}
          </button>
          <button
            onClick={handleLogOut}
            className="md:text-red-600 text-yellow-300 font-medium hover:underline transition-colors text-base md:text-sm"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/auth/register")}
            className="hover:text-primary transition-colors font-medium text-base md:text-sm"
          >
            Đăng ký
          </button>
          <button
            onClick={handleLoginClick}
            className="hover:text-primary transition-colors font-medium text-base md:text-sm"
          >
            Đăng nhập
          </button>
        </div>
      )}

      {!isMobile && showLoginModal && (
        <div
          ref={popupRef}
          className="absolute z-[9999] right-0 top-full mt-2 w-[350px] md:w-[400px] rounded-lg bg-white shadow-xl p-4"
        >
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
