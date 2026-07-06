"use cache";

import About from "@/components/pages/About";

export const metadata = {
  title: "Giới thiệu Minh Dental | Đồng hành cùng phòng khám nha khoa",

  description:
    "Tìm hiểu về Minh Dental – đơn vị cung cấp thiết bị, vật tư và dụng cụ nha khoa chính hãng. Với sứ mệnh mang đến giải pháp nha khoa chất lượng, Minh Dental luôn đồng hành cùng các phòng khám và nha sĩ trên toàn quốc.",

  keywords: [
    "Giới thiệu Minh Dental",
    "Minh Dental",
    "về chúng tôi",
    "công ty thiết bị nha khoa",
    "nhà cung cấp thiết bị nha khoa",
    "vật tư nha khoa chính hãng",
    "dụng cụ nha khoa",
    "đối tác nha khoa",
    "Minh Dental Việt Nam",
  ],

  alternates: {
    canonical: "https://www.minhdental.com/about",
  },

  openGraph: {
    title: "Giới thiệu Minh Dental | Đồng hành cùng phòng khám nha khoa",
    description:
      "Khám phá hành trình phát triển, sứ mệnh, tầm nhìn và những giá trị mà Minh Dental mang đến cho ngành nha khoa Việt Nam.",
    url: "https://www.minhdental.com/about",
    siteName: "Minh Dental",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://www.minhdental.com/MinhDental_Group.png",
        width: 1200,
        height: 630,
        alt: "Giới thiệu Minh Dental",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Giới thiệu Minh Dental | Đồng hành cùng phòng khám nha khoa",
    description:
      "Tìm hiểu về Minh Dental, đơn vị cung cấp thiết bị và vật tư nha khoa chính hãng với định hướng phát triển bền vững.",
    images: ["https://www.minhdental.com/MinhDental_Group.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "Healthcare",
};

export default async function Page() {
  return <About />;
}
