import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import Pagination from "@/components/ui/Pagination";
import { apiDeleteProduct, apiGetAllProduct } from "@/apis/ProductAPI";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProductManagement = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    const res = await apiGetAllProduct({
      page: currentPage,
      title: searchTerm,
    });

    if (res.data.success) {
      setProducts(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } else {
      console.log("Không thể lấy danh sách sản phẩm.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchTotal = async () => {
      const res = await apiGetAllProduct({ limit: 9999 });
      if (res.data.success) {
        setTotalProducts(res.data.data.length);
      }
    };
    fetchTotal();
  }, []);

  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const res = await apiDeleteProduct(id);
    if (res.data.success) {
      toast.success("Xóa thành công!");
      setProducts(products.filter((product) => product._id !== id));
    } else {
      console.log("Xóa sản phẩm thất bại!");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Quản lý sản phẩm
        </h2>
        <Button
          onClick={() => router.push("/admin/product/create")}
          variant="outline"
        >
          + Thêm sản phẩm
        </Button>
      </div>

      {/* Tìm kiếm */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm text-sm"
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      {/* Tổng sản phẩm */}
      <div className="text-sm text-gray-600">
        Tổng số sản phẩm: <span className="font-medium">{totalProducts}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <Table>
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="p-4 text-left">Ảnh</th>
              <th className="p-4 text-left">Tên sản phẩm</th>
              <th className="p-4 text-left">Danh mục</th>
              <th className="p-4 text-left">Phân mục</th>
              <th className="p-4 text-center">Nổi bật</th>
              <th className="p-4 text-center">Thanh lý</th>
              <th className="p-4 text-left text-xs font-normal text-gray-500">
                Tạo lúc
              </th>
              <th className="p-4 text-left text-xs font-normal text-gray-500">
                Cập nhật
              </th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={product.productPics[0]}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                </td>
                <td className="p-4 font-medium">{product.title}</td>
                <td className="p-4">
                  {product.directory?.title || "Không có"}
                </td>
                <td className="p-4">{product.category?.title || "Không có"}</td>
                <td className="p-4 text-center">
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      product.isFeatured
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.isFeatured ? "Có" : "Không"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      product.isLiquidation
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.isLiquidation ? "Có" : "Không"}
                  </span>
                </td>
                <td className="p-4 text-xs text-gray-500">
                  {new Date(product.createdAt).toLocaleString()}
                </td>
                <td className="p-4 text-xs text-gray-500">
                  {new Date(product.updatedAt).toLocaleString()}
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <Button
                    onClick={() =>
                      router.push(`/admin/product/edit/${product._id}`)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Sửa
                  </Button>
                  <DeleteConfirmDialog
                    onConfirm={() => handleDelete(product._id)}
                  >
                    <Button variant="destructive">Xoá</Button>
                  </DeleteConfirmDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductManagement;
