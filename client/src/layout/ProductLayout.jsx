import { apiGetAllProduct } from "@/apis/ProductAPI";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import MainHeader from "@/components/MainHeader";
import SideBar from "@/components/SideBar";
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
      console.log("FULL RESPONSE PRODUCT", response);
      setDataProduct(response.data.data);
    };
    getAPIProduct();
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <div className="w-full">
          <TopHeader />
          <MainHeader />
        </div>
        <Breadcrumb />
        <div className="mx-auto w-full md:w-[760px] md:px-1 lg:w-[970px] lg:px-3 xl:w-[1230px] 2xl:w-[1500px]">
          <main className="w-full px-4">
            {dataProduct.length > 0 && (
              <ProductSlider
                products={dataProduct.filter((p) => p.isFeatured)}
                title="SẢN PHẨM NỔI BẬT - HOT DEAL"
              />
            )}
            <div className="my-5 w-full lg:flex">
              <section id="content" className="w-full p-2">
                <Outlet />
              </section>
              <div className="mt-6 flex w-full flex-col px-2 lg:-mt-2.5 lg:w-[32%]">
                {/* <SideBar /> */}
                <SideBarDiscount />
              </div>
            </div>
          </main>
        </div>
        <Footer/>
      </div>
      <SupportWidget/>
    </div>
  );
};

export default ProductLayout;
