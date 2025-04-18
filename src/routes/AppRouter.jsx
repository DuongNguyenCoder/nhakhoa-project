import { Routes, Route, Router, Navigate } from "react-router-dom";
import Home from "@/pages/home/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import HomeLayout from "@/layout/HomeLayout";

import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import BaoHanh from "@/pages/BaoHanh";
import HangThanhLy from "@/pages/HangThanhLy";
import News from "@/pages/News";
import Products from "@/pages/product/Products";
import ProductDetail from "@/pages/product/ProductDetail";
import ProductLayout from "@/layout/ProductLayout";
import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import ProductByDirectoryPage from "@/pages/product/ProductByDirectoryPage";
import ProductByCategoryPage from "@/pages/product/ProductByCategoryPage";
import AuthLayout from "@/layout/AuthLayout";
import CheckoutStep1 from "@/pages/checkout/CheckOutStep1";
import CheckoutStep2 from "@/pages/checkout/CheckoutStep2";
import ThankYouPage from "@/pages/checkout/ThankYouPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Trang chủ */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Layout Product dùng chung cho sản phẩm và sidebar */}
      <Route path="/products" element={<ProductLayout />}>
        <Route index element={<Products />} />
        <Route path=":productId" element={<ProductDetail />} />
        <Route path="directory" element={<ProductByDirectoryPage />} />
        <Route path="category" element={<ProductByCategoryPage />} />
      </Route>

      {/* */}
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/check-out-step1" element={<CheckoutStep1 />} />
        <Route path="/check-out-step2" element={<CheckoutStep2 />} />
        <Route
          path="/dang-nhap"
          element={<Navigate to="/auth/login" replace />}
        />
        <Route
          path="/dang-ky"
          element={<Navigate to="/auth/register" replace />}
        />
        <Route
          path="/quen-mat-khau"
          element={<Navigate to="/auth/forgot" replace />}
        />
        <Route path="/auth/:type" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Các trang tĩnh khác */}
      <Route element={<DefaultLayout />}>
        <Route path="/bao-hanh" element={<BaoHanh />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hang-thanh-ly" element={<HangThanhLy />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
