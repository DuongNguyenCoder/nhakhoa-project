import { apiGetAllProduct } from "@/apis/ProductAPI";
import SideBar from "@/components/SideBar";
import ProductCard from "@/components/ui/ProductCart";
import ProductSlider from "@/components/ui/ProductSlider";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Pagination from "@/components/ui/Pagination";
import { CubeIcon } from "@heroicons/react/24/solid";
import { debounce } from "lodash";
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/pageTitle";

const Products = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataDirectory, setDataDirectory] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null); // tạo ref

  const getAPIProduct = async (page = 1, search = "") => {
    const response = await apiGetAllProduct({ page, search });
    console.log("response Product: ", response);
    setDataProduct(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
  };

  useEffect(() => {
    const fetchDirectory = async () => {
      await apiGetDirectory()
        .then((res) => {
          if (res.data?.success) {
            setDataDirectory(res.data.data);
          } else {
            console.log("Lỗi get directory!");
          }
        })
        .catch((err) => {
          console.error("Lỗi: ", err);
        });
    };
    fetchDirectory();
  }, []);

  useEffect(() => {
    getAPIProduct(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  // debounce tìm kiếm
  const debounceSearch = useCallback(
    debounce((value) => {
      setCurrentPage(1); // reset về page 1
      setSearchQuery(value);
    }, 500),
    [],
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
    <div className="space-y-8">
      {/* Hiển thị Directory */}
      <div
        id="directory-list"
        className="bg-white shadow-xl rounded-2xl py-6 px-4 2xl:px-10"
      >
        <div className="w-full flex gap-2 items-center">
          <CubeIcon className="size-7 text-yellow-400" />
          <h1 className="text-lg font-bold text-red-700 uppercase">
            Các Dòng sản phẩm
          </h1>
        </div>

        {/* Hiển thị các dòng sản phẩm */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 px-3">
          {dataDirectory.length > 0 ? (
            dataDirectory.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(
                    `/products/directory?directory=${item._id}&title=${encodeURIComponent(item.title)}`,
                  )
                }
                className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-gray-50"
              >
                <div className="w-full h-36 overflow-hidden">
                  <img
                    src={item.directoryPic}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-95 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Không có dòng sản phẩm nào!
            </p>
          )}
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div
        id="product-list"
        className="bg-white shadow-xl rounded-2xl py-6 px-4 2xl:px-10"
      >
        <PageTitle title="Sản Phẩm - Minh Dental" />
        <div className="w-full mb-4 flex gap-1.5 items-center mt-1.5">
          <CubeIcon className="size-7 text-yellow-400" />
          <h1 className="text-lg font-bold text-red-900">TẤT CẢ SẢN PHẨM</h1>
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
