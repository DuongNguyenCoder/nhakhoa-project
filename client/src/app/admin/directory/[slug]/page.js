import CreateDirectory from "@/components/pages/admin/product/directory/CreateDirectory";
import { DirectoryService } from "@/services/directory.service";

export default async function EditDirectoryPage({ params }) {
  const { slug } = await params;

  const res = await DirectoryService.getOne(slug);

  console.log("SLUG DIRECTORY =>", slug);
  console.log("res DIRECTORY =>", res);

  const data = res.data || {};

  return <CreateDirectory data={data} />;
}
