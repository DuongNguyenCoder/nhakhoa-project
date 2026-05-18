import { CircleCheckBig, Pin } from "lucide-react";
import React from "react";
import { STYLES, TABLE_DATA } from "./data";
import Image from "next/image";

const R = "#B71C1C";
const R_DARK = "#A32D2D";
const R_BG = "#FDF4F4";

export default function SectionMaintenance() {
  return (
    <section
      id="bao-tri"
      className="
        w-full
        bg-white
        py-12
        font-['SVN-Avenir_Next',sans-serif]
      "
    >
      <div className="max-w-295 mx-auto">
        {/* ───────────────── HEADER ──────────────── */}
        <div className="text-center mb-14 md:mb-20 bg-[linear-gradient(180deg,#FFF8F8_0%,#FFFFFF_100%)]">
          {/* label */}
          <div className="flex justify-center mb-5">
            <div
              className="
                px-5 md:px-7
                py-2.5
                rounded-full
                border border-[#E24B4A]/30
                bg-[#FFF8F8]
              "
            >
              <span
                className="
                  text-[11px] md:text-[12px]
                  font-bold
                  tracking-[0.16em]
                  uppercase
                  text-[#B71C1C]
                "
              >
                DỊCH VỤ BẢO TRÌ - BẢO DƯỠNG THIẾT&nbsp;BỊ PHÒNG&nbsp;KHÁM
                NHA&nbsp;KHOA
              </span>
            </div>
          </div>

          {/* title */}
          <div className="inline-flex flex-col items-center relative">
            <h2
              className="
                text-[32px]
                md:text-[52px]
                xl:text-[64px]
                leading-[1.15]
                tracking-[-2px]
                font-black
                uppercase
                text-[#1A1A1A]
              "
            >
              CÔNG VIỆC
              <br />
              <span className="relative inline-block text-[#B71C1C]">
                BẢO TRÌ
                {/* underline */}
                <span
                  className="
                    absolute
                    left-0
                    bottom-1
                    h-[8px]
                    w-full
                    bg-[#E24B4A]/15
                    rounded-full
                    -z-10
                  "
                />
              </span>
            </h2>
          </div>

          <p
            className="
              mt-6
              max-w-[760px]
              mx-auto
              text-[15px] md:text-[17px]
              leading-relaxed
              text-[#666]
            "
          >
            Quy trình bảo trì được xây dựng rõ ràng, minh bạch và cá nhân hoá
            cho từng phòng khám nhằm đảm bảo thiết bị luôn vận hành ổn định và
            an toàn.
          </p>
        </div>

        {/* ───────────────── FEATURE GRID ──────────────── */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            mb-16 md:mb-24
          "
        >
          {/* item */}
          <div
            className="
              rounded-3xl
              border border-[#F0EAEA]
              bg-[#FAFAFA]
              p-6 md:p-8
            "
          >
            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-[#FCEBEB]
                flex items-center justify-center
                mb-5
                text-[#B71C1C]
                text-xl
                font-black
              "
            >
              01
            </div>

            <h3
              className="
                text-[20px]
                font-bold
                text-[#1A1A1A]
                mb-3
                leading-snug
              "
            >
              Bảo trì định kỳ theo lịch cố định
            </h3>

            <p
              className="
                text-[15px]
                text-[#666]
                leading-relaxed
              "
            >
              Việc bảo trì được triển khai định kỳ theo lịch đã thống nhất nhằm
              đảm bảo thiết bị luôn trong trạng thái hoạt động ổn định.
            </p>
          </div>

          {/* item highlight */}
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border border-[#F4D8D8]
              bg-[#FFF8F8]
              p-6 md:p-8
            "
          >
            <div
              className="
                absolute
                right-0 top-0
                w-28 h-28
                bg-[#E24B4A]/5
                rounded-full
                blur-2xl
              "
            />

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-[#B71C1C]
                flex items-center justify-center
                mb-5
                text-white
                text-xl
                font-black
              "
            >
              02
            </div>

            <h3
              className="
                text-[20px]
                font-bold
                text-[#1A1A1A]
                mb-4
                leading-snug
              "
            >
              Lưu trữ{" "}
              <span className="text-[#B71C1C]">
                “Hồ sơ sức khoẻ thiết bị phòng khám”
              </span>
            </h3>

            <p
              className="
                text-[15px]
                text-[#666]
                leading-relaxed
              "
            >
              Minh Dental xây dựng hồ sơ riêng cho từng phòng khám sử dụng dịch
              vụ bảo trì - bảo dưỡng nhằm theo dõi lịch sử vận hành, tình trạng
              thiết bị và các cảnh báo kỹ thuật theo thời gian.
            </p>
          </div>

          {/* item highlight */}
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border border-[#F4D8D8]
              bg-[#FFF8F8]
              p-6 md:p-8
            "
          >
            <div
              className="
                absolute
                right-0 top-0
                w-28 h-28
                bg-[#E24B4A]/5
                rounded-full
                blur-2xl
              "
            />

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-[#B71C1C]
                flex items-center justify-center
                mb-5
                text-white
                text-xl
                font-black
              "
            >
              03
            </div>

            <h3
              className="
                text-[20px]
                font-bold
                text-[#1A1A1A]
                mb-4
                leading-snug
              "
            >
              Minh bạch với{" "}
              <span className="text-[#B71C1C]">“CHECKLIST 18 BƯỚC”</span> bảo
              trì dành cho ghế nha khoa
            </h3>

            <p
              className="
                text-[15px]
                text-[#666]
                leading-relaxed
              "
            >
              Toàn bộ quy trình kiểm tra và bảo trì ghế nha khoa được ghi nhận
              rõ ràng theo checklist tiêu chuẩn, giúp phòng khám dễ dàng theo
              dõi và kiểm soát.
            </p>
          </div>
        </div>

        {/* ───────────────── STEP TITLE ──────────────── */}
        <div className="mb-10 md:mb-14">
          <h2
            className="
              text-[28px]
              md:text-[42px]
              font-bold
              uppercase
              tracking-[-1px]
              text-[#1A1A1A]
              leading-tight
              mb-4
            "
          >
            Nội dung công việc bảo&nbsp;trì
            <br />
            <span className="text-[#B71C1C]">bao&nbsp;gồm</span>
          </h2>

          <div className="w-20 h-1.5 rounded-full bg-[#E24B4A]" />
        </div>

        {/* ───────────────── STEP TIMELINE ──────────────── */}
        <div
          className="
            relative
            flex
            flex-col
            gap-6
            mb-20
          "
        >
          <div
            className="
              hidden md:block
              absolute left-[27px] top-10 bottom-10
              w-[2px]
              bg-[#F0DADA]
            "
          />

          <div className="relative flex gap-5">
            <div
              className="
                relative z-10
                w-14 h-14
                rounded-2xl
                bg-[#B71C1C]
                text-white
                flex items-center justify-center
                text-lg font-black
                shrink-0
              "
            >
              01
            </div>

            <div
              className="
                flex-1
                rounded-3xl
                border border-[#EFE8E8]
                bg-white
                p-6 md:p-8
              "
            >
              <h3
                className="
                  text-[20px]
                  font-bold
                  text-[#1A1A1A]
                  mb-4
                  leading-snug
                "
              >
                Kiểm tra tổng thể toàn bộ thiết bị trong phòng khám
              </h3>

              <p
                className="
                  text-[15px]
                  leading-relaxed
                  text-[#666]
                "
              >
                Bao gồm: Ghế máy, máy nén khí, máy hút, nồi hấp, máy lấy cao,
                tay khoan nhanh/chậm, đèn tẩy trắng, máy nội nha, X-quang,
                sensor, máy hút dịch...
              </p>
            </div>
          </div>

          <div className="relative flex gap-5">
            <div
              className="
                relative z-10
                w-14 h-14
                rounded-2xl
                bg-[#1A1A1A]
                text-white
                flex items-center justify-center
                text-lg font-black
                shrink-0
              "
            >
              02
            </div>

            <div
              className="
                flex-1
                rounded-3xl
                border border-[#EFE8E8]
                bg-[#FAFAFA]
                p-6 md:p-8
              "
            >
              <h3
                className="
                  text-[20px]
                  font-bold
                  text-[#1A1A1A]
                  mb-4
                  leading-snug
                "
              >
                Đánh giá tình trạng thiết bị hiện tại
              </h3>

              <p
                className="
                  text-[15px]
                  leading-relaxed
                  text-[#666]
                "
              >
                Đánh giá chi tiết tình trạng hoạt động của thiết bị theo mức độ:
                hoạt động tốt, đang xuống cấp theo thang điểm 10 hoặc hỏng hóc
                cần xử lý gấp.
              </p>
            </div>
          </div>
        </div>

        {/* ───────────────── CHECKLIST SECTION NEW UX ──────────────── */}
        <div
          className="
    overflow-hidden
    rounded-4xl
    bg-white
    shadow-[0_20px_70px_rgba(0,0,0,0.04)]
  "
        >
          {/* ───────────────── HEADER ──────────────── */}
          <div
            className="
      relative overflow-hidden
      px-5 md:px-8 lg:px-10
      pt-7 md:pt-9
      pb-8 md:pb-10
      border-b border-[#F3ECEC]
      bg-[linear-gradient(180deg,#FFF8F8_0%,#FFFFFF_100%)]
    "
          >
            {/* glow */}
            <div
              className="
        absolute
        -top-15
        -right-10
        w-65 h-65
        rounded-full
        bg-[#B71C1C]/5
        blur-3xl
      "
            />

            <div className="relative">
              {/* TITLE */}
              <div className="max-w-[900px]">
                <div className="relative">
                  <div className="absolute top-0 right-0 w-20 md:w-24 xl:w-28 aspect-square rounded-full overflow-hidden">
                    <Image
                      src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzYYB69afSamfgHpvDNqn8zc5bUMohC3r9WITE"
                      alt="Logo Minh Dental"
                      fill
                      className="object-contain object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h2
                    className="
            text-[26px]
            md:text-[42px]
            leading-[1.05]
            tracking-[-0.05em]
            font-black
            uppercase
            text-[#1A1A1A]
          "
                  >
                    Quy trình
                    <br />
                    {/* highlight */}
                    <span
                      className="
              inline-flex items-center

              mt-2 mb-2

              rounded-[18px]
              border border-[#F1CACA]

              bg-[#B71C1C]
              px-4 md:px-5
              py-2 md:py-3

              text-white

              shadow-[0_10px_30px_rgba(183,28,28,0.18)]
            "
                    >
                      <span
                        className="
                text-[34px]
                md:text-[58px]
                leading-none
                tracking-[-0.06em]
              "
                      >
                        18
                      </span>

                      <span
                        className="
                ml-3
                text-[15px]
                md:text-[22px]
                tracking-[0.12em]
                font-bold
              "
                      >
                        BƯỚC
                      </span>
                    </span>
                    <br />
                    Bảo trì ghế nha&nbsp;khoa
                  </h2>
                </div>

                <p
                  className="
            mt-5
            max-w-[760px]

            text-[14px]
            md:text-[15px]

            leading-[1.9]
            text-[#666]
          "
                >
                  Quy trình kiểm tra được triển khai theo checklist kỹ thuật
                  chuyên sâu nhằm đảm bảo toàn bộ hệ thống ghế nha khoa vận hành
                  ổn định, an toàn và hạn chế tối đa các lỗi phát sinh trong quá
                  trình sử dụng.
                </p>
              </div>

              {/* ───────────────── OVERVIEW AREAS ──────────────── */}
              <div className="relative mt-9">
                {/* center */}
                <div
                  className="
            absolute
            left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            z-20

            w-[90px] h-[90px]
            md:w-[110px] md:h-[110px]

            rounded-full
            border border-[#EFE3E3]

            bg-white

            shadow-[0_15px_45px_rgba(0,0,0,0.08)]

            hidden sm:flex
            items-center justify-center
            text-center
          "
                >
                  <div>
                    <div
                      className="
                text-[11px]
                uppercase
                tracking-[0.16em]
                text-[#999]
                font-bold
              "
                    >
                      KHU
                    </div>

                    <div
                      className="
                text-[20px]
                md:text-[24px]
                leading-none
                font-black
                text-[#B71C1C]
              "
                    >
                      VỰC
                    </div>
                  </div>
                </div>

                {/* grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-5">
                  {STYLES.map((area) => (
                    <div
                      key={area.title}
                      className={`
                relative overflow-hidden

                rounded-[24px]
                border

                bg-gradient-to-br
                ${area.tone}

                px-4 md:px-6
                py-5 md:py-6

                min-h-[150px]

                transition-all duration-300
                hover:-translate-y-[2px]
              `}
                    >
                      {/* icon */}
                      <div
                        className={`
                  w-11 h-11 md:w-12 md:h-12
                  rounded-2xl
                  ${area.iconBg}

                  flex items-center justify-center

                  text-white
                  text-[18px]
                  font-bold

                  shadow-lg
                  mb-5
                `}
                      >
                        ✓
                      </div>

                      <div
                        className="
                  text-[11px]
                  uppercase
                  tracking-[0.12em]
                  text-[#999]
                  font-bold
                  mb-2
                "
                      >
                        Khu vực
                      </div>

                      <div
                        className="
                  text-[18px]
                  md:text-[24px]
                  leading-[1.2]
                  font-bold
                  text-[#1A1A1A]
                "
                      >
                        {area.title}
                      </div>

                      <div
                        className="
                  mt-3
                  text-[13px]
                  text-[#666]
                "
                      >
                        {area.total} kiểm tra chuyên sâu
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ───────────────── ACCORDION LIST ──────────────── */}
          <div className="p-4 md:p-6 lg:p-7">
            <div className="flex flex-col gap-5">
              {TABLE_DATA.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="
            overflow-hidden

            rounded-[28px]
            border border-[#EEE7E7]
            bg-white

            transition-all duration-300
            hover:border-[#E7D7D7]
            hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]
          "
                >
                  {/* ───────── TOP SECTION ───────── */}
                  <div
                    className="
              relative overflow-hidden

              border-b border-[#F5EEEE]

              bg-[linear-gradient(180deg,#FFFCFC_0%,#FFFFFF_100%)]

              px-5 md:px-7
              py-5 md:py-6
            "
                  >
                    {/* glow */}
                    <div
                      className="
                absolute
                right-0 top-0
                w-[140px] h-[140px]
                rounded-full
                bg-[#B71C1C]/[0.03]
                blur-3xl
              "
                    />

                    <div className="relative flex items-center gap-5">
                      {/* number */}
                      <div
                        className={` shrink-0

                  w-16 h-16
                  md:w-20 md:h-20

                  rounded-[22px]

                  ${STYLES[sectionIndex].iconBg}
                  flex items-center justify-center

                  text-white
                  text-[24px]
                  md:text-[30px]
                  font-black

                  shadow-[0_12px_30px_rgba(183,28,28,0.22)]`}
                      >
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </div>

                      {/* text */}
                      <div className="flex-1">
                        <div
                          className="
                    text-[11px]
                    uppercase
                    tracking-[0.14em]
                    font-bold
                    text-[#999]
                    mb-2
                  "
                        >
                          Khu vực kiểm tra
                        </div>

                        <h3
                          className="
                    text-[24px]
                    md:text-[34px]
                    leading-[1.15]
                    tracking-[-0.04em]
                    font-bold
                    text-[#1A1A1A]
                  "
                        >
                          {section.serviceArea}
                        </h3>

                        <div
                          className="
                    mt-3
                    text-[13px]
                    text-[#777]
                  "
                        >
                          {section.items.length} hạng mục kiểm tra kỹ thuật
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ───────── ACCORDION ITEMS ───────── */}
                  <div className="p-4 md:p-5 flex flex-col gap-4">
                    {section.items.map((item, idx) => (
                      <details
                        key={idx}
                        className="
                  group
                  overflow-hidden

                  rounded-[22px]
                  border border-[#F0EAEA]

                  bg-[#FFFEFE]

                  transition-all duration-300
                  open:border-[#E7D3D3]
                  open:bg-[#FFFDFD]
                "
                      >
                        <summary
                          className="
                    list-none
                    cursor-pointer

                    flex items-center justify-between
                    gap-4

                    px-5 py-5

                    hover:bg-[#FFF9F9]
                    transition-colors
                  "
                        >
                          <div className="flex items-center gap-4">
                            {/* dot */}
                            <div
                              className="
                        w-3 h-3
                        rounded-full
                        bg-[#E24B4A]
                        shrink-0
                      "
                            />

                            <div>
                              <div
                                className="
                          text-[17px]
                          md:text-[18px]
                          font-bold
                          text-[#1A1A1A]
                        "
                              >
                                {item.category}
                              </div>

                              <div
                                className="
                          mt-1
                          text-[12px]
                          uppercase
                          tracking-[0.08em]
                          text-[#999]
                          font-semibold
                        "
                              >
                                Nhấn để xem chi tiết kiểm tra
                              </div>
                            </div>
                          </div>

                          {/* icon */}
                          <div
                            className="
                      shrink-0

                      w-10 h-10
                      rounded-full

                      border border-[#EFE7E7]

                      flex items-center justify-center

                      text-[#B71C1C]

                      transition-transform duration-300
                      group-open:rotate-45
                    "
                          >
                            +
                          </div>
                        </summary>

                        {/* content */}
                        <div
                          className="
    border-t border-[#F5EEEE]
    px-5 md:px-6
    py-5 md:py-6

    grid grid-cols-1 lg:grid-cols-2
    gap-5
  "
                        >
                          {/* check content */}
                          <div
                            className="
      rounded-[20px]
      border border-[#F3ECEC]
      bg-[#FFFCFC]
      p-5
    "
                          >
                            <div
                              className="
        text-[11px]
        uppercase
        tracking-[0.12em]
        font-bold
        text-gray-700
        mb-4
      "
                            >
                              Nội dung kiểm tra
                            </div>

                            <div className="flex flex-col gap-3">
                              {item.checkContent.map((content, idx) => (
                                <div
                                  key={idx}
                                  className="
            flex items-center justify-start gap-3
          "
                                >
                                  <div
                                    className="
              mt-[2px]
              shrink-0

              w-8 h-8
              rounded-xl

              bg-[#FFF1F1]
              border border-[#F5D9D9]

              flex items-center justify-center
            "
                                  >
                                    <Pin
                                      size={15}
                                      className="text-[#B71C1C] shrink-0"
                                    />
                                  </div>

                                  <p
                                    className="
              text-[14px]
              md:text-[15px]
              leading-[1.8]
              text-[#333]
            "
                                  >
                                    {content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* requirement */}
                          <div
                            className="
      rounded-[20px]
      border border-[#E8F3EC]
      bg-[#FCFFFD]
      p-5
    "
                          >
                            <div
                              className="
        text-[11px]
        uppercase
        tracking-[0.12em]
        font-bold
        text-gray-700
        mb-4
      "
                            >
                              Yêu cầu kiểm tra
                            </div>

                            <div className="flex flex-col gap-3">
                              {item.requirement.map((requirement, idx) => (
                                <div
                                  key={idx}
                                  className="
            flex items-center justify-start gap-3
          "
                                >
                                  <div
                                    className="
              mt-[2px]
              shrink-0

              w-8 h-8
              rounded-xl

              bg-[#F3FFF7]
              border border-[#D8F3E2]

              flex items-center justify-center
            "
                                  >
                                    <CircleCheckBig
                                      size={16}
                                      className="text-[#16A34A]"
                                    />
                                  </div>

                                  <p
                                    className="
              text-[14px]
              md:text-[15px]
              leading-[1.8]
              text-[#475569]
            "
                                  >
                                    {requirement}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ───────────────── FOOT NOTE ──────────────── */}
        <div
          style={{
            border: `2px dashed ${R}`,
            borderRadius: 16,
            padding: "22px 24px",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            marginTop: 28,
            background: "linear-gradient(180deg, #fffafa 0%, #fff6f6 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Icon FREE góc phải */}
          <img
            src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzIgIVGA338tUgXR0xajAvCmL7YTNcQuBFEG49"
            alt="free icon"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 68,
              height: 68,
              objectFit: "contain",
              opacity: 0.95,
              pointerEvents: "none",
              rotate: "90deg",
            }}
          />

          {/* Accent line */}
          <div
            style={{
              width: 4,
              borderRadius: 999,
              background: R,
              alignSelf: "stretch",
              flexShrink: 0,
            }}
          />

          {/* Content */}
          <div style={{ paddingRight: 48 }}>
            <div
              style={{
                fontFamily: "'SVN-Avenir_Next', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "#111",
                lineHeight: 1.5,
                marginBottom: 6,
              }}
            >
              Kiểm tra thiết bị nhỏ khi có yêu cầu
            </div>

            <div
              style={{
                fontFamily: "'SVN-Avenir_Next', sans-serif",
                fontSize: 13,
                color: "#666",
                lineHeight: 1.7,
              }}
            >
              <span
                style={{
                  color: R_DARK,
                  fontWeight: 700,
                }}
              >
                (không phát sinh thêm chi phí)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
