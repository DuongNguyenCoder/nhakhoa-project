"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { apiGetDirectory, apiUpdateDirectory } from "@/apis/DirectoryAPI";
import { apiGetCategory } from "@/apis/CategoryAPI";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  // State form
  const [form, setForm] = useState({
    title: "",
    directoryPic: null,
    category: [], // mảng id các phân mục con
  });
  const [previewImg, setPreviewImg] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  // Load data directory & categories
  useEffect(() => {
    const load = async () => {
      // 1) Lấy directory
      const dirRes = await apiGetDirectory();
      if (dirRes.data.success) {
        const dir = dirRes.data.data.find((d) => d._id === id);
        if (dir) {
          setForm({
            title: dir.title,
            directoryPic: dir.directoryPic, // file mới
            category: dir.category.map((c) => c._id),
          });
          setPreviewImg(dir.directoryPic);
        }
      }
      // 2) Lấy tất cả category
      const catRes = await apiGetCategory();
      if (catRes.data.success) {
        setAllCategories(catRes.data.data);
      }
    };
    load();
  }, [id]);

  // Xử lý input text & file
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "directoryPic") {
      const file = files[0];
      setForm((p) => ({ ...p, directoryPic: file ?? p.directoryPic }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImg(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  // Chọn/bỏ chọn category
  const toggleCategory = (catId) => {
    setForm((p) => {
      const has = p.category.includes(catId);
      return {
        ...p,
        category: has
          ? p.category.filter((c) => c !== catId)
          : [...p.category, catId],
      };
    });
  };

  // Gửi update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);

    let directoryFile = form.directoryPic;

    if (typeof directoryFile === "string") {
      const response = await fetch(directoryFile);
      const blob = await response.blob();
      const fileName = directoryFile.split("/").pop();
      directoryFile = new File([blob], fileName, { type: blob.type });
    }

    data.append("directoryPic", directoryFile);
    form.category.forEach((c) => data.append("category[]", c));

    const res = await apiUpdateDirectory(id, data);
    console.log("Directories: ", res);
    if (res.data.success) {
      toast.success("Cập nhật thành công!");
      router.push("/admin/directory");
    } else {
      toast.error("Cập nhật thất bại.");
      console.log("Lỗi cập nhật Directory!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Chỉnh sửa danh mục
        </h2>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/directory")}
        >
          Hủy
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="mb-1">
            Tiêu đề <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề danh mục"
          />
        </div>

        {/* Image */}
        <div>
          <Label htmlFor="directoryPic" className="mb-1">
            Ảnh danh mục (Chọn ảnh có tỉ lệ 1:1)
          </Label>
          <Input
            id="directoryPic"
            name="directoryPic"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          {previewImg && (
            <div className="mt-2 w-full h-[200px] border rounded overflow-hidden">
              <img
                src={previewImg}
                alt="preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Categories (checkbox) */}
        <div>
          <Label className="mb-1">Chọn phân mục con</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto p-2 border rounded">
            {allCategories.map((cat) => (
              <label
                key={cat._id}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.category.includes(cat._id)}
                  onChange={() => toggleCategory(cat._id)}
                  className="accent-green-600"
                />
                <span>{cat.title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/directory")}
          >
            Hủy
          </Button>
          <Button type="submit">Lưu thay đổi</Button>
        </div>
      </form>
    </div>
  );
}
