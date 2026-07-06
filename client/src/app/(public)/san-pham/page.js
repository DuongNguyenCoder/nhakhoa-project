"use cache";

import Products from "@/components/pages/product/Products";

export const metadata = {
  title: "Sản phẩm nha khoa chính hãng | Minh Dental",
  description:
    "Khám phá các sản phẩm nha khoa chính hãng tại Minh Dental: vật tư nha khoa, thiết bị nha khoa, dụng cụ nha khoa và các giải pháp dành cho phòng khám với chất lượng cao từ các thương hiệu uy tín.",

  keywords: [
    "Minh Dental",
    "sản phẩm nha khoa",
    "thiết bị nha khoa",
    "vật tư nha khoa",
    "dụng cụ nha khoa",
    "nha khoa",
    "dental equipment",
    "dental supplies",
    "dental materials",
    "thiết bị phòng khám nha khoa",
  ],

  alternates: {
    canonical: "https://www.minhdental.com/san-pham",
  },

  openGraph: {
    title: "Sản phẩm nha khoa chính hãng | Minh Dental",
    description:
      "Minh Dental cung cấp đa dạng thiết bị, vật tư và dụng cụ nha khoa chính hãng từ các thương hiệu uy tín, đáp ứng nhu cầu của phòng khám và nha sĩ trên toàn quốc.",
    url: "https://www.minhdental.com/san-pham",
    siteName: "Minh Dental",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://www.minhdental.com/MinhDental_Group.png",
        width: 1200,
        height: 630,
        alt: "Minh Dental - Sản phẩm nha khoa",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sản phẩm nha khoa chính hãng | Minh Dental",
    description:
      "Danh mục sản phẩm nha khoa chính hãng tại Minh Dental với nhiều thiết bị, vật tư và dụng cụ chất lượng cao.",
    images: ["https://www.minhdental.com/MinhDental_Group.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  return <Products />;
}
