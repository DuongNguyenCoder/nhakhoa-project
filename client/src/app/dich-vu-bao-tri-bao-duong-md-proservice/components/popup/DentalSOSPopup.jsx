import {
  AlertTriangle,
  Phone,
  MessageCircle,
  ArrowBigUpDash,
  X,
} from "lucide-react";
import Image from "next/image";

export const revalidate = 3600;

export default function DentalSOSPopup({ open = true, onClose }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-black/55
        backdrop-blur-[3px]

        flex items-center justify-center
        p-3 sm:p-4

        animate-in fade-in duration-300
      "
      onClick={onClose}
    >
      {/* Popup */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-250

          max-h-[92vh]
          overflow-hidden

          rounded-[24px] xl:rounded-[28px]
          border border-[#EFE7E7]
          bg-white

          shadow-[0_25px_80px_rgba(0,0,0,0.28)]
          font-['SVN-Avenir_Next',sans-serif]
        "
      >
        {/* close */}
        {/* <button
          onClick={onClose}
          className="
            absolute top-3 right-3 z-50

            w-10 h-10
            rounded-full

            bg-white/95
            backdrop-blur-md

            border border-[#E9E9E9]

            flex items-center justify-center

            text-[#666]
            hover:text-[#B71C1C]
            hover:border-[#B71C1C]

            transition
          "
        >
          <X size={18} />
        </button> */}

        {/* Scroll container */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[1.05fr_0.95fr]

            max-h-[92vh]
            overflow-y-auto
          "
        >
          {/* LEFT IMAGE */}
          <div className="relative bg-[#F4F4F4] aspect-[4/5] h-full">
            <Image
              src="/assets/image-popup-proservice.png"
              alt="Dental clinic"
              fill
              className="object-cover object-center"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-black/15 to-transparent" />

            {/* MOBILE STATUS */}
            <div
              className="
                absolute top-3 right-3 z-30

                inline-flex items-center gap-2

                rounded-full
                border border-[#E8ECEF]

                bg-white/96
                backdrop-blur-md

                px-2.5 py-1.5

                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              "
            >
              <span className="relative flex">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E] opacity-75" />

                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
              </span>

              <span className="text-[10px] sm:text-[11px] font-semibold text-[#1F7A3D] whitespace-nowrap">
                Kỹ thuật viên đang online
              </span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div
            className="
              flex flex-col justify-between

              p-4
              sm:p-5
              lg:p-6
              xl:p-10
            "
          >
            <div>
              {/* HEADER */}
              <div className="flex items-start justify-between gap-3 xl:gap-4 mb-4 xl:mb-6">
                <div className="flex flex-col gap-4 w-full">
                  {/* desktop status */}
                  <div
                    className="
                      hidden
                      items-center gap-2
                      w-fit

                      rounded-full
                      border border-[#D9F3E4]

                      bg-[#F6FFFA]

                      px-4 py-2
                    "
                  >
                    <span className="relative flex">
                      <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E] opacity-75" />

                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
                    </span>

                    <span className="text-[13px] font-semibold text-[#1F7A3D]">
                      Kỹ thuật viên đang online
                    </span>
                  </div>

                  {/* mobile button */}
                  <div className="lg:hidden flex flex-col items-center text-center">
                    <button
                      onClick={onClose}
                      className="
                        group
                        inline-flex flex-col items-center

                        rounded-2xl
                        border border-[#F0E4E4]
                        bg-[#FFF8F8]

                        px-4 py-3

                        shadow-sm

                        hover:border-[#B71C1C]
                        hover:shadow-md

                        transition-all duration-300
                      "
                    >
                      <div
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.12em]
                          text-[#999]
                          font-bold
                          mb-1.5
                        "
                      >
                        Xem thêm
                      </div>

                      <div
                        className="
                          text-[13px]
                          leading-[1.45]
                          font-bold
                          text-[#1A1A1A]
                          group-hover:text-[#B71C1C]
                          transition-colors
                        "
                      >
                        Chi tiết dịch vụ
                        <br />
                        MD&nbsp;PROSERVICE
                      </div>
                    </button>

                    <div className="mt-1.5 animate-bounce text-[#B71C1C]">
                      <ArrowBigUpDash size={28} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* heading */}
                  <div className="hidden lg:flex items-center gap-3">
                    <div
                      className="
                        shrink-0

                        w-12 h-12
                        sm:w-14 sm:h-14

                        rounded-2xl
                        bg-[#FFF1F1]

                        flex items-center justify-center
                      "
                    >
                      <AlertTriangle size={26} className="text-[#B71C1C]" />
                    </div>

                    <h2
                      className="
                        text-[24px]
                        sm:text-[30px]
                        lg:text-[34px]
                        xl:text-[38px]

                        leading-[1.05]
                        tracking-[-0.04em]

                        font-bold
                        text-[#B71C1C]
                        uppercase
                      "
                    >
                      THIẾT BỊ ĐANG GẶP&nbsp;SỰ&nbsp;CỐ?
                    </h2>
                  </div>
                </div>
              </div>

              {/* description */}
              <div className="hidden lg:block">
                <p
                  className="
                  text-[14px]
                  sm:text-[15px]

                  leading-[1.7]
                  text-[#444]

                  mb-4 xl:mb-6
                "
                >
                  DỊCH VỤ BẢO TRÌ - BẢO DƯỠNG THIẾT BỊ PHÒNG KHÁM NHA KHOA
                </p>

                {/* bullet */}
                <div className="space-y-2.5 mb-5 xl:mb-8">
                  {[
                    "Đội ngũ kỹ thuật viên dày dặn kinh nghiệm",
                    "Có mặt trong vòng 24h (Cam kết chất lượng dịch vụ)",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        className="
                        mt-[7px]
                        w-2 h-2
                        rounded-full
                        bg-[#B71C1C]
                        shrink-0
                      "
                      />

                      <span
                        className="
                        text-[13px]
                        sm:text-[14px]

                        leading-[1.6]
                        font-medium
                        text-[#222]
                      "
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                {/* SOS */}
                <button
                  className="
                    group
                    rounded-2xl

                    bg-gradient-to-br
                    from-[#E53935]
                    to-[#B71C1C]

                    text-white
                    p-4 xl:p-5

                    hover:scale-[1.02]
                    transition-all duration-300
                  "
                >
                  <a
                    href="tel:0913783696"
                    className="flex flex-col items-center text-center"
                  >
                    <Phone
                      size={26}
                      className="mb-2.5 group-hover:rotate-12 transition"
                    />

                    <div className="text-[18px] sm:text-[20px] font-bold uppercase leading-none">
                      GỌI SOS
                    </div>

                    <div className="text-[16px] sm:text-[18px] font-bold uppercase">
                      KỸ THUẬT
                    </div>

                    <div className="mt-1 text-[12px] text-white/85">
                      Hotline giờ hành&nbsp;chính <br />
                      (8:00 - 17:30)
                    </div>
                  </a>
                </button>

                {/* zalo */}
                <button
                  className="
                    group
                    rounded-2xl

                    bg-gradient-to-br
                    from-[#2563EB]
                    to-[#1447D7]

                    text-white
                    p-4 xl:p-5

                    hover:scale-[1.02]
                    transition-all duration-300
                  "
                >
                  <a
                    href="https://zalo.me/0913783696"
                    target="_blank"
                    className="flex flex-col items-center text-center"
                  >
                    <MessageCircle
                      size={26}
                      className="mb-2.5 group-hover:scale-110 transition"
                    />

                    <div className="text-[18px] sm:text-[20px] font-bold uppercase leading-none">
                      ZALO
                    </div>

                    <div className="text-[16px] sm:text-[18px] font-bold uppercase">
                      KỸ THUẬT
                    </div>

                    <div className="mt-1.5 text-[11px] text-white/85">
                      Chat ngay trên Zalo
                    </div>
                  </a>
                </button>
              </div>
            </div>

            {/* HOTLINE */}
            <div
              className="
                sticky bottom-0
                bg-white

                pt-3
                mt-4

                border-t border-[#F3ECEC]

                xl:static
                xl:border-none
                xl:pt-0
              "
            >
              <button
                className="
                  relative
                  overflow-hidden

                  w-full

                  rounded-2xl
                  border-2 border-[#F1CACA]

                  bg-[#FFFDFD]

                  py-3.5
                  px-4 sm:px-5

                  hover:border-[#E24B4A]

                  transition-all duration-300
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F5] to-transparent opacity-70" />

                <a
                  href="tel:0913219800"
                  className="relative flex items-center justify-center gap-3"
                >
                  <div
                    className="
                      w-11 h-11
                      sm:w-12 sm:h-12

                      rounded-full
                      bg-[#FFF1F1]

                      flex items-center justify-center
                      shrink-0
                    "
                  >
                    <Phone size={24} className="text-[#B71C1C]" />
                  </div>

                  <div className="text-left">
                    <div
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.06em]
                        font-bold
                        text-[#717070]
                        mb-1
                      "
                    >
                      Hotline hỗ trợ sau giờ hành&nbsp;chính <br /> (17:30 -
                      23:00)
                    </div>

                    <div
                      className="
                        text-[22px]
                        sm:text-[28px]
                        xl:text-[38px]

                        leading-none
                        tracking-[-0.04em]
                        font-bold
                        text-[#B71C1C]
                      "
                    >
                      0913219800
                    </div>
                  </div>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
