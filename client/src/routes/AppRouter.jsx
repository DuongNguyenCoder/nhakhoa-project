import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

// Layouts
import HomeLayout from "@/layout/HomeLayout";
import DefaultLayout from "@/layout/DefaultLayout";
import ProductLayout from "@/layout/ProductLayout";
import AuthLayout from "@/layout/AuthLayout";
import AdminLayout from "@/components/admin/AdminLayout";

// Pages
import Home from "@/components/home/Home";
import About from "@/components/pages/About";
import Contact from "@/components/pages/Contact";
import BaoHanh from "@/components/pages/BaoHanh";
import HangThanhLy from "@/components/pages/HangThanhLy";
import News from "@/components/pages/News";
import Products from "@/components/pages/product/Products";
import ProductDetail from "@/components/pages/product/ProductDetail";
import ProductByDirectoryPage from "@/components/pages/product/ProductByDirectoryPage";
import ProductByCategoryPage from "@/components/pages/product/ProductByCategoryPage";
import AuthPage from "@/components/pages/AuthPage";
import ProfilePage from "@/components/pages/ProfilePage";
import CheckoutStep1 from "@/components/pages/checkout/CheckoutStep1";
import CheckoutStep2 from "@/components/pages/checkout/CheckoutStep2";
import ThankYouPage from "@/components/pages/checkout/ThankYouPage";

// Admin
import AdminRoute from "./AdminRoute";
import DashboardHome from "@/components/pages/admin/DashboardHome";
import Banner from "@/components/pages/admin/Banner/Banner";
import CreateBanner from "@/components/pages/admin/Banner/CreateBanner";
import EditBanner from "@/components/pages/admin/Banner/EditBanner";
import Directory from "@/components/pages/admin/product/directory/Directory";
import CreateDirectory from "@/components/pages/admin/product/directory/CreateDirectory";
import Category from "@/components/pages/admin/product/category/Category";
import CreateCategory from "@/components/pages/admin/product/category/CreateCategory";
import EditDirectory from "@/components/pages/admin/product/directory/EditDirectory";
import EditCategory from "@/components/pages/admin/product/category/EditCategory";
import ProductManagement from "@/components/pages/admin/product/ProductManegement";
import CreateProduct from "@/components/pages/admin/product/CreateProduct";
import EditProduct from "@/components/pages/admin/product/EditProduct";
import PartnerPage from "@/components/pages/admin/product/Partner";
import NewsManagerPage from "@/components/pages/admin/news/NewsManagerPage";
import CreateNew from "@/components/pages/admin/news/CreateNew";
import NewsDetail from "@/components/pages/NewsDetail";
import NewsCategory from "@/components/pages/admin/news/Category";
import EditNews from "@/components/pages/admin/news/EditNew";
import WarrantyManagement from "@/components/pages/admin/warranty/WarrantyManagement";
import CreateWarranty from "@/components/pages/admin/warranty/CreateWarranty";
import EditWarranty from "@/components/pages/admin/warranty/EditWarranty";
import Orders from "@/components/pages/admin/oders/Orders";
import PreviewOrder from "@/components/pages/admin/oders/PreviewOder";
import UserManagement from "@/components/pages/admin/users/UserManagement";
import PreviewUser from "@/components/pages/admin/users/PreviewUser";
import CreateUserPage from "@/components/pages/admin/CreateUserPage";
import NotFound from "@/components/pages/NotFound";
import Method from "@/components/pages/admin/methods/methodsManagerPage";

