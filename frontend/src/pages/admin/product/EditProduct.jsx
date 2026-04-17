import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { apiGetCategory } from "@/apis/CategoryAPI";
import { apiGetOneProduct, apiUpdateProduct } from "@/apis/ProductAPI";
import DescriptionBuilder from "@/components/common/DescriptionBuilder";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [directories, setDirectories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const [form, setForm] = useState({
    title: "",
    originalPrice: "",
    salePrice: "",
    quantity: "",
    brand: "",
    origin: "",
    isLiquidation: false,
    isFeatured: false,
    directory: "",
    category: "",
    introduce: "",
    description: "", // description sẽ quản lý qua DescriptionBuilder
    productPics: [],
  });
  const [previews, setPreviews] = useState([]);

  // Fetch directories
  useEffect(() => {
    apiGetDirectory().then((res) => {
      if (res.data.success) setDirectories(res.data.data);
      else console.error("Lỗi lấy directory!");
    });
  }, []);

  // Fetch categories
  useEffect(() => {
    apiGetCategory().then((res) => {
      if (res.data.success) setCategories(res.data.data);
      else console.error("Lỗi lấy category!");
    });
  }, []);

  // Fetch product detail
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await apiGetOneProduct(id);
      if (res.data.success) {
        const product = res.data.data;
        setForm({
          title: product.title,
          originalPrice: product.originalPrice,
          salePrice: product.salePrice,
          quantity: product.quantity,
          brand: product.brand,
          origin: product.origin,
          isLiquidation: product.isLiquidation,
          isFeatured: product.isFeatured,
          directory: product.directory,
          category: product.category,
          introduce: product.introduce,
          description: product.description,
          productPics: product.productPics || [],
        });
        setPreviews(product.productPics || []);
        setInitialized(true); // đánh dấu đã khởi tạo xong
      } else {
        console.error("Lỗi lấy thông tin sản phẩm!");
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, productPics: files }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("title", form.title);
    submitData.append("originalPrice", form.originalPrice);
    submitData.append("salePrice", form.salePrice);
    submitData.append("quantity", form.quantity);
    submitData.append("brand", form.brand);
    submitData.append("origin", form.origin);
    submitData.append("isLiquidation", form.isLiquidation ? "true" : "false");
    submitData.append("isFeatured", form.isFeatured ? "true" : "false");
    submitData.append("directory", form.directory);
    if (form.category) submitData.append("category", form.category);
    submitData.append("introduce", form.introduce);
    submitData.append("description", form.description);

    // Convert ảnh cũ (url) sang file
    for (let url of form.productPics) {
      if (typeof url === "string") {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const file = new File([blob], url.split("/").pop(), {
            type: blob.type,
          });
          submitData.append("productPics", file);
        } catch (err) {
          console.error("Lỗi khi tải ảnh cũ:", err);
        }
      }
    }
    // Ảnh mới
    form.productPics.forEach((file) => {
      if (file instanceof File) {
        submitData.append("productPics", file);
      }
    });

    try {
      const res = await apiUpdateProduct(id, submitData);
      if (res.data.success) {
        toast.success("Cập nhật sản phẩm thành công!");
        navigate("/admin/product");
      } else {
        console.error("Lỗi cập nhật sản phẩm!");
        toast.error("Cập nhật sản phẩm thất bại!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi gửi dữ liệu, vui lòng kiểm tra lại!");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Chỉnh sửa sản phẩm
        </h2>
        <Button onClick={() => navigate(-1)} variant="outline">
          ← Quay lại
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow md:grid-cols-2"
      >
        {/* Cột trái */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá gốc
              </label>
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá bán
              </label>
              <input
                type="number"
                name="salePrice"
                value={form.salePrice}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số lượng
            </label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thương hiệu
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Xuất xứ
              </label>
              <input
                type="text"
                name="origin"
                value={form.origin}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Danh mục
            </label>
            <select
              name="directory"
              value={form.directory}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">-- Chọn danh mục --</option>
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id}>
                  {dir.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phân mục
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">-- Chọn phân mục --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleInputChange}
              />
              Nổi bật
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isLiquidation"
                checked={form.isLiquidation}
                onChange={handleInputChange}
              />
              Thanh lý
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giới thiệu ngắn
            </label>
            <textarea
              name="introduce"
              value={form.introduce}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hình ảnh sản phẩm
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt=""
                  className="h-16 w-16 rounded border object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mô tả chi tiết */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả chi tiết
          </label>
          <DescriptionBuilder
            value={
              initialized
                ? (() => {
                    try {
                      return JSON.parse(form.description);
                    } catch {
                      return {};
                    }
                  })()
                : {}
            }
            onChange={(desc) => {
              if (initialized) {
                const newDescStr = JSON.stringify(desc);
                if (newDescStr !== form.description) {
                  setForm((prev) => ({ ...prev, description: newDescStr }));
                }
              }
            }}
          />
        </div>

        {/* Nút submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Cập nhật sản phẩm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
