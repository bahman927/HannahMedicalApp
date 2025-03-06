import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const {doctors} = useContext(AuthContext)
  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='items-center mb-2 text-3xl'>Top Doctors to Book</h1>
      <p className='mb-10'>Simply browse through extensive list of trusted doctors</p>
      <div className='grid w-full grid-cols-5 gap-5 ' >
        {doctors.slice(0,10).map((item,index)=>(
          <div onClick={()=> navigate(`/appointment/${item._id}`)} key={index}>
            <img   className='w-40 h-36 mb-2 cursor-pointer  bg-gray-100
             hover:translate-y-[-6px]  
            transition-all duration-400' src={item.image} alt="" />
            <div>
              <span className='text-sm text-green-500'>Available</span>
            </div>
            <p className='font-serif text-base cursor-pointer'>{item.name}</p>
            <p className='mb-3 text-sm cursor-pointer '>{item.speciality}</p>
          </div> 
        
        ))}
           
      </div>
      <div className='flex items-center justify-center mt-5'>
        <button onClick={() =>{navigate('/doctors'); scroll(0,0)} } 
         className='py-1 my-4 mb-32 text-sm text-white bg-blue-200 rounded-full px-7'>More</button>
      </div> 
    </div>
  )}

export default TopDoctors
