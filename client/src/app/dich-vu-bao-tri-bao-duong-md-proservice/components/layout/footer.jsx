"use client";

import { useState } from "react";

/* ─── Accordion item (mobile) ───────────────────────── */
function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#eee] md:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 md:py-0 md:cursor-default"
      >
        <span className="font-semibold text-gray-300">{title}</span>
        <span className="md:hidden text-gray-400 text-sm">
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300
          ${open ? "max-h-[300px] pb-3" : "max-h-0"}
          md:max-h-none md:block md:pb-0
        `}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Footer ───────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300">
      <div className="max-w-7xl flex flex-col justify-end mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ── Column 1 ── */}
          <div className="max-w-sm">
            {/* Logo */}
            <img
              src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzYYB69afSamfgHpvDNqn8zc5bUMohC3r9WITE"
              alt="Minh Dental"
              className="
      w-auto object-contain rounded-md
      h-14 md:h-16 xl:h-18
      mb-3
    "
            />

            {/* Brand name */}
            <div className="text-white font-extrabold text-[20px] sm:text-[22px] xl:text-[24px] leading-tight">
              Minh Dental
            </div>

            {/* Subtitle */}
            <div className="text-[#E24B4A] text-[13px] md:text-[15px] font-semibold tracking-wide mb-3">
              Đối tác tin cậy của nha sĩ
            </div>

            {/* Slogan */}
            <p className="text-[13px] sm:text-[15px] text-gray-400 leading-relaxed mb-5">
              Giải pháp bảo trì & vận hành phòng khám nha khoa chuyên nghiệp,
              minh bạch và nhanh chóng.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {["F", "Z", "Y"].map((s, i) => (
                <div
                  key={i}
                  className="
          w-9 h-9 xl:w-10 xl:h-10
          rounded-full bg-[#E24B4A]
          flex items-center justify-center
          text-white text-sm font-bold
          hover:opacity-80 cursor-pointer
          transition
        "
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* ── Column 2 ── */}
          <AccordionItem title="Dịch vụ">
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Vật tư</li>
              <li className="hover:text-white cursor-pointer">Bảo trì 24h</li>
              <li className="hover:text-white cursor-pointer">
                Thiết kế & Thi công
              </li>
              <li className="hover:text-white cursor-pointer">Tư vấn</li>
            </ul>
          </AccordionItem>

          {/* ── Column 3 ── */}
          <AccordionItem title="Chính sách & cam kết">
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">
                Bảo hành thiết bị
              </li>
              <li className="hover:text-white cursor-pointer">
                Bảo trì định kỳ
              </li>
              <li className="hover:text-white cursor-pointer">
                Cam kết minh bạch
              </li>
            </ul>
          </AccordionItem>

          {/* ── Column 4 ── */}
          <AccordionItem title="Liên hệ">
            <div className="text-sm text-gray-400 space-y-2 leading-relaxed">
              <div>
                Số 41 ngõ 38 Phương Mai,
                <br />
                Đống Đa, Hà Nội
              </div>

              <div>
                Hotline:{" "}
                <span className="text-white font-semibold">0900 000 000</span>
              </div>

              <div>
                Email: <span className="text-white">contact@minhdental.vn</span>
              </div>
            </div>
          </AccordionItem>
        </div>

        {/* Divider */}
        <div className="border-t border-[#222] mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Minh Dental. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
