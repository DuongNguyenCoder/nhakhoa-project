"use client";

import Image from "next/image";
import { useState } from "react";

const ACTIONS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/nhakhoaminhphuong.net",
    icon: "https://leyfeolxdr.ufs.sh/f/DKQnMo5A7Edz5wZqiUhV30TaGuKbkydmc7nXf2eh85rp9M4z",
    className: "bg-[#1877F2] hover:bg-[#1666D9]",
  },
  {
    id: "zalo",
    label: "Zalo",
    href: "https://zalo.me/0913783696",
    icon: "https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzZ3HHbAqEysSfHn0tuFAVMz8kOxYlj6vhL1RW",
    className: "bg-[#2563EB] hover:bg-[#1D4ED8]",
  },
  {
    id: "Youtube",
    label: "Youtube",
    href: "https://www.youtube.com/@minhdental8516",
    icon: "https://leyfeolxdr.ufs.sh/f/DKQnMo5A7Edz8j9UVhEebhVLFrNYDMauso51PdH96xj4CRKX",
    className: "bg-[#2563EB] hover:bg-[#1D4ED8]",
  },
];

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
              {ACTIONS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  className="relative w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer transition overflow-hidden"
                >
                  <Image
                    src={s.icon}
                    alt={`Icon ${s.label}`}
                    loading="lazy"
                    fill
                    className="object-contain object-center"
                  />
                </a>
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
            <div className="text-sm text-gray-400 space-y-2 leading-relaxed flex flex-col">
              <div>
                Số 41 ngõ 38 Phương Mai,
                <br />
                Đống Đa, Hà Nội
              </div>

              <a href="tel:0913783696">
                Hotline:{" "}
                <span className="text-white font-semibold">0913 783 696</span>
              </a>

              <a href="mailto:info@minhdental.com" target="_blank">
                Email: <span className="text-white">info@minhdental.com</span>
              </a>
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
