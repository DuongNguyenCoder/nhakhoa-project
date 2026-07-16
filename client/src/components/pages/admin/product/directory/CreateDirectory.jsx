import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { apiAddDirectory } from "@/apis/DirectoryAPI";
import { toast } from "react-toastify";
import { apiGetCategory } from "@/apis/CategoryAPI";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateDirectory = () => {
  const router = useRouter();

  const [previewImg, setPreviewImg] = useState(null);

  const [form, setForm] = useState({
    title: "",
    directoryPic: null,
    category: [], // mảng chứa id các category được chọn
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "directoryPic") {
      const file = files[0];
      setForm((prev) => ({ ...prev, directoryPic: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImg(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImg(null);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (id) => {
    setForm((prev) => {
      const exists = prev.category.includes(id);
      const newCategory = exists
        ? prev.category.filter((item) => item !== id)
        : [...prev.category, id];
      return { ...prev, category: newCategory };
    });
  };

  const handleSubmit = async () => {
    const submitData = new FormData();
    submitData.append("title", form.title);
    submitData.append("directoryPic", form.directoryPic);
    form.category.forEach((id) => {
      submitData.append("category[]", id);
    });

    await apiAddDirectory(submitData)
      .then((rs) => {
        if (rs.data && rs.data.success) {
          router.push("/admin/directory");
          toast.success("Thêm thành công!");
        } else {
          toast.warning("Vui lòng điền đầy đủ tất cả thông tin!");
          console.log("Lỗi thêm Directory!");
        }
      })
      .catch((err) => {
        toast.warning("Vui lòng chọn ít nhất 1 phân mục!");
        console.log(err);
      });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tạo danh mục sản phẩm</h2>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/directory")}
        >
          Quay lại
        </Button>
      </div>

      <div className="space-y-5 rounded-lg border p-6 shadow bg-white">
        {/* Tên danh mục */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Tên danh mục <span className="text-red-500">*</span>
          </label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nhập tên danh mục"
          />
        </div>

        {/* Ảnh danh mục */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Ảnh danh mục <span className="text-red-500">(Ảnh tỉ lệ 1:1)*</span>
          </label>
          <Input
            name="directoryPic"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          {previewImg && (
            <div className="mt-3 relative w-[200px] aspect-square rounded border overflow-hidden">
              <Image
                src={previewImg}
                alt="preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Nút submit */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!form.title || !form.directoryPic}
          >
            Lưu danh mục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDirectory;
