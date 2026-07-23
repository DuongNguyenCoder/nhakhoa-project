"use client";

import { apiGetAllProduct } from "@/apis/ProductAPI";
import ProductCard from "@/components/ui/ProductCart";
import { useEffect, useState } from "react";
import PaginationCustom from "@/components/ui/pagination-custom";

const ProductByCategoryPage = ({ category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const categoryId = category._id;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await apiGetAllProduct({
        category: categoryId,
        page: currentPage,
        limit: 3,
      });
      console.log("res product by category => ", res);
      if (res?.data?.data) {
        setProducts(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      } else {
        console.log("Lỗi rồi con ơi!");
      }
    };
    fetchProducts();
  }, [categoryId, currentPage]);

  if (!categoryId) {
    return (
      <div className="w-full rounded-2xl bg-white px-4 py-6 shadow-xl 2xl:px-10">
        <div className="w-full uppercase tracking-wider mb-6 ">
          <h1 className="text-lg text-center font-bold uppercase text-[#9c1d22] md:text-xl lg:text-2xl">
            Phân mục sản phẩm không tồn tại
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white px-4 py-6 shadow-xl 2xl:px-10">
      <div className="w-full uppercase tracking-wider mb-8 ">
        <h1 className="text-lg text-center font-bold uppercase text-[#9c1d22] md:text-xl lg:text-2xl">
          {category.title}
        </h1>

        <div className="mx-auto mt-2 h-[1.5px] w-[95%] rounded-full bg-[#9c1d22]" />
      </div>
      <div className="w-full px-5 md:px-0 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} item={product} />
        ))}
      </div>
      <div className="w-full mt-8">
        <PaginationCustom
          page={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductByCategoryPage;
