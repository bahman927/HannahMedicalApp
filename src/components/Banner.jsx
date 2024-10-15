
import { useNavigate } from 'react-router-dom'
import image from '/images/dr11.jpg'
const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className='flex rounded-lg mb-20 px-6 w-auto  bg-primary  sm:px-10 md:px-14 lg:px-12  md:mx-10'>
      {/*     Left side */}
       <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py24 lg:pl-5'> 
         <div>
          <p  className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4'>Hannah Medical Clinic</p>
            <div className='text-white text-xl'>
              <p>Book Appointment</p>
              <p>with 100+ Trusted Doctors</p>
          </div>
         </div>
         <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-gray-100 text-sm sm:text-base  text-gray-600 px-4 py-2 rounded-full mt-8 hover:scale-105 transition-all'>Create Account</button>
       </div>  

       {/*   Right side */}
       <div className='md-block md:w-1/2 lg:w-[370] relative'>
         <img  className='w-full h-full  max-1-md'   src={image} alt="" />
       </div>
    </div>
  )
}

export default Banner
