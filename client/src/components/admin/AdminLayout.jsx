// components/admin/Layout.jsx
import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Outlet } from "../../provider/react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-slate-900 to-gray-800 text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-slate-100 text-slate-900 rounded-tl-3xl shadow-inner">
        <Header />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
