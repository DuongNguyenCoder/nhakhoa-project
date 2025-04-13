import { Input, ListboxSelectedOption, Select } from '@headlessui/react';
import React, { useState } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import clsx from 'clsx'

const SearchBar = ({variant = 'desktop'}) => {
    const [category, setCategory] = useState('all')
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false); // trạng thái mở/đóng search bar trên mobile

    const handleSearch = () => {
    console.log(`Searching "${query}" in category "${category}"`)
        // xử lý logic tìm kiếm ở đây
    }

    const isMobile = variant === 'mobile'

  return (
    // <div className='items-center hidden lg:block'>
    <div className={clsx('items-center', {
        'hidden xl:w-auto lg:block': !isMobile,
        'block w-full fixed top-0 left-0 z-50 bg-red-700 px-4 py-2': isMobile,
      })}>
        {/* <form action="" method='get'> */}
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            {/* <div className='flex h-9 items-center lg:w-[350px]'> */}
            <div className={clsx('flex items-center', {
                'h-9 lg:w-[350px] xl:w-96': !isMobile,
                'w-full h-9': isMobile
            })}>
                <div id='search_box_category' className='relative flex w-[35%] h-full items-center gap-x-2'>
                    <Select
                        className={clsx(
                            'w-full appearance-none h-full border border-gray-400 bg-red-300 lg:bg-gray-200 px-4 py-2 text-sm text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            '*:text-black'
                          )}
                    >
                        <option value="active">Ghế nha khoa</option>
                        <option value="canceled">Tay khoan và các loại tay máy hỗ trợ khác</option>
                        <option value="canceled">Thiết bị phẫu thuật Implant</option>
                        <option value="canceled">Thiết bị hỗ trợ vận hành ghế nha khoa</option>
                        <option value="canceled">Thiết bị nội nha</option>
                        <option value="canceled">Hệ thống vô khuẩn</option>
                        <option value="canceled">Thiết bị điều trị phục hồi thẩm mỹ</option>
                        <option value="canceled">Thiết bị hình ảnh</option>
                        <option value="canceled">Thiết bị và vật tư hỗ trợ khác</option>
                    </Select>
                    <ChevronDownIcon 
                        className="group pointer-events-none absolute right-2 size-4 fill-white/60"
                        aria-hidden="true" 
                    />
                </div>
                <div className='flex relative items-center w-[65%]'>
                <Input
                     type="text"
                     placeholder="Tìm kiếm sản phẩm..."
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     className='flex-1 placeholder:text-gray-800 px-4 py-2 bg-red-300 lg:bg-gray-200 text-sm focus:outline-none border border-gray-400 h-full'
                />
                <MagnifyingGlassIcon
                    className='size-5 text-black absolute right-0 mr-2'
                />
                </div>
            </div>
        </form>

    </div>
  );
};

export default SearchBar
