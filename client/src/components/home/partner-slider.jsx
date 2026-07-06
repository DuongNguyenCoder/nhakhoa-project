"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const logos = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  src: `/partners/${i + 1}.png`,
}));

const firstRow = logos.slice(0, 8);
const secondRow = logos.slice(8);

function LogoSlide({ src }) {
  return (
    <div className="flex h-28 items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 transition-all duration-300 hover:shadow-md">
      <div className="relative h-20 w-full">
        <Image src={src} alt="Partner Logo" fill className="object-contain" />
      </div>
    </div>
  );
}

export default function PartnerSlider() {
  return (
    <section className="w-full rounded-3xl bg-white">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-xl font-bold uppercase tracking-wide text-[#9c1d22] md:text-2xl lg:text-3xl">
          Đối tác của chúng tôi
        </h2>

        <div className="mx-auto mt-2 h-[3px] w-20 rounded-full bg-[#9c1d22]" />

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-500 md:text-base">
          Minh Dental hợp tác chặt chẽ với nhiều đơn vị cung cấp trang thiết bị
          nha khoa đến từ các thương hiệu uy tín trên thế giới nhằm mang đến
          những sản phẩm chất lượng và ổn định cho khách hàng.
        </p>
      </div>

      {/* Logo nổi bật */}
      <div className="flex justify-center py-10">
        <div className="flex h-36 w-[340px] items-center justify-center rounded-3xl border border-[#9c1d22]/15 bg-gradient-to-br from-white to-red-50 shadow-lg">
          <div className="relative h-24 w-60">
            <Image
              src="/partners/cingol.png"
              alt="Cingol"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Slide 1 */}
      <Swiper
        modules={[Autoplay]}
        loop
        speed={7000}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {firstRow.map((logo) => (
          <SwiperSlide key={logo.id}>
            <LogoSlide src={logo.src} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide 2 */}
      <div className="mt-5">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={7000}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {secondRow.map((logo) => (
            <SwiperSlide key={logo.id}>
              <LogoSlide src={logo.src} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
