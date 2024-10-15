
import DorPic from '/images/DorPic.jpg'
import Doctors  from "/images/doctor-group.jpg"
const Header = () => {
  
  return (
    
    <div  className=' flex flex-row items-start justify-start gap-5 py-5 bg-gray-100 px-8 md:px-10 lg:px-20' >
        <div className=' flex flex-col items-start justify-start gap-4 py-[150px] '>
            {/* Left side */}
         
            <p className='text-3xl md:text-4xl text-light text-blue-500  font-semibold  '>
              Hannah Medical Clinic
            </p>
            <p className='text-xl md:text-3xl text-light text-blue-500  mb-2  '>
              Book Appointment <br /> with Trusted Doctors
            </p>
            <p>
              <img  className='w-20 h-10  rounded-full'   src={Doctors} alt="" />
            </p>
            <p className='text-light  text-blue-500'>
              Simply browse through our extensive list of  <br /> our trusted 
               doctors schedule your appintment hassle-free.
            </p>
            <div className='mt-5'>
              <a href="#speciality" className='gap-2  px-4 py-2  bg-blue-100 rounded-full hover:scale-105 transition-all text-zinc-500 tx-sm m-auto md:m-0 hover:bg-white duration-300'>
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