const AppRouter = () => {
  return (
    // <Routes>
    //   {/* Home */}
    //   <Route element={<HomeLayout />}>
    //     <Route index element={<Home />} />
    //   </Route>

    //   {/* Product Layout */}
    //   <Route path="/products" element={<ProductLayout />}>
    //     <Route index element={<Products />} />
    //     <Route path=":productId" element={<ProductDetail />} />
    //     <Route path="directory" element={<ProductByDirectoryPage />} />
    //     <Route path="category" element={<ProductByCategoryPage />} />
    //   </Route>

    //   {/* Auth, Checkout, Profile */}
    //   <Route element={<AuthLayout />}>
    //     <Route path="/auth/:type" element={<AuthPage />} />
    //     <Route path="/profile" element={<ProfilePage />} />
    //     <Route path="/check-out-step1" element={<CheckoutStep1 />} />
    //     <Route path="/check-out-step2" element={<CheckoutStep2 />} />
    //     <Route
    //       path="/dang-nhap"
    //       element={<Navigate to="/auth/login" replace />}
    //     />
    //     <Route
    //       path="/dang-ky"
    //       element={<Navigate to="/auth/register" replace />}
    //     />
    //     <Route
    //       path="/quen-mat-khau"
    //       element={<Navigate to="/auth/forgot" replace />}
    //     />
    //   </Route>

    //   {/* Default Pages */}
    //   <Route element={<DefaultLayout />}>
    //     <Route path="/about" element={<About />} />
    //     <Route path="/contact" element={<Contact />} />
    //     <Route path="/bao-hanh" element={<BaoHanh />} />
    //     <Route path="/hang-khuyen-mai" element={<HangThanhLy />} />
    //     <Route path="/news" element={<News />} />
    //     <Route path="/news/:id" element={<NewsDetail />} />
    //   </Route>

    //   {/* Admin Pages */}
    //   <Route
    //     path="/admin"
    //     element={
    //       <AdminRoute>
    //         <AdminLayout />
    //       </AdminRoute>
    //     }
    //   >
    //     <Route path="dashboard" element={<DashboardHome />} />
    //     <Route path="banner" element={<Banner />} />
    //     <Route path="banner/create" element={<CreateBanner />} />
    //     <Route path="banner/edit/:id" element={<EditBanner />} />
    //     {/* Product */}
    //     <Route path="product" element={<ProductManagement />} />
    //     <Route path="product/create" element={<CreateProduct />} />
    //     <Route path="product/edit/:id" element={<EditProduct />} />
    //     <Route path="directory" element={<Directory />} />
    //     <Route path="directory/create" element={<CreateDirectory />} />
    //     <Route path="directory/edit/:id" element={<EditDirectory />} />
    //     <Route path="category" element={<Category />} />
    //     <Route path="category/create" element={<CreateCategory />} />
    //     <Route path="category/edit/:id" element={<EditCategory />} />
    //     <Route path="partner" element={<PartnerPage />} />
    //     {/* END */}

    //     {/* NEWS */}
    //     <Route path="news" element={<NewsManagerPage />} />
    //     <Route path="news/create" element={<CreateNew />} />
    //     <Route path="news/category" element={<NewsCategory />} />
    //     <Route path="news/edit/:id" element={<EditNews />} />
    //     {/* END */}

    //     {/* WARRANTY */}
    //     <Route path="warranty" element={<WarrantyManagement />} />
    //     <Route path="warranty/create" element={<CreateWarranty />} />
    //     <Route path="warranty/edit/:id" element={<EditWarranty />} />
    //     {/* END */}

    //     {/* ODERS */}
    //     <Route path="orders" element={<Orders />} />
    //     <Route path="orders/preview/:id" element={<PreviewOrder />} />
    //     {/* END */}

    //     {/* USERS */}
    //     <Route path="users" element={<UserManagement />} />
    //     <Route path="users/preview/:id" element={<PreviewUser />} />
    //     {/* END */}

    //     {/* METHODS */}
    //     <Route path="methods" element={<Method />} />
    //     {/* END */}
    //     <Route path="signup" element={<CreateUserPage />} />
    //   </Route>
    //   <Route path="*" element={<NotFound />} />
    //   <Route path="/thank-you" element={<ThankYouPage />} />
    // </Routes>
    <div></div>
  );
};

export default AppRouter;
