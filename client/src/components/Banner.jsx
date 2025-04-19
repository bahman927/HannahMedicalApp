import React from 'react'

import { useNavigate } from 'react-router-dom'
 import image from '/images/dr11.jpg'
const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className='flex w-auto px-6 mb-20 rounded-lg bg-primary sm:px-10 md:px-14 lg:px-12 md:mx-10'>
      {/*     Left side */}
       <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py24 lg:pl-5'> 
         <div>
          <p  className='mb-4 text-xl font-semibold text-white sm:text-2xl md:text-3xl lg:text-4xl'>Hannah Medical Clinic</p>
            <div className='text-xl text-white'>
              <p>Book Appointment</p>
              <p>with 100+ Trusted Doctors</p>
          </div>
         </div>
         <button onClick={()=>{navigate('/signUp'); scrollTo(0,0)}} className='px-4 py-2 mt-8 text-sm text-gray-600 transition-all bg-gray-100 rounded-full sm:text-base hover:scale-105'>Create Account</button>
       </div>  

       {/*   Right side */}
       <div className='md-block md:w-1/2 lg:w-[370] relative'>
         <img  className='w-full h-full max-1-md'   src={image} alt="" />
       </div>
    </div>
  )
}

export default Banner
