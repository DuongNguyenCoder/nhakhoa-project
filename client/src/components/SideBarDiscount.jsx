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

  return (
    <div className="mt-6 flex w-full flex-col bg-gray-100 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex h-10 w-full items-center justify-center bg-red-600 rounded-t-lg">
        <h2 className="text-center text-sm font-bold text-white tracking-wide">
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
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="h-[850px] lg:h-[1260px] w-[95%] p-2"
        >
          {discountProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                to={`/products/${product._id}`}
                className="relative flex h-52 lg:h-[310px] w-full flex-col items-center overflow-hidden rounded-md bg-white p-3 shadow transition hover:shadow-md hover:ring-2 hover:ring-red-400"
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 opacity-0 transition duration-300 group-hover:opacity-100 text-white font-semibold text-sm">
                  Xem ngay
                </div>

                {/* Image */}
                <img
                  src={product.productPics[0]}
                  alt={product.title}
                  className="h-32 w-32 lg:h-40 lg:w-40 rounded object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Info */}
                <div className="mt-2 flex w-full flex-col items-center text-center">
                  <span className="mb-1 line-clamp-2 text-sm font-semibold text-gray-800 lg:text-base">
                    {product.title}
                  </span>
                  <span className="text-gray-500 text-xs lg:text-sm">
                    Thương hiệu: {product.brand}
                  </span>
                  <span className="text-gray-500 text-xs lg:text-sm">
                    Xuất xứ: {product.origin}
                  </span>
                  <span className="mt-1 text-red-600 font-bold text-sm underline">
                    Giá: liên hệ
                  </span>
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
