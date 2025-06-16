import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiUpdateCategory, apiGetCategory } from "@/apis/CategoryAPI";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
    
        const res = await apiGetCategory();
        if (res.data.success) {
          const matchedCategory = res.data.data.find((item) => item._id === id);
          if(matchedCategory){
            setTitle(matchedCategory.title);
          }
        } else {
          console.log("Không tìm thấy phân mục!");
        }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
      const res = await apiUpdateCategory(id, { title: title });
      if (res.data.success) {
        toast.success("Cập nhật phân mục thành công!");
        navigate("/admin/category");
      } else {
        console.log("Cập nhật thất bại!");
      }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa phân mục</h2>
        <Button variant="outline" onClick={() => navigate("/admin/category")}>
          Quay lại
        </Button>
      </div>

      {/* Form */}
      <div className="space-y-6 rounded-2xl border border-gray-200 p-6 shadow bg-white">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên phân mục <span className="text-red-500">*</span>
          </label>
          <Input
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Nhập tên phân mục"
          />
        </div>

        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!title}
          >
            Cập nhật phân mục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
