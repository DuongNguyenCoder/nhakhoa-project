"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { CategoryService } from "@/services/category.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formatDate = (date) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

export default function Category({ isNews }) {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("all");

  const fetchCategories = async () => {
    try {
      const query =
        filter === "all"
          ? {}
          : {
              isNews: filter === "news",
            };

      const res = await CategoryService.getAll(query, {
        cache: "no-store",
      });

      setCategories(res.data || []);
    } catch (error) {
      toast.error("Không thể tải danh sách phân mục.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [filter]);

  const handleDelete = (id) => {
    startTransition(async () => {
      try {
        const res = await CategoryService.delete(id);

        if (!res.success) {
          toast.error(res.message || "Xóa thất bại.");
          return;
        }

        toast.success("Xóa phân mục thành công.");

        setCategories((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quản lý phân mục</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tổng cộng {categories.length} phân mục
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-58 bg-amber-50 border border-gray-300 rounded-md px-2">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Tất cả phân mục</SelectItem>
              <SelectItem value="news">Tin tức & Tài liệu</SelectItem>
              <SelectItem value="product">Sản phẩm</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => router.push("/admin/category/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm phân mục
          </Button>
        </div>
      </div>

      {/* List */}
      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          Chưa có phân mục nào.
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="space-y-2">
                <h2 className="line-clamp-2 text-lg font-semibold">
                  {item.title}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Slug: {item.slug}
                </p>

                <div className="space-y-1 pt-3 text-sm text-muted-foreground">
                  <p>Tạo: {formatDate(item.createdAt)}</p>
                  <p>Cập nhật: {formatDate(item.updatedAt)}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/admin/category/${item.slug}`)}
                >
                  Chỉnh sửa
                </Button>

                <DeleteConfirmDialog onConfirm={() => handleDelete(item._id)}>
                  <Button variant="destructive" disabled={isPending}>
                    Xóa
                  </Button>
                </DeleteConfirmDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
