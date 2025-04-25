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
    <div className="mt-6 flex w-full flex-col">
      <div className="flex h-10 w-full items-center justify-center bg-red-700">
        <h2 className="text-center text-sm font-bold text-white">
          HÀNG THANH LÝ & KHUYẾN MÃI
        </h2>
      </div>

      <div className="w-full bg-orange-200 py-2">
        <Swiper
        key={discountProducts.length}
          direction="vertical"
          slidesPerView={4}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="h-[850px] lg:h-[1260px] w-[95%] rounded-md p-1"
        >
          {discountProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                to={`/products/${product._id}`}
                className="relative w-full shadow-md group flex h-52 lg:h-[310px] items-center rounded-lg bg-white p-2.5 transition hover:bg-orange-50 hover:shadow-md lg:flex-col"
              >
                {/* Lớp overlay khi hover */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  Xem ngay
                </div>
                <img
                  src={product.productPics[0]}
                  alt={product.title}
                  className="h-36 w-36 lg:h-44 lg:w-48 rounded object-cover mr-8 lg:mr-0"
                />
                <div className="mt-2 flex w-full flex-col lg:justify-start">
                  <span className="mb-1.5 line-clamp-2 text-lg lg:text-base font-semibold lg:font-medium text-gray-800">
                    {product.title}
                  </span>
                  <span className="text-gray-700">Thương hiệu: {product.brand}</span>
                  <span className="text-gray-700">Xuất xứ: {product.origin}</span>
                  <span className="font-bold text-base text-red-600 lg:text-center mt-1 lg:mt-0.5 underline">Giá: liên hệ</span>
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
