import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiAddWarranty } from "@/apis/WarrantyAPI";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import { Label } from "@/components/ui/label";

export default function CreateWarranty() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    durationMonths: "",
    terms: "",
  });

  useEffect(() => {
    apiGetAllProduct({ limit: 9999 })
      .then((res) => {
        if (res.data && res.data.success) {
          setProducts(res.data.data);
        } else {
          console.log("Lỗi lấy danh sách sản phẩm");
        }
      })
      .catch((err) => console.error("Lỗi: ", err));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.productId || !form.durationMonths || !form.terms.trim()) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    apiAddWarranty(form)
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success("Tạo bảo hành thành công!");
          navigate("/admin/warranty");
        } else {
          console.log("Lỗi Add warranty!");
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tạo bảo hành mới</h1>

      <Card className="shadow-md rounded-2xl">
        <CardContent className="space-y-6 p-6">
          {/* Select product */}
          <div className="space-y-2">
            <Label htmlFor="productId">Sản phẩm</Label>
            <select
              id="productId"
              name="productId"
              value={form.productId}
              onChange={handleChange}
              className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">-- Chọn sản phẩm --</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="durationMonths">Thời hạn bảo hành (tháng)</Label>
            <Input
              id="durationMonths"
              name="durationMonths"
              type="number"
              value={form.durationMonths}
              onChange={handleChange}
              min={1}
              placeholder="VD: 12"
            />
          </div>

          {/* Terms */}
          <div className="space-y-2">
            <Label htmlFor="terms">Điều khoản bảo hành</Label>
            <Textarea
              id="terms"
              name="terms"
              rows={6}
              value={form.terms}
              onChange={handleChange}
              placeholder="Nhập các điều khoản cụ thể của bảo hành..."
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => navigate("/admin/warranty")}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>Tạo bảo hành</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
