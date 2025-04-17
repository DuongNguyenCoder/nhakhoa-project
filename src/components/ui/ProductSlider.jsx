import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { Link } from 'react-router-dom';

const ProductSlider = ({ products = [], title = 'Sản phẩm'}) => {
  return (
    <div className="relative">
      {/* Title */}
      {title && (
        <h2 className="text-xl font-semibold mb-3 border-l-4 border-red-700 pl-2 text-red-700">
          {title}
        </h2>
      )}

      {/* Swiper */}
      <Swiper
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        loop={true}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}
        className="w-full"
      >
        {products.map((item) => (
          <SwiperSlide key={item._id}>
            <Link
              to={`/products/${item._id}`}
              className="block bg-white rounded-xl shadow-md border border-gray-200 p-3 h-[350px] hover:bg-orange-50"
            >
              <div className="relative group">
                <img
                  src={item.productPics?.[0]}
                  alt={item.title}
                  className="w-full h-40 md:h-44 lg:h-48 xl:h-52 object-cover transition-all duration-300 group-hover:scale-105"
                />
                {/* Hover "XEM NGAY" */}
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
                    XEM NGAY
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-2">
                <h3 className="text-gray-700 text-base font-medium md:font-semibold mt-1 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Thương hiệu: {item.brand || 'Chưa cập nhật'} <br />
                  Xuất xứ: {item.origin || 'Chưa cập nhật'}
                </p>
                <p className="text-red-700 font-bold mt-2">Liên hệ</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
