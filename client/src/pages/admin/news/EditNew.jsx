import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  });
  const [previewImg, setPreviewImg] = useState(null);
  const [originalImgUrl, setOriginalImgUrl] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
        await apiGetNew()
        .then((rs) => {
          if(rs.data?.success){
            const n = rs.data.data.find((e) => e._id === id);
            if(n){
                setForm({
                    title: n.title,
                    description: n.description,
                    category: n.category,
                    status: n.status,
                    newPic: null,
                  });
                setPreviewImg(n.newPic);
                setOriginalImgUrl(n.newPic);
            } else {
                console.log("Lỗi không lấy được new detail || setform sai!");
            }
          }
        })
        .catch((err) => {
              console.log("Lỗi: ", err)
        })
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

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.category) {
      return toast.error("Vui lòng nhập đầy đủ thông tin");
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("status", form.status);

      if (form.newPic) {
        formData.append("newPic", form.newPic);
      } else if (originalImgUrl) {
        const file = await urlToFile(originalImgUrl, "image.jpg", "image/jpeg");
        formData.append("newPic", file);
      }

      const res = await apiUpdateNew(id, formData);
      if (res.data?.success) {
        toast.success("Cập nhật bài viết thành công");
        navigate("/admin/news");
      } else {
        console.log("Lỗi updateNew");
      }
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi khi cập nhật bài viết");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Chỉnh sửa bài viết</h1>

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

      <div className="space-y-2">
        <Label>Ảnh đại diện</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {previewImg && (
          <img
            src={previewImg}
            alt="preview"
            className="mt-2 h-40 w-full rounded-lg border object-contain"
          />
        )}
      </div>

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
            className="w-full border rounded-md px-3 py-2"
            name="status"
            value={form.status}
            onChange={handleInputChange}
          >
            <option value="ENABLE">Kích hoạt</option>
            <option value="DISABLE">Tạm ẩn</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Nội dung chi tiết</Label>
        <DescriptionEditor
          value={form.description}
          onChange={(value) => setForm({ ...form, description: value })}
        />
      </div>

      <Button onClick={handleSubmit} className="mt-4 w-full">
        Cập nhật bài viết
      </Button>
    </div>
  );
}