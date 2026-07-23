import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftIcon,
  HomeIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

// Mảng các liên kết
export const NavLinks = [
  { href: "/", title: "Trang Chủ", linkPic: <HomeIcon className="size-5" /> },
  {
    href: "/ve-minh-dental",
    title: "Giới Thiệu",
    linkPic: <ChatBubbleOvalLeftIcon className="size-5" />,
  },
  {
    href: "/san-pham",
    title: "Sản Phẩm",
    linkPic: <BuildingStorefrontIcon className="size-5" />,
    dropdownType: "mega",
    childItems: true,
  },
  {
    href: "/dich-vu-bao-tri-bao-duong-md-proservice",
    title: "Dịch Vụ Bảo Trì, Bảo Dưỡng MD PROSERVICE",
    linkPic: <RectangleGroupIcon className="size-5" />,
  },
  {
    href: "/tin-tuc-va-tai-lieu",
    title: "Tin tức & Tài liệu",
    linkPic: <NewspaperIcon className="size-5" />,
  },
  {
    href: "/dich-vu-khac",
    title: "Dịch Vụ Khác",
    linkPic: <WrenchScrewdriverIcon className="size-5" />,
    childItems: true,
    dropdownType: "menu",
    childData: [
      {
        title: "Sửa chữa và bảo trì",
        href: "/dich-vu/sua-chua-bao-tri",
      },
      {
        title: "Tư vấn thiết kế - thi công phòng nha",
        href: "/dich-vu/tu-van-thiet-ke-thi-cong-phong-nha",
      },
    ],
  },
  {
    href: "/lien-he",
    title: "Liên Hệ",
    linkPic: <PhoneIcon className="size-5" />,
  },
];
