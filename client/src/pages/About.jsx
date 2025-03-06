 
import React from 'react'
// import doctorGroup  from '/images/doctor-group.jpg'

const About = () => {
  return (
    <div>
      <div className='pt-10 text-2xl text-center text-gray-500'>
        <p>  About <span className='font-medium text-gray-700'>US</span></p>
      </div>
      <div className='flex flex-col gap-12 my-10 md:flex-row ml-52'>
        <img className='w-full md:max-w-[360px]' src='/images/doctor-group.jpg' alt="" />
        <div className= 'flex flex-col justify-center gap-6 ml-5 text-sm text-gray-600 md:w-2/4' >
          <p className='text-2xl'>welcome to Hannah Medical Clinic</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus<br/> deleniti eos deserunt nihil aliquid alias veritatis error veniam perspiciatis totam.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, atque.<br/> Voluptatem cupiditate, recusandae exercitationem excepturi, animi minus nemo <br/> in a dolore natus impedit quia facilis, optio <br/> maiores perferendis dicta nam quos distinctio incidunt deserunt ducimus vitae! <br/>Quas doloremque modi repellendus?</p>
        </div>
      </div>
      
      <div  className='my-4 mt-24 text-xl text-center' >
            <p> WHY  <span className='font-semibold text-gray-700' > Choose US</span></p>
          
      </div>
      <div className='flex flex-col mb-20 md:flex-row'>
          <div className= 'border px-8 md:px-10 py-2 sm:py-10 flex flex-col gap-3 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer mr-4' >
            <b>Efficiency:</b>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className= 'border px-8 md:px-10 py-2 sm:py-10 flex flex-col gap-3 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer mr-4' >
            <b>Convenience</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>  
          <div className= 'border px-8 md:px-10 py-2 sm:py-10 flex flex-col gap-3 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer' >
            <b>Personalization</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

      </div>
    </div>
  )
}

export default About
