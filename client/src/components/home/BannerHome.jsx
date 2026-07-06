"use client";

import { apiGetBanner } from "@/apis/BannerAPI";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const BannerHome = () => {
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
  const enabledBanners = useMemo(() => {
    return dataBanner.filter((banner) => banner.status === "ENABLE");
  }, [dataBanner]);
  return (
    <div className="w-full">
      <div className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] shadow-lg xl:h-[580px] relative">
        <Swiper
          key={enabledBanners.length}
          modules={[Autoplay, Navigation, Pagination]}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className="w-full h-full rounded-b-lg overflow-hidden"
        >
          {enabledBanners.map((banner) => (
            <SwiperSlide key={banner._id}>
              <Link
                href={banner.url || "#"}
                className="relative block h-full w-full overflow-hidden"
              >
                <Image
                  src={banner.bannerPic}
                  alt={`Banner ${banner._id}`}
                  fill
                  className="transition-transform object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerHome;
