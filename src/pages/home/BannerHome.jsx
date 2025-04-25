import Banner from '@/components/Banner'
import SideBar from '@/components/SideBar'
const BannerHome = () => {
  return (
    <div className='relative md:flex w-full h-full xl:gap-4 xl:px-6 shadow-fuchsia-200 shadow-lg'>
        <div className='w-full px-10 md:px-0 mt-5 md:mt-0 md:w-[30%] lg:w-[28%] h-full flex'>
            <div className='w-full h-full'>
            <SideBar/>
            </div>
        </div>
        <div className='lg:w-[72%] md:w-[70%] hidden md:flex h-auto'>
            <Banner/>
        </div>
    </div>
  )
}

export default BannerHome
