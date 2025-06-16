import { apiGetNew } from "@/apis/NewsAPI";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import html2pdf from "html2pdf.js";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      await apiGetNew()
        .then((rs) => {
          if (rs.data && rs.data.success) {
            const n = rs.data.data.find((e) => e._id === id);
            if (n) setNews(n);
            setAllNews(rs.data.data);
          } else {
            console.log("Lỗi data lấy newdetail!");
          }
        })
        .catch((err) => {
          console.log("Lỗi: ", err);
        });
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
    (item) => item.category === news.category && item._id !== news._id,
  );

  // Hàm tải xuống PDF
  const downloadPDF = () => {
    // Tạo container ẩn chứa nội dung để xuất PDF
    const container = document.createElement("div");
    container.style.fontFamily = "Arial, sans-serif";
    container.style.fontSize = "14px";
    container.style.padding = "20px";
    container.style.color = "#333";

    container.innerHTML = `
      <h2 style="color: #d32f2f; margin-bottom: 10px;">${news.title}</h2>
      <p style="margin-bottom: 8px;">🗓️ ${formatDate(news.createdAt)}</p>
      <img src="${news.newPic}" style="width: 100%; max-height: 400px; object-fit: cover; margin-bottom: 20px;" crossorigin="anonymous" />
      <div style="page-break-inside: avoid;">${news.description}</div>
    `;

    document.body.appendChild(container);

    const img = container.querySelector("img");
    img.onload = () => {
      const opt = {
        margin: 0.5,
        filename: `${news.title}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };
      html2pdf()
        .set(opt)
        .from(container)
        .save()
        .then(() => {
          document.body.removeChild(container);
        });
    };
    img.onerror = () => {
      alert("Không tải được ảnh trong PDF, vui lòng kiểm tra đường dẫn ảnh.");
      document.body.removeChild(container);
    };
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
      {/* Tiêu đề & thông tin */}
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

        {/* Nút tải xuống PDF - đặt góc dưới phải trên ảnh, thiết kế hài hòa */}
        <button
          onClick={downloadPDF}
          className="absolute bottom-4 right-4 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          title="Tải xuống tin tức dưới dạng PDF"
        >
          📄 Tải xuống PDF
        </button>
      </div>

      {/* Nội dung chi tiết */}
      <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-800 prose-p:leading-relaxed prose-a:text-blue-600 prose-img:rounded-xl">
        <div dangerouslySetInnerHTML={{ __html: news.description }} />
      </div>

      {/* Tin liên quan */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">
          📰 Tin tức liên quan
        </h2>
        {relatedNews.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
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
                  <img
                    src={item.newPic}
                    alt={item.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="space-y-2 p-4">
                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full mt-16">
            <p className="w-full text-center text-gray-500/95">
              Không có tin tức liên quan...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
