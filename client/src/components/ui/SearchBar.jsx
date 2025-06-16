import { Input, Select } from "@headlessui/react";
import React, { useEffect, useState, useRef } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import _ from "lodash"; // Dùng debounce
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ variant = "desktop" }) => {
  const [selectDirectory, setSelectDirectory] = useState("");
  const [query, setQuery] = useState("");
  const [directories, setDirectories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const isMobile = variant === "mobile";
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    apiGetDirectory()
      .then((res) => {
        if (res.data?.success) {
          setDirectories(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  const debouncedSearch = useRef(
    _.debounce((text) => {
      if (text === "") {
        setSearchResults([]);
        return;
      }
      apiGetAllProduct({ search: text, limit: 10 })
        .then((res) => {
          if (res.data?.success) {
            setSearchResults(res.data.data || []);
            setShowDropdown(true);
          }
        })
        .catch(console.error);
    }, 500),
  ).current;

  useEffect(() => {
    debouncedSearch(query);
    if (query.trim() && isFocused) {
      setShowDropdown(true);
    }
  }, [query, debouncedSearch, isFocused]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={clsx("items-center", {
        "hidden lg:block xl:w-auto": !isMobile,
        "left-0 top-0 z-50 block w-full rounded-b-lg bg-red-700 px-4 py-2":
          isMobile,
        fixed: isMobile && !isFocused, // chỉ cố định khi chưa focus
        absolute: isMobile && isFocused, // khi focus thì bỏ cố định
      })}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div
          className={clsx("relative flex items-center", {
            "h-9 lg:w-[350px] xl:w-96": !isMobile,
            "h-9 w-full": isMobile,
          })}
          ref={dropdownRef}
        >
          <div
            id="search_box_category"
            className="relative flex h-full w-[35%] items-center gap-x-2"
          >
            <Select
              value={selectDirectory}
              onChange={(e) => setSelectDirectory(e.target.value)}
              className={clsx(
                "h-full w-full appearance-none overflow-hidden text-ellipsis whitespace-nowrap border border-gray-400 bg-red-300 px-4 py-2 text-sm text-gray-900 lg:bg-gray-200",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                "*:text-black",
              )}
            >
              <option value="">Tất cả</option>
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id}>
                  {dir.title}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute right-2 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
          <div className="relative flex w-[65%] items-center">
            <Input
              type="text"
              onFocus={() => setIsFocused(true)}
              placeholder="Tìm kiếm sản phẩm..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-full flex-1 border border-gray-400 bg-red-300 px-4 py-2 text-sm placeholder:text-gray-800 focus:outline-none lg:bg-gray-200"
            />
            <MagnifyingGlassIcon className="absolute right-0 mr-2 size-5 text-black" />
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto border border-gray-300 bg-white shadow-md">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setQuery(product.title);
                      setShowDropdown(false);
                      navigate(`/products/${product._id}`);
                    }}
                  >
                    {product.productPics && (
                      <img
                        src={product.productPics[0]}
                        alt={product.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                    )}
                    <span className="text-sm text-gray-700">
                      {product.title}
                    </span>
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
