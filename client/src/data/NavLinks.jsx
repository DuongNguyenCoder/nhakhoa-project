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
    href: "/",
    title: "Dịch Vụ Khác",
    linkPic: <WrenchScrewdriverIcon className="size-5" />,
    childItems: true,
    dropdownType: "menu",
    childData: [
      {
        _id: "abc",
        title: "Sửa chữa và bảo trì",
        href: "/dich-vu-bao-tri-bao-duong-md-proservice",
      },
      {
        _id: "def",
        title: "Tư vấn thiết kế - thi công phòng nha",
        href: "/",
      },
    ],
  },
  {
    href: "/lien-he",
    title: "Liên Hệ",
    linkPic: <PhoneIcon className="size-5" />,
  },
];
