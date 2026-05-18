"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { apiGetOneWarranty, apiUpdateWarranty } from "@/apis/WarrantyAPI";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import { useParams, useRouter } from "next/navigation";

export default function EditWarranty() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [form, setForm] = useState({
    productId: "",
    productTitle: "",
    durationMonths: "",
    terms: "",
  });

  const [products, setProducts] = useState([]);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      await apiGetAllProduct({ limit: 9999 })
        .then((res) => {
          if (res.data?.success) {
            setProducts(res.data.data);
          } else {
            toast.error("Không thể tải danh sách sản phẩm!");
          }
        })
        .catch(() => toast.error("Lỗi tải sản phẩm!"));
    };
    fetchProducts();
  }, []);

  // Lấy chi tiết bảo hành
  useEffect(() => {
    const fetchWarranty = async () => {
      await apiGetOneWarranty(id)
        .then((res) => {
          console.log(res);
          if (res.data?.success) {
            const data = res.data.data;
            const product = products.find((p) => p._id === data.productId);
            console.log(product);
            setForm({
              productId: data.productId,
              productTitle: product ? product.title : "Không xác định",
              durationMonths: data.durationMonths,
              terms: data.terms,
            });
          } else {
            toast.error("Không thể tải thông tin bảo hành!");
          }
        })
        .catch(() => toast.error("Lỗi tải bảo hành!"));
    };
    fetchWarranty();
  }, [id, products]);

  // Handle input
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Gửi cập nhật
  const handleUpdate = () => {
    if (!form.productId || !form.durationMonths || !form.terms.trim()) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const payload = {
      productId: form.productId,
      durationMonths: form.durationMonths,
      terms: form.terms,
    };

    apiUpdateWarranty(id, payload)
      .then((res) => {
        if (res.data?.success) {
          toast.success("Cập nhật thành công!");
          router.push("/admin/warranty");
        } else {
          toast.error(res.data?.mes || "Cập nhật thất bại!");
        }
      })
      .catch(() => toast.error("Lỗi kết nối!"));
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Chỉnh sửa bảo hành
      </h1>

      <Card className="rounded-2xl shadow-md">
        <CardContent className="space-y-6 p-6">
          {/* Sản phẩm (chỉ hiển thị) */}
          <div className="space-y-2">
            <Label>Sản phẩm</Label>
            <Input
              value={form.productTitle}
              disabled
              className="cursor-not-allowed bg-gray-100 text-gray-700"
            />
          </div>

          {/* Thời hạn bảo hành */}
          <div className="space-y-2">
            <Label htmlFor="durationMonths">Thời hạn (tháng)</Label>
            <Input
              id="durationMonths"
              name="durationMonths"
              type="number"
              min={1}
              value={form.durationMonths}
              onChange={handleChange}
              placeholder="VD: 12"
            />
          </div>

          {/* Điều khoản */}
          <div className="space-y-2">
            <Label htmlFor="terms">Điều khoản</Label>
            <Textarea
              id="terms"
              name="terms"
              rows={6}
              value={form.terms}
              onChange={handleChange}
              placeholder="Nhập nội dung điều khoản..."
            />
          </div>

          {/* Hành động */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/warranty")}
            >
              Hủy
            </Button>
            <Button onClick={handleUpdate}>Cập nhật</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
