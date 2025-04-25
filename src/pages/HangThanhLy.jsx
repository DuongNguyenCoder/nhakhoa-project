import React, { useEffect, useState } from "react";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import ProductCard from "@/components/ui/ProductCart";
import Pagination from "@/components/ui/Pagination";

const LiquidationPage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="space-y-6 my-5 bg-white px-2.5 py-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 uppercase">Hàng thanh lý</h1>
        <p className="text-gray-600 mt-2">
          Sản phẩm thanh lý với mức giá siêu hấp dẫn, số lượng có hạn!
        </p>
      </div>

      <div className="w-full px-5 md:px-0 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không có sản phẩm nào trong danh mục này.
          </p>
        )}
      </div>
    </div>
  );
};

export default LiquidationPage;
