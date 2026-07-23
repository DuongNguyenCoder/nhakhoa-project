import ProductByDirectoryPage from "@/components/pages/product/ProductByDirectoryPage";
import { DirectoryService } from "@/services/directory.service";

export default async function Page({ params }) {
  const { slug } = await params;

  const res = await DirectoryService.getOne(slug, { revalidate: 600 });
  const resDirectories = await DirectoryService.getAll({}, { revalidate: 600 });

  const directoryActive = res.data || {};
  const directories = resDirectories.data || [];
  return (
    <ProductByDirectoryPage
      directory={directoryActive}
      directories={directories}
    />
  );
}
