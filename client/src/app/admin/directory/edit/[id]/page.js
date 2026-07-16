"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DirectoryService from "@/services/directory.service";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  console.log("ID Dir => ", id);

  // State form
  const [form, setForm] = useState({
    title: "",
    directoryPic: null,
  });
  const [previewImg, setPreviewImg] = useState(null);

  // Load data directory & categories
  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const dir = await DirectoryService.getById(id);
      if (dir) {
        console.log("Fetch dir => ", dir);
        setForm({
          title: dir.title ?? "",
          directoryPic: dir.directoryPic ?? null,
        });
        setPreviewImg(dir.directoryPic ?? null);
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

    try {
      const res = await DirectoryService.update({ id, data });
      if (res?.success) {
        toast.success("Cập nhật thành công!");
        router.push("/admin/directory");
        return;
      }
      toast.error("Cập nhật thất bại.");
      console.error("Lỗi cập nhật Directory!", res);
    } catch (err) {
      toast.error("Cập nhật thất bại.");
      console.error();
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

        {/* (Categories removed) */}

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
