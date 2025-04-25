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
    <div className="mx-auto mt-5 min-h-screen items-center md:mx-2 lg:mx-5 xl:mx-8">
      <div className="mt-2 grid grid-cols-2 justify-between gap-5 text-wrap rounded-xl bg-red-400 px-6 py-4 text-lg font-bold text-white md:flex lg:text-xl">
        <div className="flex items-center gap-2">
          <GiftIcon className="size-6 md:size-7 lg:size-8" />
          <span>Đa dạng sản phẩm</span>
        </div>
        <div className="flex items-center gap-2">
          <TagIcon className="size-6 md:size-7 lg:size-8" />
          <span>Thương hiệu uy tín</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="size-6 md:size-7 lg:size-8" />
          <span>Chính hãng, xuất VAT đầy đủ</span>
        </div>
        <div className="flex items-center gap-2">
          <HandThumbUpIcon className="size-6 md:size-7 lg:size-8" />
          <span>Giá siêu tốt cho membership</span>
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
                className="h-full w-full rounded-2xl object-cover"
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
        <div className="mb-3 flex w-full items-center gap-2 p-1">
          <NewspaperIcon className="size-7 text-slate-900" />
          <h2 className="text-base font-bold text-slate-800 md:text-lg">
            TIN TỨC NỔI BẬT - HOT NEW
          </h2>
        </div>
        <div className="mb-6 flex justify-center gap-2 md:gap-3 lg:gap-4 xl:gap-7 2xl:gap-9">
          {dataTinNoiBat.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className={`flex w-full flex-col md:w-1/4 xl:w-1/5 ${index === 3 ? "hidden md:flex" : ""}`}
            >
              <Link to={`/news/${item._id}`} key={index}>
                <img
                  src={item.newPic}
                  alt={`New Image ${index + 1}`}
                  className="h-40 w-full rounded-xl object-cover"
                />
                <h3 className="mb-0.5 mt-2.5 text-center font-semibold text-[#0d6efd]">
                  {item.title}
                </h3>
              </Link>
              <span className="line-clamp-3 text-sm text-gray-700">
                {(() => {
                  const temp = document.createElement("div");
                  temp.innerHTML = item.description;
                  return temp.textContent || temp.innerText || "";
                })()}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-nowrap items-center justify-center gap-1.5 font-serif text-blue-700">
          <Link to="/news" className="text-[17px] hover:underline">
            Xem thêm bản tin
          </Link>
          <ArrowRightCircleIcon className="mt-0.5 size-[18px]" />
        </div>
      </div>
    </div>
  );
};

export default Home;
