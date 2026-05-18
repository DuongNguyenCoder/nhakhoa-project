"use client";

import { ArrowRight, Check, Minus } from "lucide-react";
import { useRef, useState } from "react";
import { ACCENT_MAP, PACKAGES } from "./data";

export default function SectionMaintenancePackage() {
  const scrollRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.84;

    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        py-12 
        font-['SVN-Avenir_Next',sans-serif]
      "
    >
      {/* ───────────────── HEADER ──────────────── */}
      <div className="mb-8 md:mb-10">
        {/* badge */}
        <div
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-[#F5D4D4]
            bg-[#FFF5F5]
            px-4 py-2
            mb-5
          "
        >
          <span
            className="
              w-2 h-2
              rounded-full
              bg-[#E24B4A]
            "
          />

          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.12em]
              font-bold
              text-[#B71C1C]
            "
          >
            Bảng giá MD PROSERVICE
          </span>
        </div>

        {/* title */}
        <h2
          className="
            text-[30px] md:text-[48px]
            leading-[1.05]
            tracking-[-0.05em]
            font-black
            text-[#111]
            uppercase
            max-w-225
          "
        >
          Gói bảo trì thiết bị
          <span className="text-[#B71C1C]"> phòng khám nha&nbsp;khoa</span>
        </h2>

        <p
          className="
            mt-4
            max-w-190

            text-[15px] md:text-[16px]
            leading-[1.9]
            text-[#666]
          "
        >
          Thiết kế theo mô hình dịch vụ định kỳ MD CARE+ giúp phòng khám giảm
          thiểu rủi ro hỏng hóc, tối ưu chi phí sửa chữa và duy trì hiệu suất
          thiết bị ổn định lâu dài.
        </p>
        {/* <div
          className="
              text-[13px]
              text-[#888]
              leading-[1.7]
            "
        >
          Áp dụng nội thành Hà Nội
          <br />
          (Bán kính 10–15km)
        </div> */}
      </div>

      {/* ───────────────── SLIDE ──────────────── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
          flex gap-5
          overflow-x-auto
          snap-x snap-mandatory
          pb-4

          md:grid md:grid-cols-2
          lg:grid-cols-4
          md:overflow-visible

          scrollbar-none
          [&::-webkit-scrollbar]:hidden
        "
      >
        {PACKAGES.map((pkg, index) => {
          const accent = ACCENT_MAP[pkg.accent];

          return (
            <div
              key={pkg.id}
              className={`
                relative
                shrink-0
                snap-center

                w-[88vw]
                sm:w-105
                md:w-auto

                rounded-4xl
                border

                bg-white

                overflow-hidden

                transition-all duration-300

                ${
                  pkg.popular
                    ? "border-[#B45309] shadow-[0_25px_70px_rgba(180,83,9,0.12)]"
                    : "border-[#EEE7E7] shadow-[0_14px_40px_rgba(0,0,0,0.04)]"
                }
              `}
            >
              {/* glow */}
              <div
                className={`
                  absolute
                  top-0 right-0
                  w-[240px] h-[240px]
                  blur-3xl
                  rounded-full
                  opacity-60

                  ${accent.glow}
                `}
              />

              {/* body */}
              <div className="relative p-6 md:p-7">
                {/* top */}
                <div className="mb-7 flex flex-col items-center">
                  {/* badge */}
                  <div
                    className={`
                      inline-flex flex-col
                      rounded-2xl
                      border
                      px-4 py-3
                      mb-5
                      
                      ${accent.badge}
                    `}
                  >
                    <span
                      className="
                        text-[22px]
                        font-black
                        tracking-[-0.04em]
                        leading-none
                      "
                    >
                      {pkg.name}
                    </span>

                    <span
                      className="
                        mt-1
                        text-[12px]
                        font-semibold
                      "
                    >
                      {pkg.sub}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3 font-['SVN-Avenir_Next',sans-serif]">
                    {/* old price */}
                    <div
                      className="
                      text-[18px]
                      font-medium
                      text-[#57585b]
                      line-through
                      
                      mb-1
                      tracking-[0.02em]
                    "
                    >
                      {pkg.oldPrice}.000
                    </div>

                    {/* price */}
                    <div
                      className="
                      flex items-end gap-1
                      leading-none
                    "
                    >
                      <span
                        className="
                        text-[32px]
                        font-medium   
                        text-[#111]
                        
                      "
                      >
                        {pkg.price}.000
                      </span>
                      <span
                        className="
                        text-[32px]
                        font-medium
                        text-[#111]
                      "
                      >
                        ₫
                      </span>
                    </div>
                  </div>

                  {/* sub */}
                  <div
                    className="
                      mt-2
                      text-[14px]
                      font-medium
                      text-[#666]
                      text-center
                    "
                  >
                    / 1 lần / 1 ghế
                  </div>

                  {/* saving */}
                  <div
                    className="
                      mt-4
                      flex flex-col items-start justify-center gap-1
                      h-[65px]
                      rounded-md
                      border border-[#D7F1DF]
                      bg-[#F3FFF7]

                      px-3 py-2
                    "
                  >
                    {/* <ShieldCheck size={15} className="text-[#16A34A]" /> */}

                    <span
                      className="
                        text-[12px]
                        font-bold
                        text-[#15803D]
                      "
                    >
                      {pkg.savingText}
                    </span>
                    <span
                      className="
                        text-[12px]
                        font-bold
                        text-[#15803D]
                      "
                    >
                      {index === 0 &&
                        `Chương trình áp dụng từ: 05/05/2026 - 31/08/2026`}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="w-full flex items-center justify-center">
                  <button
                    className={`
                    w-44

                    rounded-2xl

                    py-2.5 px-5

                    flex items-center justify-center gap-2

                    text-[13px]
                    font-bold

                    transition-all duration-300

                    bg-[#334155] hover:bg-[#1E293B] text-white
                  `}
                  >
                    Nhận chiết khấu
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* divider */}
                <div
                  className="
                    h-px
                    bg-[#F1ECEC]
                    my-7
                  "
                />

                {/* quantity */}
                <div
                  className="
                    flex items-center justify-center
                    gap-3
                    mb-5 py-2 px-3 bg-gray-100 rounded-full
                  "
                >
                  <span
                    className="
                    font-['SVN-Avenir_Next',sans-serif]
                      text-[12px]
                      
                      font-bold
                      text-[#2f2d2d]
                    "
                  >
                    Quy mô phòng khám
                    <span
                      className="
                    "
                    >
                      {" "}
                      ({pkg.quantity})
                    </span>
                  </span>
                </div>

                {/* feature list */}
                <div className="flex flex-col gap-4">
                  {pkg.features.yes.map((feature) => (
                    <div
                      key={feature}
                      className="
                        flex items-center justify-start gap-3
                      "
                    >
                      <div
                        className="
                          shrink-0

                          w-7 h-7
                          rounded-xl

                          bg-[#F3FFF7]
                          border border-[#D8F3E2]

                          flex items-center justify-center
                        "
                      >
                        <Check size={15} className="text-[#16A34A]" />
                      </div>

                      <p
                        className="
                          text-[14px]
                          leading-[1.7]
                          text-[#444]
                        "
                      >
                        {feature}
                      </p>
                    </div>
                  ))}
                  {pkg?.features?.no &&
                    pkg?.features?.no.map((feature) => (
                      <div
                        key={feature}
                        className="
                        flex items-center justify-start gap-3
                      "
                      >
                        <div
                          className="
                          shrink-0

                          w-7 h-7
                          rounded-xl

                          bg-[#fff3f4]
                          border border-[#f3d8d9]

                          flex items-center justify-center
                        "
                        >
                          <Minus size={15} className="text-[#a3161d]" />
                        </div>

                        <p
                          className="
                          text-[14px]
                          leading-[1.7]
                          text-[#444]
                        "
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div
        className="
            md:hidden

            flex items-center justify-center
            gap-2

            mt-5
          "
      >
        {PACKAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!scrollRef.current) return;

              const cardWidth = scrollRef.current.clientWidth * 0.84;

              scrollRef.current.scrollTo({
                left: cardWidth * index,
                behavior: "smooth",
              });
            }}
            className={`
                rounded-full
                transition-all duration-300

                ${
                  activeIndex === index
                    ? "w-8 h-2 bg-[#B71C1C]"
                    : "w-2 h-2 bg-[#D9D9D9]"
                }
              `}
          />
        ))}
      </div>

      {/* ───────────────── NOTE ──────────────── */}
      <div
        className="
          mt-8

          rounded-3xl

          border border-[#F5D3D3]
          bg-[#FFF6F6]

          px-5 md:px-7
          py-5
        "
      >
        <div
          className="
            flex items-start gap-3
          "
        >
          <div
            className="
              shrink-0

              w-10 h-10
              rounded-2xl

              bg-[#B71C1C]

              flex items-center justify-center

              text-white
              font-black
            "
          >
            !
          </div>

          <div>
            <div
              className="
                text-[14px]
                font-black
                uppercase
                tracking-[0.04em]
                text-[#B71C1C]
                mb-2
              "
            >
              Lưu ý chung
            </div>

            <p
              className="
                text-[14px] md:text-[15px]
                leading-[1.8]
                text-[#5B4545]
              "
            >
              - Giá dịch vụ chưa bao gồm VAT và chi phí lắp đặt linh kiện thay
              thế. <br />- Chính sách hỗ trợ áp dụng trong phạm vi nội thành Hà
              Nội (bán kính 10–15km).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
