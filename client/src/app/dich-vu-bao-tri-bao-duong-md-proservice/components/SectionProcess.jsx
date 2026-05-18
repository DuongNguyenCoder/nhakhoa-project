import React from "react";
import { STEPS } from "./data";

export default function Section5Process() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white font-['SVN-Avenir_Next',sans-serif]">
      {/* Heading */}
      <div className="text-center mb-14 md:mb-16">
        <h2 className="text-[28px] md:text-[42px] font-extrabold text-gray-900 leading-[1.2] tracking-[-1px]">
          <span className="text-[#E24B4A] relative inline-block">
            Quy trình xử lý minh&nbsp;bạch
            <span className="absolute left-0 -bottom-1.5 w-full h-1 bg-[#E24B4A]/25 rounded-full" />
          </span>
        </h2>

        <p className="text-gray-500 mt-5 text-[14px] md:text-[16px] leading-relaxed max-w-2xl mx-auto">
          Mọi vấn đề đều được xử lý rõ ràng, có thứ tự ưu tiên và minh bạch với
          khách&nbsp;hàng
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Main Vertical Line */}
        <div className="absolute left-3.5 top-0 bottom-0 w-[2px] bg-[#EFE7E7] md:left-1/2 md:-translate-x-1/2" />

        {/* Timeline Intro */}
        <div className="relative mb-12 md:mb-16">
          <div className="ml-12 md:ml-0 md:max-w-[720px] md:mx-auto">
            <div className="bg-linear-to-br from-[#FFF8F8] to-white border border-[#F4DFDF] rounded-2xl px-6 py-6 md:px-8 md:py-7 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEBEB] text-[#B93838] text-[11px] md:text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                Quy trình sau kiểm tra
              </div>

              <h3 className="text-[22px] md:text-[30px] leading-[1.3] font-bold text-[#1A1A1A] uppercase tracking-[-0.5px]">
                Sau khi kiểm tra xong toàn bộ các thiết bị
              </h3>

              <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-[#666]">
                Toàn bộ tình trạng thiết bị sẽ được ghi nhận, đánh giá và phản
                hồi minh bạch cho phòng khám theo từng mức độ ưu tiên xử lý.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col gap-10 md:gap-14">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={`
                relative flex flex-col md:flex-row items-start
                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
              `}
            >
              {/* Dot */}
              <div className="absolute left-1.25 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-[#E24B4A] border-4 border-white shadow-md z-10" />

              {/* Card */}
              <div className="ml-12 md:ml-0 md:w-1/2">
                <div
                  className="
                    relative
                    bg-white
                    border border-[#ECE6E6]
                    rounded-2xl
                    p-5 md:p-7
                    shadow-sm
                    hover:shadow-md
                    transition-all
                  "
                >
                  {/* Step badge */}
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#FCEBEB] text-[#B93838] text-[13px] font-extrabold mb-4">
                    {index + 1}
                  </div>

                  {/* Title */}
                  <h3 className="text-[17px] md:text-[21px] font-bold text-[#1A1A1A] leading-[1.4] mb-3">
                    {step.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-[13px] md:text-[15px] text-[#666] leading-[1.8]">
                    {step.desc}
                  </p>

                  {/* Highlight box */}
                  {step.highlight && (
                    <div
                      className={`
                        mt-5
                        rounded-xl
                        border
                        p-4
                        text-[13px] md:text-[14px]
                        leading-[1.7]
                        ${
                          index === 2
                            ? "bg-[#FFF7E7] border-[#F3D89C] text-[#8A6410]"
                            : "bg-[#FFF5F5] border-[#F6D6D6] text-[#A32D2D]"
                        }
                      `}
                    >
                      <span className="font-bold">{step.highlight}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Alert box */}
      <div className="relative mt-16 border border-[#E24B4A] bg-[#FCEBEB] rounded-2xl p-5 md:p-6">
        <img
          src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzWantlwe3JyfCqv5NB7j284cWod6tTwULOPZK"
          alt="free icon"
          style={{
            position: "absolute",
            top: -15,
            right: -5,
            width: 56,
            height: 44,
            objectFit: "contain",
            opacity: 0.95,
            pointerEvents: "none",
            rotate: "-45deg",
          }}
        />
        <div className="text-[#A32D2D] font-bold text-[12px] md:text-[13px] mb-3 uppercase tracking-[0.12em]">
          Lưu ý quan trọng
        </div>

        <ul className="text-[13px] md:text-[14px] text-[#6b2b2b] leading-[1.9] space-y-2">
          <li>
            • Mọi vấn đề đều được trao đổi và thống nhất với khách hàng trước
            khi xử lý
          </li>

          <li>
            • Sau bảo trì, mọi phản hồi sẽ được tiếp nhận và phản hồi nhanh
            chóng
          </li>
        </ul>
      </div>
    </section>
  );
}
