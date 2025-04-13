import React from 'react'
import shipping from '../assets/icon-shipping.png'
import pay from '../assets/icon-pay.png'
import support from '../assets/icon-support.png'
import warranty from '../assets/icon-warranty.png'

const SubHeader = () => {
  return (
    <div className='w-full h-50% hidden md:block'>
        <div className='flex h-full items-start justify-between lg:gap-x-3 gap-x-2 w-full py-3 px-4 lg:px-6'>
            <div className='flex-col -mr-6 px-2'>
                <p className='flex items-center font-semibold lg:font-bold gap-x-1 text-[12px] lg:text-[13px]'>
                    <img 
                        src={shipping}
                        alt='logo'
                        className='size-7 xl:size-8'
                    />
                    FREE SHIPPING
                </p>
                <ul className='list-disc pl-4 marker:text-sky-500 text-[12px] lg:text-[13px] ml-5 mb-2 xl:text-[14px]'>
                    <li>
                        <a href='#'>
                            Vận chuyển trong nội thành Hà Nội
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            Free Ship mọi tỉnh thành Các đơn hàng trên 2.500.000 
                        </a>
                    </li>
                </ul>
            </div>
            <div className='flex-col px-2'>
            <p className='flex items-center font-semibold lg:font-bold gap-x-1 text-[12px] lg:text-[13px]'>
                    <img 
                        src={pay}
                        alt='logo'
                        className='size-7 lg:size-8'
                    />
                     HÌNH THỨC THANH TOÁN
                </p>
                <ul className='list-disc pl-4 marker:text-sky-500 text-[12px] lg:text-[13px] ml-5 mb-2 xl:text-[14px]'>
                    <li>
                        <a href='#'>
                            Thanh toán trực tiếp khi nhận hàng (COD)
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            Chuyển khoản & Thanh toán tại cửa hàng
                        </a>
                    </li>
                </ul>
            </div>
            <div className='flex-col px-2'>
            <p className='flex items-center font-semibold lg:font-bold gap-x-1 text-[12px] lg:text-[13px]'>
                    <img 
                        src={support}
                        alt='logo'
                        className='size-7 lg:size-8'
                    />
                     HỖ TRỢ 24/7
                </p>
                <ul className='list-disc pl-4 marker:text-sky-500 text-[12px] lg:text-[13px] ml-5 mb-2 xl:text-[14px]'>
                    <li>
                        <a href='tel:(+84 4) 3852 3643'>
                            Mọi vấn đề liên hệ:<br/>(+84 4) 3852 3643
                            
                        </a>
                    </li>
                </ul>
            </div>
            <div className='flex-col px-2'>
            <p className='flex items-center font-semibold lg:font-bold gap-x-1 text-[12px] lg:text-[13px]'>
                    <img 
                        src={warranty}
                        alt='logo'
                        className='size-7 lg:size-8'
                    />
                     HÌNH THỨC THANH TOÁN
                </p>
                <ul className='list-disc pl-4 marker:text-sky-500 text-[12px] lg:text-[13px] ml-5 mb-2 xl:text-[14px]'>
                    <li>
                        <a href='#'>
                            Thanh toán trực tiếp khi nhận hàng (COD)
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            Chuyển khoản & Thanh toán tại cửa hàng
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
};

export default SubHeader
