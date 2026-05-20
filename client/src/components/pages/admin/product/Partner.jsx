import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { apiAddPartner, apiDeletePartner, apiGetPartner } from "@/apis/PartnerAPI";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";

export default function PartnerPage() {
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [partners, setPartners] = useState([]);

  const fetchPartner = async () => {
    try {
      const rs = await apiGetPartner();
      if (rs.data && rs.data.success) {
        setPartners(rs.data.data);
      } else {
        console.error(rs.response.data.mes);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách đối tác:", err);
    }
  };

  useEffect(() => {
    fetchPartner();
  }, []);

  // Clean up URL object tránh leak bộ nhớ
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleDelete = async (id) => {
    try {
      const rs = await apiDeletePartner(id);
      if (rs.data?.success) {
        fetchPartner();
      } else {
        console.log("Lỗi: ", rs.data.mes);
      }
    } catch (err) {
      console.log("Lỗi: ", err.data?.response?.mes || err.message);
    }
  };

  const handleChangeFile = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("partnerPic", file);
    await apiAddPartner(form).then((rs) => {
      if(rs.data?.success){
        fetchPartner();
        setShowForm(false);
    setFile(null);
    setPreviewUrl("");
    toast.success("Thêm thành công!")
      } else {
        toast.warning("Vui lòng chọn ảnh!");
        console.log("Lỗi thêm partner!");
        console.log(rs);
      }
    }
    ).catch((err) => {
      console.log("Lỗi: ",err);
    }
    )    
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Đối tác</h1>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
          <Plus size={18} /> {showForm ? "Đóng" : "Thêm đối tác"}
        </Button>
      </div>

      {/* Form thêm đối tác */}
      {showForm && (
        <div className="mb-10 rounded-xl border bg-white p-6 shadow-md max-w-xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Thêm đối tác mới</h2>
          <Input type="file" accept="image/*" onChange={handleChangeFile} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-40 w-full rounded-lg border object-contain"
            />
          )}
          <Button onClick={handleSubmit} className="w-full">
            Thêm mới
          </Button>
        </div>
      )}

      {/* Danh sách đối tác */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {partners.map((partner) => (
          <Card
            key={partner._id}
            className="group relative overflow-hidden rounded-2xl border shadow-md transition duration-300 hover:shadow-xl"
          >
            <CardContent className="p-0">
              <img
                src={partner.partnerPic}
                alt="Đối tác"
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute right-2 top-2 rounded-full bg-gray-200 opacity-0 transition-opacity group-hover:opacity-100">
                <DeleteConfirmDialog onConfirm={() => handleDelete(partner._id)}>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </Button>
                </DeleteConfirmDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
