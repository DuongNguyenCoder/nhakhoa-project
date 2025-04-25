import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiAddCategory } from "@/apis/CategoryAPI";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    const res = await apiAddCategory({title: title});
    if (res.data.success) {
      toast.success("Tạo phân mục thành công!");
      navigate("/admin/category");
    } else {
      console.log("Lỗi tạo category!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tạo phân mục</h2>
        <Button variant="outline" onClick={() => navigate("/admin/category")}>
          Quay lại
        </Button>
      </div>

      {/* Form Container */}
      <div className="space-y-6 rounded-2xl border border-gray-200 p-6 shadow bg-white">
        {/* Tên phân mục */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên phân mục <span className="text-red-500">*</span>
          </label>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tên phân mục"
          />
        </div>

        {/* Nút submit */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!title.trim()}
          >
            Lưu phân mục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
