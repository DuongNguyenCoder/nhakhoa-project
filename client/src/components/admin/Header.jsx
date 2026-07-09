import React from "react";
import { UserCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#9c1d22] text-white px-6 py-4 rounded-xl shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-wide">
        📊 Bảng điều khiển quản trị
      </h1>
      <div className="flex items-center gap-3 text-slate-200">
        <UserCircle className="w-6 h-6" />
        <span>
          Xin chào, <span className="font-semibold">Admin</span>!
        </span>
      </div>
    </header>
  );
};

export default Header;
