import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import MainHeader from "@/components/MainHeader";
import SideBar from "@/components/SideBar";
import SideBarDiscount from "@/components/SideBarDiscount";
import SupportWidget from "@/components/SupportWidget";
import TopHeader from "@/components/TopHeader";
import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full">
        <TopHeader />
        <MainHeader />
      </div>
      <Breadcrumb />
      <div className="mx-auto w-full md:w-[760px] md:px-1 lg:flex lg:w-[970px] lg:px-3 xl:w-[1230px] 2xl:w-[1500px]">
        <div className="my-5 w-full lg:flex">
        <main className="w-full lg:w-[72%]  px-4">
          <section id="content">
            <Outlet />
          </section>
        </main>
        <div className="mt-6 flex w-full flex-col px-2 lg:mt-0 lg:w-[28%]">
          {/* <SideBar /> */}
          <SideBarDiscount />
        </div>
        </div>
      </div>
      <div className="mt-20 w-full">
        <Footer />
      </div>
      <SupportWidget/>
    </div>
  );
};

export default DefaultLayout;
