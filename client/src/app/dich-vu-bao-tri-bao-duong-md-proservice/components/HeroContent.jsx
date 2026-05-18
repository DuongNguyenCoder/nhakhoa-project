import React from "react";

// --- Nút Liên hệ Refactor theo Tone Đỏ #B71C1C ---
function ButtonOnDark({ className, state = "Default" }) {
  const isHover = state === "Hover";
  return (
    <button
      className={
        className ||
        `relative rounded-full transition-all duration-300 ${isHover ? "bg-[#8e1616] scale-105" : "bg-[#B71C1C]"}`
      }
    >
      <div className="flex flex-row items-center justify-center size-full px-8 py-4">
        <p className="font-['SVN-Avenir_Next',sans-serif] font-bold leading-none relative shrink-0 text-[14px] uppercase text-white tracking-wider whitespace-nowrap">
          Kết nối với chuyên gia ngay
        </p>
      </div>
    </button>
  );
}

// --- Phần Text & 2 Ô nổi bật (USP Cards) ---
function HeroContent() {
  return (
    <div className="flex flex-col gap-8 items-start w-full font-['SVN-Avenir_Next',sans-serif]">
      {/* Title block */}
      <div className="flex flex-col gap-3 max-w-[820px] uppercase">
        {/* Label */}
        <span
          className="
      text-[12px] md:text-[13px]
      font-semibold tracking-[0.12em]
      text-gray-500
    "
        >
          Dịch vụ chuyên sâu cho phòng khám nha khoa
        </span>

        {/* Headline */}
        <h1
          className="
      relative
      font-bold
      text-[32px] md:text-[56px] xl:text-[64px]
      leading-[1.15]
      tracking-[-1.5px]
      text-[#1A1A1A]
      pr-10 md:pr-16   
    "
        >
          {/* Icon góc phải của headline */}
          <img
            src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzWsqT99we3JyfCqv5NB7j284cWod6tTwULOPZ" // đổi path icon
            alt="accent"
            className="
        absolute
        right-0 top-0
        w-13 h-13 md:w-14 md:h-14 xl:w-14 xl:h-15
        object-contain
        opacity-90
        pointer-events-none
      "
          />
          Bảo trì & bảo dưỡng thiết&nbsp;bị
          <br />
          <span className="relative inline-block text-[#B71C1C]">
            nha&nbsp;khoa chuyên&nbsp;nghiệp
            {/* underline accent */}
            <span
              className="
          absolute left-0 bottom-1
          w-full h-[6px]
          bg-[#B71C1C]/20
          rounded
          -z-10
        "
            />
          </span>
        </h1>
      </div>

      {/* USP Cards */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Card 1 */}
        <div className="relative flex-1 bg-[#F8F9FA] border-l-4 border-[#B71C1C] p-5 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
          <img
            src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzkrROyiSCqOdapIF8KWEbv2en3ZUg5y7B1u6Q"
            alt="tick"
            className="absolute -top-2.5 right-0 w-8 h-8 object-contain opacity-90"
          />

          <p className="font-bold text-[#1A1A1A] text-[18px] leading-tight">
            GIÁ TRẢI NGHIỆM <br />
            <span className="text-gray-400 line-through text-[18px] mr-2">
              799K
            </span>
            <span className="text-[#B71C1C] text-[26px]">499K</span>
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative flex-1 bg-[#F8F9FA] border-l-4 border-[#B71C1C] p-5 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
          <img
            src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7Edzg8bg5SXO94L1zj6xSAaVBkbT0Hv3hewKfsgQ"
            alt="notice"
            className="absolute -top-2.5 right-0 w-8 h-8 object-contain opacity-90"
          />

          <p className="font-bold text-[#1A1A1A] text-[18px] leading-tight">
            Miễn phí di chuyển nội thành Hà Nội <br />
            <span className="text-[#455A64] text-[15px] font-medium">
              (bán kính 10km từ trụ sở công ty)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Main Block ---
export default function MainHeroContent() {
  return (
    <div
      className="content-stretch flex flex-col gap-12 items-start relative w-full"
      data-name="Hero Block"
    >
      <HeroContent />
      {/* <ButtonOnDark className="bg-[#B71C1C] relative rounded-full shrink-0 shadow-lg shadow-[#b71c1c]/20" /> */}
    </div>
  );
}
