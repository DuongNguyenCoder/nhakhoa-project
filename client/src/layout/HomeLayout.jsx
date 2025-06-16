import ProductListBar from '@/components/ui/ProductListBar';
import MainHeader from '@/components/MainHeader';
import TopHeader from '@/components/TopHeader';
import React from 'react'
import MenuHeader from '@/components/MenuHeader';
import Banner from '@/components/Banner';
import BannerHome from '@/pages/home/BannerHome';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import SupportWidget from '@/components/SupportWidget';

const HomeLayout = () => {
  return (
    <div className='flex flex-col min-h-screen items-center bg-gray-100'>
      <div className='w-full'>
        <TopHeader/>
        <MainHeader/>
      </div>
      <div className='w-full h-auto md:mb-3'>
        <BannerHome/>
      </div>
      <main className='w-full flex-wrap px-3 lg:px-6 xl:px-9 2xl:px-12 mx-auto'>
        <Outlet/>
      </main>
      <div className='w-full mt-20'>
      <Footer/>
      </div>
      <SupportWidget/>
    </div>
  );
};

export default HomeLayout
