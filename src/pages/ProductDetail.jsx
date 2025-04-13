import { apiGetOneProduct } from '@/apis/ProductAPI';
import AddToCartButton from '@/components/buttons/AddToCartButton';
import BuyNowButton from '@/components/buttons/BuyNowButton';
import SideBar from '@/components/SideBar';
import { addToCart, clearCart } from '@/redux/appSlice';
import { ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1);
    
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
      };
    
      const handleIncrease = () => {
        setQuantity(quantity + 1);
      };
    
//API GET ONE PRODUCT
    useEffect(() => {
        const getApiOneProduct = async () => {
            const response = await apiGetOneProduct(productId);
            console.log("FULL GET ONE PRODUCT: ", response);
            setProduct(response.data.data);
        };
       getApiOneProduct();
    }, [productId]);
//END
    const [currentIndex, setCurrentIndex] = useState(0)
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? product.productPics.length - 1 : prevIndex - 1
        )
    };
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === product.productPics.length ? 0 : prevIndex + 1
        )
    };

    const dispatch = useDispatch();
    if (!product) return <div>Đang tải...</div>;
    const discount = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
    
    const handleAddToCart = () => {
        const item = {
            _id: product._id,
            title: product.title,
            price: product.salePrice || product.originalPrice,
            image: product.productPics?.[0],
            quantity,
          };
          console.log("Item to add:", item); // kiểm tra kỹ giá trị này
          dispatch(addToCart(item));
    };
    
  return (
    <div className='w-full '>
      <div className='flex flex-col md:flex-row md:p-3 items-center md:items-start bg-white gap-5'>
        <div className='flex items-center flex-col gap-2 w-full md:w-[40%] md:mr-8 pb-4 md:pb-0 border-b-8 md:border-none'>
            <div className="lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] md:w-[280px] md:h-[280px] w-[400px] h-[400px] overflow-hidden rounded-md border">
                <img 
                    src={product.productPics[currentIndex]}
                    className="object-cover object-center cursor-pointer w-full h-full"
                />
            </div>
            <div className='flex gap-2 items-center'>
                <ChevronLeftIcon onClick={handlePrev} className='size-5'/>
                {product.productPics.map((img, index) => (
                    <div 
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-[72px] h-16 border-2 ${
                            currentIndex === index ? 'border-green-500' : 'border-transparent'
                          } cursor-pointer overflow-hidden rounded-md`}
                    >
                        <img src={img} alt={`Thumbnail ${index}`} className="object-cover object-center w-full h-full"/>
                    </div>
                ))}
                <ChevronRightIcon onClick={handleNext} className='size-5'/>
            </div>
        </div>
        <div id='product_detail' className='flex flex-col w-full md:w-[65%]'>
            <div className='w-full'>
                <h2 className='font-medium text-center text-2xl'>{product.title}</h2>
                <div className='items-center gap-5 hidden md:flex'>
                    <span className='flex cursor-pointer items-center gap-1.5 rounded-sm w-20 justify-center p-0.5 bg-blue-600 text-sm text-white'>
                        <HandThumbUpIcon className='size-4'/> Thích 9
                    </span>
                    <span className='flex items-center gap-1 cursor-pointer'>
                        <ShareIcon className='size-4'/> Chia sẻ
                    </span>
                </div>
                <h3 className='font-normal text-lg'>{product.description}</h3>
            </div>
            <div className='text-sm '>
                <div className='flex items-center gap-5 md:flex-col md:items-start md:gap-1'>
                    <div className='text-gray-500'>
                        Giá gốc: <span className='line-through'>{product.originalPrice.toLocaleString() || 'chưa cập nhật'}₫</span>
                    </div>
                    <div className='flex items-center gap-2 mt-1'>
                        <span className='text-red-600 text-2xl font-bold'>
                            {product.salePrice.toLocaleString()}₫
                        </span>
                        <span className='bg-red-500 text-white text-xs px-1.5 py-0.5 rounded'>
                            -{discount || "Đang cập nhật"}%
                        </span>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-gray-700 font-normal'>Số Lượng</span>
                <div className='flex items-center border rounded overflow-hidden w-fit'>
                    <MinusIcon onClick={handleDecrease} className='size-5 text-lg font-bold text-gray-600 hover:bg-gray-100'/>
                    <div className="w-12 text-center text-red-500 font-semibold">{quantity}</div>
                    <PlusIcon onClick={handleIncrease} className='size-5 text-lg font-bold text-gray-600 hover:bg-gray-100'/>
                </div>
            </div>
            <div>
                <div className=''>
                    <BuyNowButton />
                </div>
                <div>
                    <AddToCartButton onClick={handleAddToCart}/>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
