import React from "react";

/* ─────────────────────────────────────────────
 * Palette
 * ──────────────────────────────────────────── */
const R = "#E24B4A";
const R_DARK = "#A32D2D";
const R_BG = "#FDF4F4";

/* ─────────────────────────────────────────────
 * TABLE DATA
 * ──────────────────────────────────────────── */
const TABLE_DATA = [
  {
    device: "GHẾ MÁY",
    items: [
      "Kiểm tra tay khoan, tay xịt",
      "Vệ sinh ống hút, bầu hút nước bọt, hút phẫu thuật",
      "Kiểm tra các chức năng ghế lên xuống, ngả nghiêng, mâm chính, mâm phụ, pedan",
      "Kiểm tra đèn ghế",
      "Kiểm tra tình trạng dây hơi, dây nước của ghế",
    ],
  },
  {
    device: "MÁY NÉN KHÍ",
    items: [
      "Kiểm tra tình trạng đầu nén khí, độ ồn, tốc độ bơm khí",
      "Xả nước máy nén khí",
    ],
  },
  {
    device: "MÁY HÚT TRUNG TÂM",
    items: ["Kiểm tra tình trạng hoạt động, độ ồn, lực hút"],
  },
  {
    device: "TAY KHOAN",
    items: [
      "Kiểm tra bi tay khoan có bị rung kêu, đã xuống cấp chưa",
      "Kiểm tra chốt mũi khoan",
      "Tra dầu tay khoan, hướng dẫn tra dầu, chỉnh cân hơi, chỉnh nước",
      "Kiểm tra vệ sinh tia nước tay khoan",
    ],
  },
  {
    device: "NỒI HẤP",
    items: [
      "Kiểm tra vệ sinh buồng hấp",
      "Kiểm tra tình trạng kháng nồi hấp (han gỉ, nứt)",
      "Vệ sinh đường xả hồi hấp",
    ],
  },
  {
    device: "ĐÈN QUANG TRÙNG HỢP",
    items: ["Kiểm tra tình trạng hoạt động, chất lượng pin, bộ nguồn"],
  },
  {
    device: "X-QUANG CẦM TAY",
    items: [
      "Kiểm tra vệ sinh đầu bóng phát tia",
      "Kiểm tra, đánh giá tình trạng pin",
    ],
  },
  {
    device: "SENSOR",
    items: [
      "Kiểm tra hiệu chuẩn phần mềm xử lý hình ảnh sensor",
      "Kiểm tra, vệ sinh, đánh giá tình trạng đầu cảm biến sensor",
    ],
  },
  {
    device: "TỦ TIA CỰC TÍM",
    items: [
      "Kiểm tra vệ sinh tủ",
      "Kiểm tra đánh giá tình trạng bóng đèn cực tím",
    ],
  },
  {
    device: "MÁY LẤY CAO",
    items: [
      "Kiểm tra vệ sinh máy, đầu mũi, van mở nước",
      "Kiểm tra đánh giá cường độ rung của máy lấy cao",
    ],
  },
  {
    device: "MÁY ĐIỀU TRỊ NỘI NHA",
    items: [
      "Kiểm tra, vệ sinh, đánh giá tình trạng pin",
      "Kiểm tra tốc độ quay, hiệu chuẩn máy",
    ],
  },
  {
    device: "MÁY CẮT XƯƠNG (PIEZOTOME)",
    items: [
      "Kiểm tra vệ sinh đường dây, đầu tay máy",
      "Kiểm tra đánh giá cường độ rung của đầu cắt xương",
    ],
  },
  {
    device: "MÁY CẮM IMPLANT",
    items: ["Kiểm tra vệ sinh máy, đường dây, buồng bơm máy"],
  },
];

/* ─────────────────────────────────────────────
 * COMPONENT
 * ──────────────────────────────────────────── */
