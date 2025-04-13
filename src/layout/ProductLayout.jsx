import MainHeader from '@/components/MainHeader'
import TopHeader from '@/components/TopHeader'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ProductLayout = () => {
  return (
    <div>
      <div className='min-h-screen bg-gray-200'>
      <div className="w-full">
        <TopHeader />
        <MainHeader />
      </div>
      <div className='w-full md:w-[760px] lg:w-[970px] xl:w-[1230px] 2xl:w-[1500px] mx-auto md:px-1 lg:px-3'>
        <main className="w-full px-4">
          <section id='content'>
            <Outlet />
          </section> 
        </main>
      </div>
    </div>
    </div>
  )
}

export default ProductLayout
