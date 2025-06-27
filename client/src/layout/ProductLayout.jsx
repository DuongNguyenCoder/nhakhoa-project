import { apiGetAllProduct } from "@/apis/ProductAPI";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import MainHeader from "@/components/MainHeader";
import MenuHeader from "@/components/MenuHeader";
import SideBarDiscount from "@/components/SideBarDiscount";
import SupportWidget from "@/components/SupportWidget";
import TopHeader from "@/components/TopHeader";
import ProductSlider from "@/components/ui/ProductSlider";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const ProductLayout = () => {
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    const getAPIProduct = async () => {
      const response = await apiGetAllProduct({ limit: 9999 });
      setDataProduct(response.data.data);
    };
    getAPIProduct();
  }, []);

  return (
    <div className="w-full bg-gray-100">
      {/* Header */}
      <TopHeader />
      <MainHeader />

      {/* Sticky Menu */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <MenuHeader />
      </div>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Content layout container */}
      <div className="mx-auto w-full md:w-[760px] md:px-1 lg:w-[970px] lg:px-3 xl:w-[1230px] 2xl:w-[1500px]">
        <main className="w-full px-4">
          {/* Sản phẩm nổi bật */}
          {dataProduct.length > 0 && (
            <ProductSlider
              products={dataProduct.filter((p) => p.isFeatured)}
              title="SẢN PHẨM NỔI BẬT - HOT DEAL"
            />
          )}

          {/* Main Content + Sidebar */}
          <div className="my-5 w-full lg:flex">
            <section id="content" className="w-full p-2">
              <Outlet />
            </section>
            <div className="mt-6 flex w-full flex-col px-2 lg:-mt-2.5 lg:w-[32%]">
              <SideBarDiscount />
            </div>
          </div>
        </main>
      </div>

      {/* Footer + Hỗ trợ */}
      <Footer />
      <SupportWidget />
    </div>
  );
};

export default ProductLayout;
