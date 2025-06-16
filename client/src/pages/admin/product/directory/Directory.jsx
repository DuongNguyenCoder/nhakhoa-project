import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiDeleteDirectory, apiGetDirectory } from "@/apis/DirectoryAPI";
import { toast } from "react-toastify";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";

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

const Directory = () => {
  const navigate = useNavigate();
  const [directories, setDirectories] = useState([]);

  const fetchDirectory = async () => {
    const res = await apiGetDirectory();
    if (res.data.success) {
      setDirectories(res.data.data);
    } else {
      console.log("Lỗi không lấy được danh mục!");
    }
  };
  useEffect(() => {
    fetchDirectory();
  }, []);

  const handleDeleteDirectory = async (id) => {
    const res = await apiDeleteDirectory(id);
    console.log("RESSSSS: ", res);
    if (res.data.success) {
      fetchDirectory();
      toast.warning("Xóa thành công!");
    } else {
      console.log("Lỗi xóa Directory!");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Danh mục sản phẩm</h2>
        <Button onClick={() => navigate("/admin/directory/create")}>
          + Tạo danh mục
        </Button>
      </div>

      {directories.length === 0 ? (
        <p className="text-gray-500">Chưa có danh mục nào.</p>
      ) : (
        <div className="space-y-4">
          {directories.map((item) => (
            <div
              key={item._id}
              className="flex items-start justify-between gap-4 rounded-lg border p-4 shadow transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="h-[80px] w-[100px] overflow-hidden rounded border">
                  <img
                    src={item.directoryPic}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="mb-1 text-base font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    Số phân mục con:{" "}
                    <span className="font-medium text-gray-800">
                      {item.category?.length ?? 0}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Tạo: {formatDate(item.createdAt)} | Cập nhật:{" "}
                    {formatDate(item.updatedAt)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/admin/directory/edit/${item._id}`)}
                >
                  Chỉnh sửa
                </Button>
                <DeleteConfirmDialog
                  onConfirm={() => handleDeleteDirectory(item._id)}
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

export default Directory;
