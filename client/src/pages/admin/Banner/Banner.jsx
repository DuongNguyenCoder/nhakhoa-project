import { apiDeleteBanner, apiGetBanner } from "@/apis/BannerAPI";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

const Banner = () => {
  const navigate = useNavigate();
  const [dataBanner, setDataBanner] = useState([]);

  const fetchBanner = async () => {
    try {
      const res = await apiGetBanner();
      if (res.data.success) {
        setDataBanner(res.data.data);
      } else {
        console.log("Lỗi lấy data banner!");
      }
    } catch (error) {
      console.error("Lỗi API banner:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleDeleteBanner = async (id) => {
    const res = await apiDeleteBanner(id);
    if (res.data.success) {
      fetchBanner();
      toast.warning("Xóa thành công!");
    } else {
      console.log("Xóa Banner lỗi!");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Danh sách banner</h2>
        <Button onClick={() => navigate("/admin/banner/create")}>
          + Tạo mới
        </Button>
      </div>

      {dataBanner.length === 0 ? (
        <p className="text-gray-600">Chưa có banner nào.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {dataBanner.map((item) => (
            <div
              key={item._id}
              className="flex items-start justify-between rounded-lg border px-4 py-4 shadow-md gap-6 bg-white"
            >
              <div className="flex gap-4">
                <div className="h-[120px] w-[200px] flex-shrink-0">
                  <img
                    src={item.bannerPic}
                    alt={`banner-${item._id}`}
                    className="h-full w-full rounded object-contain border"
                  />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div>
                    <span className="font-medium">Trạng thái:</span>{" "}
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs text-white ${
                        item.status === "ENABLE"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {item.status === "ENABLE" ? "Kích hoạt" : "Ẩn"}
                    </span>
                  </div>
                  <div className="text-gray-500">ID: {item._id}</div>
                  <div className="text-gray-600 flex gap-1">
                    <span className="font-medium">Url: </span>
                    {item.url}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Tạo lúc:</span>{" "}
                    {formatDate(item.createdAt)}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Cập nhật gần nhất:</span>{" "}
                    {formatDate(item.updatedAt)}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-start">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/admin/banner/edit/${item._id}`)}
                >
                  Chỉnh sửa
                </Button>
                <DeleteConfirmDialog
                  onConfirm={() => handleDeleteBanner(item._id)}
                >
                  <Button variant="destructive">Xoá</Button>
                </DeleteConfirmDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;
