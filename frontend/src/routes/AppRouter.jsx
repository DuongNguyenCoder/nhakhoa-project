import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

// Layouts
import HomeLayout from "@/layout/HomeLayout";
import DefaultLayout from "@/layout/DefaultLayout";
import ProductLayout from "@/layout/ProductLayout";
import AuthLayout from "@/layout/AuthLayout";
import AdminLayout from "@/components/admin/AdminLayout";

// Pages
import Home from "@/pages/home/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import BaoHanh from "@/pages/BaoHanh";
import HangThanhLy from "@/pages/HangThanhLy";
import News from "@/pages/News";
import Products from "@/pages/product/Products";
import ProductDetail from "@/pages/product/ProductDetail";
import ProductByDirectoryPage from "@/pages/product/ProductByDirectoryPage";
import ProductByCategoryPage from "@/pages/product/ProductByCategoryPage";
import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import CheckoutStep1 from "@/pages/checkout/CheckOutStep1";
import CheckoutStep2 from "@/pages/checkout/CheckoutStep2";
import ThankYouPage from "@/pages/checkout/ThankYouPage";

// Admin
import AdminRoute from "./AdminRoute";
import DashboardHome from "@/pages/admin/DashboardHome";
import Banner from "@/pages/admin/Banner/Banner";
import CreateBanner from "@/pages/admin/Banner/CreateBanner";
import EditBanner from "@/pages/admin/Banner/EditBanner";
import Directory from "@/pages/admin/product/directory/Directory";
import CreateDirectory from "@/pages/admin/product/directory/CreateDirectory";
import Category from "@/pages/admin/product/category/Category";
import CreateCategory from "@/pages/admin/product/category/CreateCategory";
import EditDirectory from "@/pages/admin/product/directory/EditDirectory";
import EditCategory from "@/pages/admin/product/category/EditCategory";
import ProductManagement from "@/pages/admin/product/ProductManegement";
import CreateProduct from "@/pages/admin/product/CreateProduct";
import EditProduct from "@/pages/admin/product/EditProduct";
import PartnerPage from "@/pages/admin/product/Partner";
import NewsManagerPage from "@/pages/admin/news/NewsManagerPage";
import CreateNew from "@/pages/admin/news/CreateNew";
import NewsDetail from "@/pages/NewsDetail";
import NewsCategory from "@/pages/admin/news/Category";
import EditNews from "@/pages/admin/news/EditNew";
import WarrantyManagement from "@/pages/admin/warranty/WarrantyManagement";
import CreateWarranty from "@/pages/admin/warranty/CreateWarranty";
import EditWarranty from "@/pages/admin/warranty/EditWarranty";
import Orders from "@/pages/admin/oders/Orders";
import PreviewOrder from "@/pages/admin/oders/PreviewOder";
import UserManagement from "@/pages/admin/users/UserManagement";
import PreviewUser from "@/pages/admin/users/PreviewUser";
import CreateUserPage from "@/pages/admin/CreateUserPage";
import NotFound from "@/pages/NotFound";
import Method from "@/pages/admin/methods/methodsManagerPage";

const AppRouter = () => {
  return (
    <Routes>

      {/* Home */}
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Product Layout */}
      <Route path="/products" element={<ProductLayout />}>
        <Route index element={<Products />} />
        <Route path=":productId" element={<ProductDetail />} />
        <Route path="directory" element={<ProductByDirectoryPage />} />
        <Route path="category" element={<ProductByCategoryPage />} />
      </Route>

      {/* Auth, Checkout, Profile */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/:type" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/check-out-step1" element={<CheckoutStep1 />} />
        <Route path="/check-out-step2" element={<CheckoutStep2 />} />
        <Route path="/dang-nhap" element={<Navigate to="/auth/login" replace />} />
        <Route path="/dang-ky" element={<Navigate to="/auth/register" replace />} />
        <Route path="/quen-mat-khau" element={<Navigate to="/auth/forgot" replace />} />
      </Route>
      

      {/* Default Pages */}
      <Route element={<DefaultLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bao-hanh" element={<BaoHanh />} />
        <Route path="/hang-khuyen-mai" element={<HangThanhLy />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Route>

      {/* Admin Pages */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="banner" element={<Banner />} />
        <Route path="banner/create" element={<CreateBanner />} />
        <Route path="banner/edit/:id" element={<EditBanner />} />
        {/* Product */}
        <Route path="product" element={<ProductManagement/>}/>
        <Route path="product/create" element={<CreateProduct/>}/>
        <Route path="product/edit/:id" element={<EditProduct/>}/>
        <Route path="directory" element={<Directory/>}/>
        <Route path="directory/create" element={<CreateDirectory/>}/>
        <Route path="directory/edit/:id" element={<EditDirectory/>}/>
        <Route path="category" element={<Category/>}/>
        <Route path="category/create" element={<CreateCategory/>}/>
        <Route path="category/edit/:id" element={<EditCategory/>}/>
        <Route path="partner" element={<PartnerPage/>}/>
        {/* END */}

        {/* NEWS */}
        <Route path="news" element={<NewsManagerPage/>}/>
        <Route path="news/create" element={<CreateNew/>}/>
        <Route path="news/category" element={<NewsCategory/>}/>
        <Route path="news/edit/:id" element={<EditNews/>}/>
        {/* END */}

        {/* WARRANTY */}
        <Route path="warranty" element={<WarrantyManagement/>}/>
        <Route path="warranty/create" element={<CreateWarranty/>}/>
        <Route path="warranty/edit/:id" element={<EditWarranty/>}/>
        {/* END */}

        {/* ODERS */}
        <Route path="orders" element={<Orders/>}/>
        <Route path="orders/preview/:id" element={<PreviewOrder/>}/>
        {/* END */}

        {/* USERS */}
        <Route path="users" element={<UserManagement/>}/>
        <Route path="users/preview/:id" element={<PreviewUser/>}/>
        {/* END */}

        {/* METHODS */}
        <Route path="methods" element={<Method/>}/>
        {/* END */}
        <Route path="signup" element={<CreateUserPage/>}/>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  );
};

export default AppRouter;
