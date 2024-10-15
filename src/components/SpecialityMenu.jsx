import {specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-5 py-16 text-gray-700'>
      <h1 className='text-2xl md:text-3xl text-light text-black  font-semibold '>Find by Speciality</h1>
      <p> Simply browse through our extensive list of doctors, </p>
      <div className='flex sm:justify-between gap-4 pt-2'>
        {specialityData.map((item,index) => (
          <Link onClick={()=>scrollTo(0,0)} className='hover:translate-y-[-6px]  hover:bg-blue-100 transition-all duration-400' key={index} to={`/doctors/${item.speciality}`}>
            <button className=' cursor-pointer bg-blue-100 rounded-full  text-zinc-500 text-sm m-auto md:m-0 px-4 py-2'>{item.speciality}</button>
          </Link>
        ))}
      </div> 
    </div>
  )
}

export default SpecialityMenu
