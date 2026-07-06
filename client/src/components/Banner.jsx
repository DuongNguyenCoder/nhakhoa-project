import React, { useEffect, useState } from "react";
import { apiGetBanner } from "../apis/BannerAPI";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const [dataBanner, setDataBanner] = useState([]);
  useEffect(() => {
    const getDataBanner = async () => {
      const res = await apiGetBanner();
      console.log("API GET BANNERSLIDER: ", res);
      if (res.data.success) {
        setDataBanner(res.data.data);
      } else {
        console.log("Lỗi lấy Banner!");
      }
    };
    getDataBanner();
  }, []);
  return (
    <div className="w-full h-[450px] flex gap-3">
      <Swiper
        key={dataBanner.length}
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // Không tắt autoplay khi user tương tác
          pauseOnMouseEnter: true, // Không dừng khi hover
        }}
        pagination={{ clickable: true }}
        className="xl:w-[75%] w-full h-[400px] my-swiper xl:mt-2.5"
      >
        {dataBanner
          .filter((p) => p.status === "ENABLE")
          .map((banner) => (
            <SwiperSlide key={banner._id}>
              <img
                src={banner.bannerPic}
                alt={`Banner ${banner._id}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* <div className='xl:w-[75%] w-full h-full'>
        <BannerSlider/>
      </div> */}
      <div className="w-[25%] hidden xl:grid h-[450px] xl:grid-rows-3 gap-2">
        {dataBanner
          .filter((p) => p.status === "ENABLE")
          .slice(0, 3)
          .map((item, index) => (
            <div key={index} className="rounded-md mx-2">
              <img
                src={item.bannerPic}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Banner;
