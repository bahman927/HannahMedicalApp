import {useState, useContext, useEffect} from 'react'
import { useParams, useNavigate} from "react-router-dom"
import { AppContext } from "../context/myContext"
const Doctors = () => { 

  const [filterDoc, setFilterDoc] = useState([])
  const {speciality} = useParams()
  const {doctors} = useContext(AppContext)
  const navigate = useNavigate()
  
  useEffect (()=> {
    const applyFilter = ()=> { 
      speciality
       ?
        setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
       :
        setFilterDoc(doctors)
   }
      applyFilter()
  }, [doctors, speciality]
  )


  return (
    
    <div> 
        <p className='text-xl font-semibold text-gray-500 mt-5 mb-8'> Browse through the doctors speciality</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 '>
            <div className='flex flex-col gap-5 text-sm text-gray-600'>
            <p onClick={()=> navigate('/doctors/General Physician') } className='bg-indigo-100 w-[94vw] sm:w-auto pl-3 py-1.5  pr-16 border border-gray-300 rounded transition-all cursor-pointer'>General Physician</p>
            <p onClick={()=>navigate('/doctors/Gynecologist')} className='bg-indigo-100 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer'>Gynecologist</p>
            <p onClick={()=>navigate('/doctors/Dermatalogist')} className={` bg-indigo-100 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Dermatalogist</p>
            <p onClick={()=>navigate('/doctors/Neurologist')} className={`bg-indigo-100 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Neurologist</p>
            <p onClick={()=>navigate('/doctors/Gastroenterologist')} className={`bg-indigo-100 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Gastroenterologist</p>
            <p onClick={()=>navigate('/doctors/Pediatrician')} className={`bg-indigo-100 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Pediatrician</p>
            </div>
            <div className='w-4/5 grid grid-cols-4  gap-y-2'>
            {
              filterDoc.map((item,index)=>(
                <div onClick={()=> navigate(`/appointment/${item._id}`)} key={index}>
                  <img   className='w-40 h-36  cursor-pointer  bg-gray-100 hover:translate-y-[-6px]  transition-all duration-400' src={item.image} alt="" />
                  <div>
                    <span className='text-green-500 text-sm'>Available</span>
                  </div>
                <p className='cursor-pointer text-base font-serif'>{item.name}</p>
                <p className=' cursor-pointer text-sm mb-3'>{item.speciality}</p>
              </div> 
              
              ))
            }
            </div>
        </div>
        
   </div>
 )
}

export default Doctors