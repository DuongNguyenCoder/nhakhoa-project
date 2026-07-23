import ProductByCategoryPage from "@/components/pages/product/ProductByCategoryPage";
import { CategoryService } from "@/services/category.service";

export default async function ProductsByCategory({ params }) {
  const { slug } = await params;

  const res = await CategoryService.getOne(slug, { revalidate: 300 });

  const categoryActive = res.data || {};
  return <ProductByCategoryPage category={categoryActive} />;
}
