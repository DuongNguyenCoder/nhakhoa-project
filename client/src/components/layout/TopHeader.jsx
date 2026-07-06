import React from "react";
import AuthButtons from "../buttons/AuthButtons";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

const TopHeader = () => {
  return (
    <div className="relative hidden w-full bg-gray-100 border-b border-gray-200 md:flex items-center justify-between px-4 md:px-8 xl:px-16 h-9">
      {/* Left side (Hotline + Email) */}
      <div className="flex items-center xl:space-x-6 lg:space-x-5 md:space-x-3 text-sm text-gray-700">
        {/* Hotline */}
        <a href="tel:0909217885" className="flex items-center gap-1">
          <PhoneIcon className="h-[20px] w-[20px]" />
          <span className="text-base">Hotline:</span>
          <span className="font-medium text-base text-red-700 hover:text-red-600 transition-colors duration-200">
            0909 217 885
          </span>
        </a>

        {/* Email */}
        <a
          href="mailto:dentalmart1.vn@gmail.com"
          className="flex items-center gap-1 "
        >
          <EnvelopeIcon className="w-[20px] h-[20px]" />
          <span className="text-base">Email:</span>
          <span className="font-medium text-base text-red-700 hover:text-red-600 transition-colors duration-200">
            dentalmart1.vn@gmail.com
          </span>
        </a>
      </div>

      {/* Right side (Auth Buttons) */}
      <AuthButtons />
    </div>
  );
};

export default TopHeader;
