import { apiGetBanner } from '@/apis/BannerAPI';
import Banner from '@/components/Banner'
import SideBar from '@/components/SideBar'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const BannerHome = () => {
  const [dataBanner, setDataBanner] = useState([]);

        useEffect(() => {
            const getDataBanner = async () => {
              const res = await apiGetBanner();
              console.log("API GET BANNERSLIDER: ", res);
              if(res.data.success){
                setDataBanner(res.data.data);
              } else{
                console.log("Lỗi lấy Banner!")
              }
             
            };
            getDataBanner();
          }, []);
        const enabledBanners = dataBanner.filter((banner) => banner.status === "ENABLE");

  return (
    // <div className='relative md:flex w-full h-full xl:gap-4 xl:px-6 shadow-fuchsia-200 shadow-lg'>
    //     <div className='w-full px-10 md:px-0 mt-5 md:mt-0 md:w-[30%] lg:w-[28%] h-full flex'>
    //         <div className='w-full h-full'>
    //         <SideBar/>
    //         </div>
    //     </div>
    //     <div className='lg:w-[72%] md:w-[70%] hidden md:flex h-auto'>
    //         <Banner/>
    //     </div>
    // </div>

    // Code sau khi chỉnh lần 1
    <div className="w-full">
    <div className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] shadow-lg xl:h-[580px] relative">
      <Swiper
        key={enabledBanners.length}
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-full rounded-b-lg overflow-hidden"
      >
        {enabledBanners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <Link to={banner.url}>
            <img
              src={banner.bannerPic}
              alt={`Banner ${banner._id}`}
              className="w-full h-full object-cover"
            />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  )
}

export default BannerHome
