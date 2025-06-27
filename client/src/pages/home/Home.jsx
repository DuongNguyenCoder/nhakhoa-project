import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { apiGetNew } from "@/apis/NewsAPI";
import { apiGetPartner } from "@/apis/PartnerAPI";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import ProductCard from "@/components/ui/ProductCart";
import {
  GiftIcon,
  HandThumbUpIcon,
  ShieldCheckIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowRightCircleIcon,
  NewspaperIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Autoplay,
  Navigation,
  Pagination as SwiperPagination,
} from "swiper/modules";
import Pagination from "@/components/ui/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import PageTitle from "@/components/pageTitle";

const Home = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [selectDirectory, setSelectDirectory] = useState("");
  const [dataNew, setDataNew] = useState([]);
  const [logoPartner, setLogoPartner] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const dataTinNoiBat = dataNew.filter(
    (item) => item.category === "Tin tức nổi bật",
  );

  const filteredFeaturedProducts = dataProduct.filter(
    (p) =>
      p.isFeatured &&
      (!selectDirectory || String(p.directory._id) === selectDirectory),
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredFeaturedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(
    filteredFeaturedProducts.length / productsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectDirectory]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await apiGetNew();
      console.log("API GET NEW: ", res);
      if (res?.data?.data) {
        setDataNew(res.data.data);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      const res = await apiGetPartner();
      console.log("API GET PARTNER: ", res);
      if (res?.data?.data) {
        setLogoPartner(res.data.data);
      }
    };
    fetchPartners();
  }, []);

  useEffect(() => {
    const fetchDirectories = async () => {
      const res = await apiGetDirectory();
      console.log("API GET DIRECTORY: ", res.data.data);
      if (res?.data?.data) {
        setDirectories(res.data.data);
      }
    };
    fetchDirectories();
  }, []);

  useEffect(() => {
    const getDataProduct = async () => {
      const res = await apiGetAllProduct({ limit: 9999 });
      console.log("RES API GET ALL_PRODUCT", res);
      setDataProduct(res.data.data);
    };
    getDataProduct();
  }, []);

  return (
    <>
    <PageTitle title="Trang Chủ - Minh Dental" />
    <div className="mx-auto mt-5 min-h-screen items-center md:mx-2 lg:mx-5 xl:mx-8">
      <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 px-6 py-6 text-white md:grid-cols-2 lg:flex lg:justify-between">
        <div className="flex items-center gap-3">
          <GiftIcon className="h-7 w-7 md:h-8 md:w-8" />
          <span className="text-lg font-semibold lg:text-xl">
            Đa dạng sản phẩm
          </span>
        </div>
        <div className="flex items-center gap-3">
          <TagIcon className="h-7 w-7 md:h-8 md:w-8" />
          <span className="text-lg font-semibold lg:text-xl">
            Thương hiệu uy tín
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="h-7 w-7 md:h-8 md:w-8" />
          <span className="text-lg font-semibold lg:text-xl">
            Chính hãng, xuất VAT đầy đủ
          </span>
        </div>
        <div className="flex items-center gap-3">
          <HandThumbUpIcon className="h-7 w-7 md:h-8 md:w-8" />
          <span className="text-lg font-semibold lg:text-xl">
            Giá siêu tốt cho membership
          </span>
        </div>
      </div>

      {/* Hiển thị sản phẩm nổi bật theo Directory */}
      {dataProduct.some((p) => p.isFeatured) && (
        <div className="mt-6 w-full rounded-3xl bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-1.5 px-3">
            <div className="flex items-center gap-2">
              <StarIcon className="size-7 text-yellow-400" />
              <h2 className="text-base font-bold text-slate-800 md:text-lg">
                SẢN PHẨM NỔI BẬT - HOT DEAL
              </h2>
            </div>
            <select
              value={selectDirectory}
              onChange={(e) => setSelectDirectory(e.target.value)}
              className="rounded border px-3 py-1"
              aria-label="Chọn danh mục sản phẩm"
            >
              <option value="">Tất cả</option>
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id}>
                  {dir.title}
                </option>
              ))}
            </select>
          </div>

          {/* Tạo danh sách sản phẩm đã lọc */}
          {filteredFeaturedProducts.length > 0 ? (
            <div className="grid w-full grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} item={product} />
              ))}
            </div>
          ) : (
            <div className="py-4 text-center italic text-gray-600">
              Không có sản phẩm nổi bật nào trong danh mục này.
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      <div className="mx-2 my-3.5 w-full p-6">
        <div className="flex flex-wrap justify-center gap-4">
          {dataNew.slice(0, 3).map((item, index) => (
            <Link
              to={`/news/${item._id}`}
              key={index}
              className={`w-[90%] md:w-[48%] lg:w-[32%] ${index === 2 ? "md:mx-auto" : ""} h-52 md:h-56`}
            >
              <img
                src={item.newPic}
                alt={`New Image ${index + 1}`}
                className="h-full w-full rounded-2xl border-[2px] border-yellow-400 object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full rounded-3xl bg-white px-4 py-6">
        <div className="mb-3 flex w-full items-center gap-2 px-5 py-1">
          <UserGroupIcon className="size-7 text-slate-900" />
          <h2 className="text-base font-bold text-slate-800 md:text-lg">
            ĐỐI TÁC
          </h2>
        </div>
        <div className="mb-4 w-full px-4">
          <h3 className="text-lg font-medium text-gray-600">
            Minh Dental hợp tác chặt chẽ với nhiều đơn vị cung cấp trang thiết
            bị Nha khoa đến từ các thương hiệu nổi tiếng và lâu năm trên thế
            giới như: Cingol, Jindel, Baolai…, nhằm đảm bảo mang đến cho khách
            hàng nguồn hàng uy tín và chất lượng cao.
          </h3>
        </div>
        <div className="w-full">
          <Swiper
            key={logoPartner.length}
            modules={[Navigation, SwiperPagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false, // Không tắt autoplay khi user tương tác
              pauseOnMouseEnter: false, // Không dừng khi hover
              stopOnLastSlide: false, // Cho loop
              waitForTransition: false,
            }}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {logoPartner.map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="mx-auto flex h-[155px] w-[155px] items-center justify-center rounded-full bg-gray-200 shadow-sm">
                  <img
                    src={logo.partnerPic}
                    alt={`Logo Partner ${index + 1}`}
                    className="h-[140px] w-[140px] rounded-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="mt-6 w-full rounded-3xl bg-white p-6">
        {/* Header */}
        <div className="mb-3 flex w-full items-center gap-2 p-1">
          <NewspaperIcon className="size-7 text-slate-900" />
          <h2 className="text-base font-bold text-slate-800 md:text-lg">
            TIN TỨC NỔI BẬT - HOT NEW
          </h2>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {dataTinNoiBat.slice(0, 4).map((item, index) => (
            <Link
              key={index}
              to={`/news/${item._id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md"
            >
              {/* Mobile layout: image left, text right */}
              <div className="flex overflow-hidden rounded-xl border h-36 border-gray-200 md:hidden">
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
                  <h3 className="line-clamp-2 text-center text-base font-semibold text-blue-700">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-3 text-center text-sm text-gray-600">
                    {(() => {
                      const temp = document.createElement("div");
                      temp.innerHTML = item.description;
                      return temp.textContent || temp.innerText || "";
                    })()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Link xem thêm */}
        <div className="flex flex-nowrap items-center justify-center gap-1.5 font-serif text-blue-700">
          <Link to="/news" className="text-[17px] hover:underline">
            Xem thêm bản tin
          </Link>
          <ArrowRightCircleIcon className="mt-0.5 size-[18px]" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
