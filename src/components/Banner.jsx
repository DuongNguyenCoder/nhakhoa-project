import React, { useEffect, useState } from 'react'
import BannerSlider from './BannerSlider';
import { apiGetBanner } from '@/apis/BannerAPI';

const Banner = () => {
  const [dataBanner, setDataBanner] = useState([]);
      useEffect(() => {
          const getDataBanner = async () => {
            const res = await apiGetBanner();
            console.log("API GET BANNERSLIDER: ", res.data.data);
            setDataBanner(res.data.data);
          };
          getDataBanner();
        }, []);
  return (
    <div className='w-full h-full flex gap-3'>
      <div className='xl:w-[75%] w-full h-full'>
        <BannerSlider/>
      </div>
      <div className='w-[25%] hidden xl:grid h-full grid-rows-3 gap-2'>
        {dataBanner.slice(0, 3).map((item, index) => (
          <div key={index} className='rounded-md mx-2'>
            <img 
              src={item.bannerPic} 
              alt={`Thumbnail ${index + 1}`}
              className='h-full w-full'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
