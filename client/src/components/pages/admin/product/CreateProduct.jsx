import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiAddProduct } from "@/apis/ProductAPI";
import { toast } from "react-toastify";
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { apiGetCategory } from "@/apis/CategoryAPI";
import DescriptionBuilder from "@/components/common/DescriptionBuilder";
import { useRouter } from "next/navigation";
import slugify from "slugify";

const CreateProduct = () => {
  const router = useRouter();
  const [directories, setDirectories] = useState([]);
  const [categories, setCategoriest] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    originalPrice: "",
    salePrice: "",
    quantity: "",
    brand: "",
    origin: "",
    isLiquidation: false,
    isFeatured: false,
    directory: "",
    category: [],
    introduce: "",
    description: "",
    productPics: [],
  });
  const [previews, setPreviews] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    apiGetDirectory().then((res) => {
      if (res.data.success) setDirectories(res.data.data);
    });
    apiGetCategory().then((res) => {
      if (res.data.success) setCategoriest(res.data.data);
    });
  }, []);

  useEffect(() => {
    const computedSlug = slugify(form.title || "", {
      lower: true,
      strict: true,
    });

    if (form.slug !== computedSlug) {
      setForm((prev) => ({ ...prev, slug: computedSlug }));
    }
  }, [form.title]);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setForm({ ...form, productPics: files });
    setPreviews([...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();

    submitData.append("title", form.title);
    submitData.append("slug", form.slug);
    submitData.append("originalPrice", form.originalPrice);
    submitData.append("salePrice", form.salePrice);
    submitData.append("quantity", form.quantity);
    submitData.append("brand", form.brand);
    submitData.append("origin", form.origin);
    submitData.append("isLiquidation", form.isLiquidation);
    submitData.append("isFeatured", form.isFeatured);
    submitData.append("directory", form.directory);
    if (Array.isArray(form.category) && form.category.length > 0) {
      form.category.forEach((cat) => submitData.append("category", cat));
    }
    submitData.append("introduce", form.introduce);
    submitData.append("description", form.description);
    form.productPics.forEach((file) => submitData.append("productPics", file));

    try {
      const res = await apiAddProduct(submitData);
      if (res.data.success) {
        router.push("/admin/product");
        toast.success("Thêm sản phẩm thành công!");
      } else {
        toast.error("Lỗi thêm sản phẩm!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Không để trống hoặc sản phẩm đã tồn tại!");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Tạo sản phẩm mới</h2>
        <Button onClick={() => router.push(-1)} variant="outline">
          ← Quay lại
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-lg bg-white p-6 shadow"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Đường dẫn xem trước
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug ? `/san-pham/${form.slug}` : ""}
                disabled
                className="mt-1 w-full rounded border border-gray-200 bg-gray-100 px-3 py-2 text-gray-600"
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
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                className="mt-1 w-full cursor-pointer rounded border border-gray-300 px-3 py-2 focus:outline-none"
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
        </div>

        {/* Mô tả chi tiết */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-800">
            Mô tả chi tiết
          </label>
          <div className="rounded border border-gray-300 p-4">
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
        </div>

        <div>
          <Button
            type="submit"
            className="w-full rounded bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
          >
            Tạo sản phẩm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
