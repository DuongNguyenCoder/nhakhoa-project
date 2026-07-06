"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi pathname thay đổi
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // không render gì cả
};

export default ScrollToTop;
