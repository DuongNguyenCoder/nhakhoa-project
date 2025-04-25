import { apiGetAllProduct } from "@/apis/ProductAPI";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "@/components/ui/ProductCart";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const ProductByCategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const query = useQuery();
  const categoryTitle = query.get("title") || "Sản phẩm";
  const categoryId = query.get("category");
  const [products, setProducts] = useState([]);

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await apiGetAllProduct({
        category: categoryId,
        page: currentPage,
      });
      if (res?.data?.data) {
        setProducts(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      } else {
        console.log("Lỗi rồi con ơi!");
      }
    };
    fetchProducts();
  }, [categoryId, currentPage]);

  return (
    <div className="w-full">
      <div className="w-full border-b border-b-blue-300 uppercase tracking-wider mb-4">
      <h1 className="text-xl font-bold text-blue-600 shadow-lg">{categoryTitle}</h1>
      </div>
      <div className="w-full px-5 md:px-0 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} item={product} />
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
  );
};

export default ProductByCategoryPage;