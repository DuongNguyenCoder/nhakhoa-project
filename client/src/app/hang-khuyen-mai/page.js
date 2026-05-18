"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import React, { useEffect, useMemo, useState } from "react";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import ProductCard from "@/components/ui/ProductCart";
import Pagination from "@/components/ui/Pagination";
import PageTitle from "@/components/pageTitle";
import RouterLayout from "@/next/RouterLayout";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const fetchLiquidationProducts = async () => {
      const res = await apiGetAllProduct({ limit: 9999 });
      if (res?.data?.data) {
        const filtered = res.data.data.filter((p) => p.isLiquidation);
        setProducts(filtered);
      }
    };
    fetchLiquidationProducts();
  }, []);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / pageSize);
  return (
    <RouterLayout layout={DefaultLayout}>
      <>
        <PageTitle title="Hàng Khuyến Mãi - Minh Dental" />
        <div className="space-y-6 my-5 bg-white px-2.5 py-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 uppercase">
              Hàng Khuyến Mãi - Hot Sale
            </h1>
            <p className="text-gray-600 mt-2">
              Sản phẩm khuyến mãi với mức giá siêu hấp dẫn, số lượng có hạn!
            </p>
          </div>

          <div className="w-full px-5 md:px-0 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {products.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product._id} item={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Không có sản phẩm nào trong danh mục này.
              </p>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </>
    </RouterLayout>
  );
}
