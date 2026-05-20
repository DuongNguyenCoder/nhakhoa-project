import { useEffect, useState } from "react";
import {
  apiAddMethod,
  apiDeleteMethod,
  apiGetMethod,
  apiUpdateMethod,
} from "@/apis/methodAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DescriptionEditor from "@/components/common/DescriptionEditor";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { toast } from "react-toastify";

export default function MethodManagerPage() {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMethods = () => {
    apiGetMethod()
      .then((rs) => {
        if (rs.data?.success) {
          setMethods(rs.data.data);
        } else {
          console.error("Lỗi khi lấy danh sách Method:", rs.data?.mes);
        }
      })
      .catch((err) => console.error("Lỗi API:", err));
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      toast.warning("Vui lòng nhập đầy đủ tiêu đề và mô tả!");
      return;
    }

    const apiCall = isEdit ? apiUpdateMethod(editId, form) : apiAddMethod(form);

    apiCall
      .then((rs) => {
        if (rs.data?.success) {
          fetchMethods();
          resetForm();
        } else {
          alert(rs.data?.mes || "Có lỗi xảy ra!");
        }
      })
      .catch((err) => console.error("Lỗi API:", err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    await apiDeleteMethod(id)
      .then((rs) => {
        if (rs.data?.success) {
          fetchMethods();
          toast.warning("Xóa thành công");
        } else {
          console.error("Lỗi delete method");
        }
      })
      .catch((err) => console.error("Lỗi API:", err));
  };

  const handleEdit = (method) => {
    setIsEdit(true);
    setEditId(method._id);
    setForm({ title: method.title, description: method.description });
  };

  const resetForm = () => {
    setIsEdit(false);
    setEditId(null);
    setForm({ title: "", description: "" });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Quản lý SubHeader (Method)</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <Input
          placeholder="Tiêu đề"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Mô tả (mỗi dòng sẽ là 1 mục)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={5}
          className="w-full rounded border p-2"
        ></textarea>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
          {isEdit && (
            <Button type="button" onClick={resetForm} variant="outline">
              Hủy
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {loading ? (
          <p>Đang tải...</p>
        ) : methods.length === 0 ? (
          <p className="text-gray-500">Chưa có Method nào.</p>
        ) : (
          methods.map((m) => (
            <div
              key={m._id}
              className="flex items-center justify-between rounded border p-3"
            >
              <div>
                <h3 className="font-semibold">{m.title}</h3>
                <div className="ml-5 text-gray-500">
                  {m.description?.split("\n").map((desc, idx) => (
                    <p key={idx}>{desc}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(m)}>
                  Sửa
                </Button>
                <DeleteConfirmDialog onConfirm={() => handleDelete(m._id)}>
                  <Button size="sm" variant="destructive">
                    Xóa
                  </Button>
                </DeleteConfirmDialog>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
