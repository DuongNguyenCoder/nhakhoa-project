import { BuildingStorefrontIcon, ChatBubbleOvalLeftIcon, HomeIcon, NewspaperIcon, PhoneIcon, RectangleGroupIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

// Mảng các liên kết
export const NavLinks = [
  { href: "/", title: "Trang Chủ", linkPic: <HomeIcon className="size-5" /> },
  { href: "/about", title: "Giới Thiệu", linkPic: <ChatBubbleOvalLeftIcon className="size-5" /> },
  { href: "/products", title: "Sản Phẩm", linkPic: <BuildingStorefrontIcon className="size-5" /> },
  { href: "/hang-thanh-ly", title: "Hàng Thanh Lý", linkPic: <RectangleGroupIcon className="size-5" /> },
  { href: "/bao-hanh", title: "Bảo Hành", linkPic: <WrenchScrewdriverIcon className="size-5" /> },
  { href: "/news", title: "Tin Tức", linkPic: <NewspaperIcon className="size-5" /> },
  { href: "/contact", title: "Liên Hệ", linkPic: <PhoneIcon className="size-5" /> },
];
