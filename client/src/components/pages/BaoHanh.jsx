import React, { useEffect, useState } from "react";
import { apiGetAllWarranty } from "@/apis/WarrantyAPI";
// import { apiGetAllProduct } from "@/apis/ProductAPI";
import Pagination from "@/components/ui/Pagination";
import PageTitle from "@/components/pageTitle";

const BaoHanh = () => {
  const [warranty, setWarranty] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [products, setProducts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);

  // const pageSize = 10; // số bản ghi mỗi trang

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [warrantyRes, productRes] = await Promise.all([
  //       apiGetAllWarranty({ limit: 9999 }),
  //       apiGetAllProduct({ limit: 9999 }),
  //     ]);

  //     if (warrantyRes.data.success) {
  //       setWarranties(warrantyRes.data.data);
  //     } else {
  //       console.error("Lỗi lấy bảo hành!");
  //     }

  //     if (productRes.data.success) {
  //       setProducts(productRes.data.data);
  //     } else {
  //       console.error("Lỗi lấy sản phẩm!");
  //     }
  //   };

  //   fetchData();
  // }, []);

  // // Tìm các productId phù hợp với từ khóa
  // const matchedProductIds = products
  //   .filter((product) =>
  //     product.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .map((product) => product._id);

  // // Lọc danh sách bảo hành theo sản phẩm
  // const filteredWarranties =
  //   searchTerm.trim() === ""
  //     ? warranties
  //     : warranties.filter((warranty) =>
  //         matchedProductIds.includes(warranty.productId._id)
  //       );

  // // Phân trang trên dữ liệu đã lọc
  // const totalFilteredPages = Math.ceil(filteredWarranties.length / pageSize);
  // const paginatedWarranties = filteredWarranties.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );

  useEffect(() => {
    apiGetAllWarranty({limit: 1}).then((rs) => {
      if(rs.data && rs.data.success){
        console.log("Dữ liệu warranty:", rs.data.data);
        const data = rs.data.data;
        if(data.length > 0){
          setWarranty(data[0]);
        }

      } else{
        console.error("Lỗi data warranty");
      }
    }
    ).catch((err) => {
      console.error("Lỗi: ", err);
    }
    ).finally(() => setLoading(false));
  },[]);

  return (
    <>
    <PageTitle title="Bảo Hành - Minh Dental" />
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
        Chính Sách Bảo Hành
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 animate-pulse">
          Đang tải dữ liệu...
        </div>
      ) : warranty ? (
        <div className="bg-white rounded-xl px-6 shadow-md pb-5 pt-3 border">
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: warranty.terms }}
            ></div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Chưa có chính sách bảo hành.</p>
      )}
    </div>
    </>
  );
};

export default BaoHanh;
