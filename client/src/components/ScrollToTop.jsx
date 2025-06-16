import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi pathname thay đổi
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null; // không render gì cả
};

export default ScrollToTop;