export default function SectionMaintenance() {
  return (
    <section
      id="bao-tri"
      className="w-full bg-white px-4 py-16 font-['SVN-Avenir_Next',sans-serif] sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* ───────────────── HEADER ──────────────── */}
        <div className="mb-14 text-center md:mb-20">
          {/* label */}
          <div className="mb-5 flex justify-center">
            <div className="rounded-full border border-[#E24B4A]/30 bg-[#FFF8F8] px-5 py-2.5 md:px-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A32D2D] md:text-[12px]">
                DỊCH VỤ BẢO TRÌ - BẢO DƯỠNG THIẾT BỊ NHA KHOA
              </span>
            </div>
          </div>

          {/* title */}
          <div className="relative inline-flex flex-col items-center">
            <h2 className="text-[32px] font-black uppercase leading-[1.05] tracking-[-2px] text-[#1A1A1A] md:text-[52px] xl:text-[64px]">
              CÔNG VIỆC
              <br />
              <span className="relative inline-block text-[#E24B4A]">
                BẢO TRÌ
                {/* underline */}
                <span className="absolute bottom-1 left-0 -z-10 h-[8px] w-full rounded-full bg-[#E24B4A]/15" />
              </span>
            </h2>
          </div>

          <p className="mx-auto mt-6 max-w-[760px] text-[15px] leading-relaxed text-[#666] md:text-[17px]">
            Quy trình bảo trì được xây dựng rõ ràng, minh bạch và cá nhân hoá
            cho từng phòng khám nhằm đảm bảo thiết bị luôn vận hành ổn định và
            an toàn.
          </p>
        </div>

        {/* ───────────────── FEATURE GRID ──────────────── */}
        <div className="mb-16 grid grid-cols-1 gap-5 md:mb-24 md:grid-cols-2">
          {/* item */}
          <div className="rounded-3xl border border-[#F0EAEA] bg-[#FAFAFA] p-6 md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCEBEB] text-xl font-black text-[#E24B4A]">
              01
            </div>

            <h3 className="mb-3 text-[20px] font-bold leading-snug text-[#1A1A1A]">
              Bảo trì định kỳ theo lịch cố định
            </h3>

            <p className="text-[15px] leading-relaxed text-[#666]">
              Việc bảo trì được triển khai định kỳ theo lịch đã thống nhất nhằm
              đảm bảo thiết bị luôn trong trạng thái hoạt động ổn định.
            </p>
          </div>

          {/* item */}
          <div className="rounded-3xl border border-[#F0EAEA] bg-[#FAFAFA] p-6 md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCEBEB] text-xl font-black text-[#E24B4A]">
              02
            </div>

            <h3 className="mb-3 text-[20px] font-bold leading-snug text-[#1A1A1A]">
              Hỗ trợ phòng khám nội thành Hà Nội
            </h3>

            <p className="text-[15px] leading-relaxed text-[#666]">
              Đối với phòng khám khu vực nội thành Hà Nội, Minh Dental triển
              khai lịch bảo trì hàng tháng để đảm bảo xử lý kịp thời mọi phát
              sinh kỹ thuật.
            </p>
          </div>

          {/* item highlight */}
          <div className="relative overflow-hidden rounded-3xl border border-[#F4D8D8] bg-[#FFF8F8] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#E24B4A]/5 blur-2xl" />

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E24B4A] text-xl font-black text-white">
              03
            </div>

            <h3 className="mb-4 text-[20px] font-bold leading-snug text-[#1A1A1A]">
              Lưu trữ{" "}
              <span className="text-[#E24B4A]">
                “Hồ sơ sức khoẻ thiết bị phòng khám”
              </span>
            </h3>

            <p className="text-[15px] leading-relaxed text-[#666]">
              Minh Dental xây dựng hồ sơ riêng cho từng phòng khám sử dụng dịch
              vụ bảo trì - bảo dưỡng nhằm theo dõi lịch sử vận hành, tình trạng
              thiết bị và các cảnh báo kỹ thuật theo thời gian.
            </p>
          </div>

          {/* item highlight */}
          <div className="relative overflow-hidden rounded-3xl border border-[#F4D8D8] bg-[#FFF8F8] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#E24B4A]/5 blur-2xl" />

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E24B4A] text-xl font-black text-white">
              04
            </div>

            <h3 className="mb-4 text-[20px] font-bold leading-snug text-[#1A1A1A]">
              Minh bạch với{" "}
              <span className="text-[#E24B4A]">CHECKLIST 18 BƯỚC</span>
            </h3>

            <p className="text-[15px] leading-relaxed text-[#666]">
              Toàn bộ quy trình kiểm tra và bảo trì ghế nha khoa được ghi nhận
              rõ ràng theo checklist tiêu chuẩn, giúp phòng khám dễ dàng theo
              dõi và kiểm soát.
            </p>
          </div>
        </div>

        {/* ───────────────── STEP TITLE ──────────────── */}
        <div className="mb-10 md:mb-14">
          <h2 className="mb-4 text-[28px] font-black uppercase leading-tight tracking-[-1px] text-[#1A1A1A] md:text-[42px]">
            Nội dung công việc
            <br />
            <span className="text-[#E24B4A]">bảo trì bao gồm</span>
          </h2>

          <div className="h-1.5 w-20 rounded-full bg-[#E24B4A]" />
        </div>

        {/* ───────────────── STEP TIMELINE ──────────────── */}
        <div className="relative mb-20 flex flex-col gap-6">
          {/* line */}
          <div className="absolute bottom-10 left-[27px] top-10 hidden w-[2px] bg-[#F0DADA] md:block" />

          {/* step */}
          <div className="relative flex gap-5">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E24B4A] text-lg font-black text-white">
              01
            </div>

            <div className="flex-1 rounded-3xl border border-[#EFE8E8] bg-white p-6 md:p-8">
              <h3 className="mb-4 text-[20px] font-bold leading-snug text-[#1A1A1A]">
                Kiểm tra tổng thể toàn bộ thiết bị trong phòng khám
              </h3>

              <p className="text-[15px] leading-relaxed text-[#666]">
                Bao gồm: Ghế máy, máy nén khí, máy hút, nồi hấp, máy lấy cao,
                tay khoan nhanh/chậm, đèn tẩy trắng, máy nội nha, X-quang,
                sensor, máy hút dịch...
              </p>
            </div>
          </div>

          {/* step */}
          <div className="relative flex gap-5">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1A1A1A] text-lg font-black text-white">
              02
            </div>

            <div className="flex-1 rounded-3xl border border-[#EFE8E8] bg-[#FAFAFA] p-6 md:p-8">
              <h3 className="mb-4 text-[20px] font-bold leading-snug text-[#1A1A1A]">
                Đánh giá tình trạng thiết bị hiện tại
              </h3>

              <p className="text-[15px] leading-relaxed text-[#666]">
                Đánh giá chi tiết tình trạng hoạt động của thiết bị theo mức độ:
                hoạt động tốt, đang xuống cấp theo thang điểm 10 hoặc hỏng hóc
                cần xử lý gấp.
              </p>
            </div>
          </div>
        </div>

        {/* ───────────────── TABLE TITLE ──────────────── */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-[26px] font-black uppercase leading-tight tracking-[-1px] text-[#1A1A1A] md:text-[34px]">
            Checklist kiểm tra
            <span className="text-[#E24B4A]"> thiết bị</span>
          </h3>
        </div>

        {/* ───────────────── TABLE ──────────────── */}
        <div className="overflow-hidden rounded-[28px] border border-[#EEE7E7] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
          {/* table head */}
          <div className="hidden grid-cols-[280px_1fr] bg-[#1A1A1A] text-white md:grid">
            <div className="border-r border-white/10 px-8 py-5 text-sm font-bold uppercase tracking-[0.08em]">
              Thiết bị
            </div>

            <div className="px-8 py-5 text-sm font-bold uppercase tracking-[0.08em]">
              Nội dung kiểm tra
            </div>
          </div>

          {/* body */}
          <div>
            {TABLE_DATA.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 border-b border-[#F3EEEE] last:border-none md:grid-cols-[280px_1fr]"
              >
                {/* device */}
                <div className="border-b border-[#F1EAEA] bg-[#FCFAFA] px-5 py-5 md:border-b-0 md:border-r md:px-8 md:py-7">
                  <div className="text-[15px] font-black uppercase tracking-[0.04em] text-[#E24B4A] md:text-[16px]">
                    {row.device}
                  </div>
                </div>

                {/* items */}
                <div className="flex flex-col gap-3 px-5 py-5 md:px-8 md:py-7">
                  {row.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#E24B4A]" />

                      <span className="text-[14px] leading-relaxed text-[#444] md:text-[15px]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ───────────────── FOOT NOTE ──────────────── */}
        <div
          style={{
            border: `2px dashed ${R}`,
            borderRadius: 12,
            padding: "20px 24px",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 24,
            background: "#fff9f9",
          }}
        >
          <span
            style={{
              background: R,
              color: "#fff",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.07em",
              borderRadius: 6,
              padding: "4px 12px",
              marginTop: 2,
              flexShrink: 0,
              textTransform: "uppercase",
            }}
          >
            Miễn phí
          </span>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111",
                lineHeight: 1.5,
              }}
            >
              Kiểm tra thiết bị nhỏ khi có yêu cầu
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#888",
                marginTop: 4,
              }}
            >
              Đèn soi miệng, bộ khay dụng cụ, ghế phụ — không phát sinh chi phí
              ngoài hợp đồng
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
