import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-red-700 font-sans text-sm text-white">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-4">
        {/* Cột 1: Logo & Thông tin công ty */}
        <div>
          <div className="-mt-16 w-full">
            <div className="relative w-48 h-48 overflow-hidden">
              <Image
                src="/assets/logo_f.svg"
                alt="logo_footer"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="-mt-7 mb-4 text-2xl font-bold">
              CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ Y - NHA KHOA MINH PHƯƠNG
            </h2>
          </div>
          <div className="flex w-full flex-col gap-1 text-gray-200">
            <p>Mã số thuế: 0107247754</p>
            <p>Đăng ký ngày: 11/12/2015</p>
            <p>Nơi đăng ký: Tại sở Kế hoạch và đầu tư Hà Nội</p>
          </div>
          <img
            src="/assets/logoSaleNoti.png"
            alt="logoSaleNoti"
            className="w-auto h-14 mt-2 lg:mx-auto"
          />
        </div>

        {/* Cột 2: Hỗ trợ khách hàng */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Hỗ trợ khách hàng</h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <Link href="/news" className="transition hover:text-red-300">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link href="/news" className="transition hover:text-red-300">
                Chính sách đổi - trả
              </Link>
            </li>
            <li>
              <Link href="/news" className="transition hover:text-red-300">
                Chế độ bảo hành
              </Link>
            </li>
            <li>
              <Link href="/news" className="transition hover:text-red-300">
                Quy định giao - nhận
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Liên hệ</h2>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" /> Trụ sở: Số 41 ngõ 38 Phương
              Mai, Đống Đa, Hà Nội
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" /> Showroom: 111 E1 Phương Mai,
              Đống Đa, Hà Nội
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@minhdental.com
            </li>
            <li>
              <a
                href="tel:(024)37100625"
                className="flex items-center gap-2 hover:text-red-300"
              >
                <FaPhoneAlt /> (024) 3710 0625
              </a>
            </li>
            <li>
              <a
                href="tel:(024)32222788"
                className="flex items-center gap-2 hover:text-red-300"
              >
                <FaPhoneAlt /> (024) 3222 2788
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaClock /> T2 - CN (8h - 20h)
            </li>
          </ul>
          <div className="mt-4 flex gap-4 text-2xl">
            <a
              href="https://www.facebook.com/nhakhoaminhphuong.net"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-red-300 hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://zalo.me/0915858282"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full shadow-lg transition hover:scale-110"
              title="Chat Zalo"
            >
              <Image
                src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzZ3HHbAqEysSfHn0tuFAVMz8kOxYlj6vhL1RW"
                alt="Icon Zalo"
                width={24}
                height={24}
                className="object-contain object-center overflow-hidden"
              />
            </a>
            <Link
              href="/"
              className="transition hover:text-red-300 hover:scale-110"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>

        {/* Cột 4: Sơ đồ đường đi + Map */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Sơ đồ đường đi</h2>
          <div className="h-72 w-full overflow-hidden rounded-lg border border-red-400 shadow-md">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7085253489336!2d105.83799657482096!3d21.004317880638954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac79df7ad1df%3A0x1301b482473b4caf!2zTUlOSCBEZW50YWwsIDExMS1FMSBQaMawxqFuZyBNYWksIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1745001717018!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="bg-red-800 py-4 text-center text-xs text-gray-200">
        © {new Date().getFullYear()} by MINHDENTAL. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
