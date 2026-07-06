"use client";

import { apiGetPartner } from "@/apis/PartnerAPI";
import PageTitle from "@/components/pageTitle";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PopupConsultationForm from "../common/PopupConsultationForm";

const profileImages = [
  "/assets/profile-1.jpg",
  "/assets/profile-2.jpg",
  "/assets/profile-3.jpg",
];

const coreValues = [
  {
    title: "Uy tín hàng đầu",
    desc: "Hơn 40 năm đồng hành cùng hàng nghìn phòng khám và bệnh viện nha khoa trên toàn quốc.",
  },
  {
    title: "Công nghệ tiên tiến",
    desc: "Cập nhật liên tục các công nghệ và thiết bị nha khoa hiện đại từ thế giới.",
  },
  {
    title: "Phân phối chính hãng",
    desc: "Cam kết nguồn gốc rõ ràng, chất lượng tiêu chuẩn quốc tế.",
  },
  {
    title: "Đồng hành lâu dài",
    desc: "Hỗ trợ kỹ thuật, bảo hành và tư vấn xuyên suốt quá trình sử dụng.",
  },
];

const About = () => {
  const [dataPartner, setDataPartner] = useState([]);

  useEffect(() => {
    const fetchPartner = async () => {
      const res = await apiGetPartner();
      if (res.data.success) {
        setDataPartner(res.data.data);
      }
    };

    fetchPartner();
  }, []);

  return (
    <>
      <PageTitle title="Giới thiệu - Minh Dental" />

      <main className="bg-white text-gray-800">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#9c1d22] font-semibold mb-4 tracking-wide uppercase">
                Minh Dental
              </span>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Giải pháp thiết bị nha khoa
                <span className="text-[#9c1d22]"> chuyên&nbsp;nghiệp </span>
                cho phòng khám hiện&nbsp;đại
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Với hơn 40 năm phát triển, Minh Dental là một trong những đơn vị
                tiên phong tại Việt Nam trong lĩnh vực cung cấp thiết bị, vật tư
                và công nghệ nha khoa chất lượng cao.
              </p>

              <div className="flex gap-4">
                <button className="bg-[#9c1d22] text-white px-6 py-3 rounded-lg font-medium">
                  Xem sản phẩm
                </button>
                <button className="border border-[#9c1d22] text-[#9c1d22] px-6 py-3 rounded-lg font-medium">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/MinhDental_Group.png"
                alt="Minh Dental"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Hành trình phát triển</h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Minh Dental là một trong những doanh nghiệp đầu tiên tại Việt
                  Nam hoạt động trong lĩnh vực cung cấp thiết bị nha khoa.
                </p>

                <p>
                  Trải qua hơn 40 năm xây dựng và phát triển, chúng tôi đã trở
                  thành đối tác chiến lược của nhiều bệnh viện, phòng khám và
                  nhà phân phối trên toàn quốc.
                </p>

                <p>
                  Minh Dental không ngừng đổi mới để mang đến các giải pháp tối
                  ưu, hiện đại và an toàn cho bác sĩ cũng như bệnh nhân.
                </p>

                <p>
                  Đặc biệt, chúng tôi là đơn vị phân phối độc quyền ghế nha khoa
                  Cingol tại Việt Nam.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "40+", label: "Năm kinh nghiệm" },
                { number: "1000+", label: "Khách hàng doanh nghiệp" },
                { number: "50+", label: "Đối tác quốc tế" },
                { number: "100%", label: "Sản phẩm chính hãng" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-gray-50 rounded-2xl p-6 border"
                >
                  <h3 className="text-3xl font-bold text-[#9c1d22] mb-2">
                    {item.number}
                  </h3>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROFILE GALLERY */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-center mb-12">
              Hình ảnh doanh nghiệp
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {profileImages.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={img}
                    alt={`Profile ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Giá trị cốt lõi
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((item) => (
              <div
                key={item.title}
                className="border rounded-2xl p-6 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-xl mb-4 text-[#9c1d22]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PARTNER */}
        <section className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-center mb-4">Đối tác</h2>

            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Hợp tác cùng nhiều thương hiệu nha khoa lớn trên thế giới nhằm
              mang đến sản phẩm chất lượng cao và giải pháp tối ưu.
            </p>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={2}
              loop
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
            >
              {dataPartner.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="h-36 bg-white border rounded-2xl flex items-center justify-center p-6 shadow-sm hover:shadow-md transition">
                    <div className="relative w-full h-full grayscale hover:grayscale-0 transition duration-300">
                      <Image
                        src={item.partnerPic}
                        alt={`Partner ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto py-16">
          <PopupConsultationForm />
        </section>
      </main>
    </>
  );
};

export default About;
