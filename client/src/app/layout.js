import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import AppProviders from "../provider/AppProviders";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.minhdental.com/#organization",

  name: "Minh Dental",
  alternateName: "Minh Dental Việt Nam",

  url: "https://www.minhdental.com",

  logo: {
    "@type": "ImageObject",
    url: "https://www.minhdental.com/logo.svg",
  },

  image: "https://www.minhdental.com/MinhDental_Group.png",

  description:
    "Minh Dental chuyên cung cấp thiết bị, vật tư và dụng cụ nha khoa chính hãng từ các thương hiệu uy tín trên thế giới.",

  email: "info@minhdental.com",

  telephone: "+84909217885",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Số 41 ngõ 38 Phương Mai, Đống Đa",
    addressLocality: "Hà Nội",
    addressCountry: "VN",
  },

  sameAs: [
    "https://facebook.com/nhakhoaminhphuong.net",
    "https://youtube.com/@minhdental8516",
  ],
};

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <AppProviders>{children}</AppProviders>
        <ToastContainer />
      </body>
    </html>
  );
}
