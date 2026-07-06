import { apiAddBanner } from "@/apis/BannerAPI";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateBanner = () => {
  const [status, setStatus] = useState("ENABLE");
  const [url, setUrl] = useState("");
  const [bannerPic, setBannerPic] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBannerPic(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImg(previewURL);
    } else {
      setPreviewImg(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);
    formData.append("bannerPic", bannerPic);
    formData.append("url", url);

    if (!url.trim()) {
      toast.warning("Vui lòng nhập liên kết cho banner!");
      return;
    }

    if (!bannerPic) {
      toast.warning("Vui lòng chọn hình ảnh cho banner!");
      return;
    }

    try {
      setLoading(true);
      const res = await apiAddBanner(formData);
      if (res?.data?.success) {
        router.push("/admin/banner");
        toast.success("Thêm thành công!");
      }
    } catch (error) {
      console.error("Lỗi tạo banner:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Thêm Banner Mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Select */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ENABLE">Kích hoạt</option>
              <option value="DISABLE">Ẩn</option>
            </select>
          </div>

          {/* URL input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Liên kết khi nhấp vào banner
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Chọn hình banner
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {/* Preview Image */}
          {previewImg && (
            <div>
              <p className="text-sm mb-2 text-gray-500">Xem trước ảnh:</p>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow">
                <img
                  src={previewImg}
                  alt="Preview"
                  className="w-full object-contain max-h-[400px]"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full items-center text-center bg-slate-950 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition duration-200"
          >
            {loading ? (
              <LoaderCircle className="size-4.5 animate-spin" />
            ) : (
              "Thêm Banner"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBanner;
