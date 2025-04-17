import { apiGetAllProduct } from "@/apis/ProductAPI";
import SideBar from "@/components/SideBar";
import ProductCard from "@/components/ui/ProductCart";
import ProductSlider from "@/components/ui/ProductSlider";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination"; 
import { CubeIcon } from "@heroicons/react/24/solid";
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
    <div id="product-list" className="flex w-full flex-col gap-6 bg-white rounded-2xl py-2">
      <div className="w-full ">
        <div className="w-full px-3 2xl:pl-10">
          <div className="w-full mb-4 flex gap-1.5 items-center mt-1.5">
          <CubeIcon className="size-7 text-yellow-400"/>
          <h1 className="text-lg font-bold text-red-900">SẢN PHẨM</h1>
          </div>
          <div className="w-full grid grid-cols-2 gap-5 lg:grid-cols-3">
            {dataProduct.map((product) => (
              <ProductCard key={product.index} item={product} />
            ))}
          </div>
          <div className="w-full">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
