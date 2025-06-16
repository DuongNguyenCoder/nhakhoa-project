import { apiGetAllProduct } from "@/apis/ProductAPI";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ui/ProductCart";

const ProductBySlug = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDataProducts = async () => {
      const res = apiGetAllProduct({ slug });
      setProducts(res.data.data);
    };
    fetchDataProducts();
  }, [slug]);
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Kết quả cho: {slug.replaceAll("-", " ")}
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p._id} data={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductBySlug;
