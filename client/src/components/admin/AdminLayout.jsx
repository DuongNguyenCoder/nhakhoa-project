// components/admin/Layout.jsx
import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Outlet } from "../../provider/react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6 text-slate-900 shadow-inner">
        <Header />
        <div className="flex-1 mt-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
