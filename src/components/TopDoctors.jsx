import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/myContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const {doctors} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-3xl items-center mb-2'>Top Doctors to Book</h1>
      <p className='mb-10'>Simply browse through extensive list of trusted doctors</p>
      <div className=' grid grid-cols-5 w-full  gap-5' >
        {doctors.slice(0,10).map((item,index)=>(
          <div onClick={()=> navigate(`/appointment/${item._id}`)} key={index}>
            <img   className='w-40 h-36 mb-2 cursor-pointer  bg-gray-100
             hover:translate-y-[-6px]  
            transition-all duration-400' src={item.image} alt="" />
            <div>
              <span className='text-green-500 text-sm'>Available</span>
            </div>
            <p className='cursor-pointer text-base font-serif'>{item.name}</p>
            <p className=' cursor-pointer text-sm mb-3'>{item.speciality}</p>
          </div> 
        
        ))}
           
      </div>
      <div className='flex justify-center items-center mt-5'>
        <button onClick={() =>{navigate('/doctors'); scroll(0,0)} } 
         className='bg-blue-200 rounded-full text-white text-sm mb-32
          px-7 py-1 my-4'>More</button>
      </div> 
    </div>
  )}

export default TopDoctors
