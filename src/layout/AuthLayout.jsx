import MainHeader from '@/components/MainHeader'
import SideBar from '@/components/SideBar'
import TopHeader from '@/components/TopHeader'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='min-h-screen bg-[#FDEFC5]'>
      <div className="w-full">
        <TopHeader />
        <MainHeader />
      </div>
      <div className='w-full lg:flex md:w-[760px] lg:w-[970px] xl:w-[1230px] 2xl:w-[1500px] mx-auto md:px-1 lg:px-3'>
        <main className="w-full px-4">
          <section id='content'>
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
