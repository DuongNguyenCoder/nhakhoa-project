import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiAddNew } from "@/apis/NewsAPI";
import DescriptionEditor from "@/components/common/DescriptionEditor";
import { useNavigate } from "react-router-dom";

export default function CreateNew() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "ENABLE",
    newPic: null,
  });

  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, newPic: file}));
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    console.log("test: ", file);
    if (file && file.type === "application/pdf") {
      setPdfUrl(file);
      setPdfPreview(URL.createObjectURL(file));
    } else {
      toast.error("Vui lòng chọn đúng định dạng file PDF.");
    }
  };
  console.log("kog:", form);

  const handleSubmit = async () => {
    if (!form.title || !form.newPic || !pdfUrl) {
      return toast.error("Vui lòng nhập đủ tiêu đề, ảnh và file PDF.");
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      formData.append("pdfUrl", pdfUrl);

      const res = await apiAddNew(formData);
      if (res.data?.success) {
        toast.success("Tạo tin tức thành công!");
        setForm({
          title: "",
          description: "",
          category: "",
          status: "ENABLE",
          newPic: null,
          pdfUrl: null,
        });
        setPreviewImg(null);
        setPdfUrl(null);
        setPdfPreview(null);
        setIsFeatured(false);
        navigate("/admin/news");
      } else {
        toast.error("Tạo bài viết thất bại.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi tạo bài viết.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Tạo bài viết mới</h1>

      {/* Tiêu đề */}
      <div className="space-y-2">
        <Label htmlFor="title">Tiêu đề</Label>
        <Input
          id="title"
          name="title"
          placeholder="Nhập tiêu đề bài viết"
          value={form.title}
          onChange={handleInputChange}
        />
      </div>

      {/* Hình ảnh đại diện */}
      <div className="space-y-2">
        <Label>Ảnh đại diện</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {previewImg && (
          <img
            src={previewImg}
            alt="preview"
            className="mt-2 h-48 w-full rounded-lg border object-contain"
          />
        )}
      </div>

      {/* File PDF đính kèm */}
      <div className="space-y-2">
        <Label>File PDF (nội dung chính & tài liệu đính kèm)</Label>
        <Input type="file" accept="application/pdf" onChange={handlePdfChange} />
        {pdfPreview && (
          <div className="mt-2 h-[400px] w-full overflow-hidden rounded border">
            <embed src={pdfPreview} type="application/pdf" className="h-full w-full" />
          </div>
        )}
      </div>

      {/* Danh mục và trạng thái */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-2">
          <Label>Loại tin tức</Label>
          <Input
            name="category"
            placeholder="Nhập loại tin tức (VD: Y học cổ truyền...)"
            value={isFeatured ? "Tin tức nổi bật" : form.category}
            onChange={handleInputChange}
            disabled={isFeatured}
          />
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="featuredNews"
              checked={isFeatured}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsFeatured(checked);
                setForm((prev) => ({
                  ...prev,
                  category: checked ? "Tin tức nổi bật" : "",
                }));
              }}
              className="h-4 w-4 accent-blue-600 transition"
            />
            <Label htmlFor="featuredNews" className="cursor-pointer text-sm text-gray-700">
              Đặt làm <strong>Tin tức nổi bật</strong>
            </Label>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <Label>Trạng thái</Label>
          <Select
            value={form.status}
            onValueChange={(val) => setForm((prev) => ({ ...prev, status: val }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ENABLE">Kích hoạt</SelectItem>
              <SelectItem value="DISABLE">Tạm ẩn</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Nội dung chi tiết */}
      <div className="space-y-2">
        <Label>Nội dung chi tiết</Label>
        <DescriptionEditor
          value={form.description}
          onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
        />
      </div>

      <Button onClick={handleSubmit} className="mt-4 w-full">
        Tạo bài viết
      </Button>
    </div>
  );
}
