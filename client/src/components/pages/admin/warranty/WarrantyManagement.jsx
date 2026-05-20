import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { apiAddWarranty, apiUpdateWarranty, apiGetAllWarranty } from "@/apis/WarrantyAPI";
import { Loader2 } from "lucide-react";
import DescriptionEditor from "@/components/common/DescriptionEditor";
import { apiGetAllProduct } from "@/apis/ProductAPI";

export default function WarrantyManagement() {
  const [warranty, setWarranty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [defaultProductId, setDefaultProductId] = useState(null);

  const fetchDefaultProductId = () => {
  return apiGetAllProduct({ limit: 1 })
    .then((res) => {
      const products = res.data?.data || [];
      if (products.length > 0) {
        const productId = products[0]._id;
        setDefaultProductId(productId);
        return productId; // <- Trả về trực tiếp
      } else {
        toast.error("Chưa có sản phẩm nào để gán vào chính sách bảo hành.");
        return null;
      }
    })
    .catch((err) => {
      console.log("Lỗi lấy sản phẩm:", err);
      toast.error("Lỗi kết nối server.");
      return null;
    });
};

  const fetchWarranty = async (defaultProductId) => {
  setLoading(true);
  await apiGetAllWarranty()
    .then((rs) => {
      if (rs.data && rs.data.success) {
        const data = rs.data.data;
        if (data.length > 0) {
          const latest = data[0];
          setWarranty(latest);
          setEditorContent(latest.terms || "");
        } else {
          if (!defaultProductId) {
            toast.error("Chưa có sản phẩm mặc định để tạo chính sách bảo hành.");
            return;
          }
          apiAddWarranty({ productId: defaultProductId, terms: "Chính sách bảo hành" })
            .then((res) => {
              if (res.data && res.data.success) {
                setWarranty(res.data.data);
                setEditorContent("Chính sách bảo hành");
                toast.success("Tạo chính sách bảo hành mới!");
              } else {
                toast.error("Lỗi tạo chính sách bảo hành.");
              }
            })
            .catch((err) => {
              console.log("Lỗi: ", err);
            });
        }
      } else {
        console.log("Lỗi lấy data warranty.");
      }
    })
    .catch((err) => {
      console.log("Lỗi: ", err);
    })
    .finally(() => setLoading(false));
};


  useEffect(() => {
  const init = async () => {
    const productId = await fetchDefaultProductId();
    await fetchWarranty(productId);
  };
  init();
}, []);


  const handleSave = async () => {
    if (!warranty || !defaultProductId) {
      toast.error("Không thể lưu vì thiếu productId.");
      return;
    }
    setSaving(true);
    await apiUpdateWarranty(warranty._id, {
      productId: defaultProductId,
      terms: editorContent,
    })
      .then((rs) => {
        if (rs.data && rs.data.success) {
          toast.success("Cập nhật chính sách bảo hành thành công!");
        } else {
          toast.error("Lỗi cập nhật chính sách bảo hành.");
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
        toast.error("Có lỗi xảy ra.");
      })
      .finally(() => setSaving(false));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Chính sách bảo hành</h1>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-5 space-y-4">
            <DescriptionEditor
              value={editorContent}
              onChange={(content) => setEditorContent(content)}
              height={400}
            />
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...
                  </span>
                ) : (
                  "Lưu chính sách"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
