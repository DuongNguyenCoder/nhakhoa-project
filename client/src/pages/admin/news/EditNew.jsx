import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import DescriptionEditor from "@/components/common/DescriptionEditor";
import { apiGetNew, apiUpdateNew } from "@/apis/NewsAPI";

export default function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "ENABLE",
    newPic: null,
    pdfUrl: null,
  });
  const [previewImg, setPreviewImg] = useState(null);
  const [originalImgUrl, setOriginalImgUrl] = useState(null);
  const [originalPdfUrl, setOriginalPdfUrl] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiGetNew();
        if (res.data?.success) {
          const item = res.data.data.find((e) => e._id === id);
          if (item) {
            setForm({
              title: item.title,
              description: item.description,
              category: item.category,
              status: item.status,
              newPic: null,
              pdfUrl: null,
            });
            setPreviewImg(item.newPic);
            setOriginalImgUrl(item.newPic);
            setOriginalPdfUrl(item.pdfUrl);
            setPdfPreview(item.pdfUrl);
          } else {
            toast.error("Không tìm thấy bài viết");
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Lỗi khi tải dữ liệu bài viết");
      }
    };

    if (id) fetchNews();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, newPic: file }));
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setForm((prev) => ({ ...prev, pdfUrl: file }));
      setPdfPreview(URL.createObjectURL(file));
    } else {
      toast.error("Vui lòng chọn đúng định dạng file PDF.");
    }
  };

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
  };

  const handleSubmit = async () => {
    if (!form.title) {
      return toast.error("Vui lòng nhập đầy đủ thông tin");
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("status", form.status);

      // Ảnh đại diện
      if (form.newPic) {
        formData.append("newPic", form.newPic);
      } else if (originalImgUrl) {
        const file = await urlToFile(originalImgUrl, "image.jpg", "image/jpeg");
        formData.append("newPic", file);
      }

      // File PDF
      if (form.pdfUrl instanceof File) {
        formData.append("pdfUrl", form.pdfUrl);
      } else if (originalPdfUrl) {
        const file = await urlToFile(originalPdfUrl, "file.pdf", "application/pdf");
        formData.append("pdfUrl", file);
      }

      const res = await apiUpdateNew(id, formData);
      if (res.data?.success) {
        toast.success("Cập nhật bài viết thành công");
        navigate("/admin/news");
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi khi cập nhật bài viết");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Chỉnh sửa bài viết</h1>

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

      {/* Ảnh đại diện */}
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

      {/* Danh mục & Trạng thái */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-2">
          <Label>Loại tin tức</Label>
          <Input
            name="category"
            placeholder="Nhập loại tin tức"
            value={form.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-1 space-y-2">
          <Label>Trạng thái</Label>
          <select
            className="w-full rounded-md border px-3 py-2"
            name="status"
            value={form.status}
            onChange={handleInputChange}
          >
            <option value="ENABLE">Kích hoạt</option>
            <option value="DISABLE">Tạm ẩn</option>
          </select>
        </div>
      </div>

      {/* Nội dung chi tiết */}
      <div className="space-y-2">
        <Label>Nội dung chi tiết</Label>
        <DescriptionEditor
          value={form.description}
          onChange={(val) => setForm((prev) => ({ ...prev, description: val }))}
        />
      </div>

      <Button onClick={handleSubmit} className="mt-4 w-full">
        Cập nhật bài viết
      </Button>
    </div>
  );
}