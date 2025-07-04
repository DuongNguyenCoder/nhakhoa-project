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
          {item.originalPrice > 0 &&
          item.salePrice > 0 &&
          item.salePrice < item.originalPrice ? (
            <>
            <div className="flex gap-1 text-sm items-center">
              <p>Giá gốc:</p>
              <span className=" text-gray-600 line-through">
                {item.originalPrice.toLocaleString("vi-VN")}₫
              </span>
              </div>
              <span className="text-base text-center font-bold text-red-600">
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
        <div className="flex items-center text-base gap-1">
          <p className="font-medium">Giá:</p>
        <a
          href="tel:(+84 4) 3852 3643"
          className="font-bold text-red-600 hover:underline"
        >
          Liên hệ
        </a>
        </div>
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
            <span className="font-medium">
              {item.origin || "Đang cập nhật"}
            </span>
          </p>
        </div>
      </Link>

      <div className="mt-auto flex flex-col items-center gap-3 px-4 pb-4 text-sm">
  {renderPrice()}
  <Link
    to={`/products/${item._id}`}
    className="w-full max-w-[200px] rounded-full bg-orange-400 px-4 py-2 text-xs font-medium text-black shadow-md transition-all duration-300 hover:bg-orange-600 hover:text-white text-center"
  >
    Xem chi tiết
  </Link>
</div>

    </div>
  );
};

export default ProductCard;
