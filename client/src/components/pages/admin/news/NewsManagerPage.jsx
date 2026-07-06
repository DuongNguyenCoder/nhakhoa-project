import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { apiDeleteNew, apiGetNew } from "@/apis/NewsAPI";
import { toast } from "react-toastify";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import Pagination from "@/components/ui/Pagination";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function NewsManagerPage() {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // thời gian debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchNews();
  }, [currentPage, debouncedSearchTerm]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await apiGetNew({
        page: currentPage,
        search: debouncedSearchTerm,
      });
      if (res.data?.success) {
        setNewsList(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tin tức:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await apiDeleteNew(id)
      .then((rs) => {
        if (rs.data && rs.data.success) {
          fetchNews();
          toast.warning("Xóa thành công!");
        } else {
          console.log("Lỗi delete news!");
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
      });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý tin tức</h1>
          <Input
            placeholder="🔍 Tìm kiếm theo tiêu đề, mô tả, danh mục..."
            className="w-full md:w-[400px] border-gray-300 focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <Button
          onClick={() => router.push("/admin/news/create")}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Thêm tin mới
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <CardContent className="space-y-2 p-4">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardContent>
                </Card>
              ))
          : newsList.map((item) => (
              <Card
                key={item._id}
                className="overflow-hidden border shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={item.newPic}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
                <CardContent className="space-y-2 p-4">
                  <h2 className="line-clamp-2 text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {(() => {
                      const temp = document.createElement("div");
                      temp.innerHTML = item.description;
                      return temp.textContent || temp.innerText || "";
                    })()}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex flex-col text-[12.5px] gap-0.5">
                      <span>Ngày tạo: {formatDate(item.createdAt)}</span>
                      <span>
                        Cập nhật gần nhất: {formatDate(item.updatedAt)}
                      </span>
                    </div>
                    <Badge
                      variant={
                        item.status === "ENABLE" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(`/admin/news/edit/${item._id}`)
                      }
                      variant="ghost"
                      size="icon"
                    >
                      <Pencil className="h-5 w-5 text-yellow-500" />
                    </Button>
                    <DeleteConfirmDialog
                      onConfirm={() => handleDelete(item._id)}
                    >
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </Button>
                    </DeleteConfirmDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
