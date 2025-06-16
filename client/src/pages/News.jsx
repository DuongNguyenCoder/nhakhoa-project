import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { apiGetNew } from "@/apis/NewsAPI";
import PageTitle from "@/components/pageTitle";

const News = () => {
  const [allNews, setAllNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const res = await apiGetNew();
      if (res?.data?.data) setAllNews(res.data.data);
    };
    fetchNews();
  }, []);

  const categories = [...new Set(allNews.map((item) => item.category))];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const downloadPDF = (news) => {
  const container = document.createElement("div");
  container.innerHTML = `
    <div style="font-family: Arial, sans-serif; font-size: 14px;">
      <h2 style="color: #d32f2f;">${news.title}</h2>
      <p>📅 ${formatDate(news.createdAt)}</p>
      <img src="${news.newPic}" style="width:100%; max-height:400px; object-fit:cover; margin-bottom:12px; margin-top:12px;" crossOrigin="anonymous" />
      <div style="page-break-inside: auto;">${news.description}</div>
    </div>
  `;

  document.body.appendChild(container); // cần để ảnh tải được trước khi render PDF

  // Đợi ảnh load xong rồi mới tạo PDF
  const image = container.querySelector("img");
  image.onload = () => {
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${news.title}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(opt).from(container).save().then(() => {
      document.body.removeChild(container); // dọn dẹp sau khi xong
    });
  };

  image.onerror = () => {
    alert("Không tải được ảnh. Vui lòng kiểm tra link ảnh.");
    document.body.removeChild(container);
  };
};


  return (
    <>
      <PageTitle title="Thư Viện - Minh Dental" />
      <div className="space-y-12 p-6">
        {categories.map((cate) => {
          const filteredNews = allNews.filter((news) => news.category === cate);
          return (
            <div key={cate}>
              <h2 className="mb-4 border-b border-red-300 pb-2 text-2xl font-bold text-red-700">
                {cate}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {filteredNews.map((news) => (
                  <div
                    key={news._id}
                    className="rounded-lg bg-white p-4 shadow-md transition hover:shadow-xl"
                  >
                    <img
                      src={news.newPic}
                      alt={news.title}
                      className="mb-3 h-40 w-full cursor-pointer rounded object-cover"
                      onClick={() => navigate(`/news/${news._id}`)}
                    />
                    <h3
                      className="cursor-pointer text-lg font-semibold text-gray-800 hover:underline"
                      onClick={() => navigate(`/news/${news._id}`)}
                    >
                      {news.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-400">
                      📅 {formatDate(news.createdAt)}
                    </p>

                    {/* CHỈ HIỂN THỊ 3 DÒNG */}
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {(() => {
                        const temp = document.createElement("div");
                        temp.innerHTML = news.description;
                        return temp.textContent || temp.innerText || "";
                      })()}
                    </p>

                    <button
                      className="mt-3 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      onClick={() => downloadPDF(news)}
                    >
                      Tải xuống PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default News;
