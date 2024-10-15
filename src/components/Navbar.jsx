import Logo     from '/images/new1.jpg'
import Bahman   from '/images/Bahman-5.jpg'
import Dropdown from '/images/icons8.png'
import {useState} from 'react'
import { NavLink, useNavigate} from "react-router-dom"
const Navbar = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(true)
  // const [showMenu, setShowMenu] = useState(false)

  return ( 
    <>
    <div  className='flex items-center justify-between text-m py-4 mb-4 border-b border-b-gray-400'>
      <img onClick={()=>navigate('/')} className='w-15  mr-2 cursor-pointer' src={Logo} alt='' />
      <ul className='  md:flex items-start gap-4 font-medium list-none' >
        <NavLink to='/'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2  border-blue-300"
          : "px-1 pb-1" }>
          <li className='py-2 px-1 hover:text-green-500' >Home</li>
        </NavLink>
        <NavLink to='/doctors'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2  border-blue-300"
          : "px-1 pb-1" }>
          <li className=' py-2 px-1 hover:text-green-500'>All Doctors</li>
        </NavLink>
        <NavLink to='/search'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2 border-blue-300"
          : "px-1 pb-1" }>
          <li className='py-2 px-1 hover:text-green-500'>Search Patient</li>
        </NavLink>
        <NavLink to='/about'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2 border-blue-300"
          : "px-1 pb-1" }>
          <li className='py-2 px-1 hover:text-green-500'>About</li>
        </NavLink>
    
        <NavLink to='/contact'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2 border-blue-300"
          : "px-1 pb-1" }>
          <li className='py-2 px-1 hover:text-green-500'>Contact</li>
        </NavLink>
         
     </ul>
      <div className='flex items-center gap-4'>
        {
          token ? 
          <div className='flex items-center gap-2 cursor-pointer group relative' >
            <img className='w-8 rounded-full'   src={Bahman} alt="" />
            <img className='w-6'  src={Dropdown} alt="" />
            <div className='absolute top-6 right-0 pt-14 text-base font-medium text-gay-600  hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 py-' >
                <p  onClick={()=>navigate('/signUp')}      className='hover:text-black cursor-pointer'>Sign Up</p>
                <p  onClick={()=>navigate('/myProfile')}      className='hover:text-black cursor-pointer'>My Profile</p>
                <p  onClick={()=>setToken(false)}>Logout</p>
              </div>
            </div>
          </div>
          :
          <button onClick={()=> navigate('/login')} className='bg-primary text-white rounded-full py-2 px-6 font-medium hidden md:block'>Login</button>
        }
      </div>
    </div>
    </>
  )
}

export default Navbar

 