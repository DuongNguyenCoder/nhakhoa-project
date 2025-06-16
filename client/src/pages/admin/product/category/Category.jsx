import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, Trash } from "lucide-react";  // Thêm icon Trash
import { apiGetCategory } from "@/apis/CategoryAPI";
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { apiDeleteCategory } from "@/apis/CategoryAPI";
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

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [directories, setDirectories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const res = await apiGetCategory();
    if (res.data.success) {
      setCategories(res.data.data);
    } else {
      console.log("Lỗi lấy category!");
    }
  };

  const fetchDirectories = async () => {
    const res = await apiGetDirectory();
    if (res.data.success) {
      setDirectories(res.data.data);
    } else {
      console.log("Lỗi lấy directory!");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchDirectories();
  }, []);

  // Hàm xóa category
  const handleDeleteCategory = async (id) => {
    const res = await apiDeleteCategory(id);
    if (res.data.success) {
      fetchCategories();  // Gọi lại fetch để cập nhật danh sách sau khi xóa
      toast.success("Xóa thành công!");
    } else {
      console.log("Lỗi khi xóa category!");
    }
  };

  // Tính toán số lượng directories liên quan đến mỗi category
  const categoryCount = categories.map((category) => {
    const relatedDirectories = directories.filter((directory) =>
      directory.category.some((cat) => cat._id === category._id)  // Kiểm tra xem _id của category có trong mảng directory.category hay không
    );
    console.log("relatedDirectories: ", relatedDirectories);
    return {
      ...category,
      relatedDirectoriesCount: relatedDirectories.length,  // Số lượng directory liên quan
    };
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Danh sách phân mục
        </h2>
  
        <div className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-full shadow-sm">
          Tổng số: <strong>{categories.length}</strong> phân mục
        </div>
  
        <Button onClick={() => navigate("/admin/category/create")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Thêm phân mục
        </Button>
      </div>
  
      {/* Nội dung */}
      {categories.length === 0 ? (
        <div className="text-center text-gray-500">Chưa có phân mục nào.</div>
      ) : (
        <div className="space-y-6">
          {categoryCount.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Gắn với {item.relatedDirectoriesCount || 0} danh mục
                </p>
              </div>
  
              <div className="text-sm text-gray-500">
                <p>
                  <strong>Ngày tạo: </strong>
                  {formatDate(item.createdAt)}
                </p>
                <p>
                  <strong>Ngày cập nhật: </strong>
                  {formatDate(item.updatedAt)}
                </p>
              </div>
  
              <div className="mt-4 flex justify-between">
                <Button
                  onClick={() => navigate(`/admin/category/edit/${item._id}`)}
                  className="bg-slate-50 text-black hover:bg-slate-100 border shadow-md w-32"
                >
                  Chỉnh sửa
                </Button>
                <DeleteConfirmDialog
                  onConfirm={() => handleDeleteCategory(item._id)}
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

export default Category;
