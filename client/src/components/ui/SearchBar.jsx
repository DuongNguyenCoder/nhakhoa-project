"use client";

import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { apiGetDirectory } from "../../apis/DirectoryAPI";
import { apiGetAllProduct } from "../../apis/ProductAPI";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

const SearchBar = ({ variant = "desktop" }) => {
  const router = useRouter();
  const wrapperRef = useRef(null);

  const [directories, setDirectories] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isMobile = variant === "mobile";

  /* Fetch categories */
  useEffect(() => {
    let mounted = true;

    const fetchDirectories = async () => {
      try {
        const res = await apiGetDirectory();
        if (mounted && res?.data?.success) {
          setDirectories(res.data.data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDirectories();

    return () => {
      mounted = false;
    };
  }, []);

  /* Search debounce */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await apiGetAllProduct({
          search: query,
          directory: selectedDirectory || undefined,
          limit: 8,
        });

        if (res?.data?.success) {
          const items = res.data.data || [];
          setResults(items);
          setOpen(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query, selectedDirectory]);

  /* Outside click */
  useEffect(() => {
    const handleOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const handleSelectProduct = (product) => {
    setQuery(product.title);
    setOpen(false);
    router.push(`/san-pham/${product.slug}`);
  };

  return (
    <div
      className={clsx("relative w-full", isMobile ? "w-full" : "max-w-xl")}
      ref={wrapperRef}
    >
      {/* Search container */}
      <div className="flex h-14 overflow-hidden rounded-2xl border border-red-500/20 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        {/* Category */}
        <select
          value={selectedDirectory}
          onChange={(e) => setSelectedDirectory(e.target.value)}
          className="w-[140px] shrink-0 border-r border-gray-200 bg-transparent px-4 text-sm text-gray-700 outline-none"
        >
          <option value="">Tất cả</option>

          {directories.map((dir) => (
            <option key={dir._id} value={dir._id}>
              {dir.title}
            </option>
          ))}
        </select>

        {/* Search input */}
        <div className="relative flex flex-1 items-center">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, thiết bị..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setOpen(true)}
            className="h-full w-full bg-transparent px-4 pr-12 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />

          <button
            type="button"
            className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#9c1d22] text-white transition hover:opacity-90"
          >
            <MagnifyingGlassIcon className="size-5" />
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+10px)] z-60 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/85 backdrop-blur-xl shadow-xl">
          {loading ? (
            <div className="p-4 text-sm text-gray-500">Đang tìm kiếm...</div>
          ) : results.length > 0 ? (
            <div className="max-h-[420px] overflow-y-auto">
              {results.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    {product.productPics?.[0] && (
                      <Image
                        src={product.productPics[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <span className="line-clamp-2 text-sm font-medium text-gray-700">
                    {product.title}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-gray-500">
              Không tìm thấy sản phẩm phù hợp
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
