import React, {useContext, useState}  from 'react'
import { AuthContext } from "../context/AuthContext"
import { NavLink, useNavigate} from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa"; // Import user circle icon
const Navbar = () => {
  const navigate = useNavigate()
  const {name, setName,userId, setUserId, role, setRole, isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
   const [isDoctorMenuOpen, setIsDoctorMenuOpen] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   
  const handleLogout = async () => {
    try {
      const response = await fetch("https://www-promedicalclinic-com.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      console.log("Logout Response:", data);
      setIsLoggedIn(false)
      setName(null)
      setRole(null)
      setUserId(null)
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken")
     // localStorage.clear()
      navigate("/"); 
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
   
  return ( 
    <>
    <div  className='flex items-center justify-between py-4 mb-4 border-b text-m border-b-gray-400'>
      <img onClick={()=>navigate('/')} className='mr-2 cursor-pointer w-15' src='/images/new1.jpg' alt='' />
      <ul className='items-start gap-4 font-medium list-none md:flex' >
        <NavLink to='/'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2  border-blue-300"
          : "px-1 pb-1" }>
          <li className='px-1 py-2 hover:text-green-500' >Home</li>
        </NavLink>
        <NavLink to='/doctors'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2  border-blue-300"
          : "px-1 pb-1" }>
          <li className='px-1 py-2 hover:text-green-500'>All Doctors</li>
        </NavLink>
        <NavLink to='/AppointmentList'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2 border-blue-300"
          : "px-1 pb-1" }>
          <li className='px-1 py-2 hover:text-green-500'>Appointments</li>
        </NavLink>
        <NavLink to='/about'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2 border-blue-300"
          : "px-1 pb-1" }>
          <li className='px-1 py-2 hover:text-green-500'>About</li>
        </NavLink>
    
        <NavLink to='/contact'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2 border-blue-300"
          : "px-1 pb-1" }>
          <li className='px-1 py-2 hover:text-green-500'>Contact</li>
        </NavLink>
        </ul>
     { role === "admin" &&  (
      <div className="relative inline-block px-1 pb-1">
        <button
         onClick={() => setIsOpen(!isOpen)}
         className="px-4 py-2 font-medium text-black rounded-lg"
      >
        Doctor Options
        </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 w-48 mt-2 bg-white rounded-lg shadow-lg"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <ul className="py-2">
              
              <li  className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/admin-dashboard')}>
                List Doctor
              </li>
              <li className="px-4 py-2 cursor-pointer hover:bg-gray-200"  onClick={()=>navigate('/addDoctor')}>
                Add Doctor
              </li>
              {/* <li className="px-4 py-2 cursor-pointer hover:bg-gray-200"  onClick={()=>navigate('/disableDoctor')}>
                Disable Doctor
              </li> */}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      </div>)}
     
      <div className='flex items-center gap-4'>   
      { isLoggedIn ? (
        <div className="flex items-center space-x-2">
          <p className="text-lg text-yellow-600">Welcome, {name}!</p>
          <FaUserCircle className="text-2xl text-green-200" title="Logged in" />  
        </div>
        )
           :
           <button onClick={()=> navigate('/login')} className='px-6 py-2 font-bold rounded-full md:block'>Login</button>}

       <div className='relative flex items-center gap-2 cursor-pointer group' >
            <img className='w-6'  src='/images/icons8.png' alt="" />
            <div className='absolute right-0 z-20 hidden text-base font-medium top-4 pt-14 text-gay-600 group-hover:block'>
              <div className='flex flex-col gap-4 p-4 py-1 bg-gray-100 rounded min-w-48' >
               {!isLoggedIn && <p  onClick={()=>navigate('/signUp')} className='cursor-pointer hover:text-black'>Sign Up</p>}
               {/* {isLoggedIn && <p  onClick={()=>navigate('/AppointmentList')} className='cursor-pointer hover:text-black'> Appointments</p>} */}
               {isLoggedIn && <p  onClick={handleLogout}>Logout</p>}
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Navbar

 