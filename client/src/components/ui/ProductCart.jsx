import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const hasPrice =
    (item.originalPrice && item.originalPrice > 0) ||
    (item.salePrice && item.salePrice > 0);

  const renderPrice = () => {
    if (hasPrice) {
      return (
        <div className="flex flex-col gap-1">
          {item.originalPrice > 0 && item.salePrice > 0 && item.salePrice < item.originalPrice ? (
            <>
              <span className="text-sm text-gray-500 line-through">
                {item.originalPrice.toLocaleString("vi-VN")}₫
              </span>
              <span className="text-base font-bold text-red-600">
                {item.salePrice.toLocaleString("vi-VN")}₫
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-red-600">
              {(item.salePrice || item.originalPrice).toLocaleString("vi-VN")}₫
            </span>
          )}
        </div>
      );
    } else {
      return (
        <a
          href="tel:(+84 4) 3852 3643"
          className="text-base font-bold text-red-600 hover:underline"
        >
          Liên hệ
        </a>
      );
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${item._id}`} className="block w-full">
        <figure className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={item.productPics?.[0] || "/placeholder.jpg"}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </figure>

        <div className="flex flex-col gap-1 p-4">
          <h2 className="line-clamp-2 text-base font-semibold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">
            {item.title}
          </h2>
          <p className="text-xs text-gray-500">
            Thương hiệu:{" "}
            <span className="font-medium">{item.brand || "Đang cập nhật"}</span>
          </p>
          <p className="text-xs text-gray-500">
            Xuất xứ:{" "}
            <span className="font-medium">{item.origin || "Đang cập nhật"}</span>
          </p>
        </div>
      </Link>

      <div className="mt-auto flex items-center justify-between px-4 pb-4 text-sm">
        {renderPrice()}
        <Link
          to={`/products/${item._id}`}
          className="rounded-full bg-orange-400 px-4 py-1.5 text-xs font-medium text-black shadow-md transition-all duration-300 hover:bg-orange-600 hover:text-white"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
