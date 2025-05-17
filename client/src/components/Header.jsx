import React from "react"
 import DorPic from '/images/DorPic.jpg'
 import Doctors  from "/images/doctor-group.jpg"
const Header = () => {
  
  return (
    
    <div  className='flex flex-row items-start justify-start gap-5 px-8 py-5 bg-gray-100 md:px-10 lg:px-20' >
        <div className=' flex flex-col items-start justify-start gap-4 py-[150px] '>
            {/* Left side */}
         
            <p className='text-3xl font-semibold text-blue-500 md:text-4xl text-light '>
              Hannah Medical Clinic
            </p>
            <p className='mb-2 text-xl text-blue-500 md:text-3xl text-light '>
              Book Appointment <br /> with Trusted Doctors
            </p>
            <p>
              <img  className='w-20 h-10 rounded-full'   src={Doctors} alt="" />
            </p>
            <p className='text-blue-500 text-light'>
              Simply browse through our extensive list of  <br /> our trusted 
               doctors schedule your appintment hassle-free.
            </p>
            <div className='mt-5'>
              <a href="#speciality" className='gap-2 px-4 py-2 m-auto transition-all duration-300 bg-blue-100 rounded-full hover:scale-105 text-zinc-500 text-sm md:m-0 hover:bg-white'>
                Book Appointment
              </a>
            </div>
           
        </div>
       
        <div>
          {/*  Right side */}
          <div>
              <img className='md:w-4/5  h-[500px] m-16' src={DorPic}  alt="" />
          </div>
        </div>
    </div>
    
    
  )
}

export default Header
