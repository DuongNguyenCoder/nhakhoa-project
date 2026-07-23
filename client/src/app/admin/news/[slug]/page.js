import CreateNew from "@/components/pages/admin/news/CreateNew";
import { NewService } from "@/services/new.service";

export default async function EditNewsPage({ params }) {
  const { slug } = await params;

  const res = await NewService.getBySlug(slug, { cache: "no-store" });

  console.log("SLUG NEWS =>", slug);
  console.log("res NEWS =>", res);

  const data = res.data || {};

  return <CreateNew data={data} />;
}
