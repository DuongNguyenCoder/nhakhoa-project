import useIsMobile from "@/hooks/useIsMobile";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import { setIsSignOut } from "@/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthButtons = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile(); // Sử dụng custom hook để kiểm tra thiết bị
    const [showLoginModal, setShowLoginModal] = useState(false); // State để hiển thị popup login
    const popupRef = useRef(null); // ref cho popup
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.app.isSignIn);
    const currentUser = useSelector((state) => state.app.currentUser);
    const firstName = currentUser?.name?.split(" ")[0];
    const handleLogOut = () => {
      dispatch(setIsSignOut());
      navigate("/");
    }

    const handleLoginClick = () => {
      if (isMobile) {
        navigate("/auth/login"); // Nếu trên mobile, chuyển trang
      } else {
        setShowLoginModal(true); // Nếu trên desktop, hiển thị popup login
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          popupRef.current &&
          !popupRef.current.contains(event.target)
        ) {
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
    <div className="flex h-full items-center gap-1.5 border-x-2 border-stone-500">
      <IdentificationIcon className="ml-3 mt-[1px] size-[22px] md:size-[18px]" />
      <div className="flex items-center gap-6 text-sm font-medium md:font-normal ">
      {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/profile")} className="text-gray-700">Xin chào, {firstName}</button>
            <button onClick={handleLogOut} className="text-red-600 hover:underline">
              Đăng xuất
            </button> 
          </>
        ) : (
          <>
            {/* Nếu chưa đăng nhập, hiển thị các nút "Đăng ký" và "Đăng nhập" */}
            <button onClick={() => navigate("/auth/register")} className="">
              Đăng ký
            </button>
            <button onClick={handleLoginClick} className="mr-3">
              Đăng nhập
            </button>
          </>
        )}
      </div>
      {/* Hiển thị popup login nếu trên desktop */}
      {!isMobile && showLoginModal && (
        <div 
          ref={popupRef}
          className={`absolute left-0 right-0 top-full z-40 
          origin-top-right rounded-b-lg
          shadow-lg transition-all duration-150 
          focus:outline-none md:left-auto md:right-5 md:w-[400px] lg:w-[435px]`}
        >
        <LoginForm/>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
