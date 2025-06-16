import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

const ProductSlider = ({ products = [], title = 'Sản phẩm' }) => {
  return (
    <div className="relative z-10 w-full">
      {/* Title */}
      {title && (
        <h2 className="text-lg md:text-xl font-bold mb-4 pb-2 border-b-2 border-red-400 pl-2 text-red-700 shadow-sm">
          {title}
        </h2>
      )}

      {/* Swiper */}
      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        loop
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
              className="group block bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 hover:bg-red-50 h-[350px] md:h-[380px] xl:h-[400px]"
            >
              {/* Image */}
              <div className="relative w-full h-48 md:h-52 xl:h-56 overflow-hidden">
                <img
                  src={item.productPics?.[0]}
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow">
                    XEM NGAY
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col justify-between h-[calc(100%-12rem)]">
                <div>
                  <h3 className="text-gray-800 font-semibold text-sm md:text-base line-clamp-2 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-snug">
                    Thương hiệu: {item.brand || 'Đang cập nhật'}
                  </p>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Xuất xứ: {item.origin || 'Đang cập nhật'}
                  </p>
                </div>
                <p className="text-red-700 font-bold text-base mb-2.5 xl:mb-8 text-end">Liên Hệ</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
