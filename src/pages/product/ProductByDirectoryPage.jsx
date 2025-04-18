import { apiGetAllProduct } from "@/apis/ProductAPI";
import ProductCard from "@/components/ui/ProductCart";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "@/components/ui/Pagination";

const useQuery = () => {
  const {search} = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const ProductByDirectoryPage = () => {
  const query = useQuery();
  const directoryId = query.get("directory");
  const directoryTitle = query.get("title") || "Sản phẩm";
  const [products, setProducts] = useState([]);
  console.log("directoryId: ", directoryId);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [directoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await apiGetAllProduct({ directory: directoryId, page: currentPage });
      console.log("Get ALL PRODUCT BY DIRECTORY: ", res);
      if (res?.data?.data) {
        setProducts(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    };
    fetchProducts();
  }, [directoryId, currentPage]);

  return (
    <div className="w-full">
      <div className="w-full border-b border-b-blue-300 uppercase tracking-wider mb-4">
      <h1 className="text-xl font-bold text-blue-600 shadow-lg">{directoryTitle}</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} item={product} />
        ))}
      </div>
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}/>
      </div>
    </div>
  );
};

export default ProductByDirectoryPage;
