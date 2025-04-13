import ProductListBar from '@/components/ui/ProductListBar';
import MainHeader from '@/components/MainHeader';
import TopHeader from '@/components/TopHeader';
import React from 'react'
import MenuHeader from '@/components/MenuHeader';
import Banner from '@/components/Banner';
import BannerHome from '@/pages/home/BannerHome';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className='flex flex-col min-h-screen items-center'>
      <div className='w-full'>
        <TopHeader/>
        <MainHeader/>
      </div>
      <div className='w-full'>
        <BannerHome/>
      </div>
      <main className='w-full flex-wrap'>
        <Outlet/>
      </main>
    </div>
  );
};

export default HomeLayout
