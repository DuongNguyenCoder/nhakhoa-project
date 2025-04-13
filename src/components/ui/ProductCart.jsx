// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item, onAddToCart }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="w-full overflow-hidden bg-gray-100">
        <Link to={`/products/${item._id}`} className="block h-full w-full">
          <img
            src={item.productPics?.[0] || "/placeholder.jpg"}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            style={{
              height: '220px', // Giới hạn chiều cao của ảnh
              objectFit: 'cover', // Đảm bảo ảnh không bị méo
            }} />
        </Link>
      </figure>

      <div className="flex h-[120px] flex-col justify-between gap-2 p-4">
        <h2 className="line-clamp-2 text-base font-medium leading-5 text-gray-900">
          {item.title}
        </h2>
        <div className="flex items-center justify-between text-sm font-medium">
          <p className="px-0.5">
            Giá:
            <a
              href="tel:(+84 4) 3852 3643"
              className="font-bold text-orange-600 hover:underline"
            >
              {" "}
              liên hệ{" "}
            </a>
          </p>
          <button
            onClick={() => onAddToCart(item)}
            className="rounded-full bg-orange-400 px-0.5 py-1.5 text-sm text-black shadow-md transition-all duration-300 hover:bg-orange-600"
          >
            <h3>Thêm vào giỏ</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
