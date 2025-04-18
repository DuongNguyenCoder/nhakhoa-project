import React from 'react'
import logo from '../assets/logo.svg'
import CartShopping from './ui/CartShopping';
import SearchBar from './ui/SearchBar';
import SearchButton from './buttons/SearchButton';
import SubHeader from './SubHeader';
import MenuHeader from './MenuHeader';

const MainHeader = () => {
  return (
    <div className='relative bg-gray-100 w-full items-center h-36 md:h-72 lg:h-[300px] xl:h-72'>
      <div className='flex flex-col h-full'>
        <div className='items-center justify-between h-28 lg:h-full xl:h-[135px] flex px-1 md:px-3 py-1'>
          <div className='border-none px-2'>
            <a href='#' className='flex items-center gap-x-1.5'>
              <img 
                src={logo}
                alt='logo'
                className='h-[70px] lg:h-[100px]'
              />
              <span className='font-semibold text-xl italic tracking-wide'>Đối Tác Tin Cậy Của Nha Sĩ</span>
            </a>
          </div>
          <SearchBar/>
          <div className='flex'>
            <SearchButton/>
            <CartShopping />
          </div>
        </div>
        <SubHeader/>
        <MenuHeader />
        </div>
    </div>
  );
};

export default MainHeader
