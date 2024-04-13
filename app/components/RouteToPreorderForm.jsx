"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const RouteToPreorderForm = () => {
    const router=useRouter()
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between w-full mb-[4rem] sm:mt-0 mt-[4rem] px-4'>
        <div className='flex flex-col gap-1'>
            <div className='flex'>
                <h1 className='text-black text-2xl sm:text-6xl'>Reserve Your Preorder Today</h1>
            </div>
            <div className='flex'>
                <h1>Exclusive Access to Upcoming Releases - Secure Your Spot Now!</h1>
            </div>
        </div>
        <div className='flex'>
            <button
             onClick={()=>router.push("/preorder-form")}
            className='p-4 text-white bg-primary rounded-xl w-[10rem]'>Preorder Now</button>
        </div>
    </div>
  )
}

export default RouteToPreorderForm