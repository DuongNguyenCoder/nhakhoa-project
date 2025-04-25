import { apiGetAllProduct } from "@/apis/ProductAPI";
import SideBar from "@/components/SideBar";
import ProductCard from "@/components/ui/ProductCart";
import ProductSlider from "@/components/ui/ProductSlider";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Pagination from "@/components/ui/Pagination";
import { CubeIcon } from "@heroicons/react/24/solid";
import { debounce } from "lodash";

const Products = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null); // tạo ref

  const getAPIProduct = async (page = 1, search = "") => {
    const response = await apiGetAllProduct({ page, search });
    setDataProduct(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
  };

  useEffect(() => {
    getAPIProduct(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  // debounce tìm kiếm
  const debounceSearch = useCallback(
    debounce((value) => {
      setCurrentPage(1); // reset về page 1
      setSearchQuery(value);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    debounceSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
    if (inputRef.current) {
      inputRef.current.value = ""; // xóa nội dung input
    }
  };

  return (
    <div id="product-list" className="flex w-full flex-col gap-6 bg-white shadow-xl rounded-2xl py-2">
      <div className="w-full px-3 2xl:pl-10">
        <div className="w-full mb-4 flex gap-1.5 items-center mt-1.5">
          <CubeIcon className="size-7 text-yellow-400" />
          <h1 className="text-lg font-bold text-red-900">SẢN PHẨM</h1>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <input
           ref={inputRef}
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full sm:max-w-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="text-sm text-red-600 hover:underline"
            >
              Xoá tìm kiếm
            </button>
          )}
        </div>

        {/* Kết quả tìm kiếm */}
        {searchQuery && (
          <p className="text-sm text-gray-500 mb-2">
            Kết quả cho "<span className="font-semibold">{searchQuery}</span>"
          </p>
        )}

        {/* Danh sách sản phẩm */}
        <div className="w-full px-5 md:px-0 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {dataProduct.map((product) => (
            <ProductCard key={product._id || product.index} item={product} />
          ))}
        </div>

        <div className="w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
