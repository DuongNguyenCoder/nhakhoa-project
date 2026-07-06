"use client";
// import SideBarDiscount from "@/components/SideBarDiscount";

export default function Layout({ children }) {
  // return <RouterLayout layout={ProductLayout}>{children}</RouterLayout>;

  return (
    <div className="w-full bg-gray-100">
      {/* Content layout container */}
      <div className="mx-auto w-full px-4 md:w-[760px] md:px-1 lg:w-[970px] lg:px-3 xl:w-[1230px] 2xl:w-[1500px]">
        {/* Sản phẩm nổi bật */}
        {/* <ProductSlider title="SẢN PHẨM NỔI BẬT - HOT DEAL" /> */}

        {/* Main Content + Sidebar */}
        <div className="my-5 w-full lg:flex">
          <section id="content" className="w-full p-2">
            {children}
          </section>
          <div className="mt-6 flex w-full flex-col px-2 lg:-mt-2.5 lg:w-[32%]">
            {/* <SideBarDiscount /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
