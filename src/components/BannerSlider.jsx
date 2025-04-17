import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiGetBanner } from "@/apis/BannerAPI";



const BannerSlider = () => {
    const [dataBanner, setDataBanner] = useState([]);
    useEffect(() => {
        const getDataBanner = async () => {
          const res = await apiGetBanner();
          console.log("API GET BANNERSLIDER: ", res.data.data);
          setDataBanner(res.data.data);
        };
        getDataBanner();
      }, []);
  return (
    <div className="w-full h-full relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full my-swiper"
      >
        {dataBanner.map((banner) => (
          <SwiperSlide key={banner._id}>
            <img
              src={banner.bannerPic}
              alt={`Banner ${banner._id}`}
              className="w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
