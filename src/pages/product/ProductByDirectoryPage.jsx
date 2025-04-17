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
  const [products, setProducts] = useState([]);
  console.log("directoryId: ", directoryId);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
      <h1 className="text-lg font-bold text-red-900">sản phẩm</h1>
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
