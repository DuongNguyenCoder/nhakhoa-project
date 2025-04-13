import Banner from '@/components/Banner'
import SideBar from '@/components/SideBar'
import ProductListBar from '@/components/ui/ProductListBar'
const BannerHome = () => {
  return (
    <div className='md:flex w-full h-auto'>
        <div className='w-full px-10 md:px-0 mt-5 md:mt-0 md:w-[35%] h-full flex justify-center items-center'>
            <SideBar/>
        </div>
        <div className='w-full hidden md:flex h-full'>
            <Banner/>
        </div>
    </div>
  )
}

export default BannerHome
