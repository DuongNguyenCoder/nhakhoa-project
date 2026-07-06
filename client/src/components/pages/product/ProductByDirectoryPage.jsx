import { apiGetAllProduct } from "@/apis/ProductAPI";
import ProductCard from "@/components/ui/ProductCart";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "../../../provider/react-router-dom";
import Pagination from "@/components/ui/Pagination";
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { CubeIcon } from "@heroicons/react/24/solid";

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
        <div className="mb-5 -mt-2 w-full border-b border-b-red-500 uppercase tracking-wider">
          <h1 className="text-xl font-bold text-red-600 shadow-lg">
            {directoryTitle}
          </h1>
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
          <h1 className="text-lg font-bold uppercase text-red-700">
            Các Dòng sản phẩm
          </h1>
        </div>

        {/* Hiển thị các dòng sản phẩm */}
        <div className="mt-4 grid w-full grid-cols-2 gap-8 px-3 md:grid-cols-3 xl:grid-cols-4">
          {dataDirectory.length > 0 ? (
            dataDirectory.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(
                    `/san-pham/directory?directory=${item._id}&title=${encodeURIComponent(item.title)}`,
                  )
                }
                className="group cursor-pointer overflow-hidden rounded-xl bg-gray-50 shadow-md transition duration-300 hover:shadow-lg"
              >
                <div className="h-36 w-full overflow-hidden">
                  <img
                    src={item.directoryPic}
                    alt={item.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-95"
                  />
                </div>
                <div className="p-3 text-center">
                  <h2 className="text-base font-semibold text-gray-800 transition-colors group-hover:text-red-600 md:text-lg">
                    {item.title}
                  </h2>
                </div>
              </div>
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
