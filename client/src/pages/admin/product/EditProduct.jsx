import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DescriptionEditor from "@/components/common/DescriptionEditor";
import { toast } from "react-toastify";
import { apiGetDirectory } from "@/apis/DirectoryAPI";
import { apiGetCategory } from "@/apis/CategoryAPI";
import { apiGetOneProduct, apiUpdateProduct } from "@/apis/ProductAPI";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [directories, setDirectories] = useState([]);
  const [categories, setCategoriest] = useState([]);
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
    description: "",
    productPics: [],
  });
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const fetchDirectory = async () => {
      const res = await apiGetDirectory();
      if (res.data.success) {
        setDirectories(res.data.data);
      } else {
        console.log("Lỗi lấy directory!");
      }
    };
    fetchDirectory();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await apiGetCategory();
      if (res.data.success) {
        setCategoriest(res.data.data);
      } else {
        console.log("Lỗi lấy category!");
      }
    };
    fetchCategory();
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await apiGetOneProduct(id);
      console.log(res);
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
        setPreviews(product.productPics); // Giả sử productPics là mảng các đối tượng chứa URL
      } else {
        console.log("Lỗi lấy thông tin sản phẩm!");
      }
    };
    fetchProduct();
  }, [id]);
//   console.log(form);
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

    // Các field text/number
    submitData.append("title", form.title);
    submitData.append("originalPrice", form.originalPrice);
    submitData.append("salePrice", form.salePrice);
    submitData.append("quantity", form.quantity);
    submitData.append("brand", form.brand);
    submitData.append("origin", form.origin);
    submitData.append("isLiquidation", form.isLiquidation);
    submitData.append("isFeatured", form.isFeatured);
    submitData.append("directory", form.directory);
    if (form.category) {
      submitData.append("category", form.category); // ✅ không cần .forEach
    }
    submitData.append("introduce", form.introduce);
    submitData.append("description", form.description);

    for (let url of form.productPics) {
        // Chỉ chuyển đổi ảnh cũ nếu không có ảnh mới được chọn
        if (typeof url === "string") {
          try {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], url.split("/").pop(), { type: blob.type });
            submitData.append("productPics", file);
          } catch (err) {
            console.log("Lỗi khi tải ảnh cũ:", err);
          }
        }
      }
    
      // Các file ảnh mới (nếu có)
      form.productPics.forEach((file) => {
        if (file instanceof File) {
          submitData.append("productPics", file);
        }
      });

    const res = await apiUpdateProduct(id, submitData);
    if (res.data.success) {
      navigate("/admin/product");
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      console.log("Lỗi cập nhật sản phẩm!");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Chỉnh sửa sản phẩm</h2>
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
            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
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
              <label className="block text-sm font-medium text-gray-700">Giá gốc</label>
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Giá bán</label>
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
            <label className="block text-sm font-medium text-gray-700">Số lượng</label>
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
              <label className="block text-sm font-medium text-gray-700">Thương hiệu</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Xuất xứ</label>
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
          {/* Danh mục (Directory) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Danh mục</label>
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

          {/* Phân mục (Category) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phân mục</label>
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
            <label className="block text-sm font-medium text-gray-700">Giới thiệu ngắn</label>
            <textarea
              name="introduce"
              value={form.introduce}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hình ảnh sản phẩm</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
            <div className="mt-2 flex gap-2">
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
          <label className="block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
          <DescriptionEditor
            value={form.description}
            onChange={(value) => setForm({ ...form, description: value })}
          />
        </div>

        {/* Nút gửi */}
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
