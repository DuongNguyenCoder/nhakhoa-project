import React from 'react'
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { motion } from 'motion/react';
import SearchBar from '../ui/SearchBar';

const SearchButton = () => {
  return (
    <div className='h-auto px-5 w-auto lg:hidden'>
        <Menu>
            <MenuButton>
                <MagnifyingGlassIcon 
                    className='size-6 text-black'
                />
            </MenuButton>
            <MenuItems>
                <motion.div
                    initial={{ opacity: 0, y: '-100%' }}  // Bắt đầu từ vị trí ngoài màn hình
                    animate={{ opacity: 1, y: 0 }}         // Sau khi mở sẽ trượt xuống vị trí bình thường
                    exit={{ opacity: 0, y: '-100%' }}      // Khi đóng thì sẽ trượt lên
                    transition={{ duration: 0.5 }}         // Thời gian hiệu ứng
                    className="absolute top-0 left-0 w-full z-50 bg-red-600 shadow-lg" // Đảm bảo thanh tìm kiếm được căn trên màn hình
                >
                    <SearchBar variant="mobile" />
                </motion.div>
            </MenuItems>
        </Menu>
    </div>
  );
};

export default SearchButton
