import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetBanner, apiUpdateBanner } from "@/apis/BannerAPI";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EditBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState(null);
  const [status, setStatus] = useState("ENABLE");
  const [previewImage, setPreviewImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await apiGetBanner();
        if (res.data.success) {
          const found = res.data.data.find((b) => b._id === id);
          if (found) {
            setBannerData(found);
            setStatus(found.status);
            setPreviewImage(found.bannerPic);
          } else {
            console.error("Không tìm thấy banner!");
            navigate("/admin/banner");
          }
        }
      } catch (err) {
        console.error("Lỗi lấy dữ liệu banner:", err);
      }
    };
    fetchBanner();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("status", status);
    if (newImage) {
      formData.append("bannerPic", newImage);
    }

    try {
      const res = await apiUpdateBanner(id, formData);
      if (res.data.success) {
        navigate("/admin/banner");
      } else {
        console.error("Cập nhật không thành công");
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    }
  };

  if (!bannerData) return <p className="p-6">Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Chỉnh sửa banner</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label className="mb-1 block">Trạng thái</Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none"
          >
            <option value="ENABLE">Kích hoạt</option>
            <option value="DISABLE">Ẩn</option>
          </select>
        </div>

        <div>
          <Label className="mb-1 block">Hình ảnh hiện tại</Label>
          <div className="w-full h-[400px] border rounded overflow-hidden">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div>
          <Label className="mb-1 block">Thay ảnh mới (nếu muốn)</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Cập nhật</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/banner")}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBanner;
