"use cache";
import Home from "../../components/home/Home";

export const metadata = {
  title: {
    default: "Minh Dental | Thiết bị & Vật tư nha khoa chính hãng",
    template: "%s | Minh Dental",
  },

  description:
    "Minh Dental là đơn vị cung cấp thiết bị, vật tư và dụng cụ nha khoa chính hãng từ các thương hiệu uy tín trên thế giới. Cam kết mang đến sản phẩm chất lượng, giải pháp tối ưu và dịch vụ chuyên nghiệp cho phòng khám nha khoa.",

  keywords: [
    "Minh Dental",
    "thiết bị nha khoa",
    "vật tư nha khoa",
    "dụng cụ nha khoa",
    "thiết bị phòng khám nha khoa",
    "dental equipment",
    "dental supplies",
    "dental materials",
    "Minh Dental Việt Nam",
  ],

  alternates: {
    canonical: "https://www.minhdental.com",
  },

  openGraph: {
    title: "Minh Dental | Thiết bị & Vật tư nha khoa chính hãng",
    description:
      "Minh Dental cung cấp thiết bị, vật tư và dụng cụ nha khoa chính hãng từ các thương hiệu uy tín, mang đến giải pháp toàn diện cho phòng khám nha khoa.",
    url: "https://www.minhdental.com",
    siteName: "Minh Dental",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://www.minhdental.com/MinhDental_Group.png",
        width: 1200,
        height: 630,
        alt: "Minh Dental - Thiết bị & Vật tư nha khoa",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Minh Dental | Thiết bị & Vật tư nha khoa chính hãng",
    description:
      "Đơn vị cung cấp thiết bị, vật tư và dụng cụ nha khoa chính hãng từ các thương hiệu uy tín trên thế giới.",
    images: ["https://www.minhdental.com/MinhDental_Group.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Healthcare",
};

export default async function Page() {
  return <Home />;
}
