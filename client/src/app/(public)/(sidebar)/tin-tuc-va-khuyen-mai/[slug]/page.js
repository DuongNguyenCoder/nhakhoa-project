"use cache";

import NewDetailView from "@/components/pages/details/new-detail-view";
import { NewService } from "@/services/new.service";
import { cacheTag } from "next/cache";

async function getNewsDetail(slug) {
  "use cache";
  cacheTag("news-detail-" + slug);
  const res = await NewService.getBySlug(slug);

  // console.log("getnewdetail response: ", res);

  return res?.data || null;
}

export default async function NewDetailPage({ params }) {
  const { slug } = await params;

  // console.log("REnder new detail page with slug:", slug);

  const news = await getNewsDetail(slug);

  console.log("data news detail: ", news);

  return <NewDetailView news={news} />;
}
