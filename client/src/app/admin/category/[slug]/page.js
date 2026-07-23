import CreateCategory from "@/components/pages/admin/product/category/CreateCategory";
import { CategoryService } from "@/services/category.service";

export default async function EditCategoryPage({ params }) {
  const { slug } = await params;
  console.log("SLUG CATEGORY => ", slug);
  const res = await CategoryService.getOne(slug, { cache: "no-store" });
  const category = res.data || {};
  console.log("RES CATEGORY => ", res);

  return <CreateCategory data={category} />;
}
