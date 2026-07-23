"use client";

import { apiGetDirectory } from "../../apis/DirectoryAPI";
import { apiGetNew } from "../../apis/NewsAPI";
import {
  GiftIcon,
  HandThumbUpIcon,
  ShieldCheckIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import PageTitle from "../../components/pageTitle";
import Link from "next/link";
import BannerHome from "./BannerHome";
import ProductGrid from "./product-grid";
import PartnerSlider from "./partner-slider";
import Reveal from "../ui/Reveal";
import { Separator } from "../ui/separator";
import PopupConsultationForm from "../common/PopupConsultationForm";
import DirectoryGrid from "../DirectoryGrid";

const Home = () => {
  const [directories, setDirectories] = useState([]);
  const [dataNew, setDataNew] = useState([]);

  const dataTinNoiBat = dataNew.filter(
    (item) => item.category === "Tin tức nổi bật",
  );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [newsRes, directoriesRes] = await Promise.all([
          apiGetNew(),
          apiGetDirectory(),
        ]);

        if (newsRes?.data?.data) setDataNew(newsRes.data.data);
        if (directoriesRes?.data?.data)
          setDirectories(directoriesRes.data.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchAll();
  }, []);

  const stripHTML = (htmlString) => {
    const temp = document.createElement("div");
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText || "";
  };

  return (
    <>
      <PageTitle title="Trang Chủ - Minh Dental" />
      <div className="w-full h-auto">
        <BannerHome />
      </div>

      <Reveal
        rootMargin="-36px"
        duration={0.9}
        y={20}
        threshold={1}
        className="mt-16 px-3"
      >
        <div className="max-w-7xl mx-auto space-y-3">
          <h2 className="text-xl text-center font-bold uppercase tracking-wide text-[#9c1d22] md:text-2xl lg:text-3xl">
            Everything for Your dental practice
          </h2>
          <div className="mx-auto mb-5 h-[3px] w-20 rounded-full bg-[#9c1d22]" />
          <DirectoryGrid directories={directories} />
        </div>
      </Reveal>

      <Reveal
        rootMargin="-36px"
        duration={0.9}
        y={20}
        threshold={1}
        className="mt-12 px-3"
      >
        <div className="rounded-2xl max-w-7xl mx-auto border border-[#9c1d22]/10 bg-[#9c1d22]/95 p-3 xs:p-4 lg:p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 lg:grid-cols-4">
            {/* Item */}
            <div className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12">
                <GiftIcon className="h-5 w-5 text-white" />
              </div>

              <span className="text-sm font-medium leading-snug text-white xs:text-[15px] lg:text-base">
                Đa dạng sản phẩm
              </span>
            </div>

            {/* Item */}
            <div className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-4 backdrop-blur-lg">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12">
                <TagIcon className="h-5 w-5 text-white" />
              </div>

              <span className="text-sm font-medium leading-snug text-white xs:text-[15px] lg:text-base">
                Thương hiệu uy tín
              </span>
            </div>

            {/* Item */}
            <div className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12">
                <HandThumbUpIcon className="h-5 w-5 text-white" />
              </div>

              <span className="text-sm font-medium leading-snug text-white xs:text-[15px] lg:text-base">
                Chính hãng, xuất VAT đầy đủ
              </span>
            </div>

            {/* Item */}
            <div className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12">
                <ShieldCheckIcon className="h-5 w-5 text-white" />
              </div>

              <span className="text-sm font-medium leading-snug text-white xs:text-[15px] lg:text-base">
                Đầy đủ giấy tờ thẩm định
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="max-w-7xl mx-auto w-full px-4">
        {/* Hiển thị sản phẩm nổi bật theo Directory */}
        <Reveal
          rootMargin="-80px"
          duration={0.9}
          y={20}
          threshold={1}
          className="mt-12"
        >
          <ProductGrid directories={directories} />
        </Reveal>

        <Reveal
          rootMargin="-50px"
          duration={0.8}
          y={40}
          threshold={1}
          className="mt-16"
        >
          <PartnerSlider />
        </Reveal>

        <Separator className="border-[0.5px] border-gray-200/60 my-16" />

        <div className="w-full rounded-3xl bg-white">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-xl font-bold uppercase tracking-wide text-[#9c1d22] md:text-2xl lg:text-3xl">
              TIN TỨC NỔI BẬT
            </h2>

            <div className="mx-auto mt-2 h-[3px] w-20 rounded-full bg-[#9c1d22]" />
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4 mt-10 ">
            {dataTinNoiBat.slice(0, 4).map((item, index) => (
              <Link
                key={item._id}
                href={`/tin-tuc-va-tai-lieu/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md"
              >
                {/* Mobile layout: image left, text right */}
                <div className="flex h-36 overflow-hidden rounded-xl border border-gray-200 md:hidden">
                  <div className="w-5/12">
                    <img
                      src={item.newPic}
                      alt={`New Image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex w-7/12 flex-col p-3">
                    <h3 className="line-clamp-2 text-base font-semibold text-blue-700">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                      {(() => {
                        const temp = document.createElement("div");
                        temp.innerHTML = item.description;
                        return temp.textContent || temp.innerText || "";
                      })()}
                    </p>
                  </div>
                </div>

                {/* Desktop layout: image on top */}
                <div className="hidden md:block">
                  <img
                    src={item.newPic}
                    alt={`New Image ${index + 1}`}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="line-clamp-2 text-center text-lg font-semibold text-blue-700">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-3 text-center text-base text-gray-600">
                      {stripHTML(item.description)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Link xem thêm */}
          <div className="flex flex-nowrap items-center justify-center gap-1.5 font-serif text-blue-700">
            <Link
              href="/tin-tuc-va-tai-lieu"
              className="text-[17px] hover:underline"
            >
              Xem thêm bản tin
            </Link>
            <ArrowRightCircleIcon className="mt-0.5 size-[18px]" />
          </div>
        </div>

        <Reveal
          threshold={1}
          rootMargin="-56px"
          duration={0.8}
          y={40}
          className="mt-12 mb-8"
        >
          <section className="max-w-6xl mx-auto">
            <PopupConsultationForm />
          </section>
        </Reveal>
      </div>
    </>
  );
};

export default Home;
