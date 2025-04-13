import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

const ProductSlider = ({ products }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-3 border-l-4 border-red-700 pl-2 text-red-700">
        Sản phẩm nổi bật
      </h2>

      {/* Slider */}
      <div className="relative">
        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4 px-2"
        >
          {products.map((item) => (
            <div
              key={item._id}
              className="w-[80%] sm:w-[48%] lg:w-[32%] flex-shrink-0"
            >
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-3 h-full">
                {/* Hover group */}
                <div className="relative group">
                  <img
                    src={item.productPics[0]}
                    alt={item.title}
                    className="w-full h-52 object-contain transition-all duration-300 group-hover:scale-105"
                  />
                  {/* "XEM NGAY" hover effect */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-600 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
                      XEM NGAY
                    </div>
                  </div>
                </div>

                {/* Product info */}
                <div className="mt-2">
                  <h3 className="text-gray-700 font-semibold mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Thương hiệu: {item.brand || 'chưa cập nhật'} <br />
                    Xuất xứ: {item.origin || 'chưa cập nhật'}
                  </p>
                  <p className="text-red-700 font-bold mt-2">Liên hệ</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều hướng */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 z-10"
          onClick={scrollLeft}
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 z-10"
          onClick={scrollRight}
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
