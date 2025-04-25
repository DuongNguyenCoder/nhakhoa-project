import { useEffect, useState, useMemo } from "react";
import { apiGetNew } from "@/apis/NewsAPI";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function NewsCategory() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiGetNew();
        if (res.data?.success) {
          setNewsList(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi lấy danh sách tin tức:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const categoryMap = useMemo(() => {
    const map = {};
    newsList.forEach((item) => {
      const cat = item.category || "Chưa phân loại";
      if (!map[cat]) {
        map[cat] = {
          count: 0,
          image: item.newPic,
        };
      }
      map[cat].count += 1;
    });

    // ✅ Thêm "Tin tức nổi bật" nếu chưa có
    if (!map["Tin tức nổi bật"]) {
      map["Tin tức nổi bật"] = {
        count: 0,
        image: null,
      };
    }

    return map;
  }, [newsList]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[180px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Quản lý loại tin tức
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categoryMap)
          .sort(([a], [b]) => {
            if (a === "Tin tức nổi bật") return -1;
            if (b === "Tin tức nổi bật") return 1;
            return a.localeCompare(b);
          })
          .map(([cat, { count, image }]) => (
            <Card
              key={cat}
              className={`overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-xl ${
                cat === "Tin tức nổi bật" ? "border-yellow-500" : ""
              }`}
            >
              <div className="h-[150px] overflow-hidden">
                <img
                  src={image}
                  alt={cat}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="space-y-2 p-4">
                <h2 className="flex items-center justify-between text-xl font-semibold text-gray-800">
                  {cat}
                  {cat === "Tin tức nổi bật" && (
                    <Badge className="bg-yellow-400 text-black">Mặc định</Badge>
                  )}
                </h2>
                <Badge variant="outline" className="text-sm">
                  {count} bài viết
                </Badge>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
