"use cache";

import ProductDetail from "@/components/pages/details/product-detail-page";
import { ProductService } from "@/services/product.service";

export default async function Page({ params }) {
  const { slug } = await params;
  const res = await ProductService.getBySlug(slug);
  console.log("Product service -> ", res);
  return <ProductDetail product={res.data} />;
}
