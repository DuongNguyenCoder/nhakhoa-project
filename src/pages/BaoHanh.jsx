import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { apiGetAllWarranty } from "@/apis/WarrantyAPI";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import Pagination from "@/components/ui/Pagination";

const BaoHanh = () => {
  const [warranties, setWarranties] = useState([]); // dữ liệu gốc
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10; // số bản ghi mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      const [warrantyRes, productRes] = await Promise.all([
        apiGetAllWarranty({ limit: 9999 }),
        apiGetAllProduct({ limit: 9999 }),
      ]);

      if (warrantyRes.data.success) {
        setWarranties(warrantyRes.data.data);
      } else {
        console.error("Lỗi lấy bảo hành!");
      }

      if (productRes.data.success) {
        setProducts(productRes.data.data);
      } else {
        console.error("Lỗi lấy sản phẩm!");
      }
    };

    fetchData();
  }, []);

  // Tìm các productId phù hợp với từ khóa
  const matchedProductIds = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((product) => product._id);

  // Lọc danh sách bảo hành theo sản phẩm
  const filteredWarranties =
    searchTerm.trim() === ""
      ? warranties
      : warranties.filter((warranty) =>
          matchedProductIds.includes(warranty.productId._id)
        );

  // Phân trang trên dữ liệu đã lọc
  const totalFilteredPages = Math.ceil(filteredWarranties.length / pageSize);
  const paginatedWarranties = filteredWarranties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Danh sách bảo hành</h2>

      {/* Ô tìm kiếm */}
      <div className="mb-6 max-w-md">
        <input
          type="text"
          placeholder="Tìm theo tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset về trang 1 khi tìm kiếm
          }}
          className="text-sm w-full p-2 border rounded"
        />
      </div>

      {/* Danh sách bảo hành */}
      <div className="grid gap-4 md:grid-cols-2">
        {paginatedWarranties.length > 0 ? (
          paginatedWarranties.map((warranty) => (
            <div
              key={warranty._id}
              className="rounded-xl border p-4 shadow-md bg-white dark:bg-gray-900"
            >
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-800 dark:text-white">
                  Sản phẩm:
                </span>{" "}
                {warranty.productId.title}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-800 dark:text-white">
                  Tạo lúc:
                </span>{" "}
                {dayjs(warranty.createdAt).format("DD/MM/YYYY HH:mm")}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold text-gray-800 dark:text-white">
                  Thời hạn:
                </span>{" "}
                {warranty.durationMonths} tháng
              </p>
              <div className="whitespace-pre-line text-gray-800 dark:text-gray-100 text-sm">
                {warranty.terms}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Không tìm thấy kết quả phù hợp.</p>
        )}
      </div>

      {/* Phân trang client */}
      {totalFilteredPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalFilteredPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default BaoHanh;
