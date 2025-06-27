import { apiGetNew } from "@/apis/NewsAPI";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import html2pdf from "html2pdf.js";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [allNews, setAllNews] = useState([]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const rs = await apiGetNew();
        if (rs.data && rs.data.success) {
          const n = rs.data.data.find((e) => e._id === id);
          if (n) setNews(n);
          setAllNews(rs.data.data);
        }
      } catch (err) {
        console.log("Lỗi lấy tin tức:", err);
      }
    };
    fetchNewsDetail();
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const relatedNews = allNews.filter(
    (item) => item.category === news.category && item._id !== news._id
  );

  const handleDownload = async () => {
  if (news.pdfUrl) {
    try {
      const response = await fetch(news.pdfUrl, {
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) throw new Error("Tải không thành công");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `${news.title || "tai-lieu"}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Lỗi tải PDF:", err);
      alert("Không thể tải file PDF. Vui lòng thử lại sau.");
    }
  } else {
    // Fallback: Xuất PDF từ HTML nếu không có pdfUrl
    const container = document.createElement("div");
    container.innerHTML = `
      <div style="font-family: Arial, sans-serif; font-size: 14px;">
        <h2 style="color: #d32f2f;">${news.title}</h2>
        <p>📅 ${formatDate(news.createdAt)}</p>
        <img src="${news.newPic}" style="width:100%; max-height:400px; object-fit:cover; margin-bottom:12px; margin-top:12px;" crossOrigin="anonymous" />
        <div style="page-break-inside: auto;">${news.description}</div>
      </div>
    `;
    document.body.appendChild(container);
    const image = container.querySelector("img");

    image.onload = () => {
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${news.title}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(opt).from(container).save().then(() => {
        document.body.removeChild(container);
      });
    };

    image.onerror = () => {
      alert("Không tải được ảnh.");
      document.body.removeChild(container);
    };
  }
};


  if (!news || !news._id) {
    return (
      <div className="animate-pulse p-6 text-center text-gray-500">
        Đang tải nội dung...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 rounded-3xl bg-slate-50/90 px-6 py-10 md:py-16">
      {/* Tiêu đề */}
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 md:text-5xl">
          {news.title}
        </h1>
        <p className="text-sm text-gray-500 md:text-base">
          🗓️ {formatDate(news.createdAt)} &nbsp;&nbsp; | &nbsp;&nbsp; 🏷️{" "}
          <span className="font-medium text-blue-600">{news.category}</span>
        </p>
      </div>

      {/* Ảnh minh họa */}
      <div className="h-[240px] w-full overflow-hidden rounded-3xl shadow-md md:h-[400px] relative">
        <img
          src={news.newPic}
          alt={news.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />

        <button
          onClick={handleDownload}
          className="absolute bottom-4 right-4 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          📄 Tải xuống PDF
        </button>
      </div>

      {/* Nội dung */}
      {news.pdfUrl ? (
        <div className="border rounded-xl overflow-hidden shadow-md">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={news.pdfUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </div>
      ) : (
        <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-800 prose-p:leading-relaxed prose-a:text-blue-600 prose-img:rounded-xl">
          <div dangerouslySetInnerHTML={{ __html: news.description }} />
        </div>
      )}

      {/* Tin liên quan */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">📰 Tin tức liên quan</h2>
        {relatedNews.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            navigation
            modules={[Navigation]}
            className="!pb-10"
          >
            {relatedNews.map((item) => (
              <SwiperSlide key={item._id}>
                <Link
                  to={`/news/${item._id}`}
                  className="block overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <img src={item.newPic} alt={item.title} className="h-40 w-full object-cover" />
                  <div className="space-y-2 p-4">
                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="mt-16 text-center text-gray-500/95">Không có tin tức liên quan...</p>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
