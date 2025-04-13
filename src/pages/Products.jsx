import { apiGetAllProduct } from "@/apis/ProductAPI";
import SideBar from "@/components/SideBar";
import ProductCard from "@/components/ui/ProductCart";
import ProductSlider from "@/components/ui/ProductSlider";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getAPIProduct = async () => {
      const response = await apiGetAllProduct({ page: currentPage });
      console.log("FULL RESPONSE PRODUCT", response);
      setDataProduct(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    };
    getAPIProduct();
  }, [currentPage]);

  return (
    <div id="product-list" className="flex w-full flex-col gap-6">
      {dataProduct.some((p) => p.isFeatured) && (
        <div className="w-full">
          <ProductSlider products={dataProduct} />
        </div>
      )}
      <div className="w-full lg:flex ">
        <div className="w-full px-3 2xl:pl-10">
          <h1 className="text-lg font-bold text-red-900">SẢN PHẨM</h1>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
            {dataProduct.map((product) => (
              <ProductCard key={product.index} item={product} />
            ))}
          </div>
          <div id="pagination" className="w-full">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`rounded px-3 py-1 ${
                  index + 1 === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full px-2 lg:w-[30%] mt-7">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Products;
