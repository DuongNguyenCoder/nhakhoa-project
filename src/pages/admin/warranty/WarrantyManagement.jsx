import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { apiDeleteWarranty, apiGetAllWarranty } from "@/apis/WarrantyAPI";
import { useNavigate } from "react-router-dom";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { CalendarDays, Clock } from "lucide-react";
import Pagination from "@/components/ui/Pagination";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function WarrantyManagement() {
  const [warranties, setWarranties] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    await apiGetAllWarranty({page: currentPage})
      .then((rs) => {
        if (rs.data && rs.data.success) {
          setWarranties(rs.data.data);
          setTotalPages(rs.data.pagination.totalPages);
        } else {
          console.log("Lỗi lấy data warranty.");
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id) => {
    await apiDeleteWarranty(id)
      .then((rs) => {
        if (rs.data && rs.data.success) {
          fetchData();
          toast.warning("Xóa thông tin bảo hành thành công");
        } else {
          console.log("Lỗi xóa Warranty.");
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý bảo hành</h1>
        <Button onClick={() => navigate("/admin/warranty/create")}>
          Thêm bảo hành
        </Button>
      </div>

      <div className="space-y-6">
        {warranties.map((item) => (
          <Card
          key={item._id}
          className="border rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left Section: 60% */}
              <div className="md:w-3/5 space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.productId?.title || "Không rõ tên sản phẩm"}
                </h2>
                <p className="text-gray-700">
                  <strong>Thời hạn:</strong> {item.durationMonths} tháng
                </p>
        
                <div className="text-sm text-gray-500 space-y-1">
                  <p className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    Tạo: {formatDate(item.createdAt)}
                  </p>
                  <p className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Cập nhật: {formatDate(item.updatedAt)}
                  </p>
                </div>
        
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => navigate(`/admin/warranty/edit/${item._id}`)}
                    size="sm"
                    variant="outline"
                  >
                    Chỉnh sửa
                  </Button>
                  <DeleteConfirmDialog onConfirm={() => handleDelete(item._id)}>
                    <Button size="sm" variant="destructive">
                      Xóa
                    </Button>
                  </DeleteConfirmDialog>
                </div>
              </div>
        
              {/* Right Section: 40% */}
              <div className="md:w-2/5 bg-gray-50 p-4 rounded-xl text-sm text-gray-700 whitespace-pre-line border h-fit">
                <p className="font-medium text-gray-800 mb-2 ">Điều khoản:</p>
                {item.terms}
              </div>
            </div>
          </CardContent>
        </Card>        
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}/>
    </div>
  );
}
