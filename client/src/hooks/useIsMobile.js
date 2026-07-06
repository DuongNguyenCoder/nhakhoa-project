"use client";

import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Thay đổi giá trị 768 theo nhu cầu của bạn

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Kiểm tra chiều rộng cửa sổ
    };

    window.addEventListener("resize", handleResize); // Lắng nghe sự kiện thay đổi kích thước cửa sổ
    return () => window.removeEventListener("resize", handleResize); // Xóa listener khi component unmount
  }, []);

  return isMobile; // Trả về giá trị true/false
};

export default useIsMobile;
