import Image from "next/image";
import { NewService } from "@/services/new.service";
import NewsCard from "@/components/ui/news-card";

export default async function NewDetailView({ news }) {
  const resNews = await NewService.getAll(
    { isActive: true, limit: 5, page: 1, category: news.category },
    { revalidate: 600, tags: ["news-list"] },
  );

  const relatedNews = resNews.data || [];

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  const downloadUrl = news.pdfFile.replace(
    "/upload/",
    "/upload/fl_attachment:TaiLieuMinhDental/",
  );

  if (!news) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-gray-500">
        Bài viết không tồn tại
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50/90 px-5 py-3">
      {/* Header */}
      <div className="relative aspect-video overflow-hidden rounded-3xl">
        <Image
          src={news.newPic}
          alt={news.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center space-y-1 py-5 md:px-3">
        <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl xl:text-4xl">
          {news.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-wide text-slate-500">
          <span>
            Posted on{" "}
            <strong className="font-semibold text-slate-700">
              {formatDate(news.createdAt)}
            </strong>
          </span>

          <span>•</span>

          <span>
            By{" "}
            <span className="font-semibold text-[#9c1d22]">MINHDENTAL.COM</span>
          </span>
        </div>
      </div>

      {/* Content */}
      {news.hasPdf ? (
        <section className="space-y-6">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                  📄
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Tài liệu PDF</h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Xem trực tuyến hoặc tải tài liệu về thiết bị.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={news.pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border px-5 py-3 font-medium hover:bg-slate-100"
                >
                  Xem PDF
                </a>

                <a
                  href={downloadUrl}
                  className="rounded-xl bg-[#9c1d22] px-5 py-3 font-medium text-white transition hover:bg-[#7d171b]"
                >
                  Tải xuống
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <iframe
              src={`${news.pdfFile}#toolbar=1`}
              className="h-[900px] w-full"
            />
          </div>
        </section>
      ) : (
        <article
          className="
    prose prose-slate
    max-w-none
    prose-headings:font-bold
    prose-headings:text-slate-900
    prose-p:text-slate-700
    prose-p:leading-8
    prose-img:rounded-2xl
    prose-img:shadow-md
    prose-img:w-full
    prose-img:max-h-[600px]
    prose-img:object-cover
  "
          dangerouslySetInnerHTML={{
            __html: news.description,
          }}
        />
      )}
      {/* Related News */}
      <section className="space-y-8 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Tin tức liên quan</h2>

            <p className="mt-2 text-slate-500">Có thể bạn sẽ quan tâm</p>
          </div>
        </div>

        <div className="space-y-5">
          {relatedNews
            .filter((item) => item._id !== news._id)
            .map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
        </div>
      </section>
    </div>
  );
}
