import React, { useEffect, useState, useRef } from "react";
import { Input, Select } from "@headlessui/react";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import _ from "lodash";
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ variant = "desktop" }) => {
  const [selectDirectory, setSelectDirectory] = useState("");
  const [query, setQuery] = useState("");
  const [directories, setDirectories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const isMobile = variant === "mobile";

  // Lấy danh sách danh mục khi load lần đầu
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
  const debouncedSearch = useRef(
    _.debounce((text) => {
      if (!text.trim()) {
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
    }, 400)
  ).current;

  // Tự động tìm kiếm khi query thay đổi
  useEffect(() => {
    debouncedSearch(query);
    if (query.trim() && isFocused) {
      setShowDropdown(true);
    }
  }, [query, debouncedSearch, isFocused]);

  // Đóng dropdown nếu click ngoài
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
      className={clsx(
        "items-center z-[999]",
        !isMobile && "hidden lg:block xl:w-auto",
        isMobile && "fixed inset-x-0 top-0 w-full rounded-b-lg bg-red-700 px-4 py-2"
      )}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <div
          ref={dropdownRef}
          className={clsx("relative flex items-center", {
            "h-9 lg:w-[350px] xl:w-96": !isMobile,
            "h-9 w-full": isMobile,
          })}
        >
          {/* Select danh mục */}
          <div className="relative flex h-full w-[35%] items-center gap-x-2">
            <Select
              value={selectDirectory}
              onChange={(e) => setSelectDirectory(e.target.value)}
              aria-label="Chọn danh mục sản phẩm"
              className={clsx(
                "h-full w-full border border-gray-400 bg-red-300 px-4 py-2 text-sm text-gray-900 lg:bg-gray-200",
                "appearance-none truncate focus:outline-none *:text-black"
              )}
            >
              <option value="">Tất cả</option>
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id}>
                  {dir.title}
                </option>
              ))}
            </Select>
            <ChevronDownIcon className="pointer-events-none absolute right-2 size-4 fill-white/60" />
          </div>

          {/* Input tìm kiếm */}
          <div className="relative flex w-[65%] items-center">
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="h-full w-full flex-1 border border-gray-400 bg-red-300 px-4 py-2 text-sm placeholder:text-gray-800 focus:outline-none lg:bg-gray-200"
            />
            <MagnifyingGlassIcon className="absolute right-2 size-5 text-black" />

            {/* Dropdown kết quả */}
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
                    {product.productPics?.[0] && (
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
