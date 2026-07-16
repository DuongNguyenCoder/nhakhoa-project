import ProductDetail from "@/components/pages/details/product-detail-page";
import { ProductService } from "@/services/product.service";
import { cacheLife, cacheTag } from "next/cache";

async function GetProductDetail(slug) {
  "use cache";
  cacheLife("hours");
  cacheTag(`san-pham/${slug}`);
  const res = await ProductService.getBySlug(slug);
  return res;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const res = await GetProductDetail(slug);
  console.log("Product service -> ", res);
  return <ProductDetail product={res.data} />;
}
