"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const HomeFAQ = () => {
    const router=useRouter()
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between w-full mb-[4rem] sm:mt-0 mt-[4rem] px-4'>
        <div className='flex flex-col gap-1'>
            <div className='flex'>
                <h1 className='text-black text-2xl sm:text-6xl'>Still unsure about something?</h1>
            </div>
            <div className='flex'>
                <h1>Don't worry, whatever it is, we've got you covered in our FAQ.</h1>
            </div>
        </div>
        <div className='flex'>
            <button
             onClick={()=>router.push("/faqs")}
            className='p-4 text-white bg-primary rounded-xl w-[10rem]'>FAQ's</button>
        </div>
    </div>
  )
}

export default HomeFAQ