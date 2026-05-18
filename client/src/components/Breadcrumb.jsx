import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai"; // 👈 Thêm icon home
import { ProductContext } from "@/layout/ProductLayout";
import { NewContext } from "@/layout/DefaultLayout";
const breadcrumbNameMap = {
  products: "Sản phẩm",
  "hang-thanh-ly": "Hàng thanh lý",
  "gio-hang": "Giỏ hàng",
  checkout: "Thanh toán",
  "dang-nhap": "Đăng nhập",
  "dang-ky": "Đăng ký",
  contact: "Liên hệ",
  about: "Giới thiệu",
  news: "Tin tức",
  "bao-hanh": "Bảo hành",
  "hang-khuyen-mai": "Hàng Khuyến mãi"
};

const Breadcrumb = () => {
  const { productTitle: tp } = useContext(ProductContext) || {};
  const { newTitle: tn } = useContext(NewContext) || {};
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const searchParams = new URLSearchParams(location.search);
  const queryTitle = searchParams.get("title");

  return (
    <nav className="w-full lg:h-20 h-16 bg-red-100 py-3 px-2 sm:px-20 md:px-[100px] lg:px-[140px] shadow-sm mb-5">
      <div className="flex h-full items-center text-sm font-medium text-gray-700">
        {/* Trang chủ với icon */}
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:underline hover:text-blue-800"
        >
          <AiFillHome className="mr-1 text-xl" />
          Trang chủ
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          const title =
            (isLast && (tp || tn || queryTitle)) || breadcrumbNameMap[name] || decodeURIComponent(name);

          return (
            <div key={routeTo} className="flex items-center">
              <FaChevronRight className="mx-2 text-gray-400" />
              {isLast ? (
                <span className="capitalize text-gray-600">{title}</span>
              ) : (
                <Link
                  to={routeTo}
                  className="capitalize text-blue-600 hover:underline hover:text-blue-800"
                >
                  {title}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
