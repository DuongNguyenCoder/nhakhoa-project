import { apiGetPartner } from "@/apis/PartnerAPI";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import aboutPic from '../assets/picAbout.png'
import PageTitle from "@/components/pageTitle";
const About = () => {
  const [dataPartner, setDataPartner] = useState([]);

  useEffect(() => {
    const fetchPartner = async () => {
      const res = await apiGetPartner();
      if(res.data.success){
        console.log("API GET PARTNER: ", res);
        setDataPartner(res.data.data);
      } else {
        console.log("Lỗi lấy data partner!")
      }
    }
    fetchPartner();
  },[])

  return (
    <>
    <PageTitle title="Giới Thiệu - Minh Dental" />
    <div className="min-h-screen bg-gradient-to-r bg-white/80 p-8">
      {/* Section: Về chúng tôi */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold text-black mb-4">Về chúng tôi</h2>
        <p className="text-lg text-gray-700 mb-4">
          Lời đầu tiên, xin cảm ơn Quý khách hàng đã ghé thăm website của Minh Dental. Nếu Quý khách hàng đang cần tìm một đơn vị uy tín cung cấp các trang - thiết bị và vật tư về nha khoa thì vui lòng đừng bỏ qua các thông tin dưới đây.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Minh Dental là một trong những doanh nghiệp cung cấp thiết bị nha khoa đầu tiên tại Việt Nam. Trải qua 40 năm xây dựng, phát triển và trưởng thành, Minh Dental gắn bó với nhiều đơn vị cung cấp thiết bị, bệnh viện, phòng khám nha khoa trên cả nước. Đi cùng với niềm tự hào là sự uy tín, trách nhiệm và nỗ lực để xứng đáng với niềm tin yêu của các đối tác, khách hàng.
        </p>
        <div className="mb-8">
          <img src={aboutPic} alt="Minh Dental" className="w-full h-[300px] object-cover rounded-xl shadow-lg" />
        </div>
        <p className="text-lg text-gray-700 mb-8">
          Cho đến nay, Minh Dental vẫn nỗ lực đổi mới từng ngày, đón đầu xu thế, đem đến những sản phẩm chất lượng cao, công nghệ đột phá để các bác sĩ Nha khoa, các bệnh nhân sẽ cảm thấy an tâm, thoải mái khi khám, điều trị các vấn đề về nha khoa. Minh Dental hiện cung cấp nhiều thiết bị nha khoa khác nhau từ các thương hiệu nổi tiếng thế giới.
        </p>
        <p className="text-lg text-gray-700">
          Trong đó, chủ lực là sản phẩm về ghế nha khoa. Chúng tôi là đơn vị phân phối độc quyền ghế nha khoa Cingol tại Việt Nam. Có thể khẳng định so với các sản phẩm cùng phân khúc thì Cingol là sản phẩm mang lại ấn tượng sâu sắc với khách hàng về chất lượng, tiện ích và đa dạng về mẫu mã. 
        </p>
      </section>

      {/* Section: Đối tác */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-black mb-4">Đối tác</h2>
        <p className="text-lg text-gray-700 mb-4">
          Minh Dental hợp tác chặt chẽ với nhiều đơn vị cung cấp trang thiết bị Nha khoa đến từ các thương hiệu nổi tiếng và lâu năm trên thế giới như: Cingol, Jindel, Baolai…, nhằm đảm bảo mang đến cho khách hàng nguồn hàng uy tín và chất lượng cao.
        </p>
        {/* Swiper Container for Partner Images */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation={true}
          
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {dataPartner.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-[150px] h-[150px] bg-white shadow-lg rounded-full overflow-hidden mx-auto">
                <img src={item.partnerPic} alt={`Partner ${index + 1}`} className="w-full h-full object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
    </>
  );
};

export default About;
