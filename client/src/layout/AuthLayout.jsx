import TopHeader from "@/components/layout/TopHeader";
import MainHeader from "@/components/layout/MainHeader";
import MenuHeader from "@/components/layout/MenuHeader";
import React from "react";
import { Outlet } from "../provider/react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full bg-gray-100">
      {/* Header */}
      <TopHeader />
      <MainHeader />

      {/* Sticky Menu */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <MenuHeader />
      </div>

      {/* Content Area */}
      <div className="mx-auto w-full md:w-[760px] md:px-1 lg:flex lg:w-[970px] lg:px-3 xl:w-[1230px] 2xl:w-[1500px]">
        <main className="w-full px-4 py-8">
          <section id="content">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
