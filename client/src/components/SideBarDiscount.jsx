import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { apiGetAllProduct } from "@/apis/ProductAPI";

const SideBarDiscount = () => {
  const [discountProducts, setDiscountProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await apiGetAllProduct({ isLiquidation: true });
      setDiscountProducts(res.data.data || []);
    };
    fetchProducts();
  }, []);

  const renderPrice = (product) => {
    const hasPrice =
      (product.originalPrice && product.originalPrice > 0) ||
      (product.salePrice && product.salePrice > 0);

    if (hasPrice) {
      return (
        <div className="flex flex-col items-center">
          {product.originalPrice > 0 &&
          product.salePrice > 0 &&
          product.salePrice < product.originalPrice ? (
            <>
              <div className="flex gap-1 text-sm items-center">
              <p>Giá gốc:</p>
              <span className=" text-base text-gray-700 line-through">
                {product.originalPrice.toLocaleString("vi-VN")}₫
              </span>
              </div>
              <span className="text-[17.5px] text-center font-bold mt-0.5 text-red-600">
                {product.salePrice.toLocaleString("vi-VN")}₫
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-red-600">
              {(product.salePrice || product.originalPrice).toLocaleString("vi-VN")}₫
            </span>
          )}
        </div>
      );
    }
    return (
      <span className="mt-1 text-red-600 font-bold text-sm underline">
        Giá: liên hệ
      </span>
    );
  };

  return (
    <div className="mt-6 flex w-full flex-col rounded-lg bg-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex h-10 w-full items-center justify-center rounded-t-lg bg-red-600">
        <h2 className="text-center text-sm font-bold tracking-wide text-white">
          HÀNG KHUYẾN MÃI
        </h2>
      </div>

      {/* Content */}
      <div className="w-full py-3">
        <Swiper
          key={discountProducts.length}
          direction="vertical"
          slidesPerView={4}
          spaceBetween={12}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="h-[1020px] w-[95%] p-2 lg:h-[1500px]"
        >
          {discountProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                to={`/products/${product._id}`}
                className="group relative flex lg:flex h-64 w-full lg:flex-col items-center overflow-hidden rounded-md bg-white p-3 shadow transition hover:shadow-md hover:ring-2 hover:ring-red-400 lg:h-[360px]"
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 opacity-0 transition duration-300 group-hover:opacity-100 text-white font-semibold text-sm">
                  Xem ngay
                </div>

                {/* Image */}
                <img
                  src={product.productPics?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  className="h-40 w-40 rounded object-cover transition-transform duration-300 group-hover:scale-105 lg:h-44 lg:w-44"
                />

                {/* Info */}
                <div className="mt-2 flex w-full flex-col items-center text-center">
                  <span className="mb-1 line-clamp-2 font-semibold text-gray-800 text-base">
                    {product.title}
                  </span>
                  <span className="text-xs text-gray-500 lg:text-sm">
                    Thương hiệu:{" "}
                    <span className="font-medium">{product.brand || "Đang cập nhật"}</span>
                  </span>
                  <span className="text-xs text-gray-500 lg:text-sm">
                    Xuất xứ:{" "}
                    <span className="font-medium">{product.origin || "Đang cập nhật"}</span>
                  </span>
                  <div className="mt-1">{renderPrice(product)}</div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SideBarDiscount;