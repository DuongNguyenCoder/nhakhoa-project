import { apiGetAllProduct } from "@/apis/ProductAPI";
import ProductCard from "@/components/ui/ProductCart";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "../../../provider/react-router-dom";
import Pagination from "@/components/ui/Pagination";
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { CubeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const ProductByDirectoryPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const directoryId = query.get("directory");
  const directoryTitle = query.get("title") || "Sản phẩm";
  const [products, setProducts] = useState([]);
  const [dataDirectory, setDataDirectory] = useState([]);
  console.log("directoryId: ", directoryId);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDirectory = async () => {
      await apiGetDirectory()
        .then((res) => {
          if (res.data?.success) {
            setDataDirectory(res.data.data);
          } else {
            console.log("Lỗi get directory!");
          }
        })
        .catch((err) => {
          console.error("Lỗi: ", err);
        });
    };
    fetchDirectory();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [directoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await apiGetAllProduct({
        directory: directoryId,
        page: currentPage,
      });
      console.log("Get ALL PRODUCT BY DIRECTORY: ", res);
      if (res?.data?.data) {
        setProducts(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    };
    fetchProducts();
  }, [directoryId, currentPage]);

  return (
    <div className="w-full space-y-8">
      <div className="rounded-2xl bg-white px-4 py-6 shadow-xl 2xl:px-10">
        <div className="mb-6 -mt-2 w-full ">
          <h1 className="text-lg text-center font-bold uppercase text-[#9c1d22] md:text-xl lg:text-2xl">
            {directoryTitle}
          </h1>

          <div className="mx-auto mt-2 h-[3px] w-20 rounded-full bg-[#9c1d22]" />
        </div>
        <div className="grid w-full grid-cols-2 gap-5 px-5 md:grid-cols-3 md:px-0 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
        <div className="w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Hiển thị Directory */}
      <div
        id="directory-list"
        className="rounded-2xl bg-white px-4 py-6 shadow-xl 2xl:px-10"
      >
        <div className="flex w-full items-center gap-2">
          <CubeIcon className="size-7 text-yellow-400" />
          <h1 className="text-lg font-bold uppercase text-[#9c1d22]">
            Các Dòng sản phẩm
          </h1>
        </div>

        {/* Hiển thị các dòng sản phẩm */}
        <div className="mt-4 grid w-full grid-cols-2 gap-8 px-3 md:grid-cols-3 xl:grid-cols-4">
          {dataDirectory.length > 0 ? (
            dataDirectory.map((directory) => (
              <Link
                key={directory._id}
                href={`/san-pham/directory?directory=${directory._id}&title=${encodeURIComponent(directory.title)}`}
                className="group"
              >
                <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-[#9c1d22]/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9c1d22] hover:shadow-lg">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={directory.directoryPic}
                      alt={directory.title}
                      fill
                      className="object-contain"
                      sizes="120px"
                    />
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-center text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-[#9c1d22] md:text-base">
                    {directory.title}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Không có dòng sản phẩm nào!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductByDirectoryPage;
