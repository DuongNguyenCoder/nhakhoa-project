import { Routes, Route, Router, Navigate } from "react-router-dom";
import Home from "@/pages/home/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import HomeLayout from "@/layout/HomeLayout";

import React from 'react'
import DefaultLayout from "@/layout/DefaultLayout";
import BaoHanh from "@/pages/BaoHanh";
import HangThanhLy from "@/pages/HangThanhLy";
import News from "@/pages/News";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import ProductLayout from "@/layout/ProductLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";

const AppRouter = () => {
  return (
    <Routes>
        <Route element={<HomeLayout/>}>
            <Route path="/" element={<Home/>}/>
        </Route>
        <Route element={<ProductLayout/>}>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:productId" element={<ProductDetail/>}/>
          <Route path="/auth/:type" element={<AuthPage />} />
          <Route path="/dang-nhap" element={<Navigate to="/auth/login" replace />} />
          <Route path="/dang-ky" element={<Navigate to="/auth/register" replace />} />
          <Route path="/profile" element={<ProfilePage/>}/>
        </Route>
        <Route element={<DefaultLayout/>}>
            <Route path="/bao-hanh" element={<BaoHanh/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/hang-thanh-ly" element={<HangThanhLy/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/news" element={<News/>}/>
        </Route>
    </Routes>
  )
}

export default AppRouter
