import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import MainHeader from "@/components/MainHeader";
import MenuHeader from "@/components/MenuHeader";
import SideBarDiscount from "@/components/SideBarDiscount";
import SupportWidget from "@/components/SupportWidget";
import TopHeader from "@/components/TopHeader";
import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const NewContext = createContext();

const DefaultLayout = () => {
  const [newTitle, setNewTitle] = useState(null);
  return (
    <NewContext.Provider value={{newTitle, setNewTitle}}>
    <div className="w-full bg-gray-100">
      {/* Header */}
      <TopHeader />
      <MainHeader />

      {/* Sticky Menu */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <MenuHeader />
      </div>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Content Area */}
      <div className="mx-auto w-full md:w-[760px] md:px-1 lg:flex lg:w-[970px] lg:px-3 xl:w-[1230px] 2xl:w-[1500px]">
        <main className="my-5 w-full px-4 lg:w-[72%]">
          <section id="content">
            <Outlet />
          </section>
        </main>

        {/* Sidebar */}
        <aside className="mt-6 flex w-full flex-col px-2 lg:mt-5 lg:w-[28%]">
          <SideBarDiscount />
        </aside>
      </div>

      {/* Footer + Support */}
      <Footer />
      <SupportWidget />
    </div>
    </NewContext.Provider>
  );
};

export default DefaultLayout;
