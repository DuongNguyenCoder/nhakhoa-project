import CategoryNews from "@/components/ui/category-news";
import { CategoryService } from "@/services/category.service";

export default async function CategoryNewsPage({ params }) {
  const { slug } = await params;

  const res = await CategoryService.getOne(slug, {
    cache: "no-store",
  });

  const category = res.data || null;

  if (!category) {
    return (
      <div className="py-20 text-center text-gray-500">
        Không tìm thấy chuyên mục.
      </div>
    );
  }

  return <CategoryNews category={category} />;
}
