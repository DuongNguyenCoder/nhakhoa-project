import { Input, Select } from '@headlessui/react';
import React, { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import _ from 'lodash'; // dùng debounce
import { apiGetDirectory } from '@/apis/DirectoryAPI';
import { apiGetAllProduct } from '@/apis/ProductAPI';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ variant = 'desktop' }) => {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [directories, setDirectories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
  const dropdownRef = useRef();
  const isMobile = variant === 'mobile';

  // Fetch danh mục
  useEffect(() => {
    apiGetDirectory()
      .then((res) => {
        if (res.data?.success) {
          setDirectories(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  // Debounced search
  const debouncedSearch = useRef(_.debounce((text) => {
    if (!text.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    apiGetAllProduct({ search: text, limit: 5 }) // chỉ lấy 5 kết quả
      .then((res) => {
        if (res.data?.success) {
          setSearchResults(res.data.data || []);
          setShowDropdown(true);
        }
      })
      .catch(console.error);
  }, 500)).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    console.log(`Searching "${query}" in category "${category}"`);
    // xử lý logic tìm kiếm ở đây
  };

  return (
    <div
      className={clsx('items-center', {
        'hidden xl:w-auto lg:block': !isMobile,
        'block w-full fixed top-0 left-0 z-50 bg-red-700 px-4 py-2': isMobile,
      })}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div
          className={clsx('flex items-center relative', {
            'h-9 lg:w-[350px] xl:w-96': !isMobile,
            'w-full h-9': isMobile,
          })}
          ref={dropdownRef}
        >
          <div id="search_box_category" className="relative flex w-[35%] h-full items-center gap-x-2">
            <Select
              value={category}
              onChange={(val) => setCategory(val)}
              className={clsx(
                'w-full appearance-none h-full border border-gray-400 bg-red-300 lg:bg-gray-200 px-4 py-2 text-sm text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                '*:text-black'
              )}
            >
              <option value="all">Tất cả</option>
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id}>{dir.title}</option>
              ))}
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute right-2 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
          <div className="flex relative items-center w-[65%]">
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 placeholder:text-gray-800 px-4 py-2 bg-red-300 lg:bg-gray-200 text-sm focus:outline-none border border-gray-400 h-full"
            />
            <MagnifyingGlassIcon className="size-5 text-black absolute right-0 mr-2" />

            {/* Dropdown kết quả */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full z-50 mt-1 bg-white border border-gray-300 shadow-md max-h-60 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery(product.title);
                      setShowDropdown(false);
                      navigate(`/products/${product._id}`)
                    }}
                  >
                    {product.productPics && (
                      <img src={product.productPics[0]} alt={product.title} className="w-10 h-10 object-cover rounded" />
                    )}
                    <span className="text-sm text-gray-700">{product.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
