import React, {useContext}  from 'react'
 
import { AuthContext } from "../context/AuthContext"
 
import { NavLink, useNavigate} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  let {name, setName} = useContext(AuthContext)
  //  console.log('user = ', user)
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      console.log("Logout Response:", data);

      setName(null)
      navigate("/"); // Redirect to login page
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
        <NavLink to='/search'  className={({ isActive }) =>
          isActive
          ? "px-1 pb-1 border-b-2 border-blue-300"
          : "px-1 pb-1" }>
          <li className='px-1 py-2 hover:text-green-500'>Search Patient</li>
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
      <div className='flex items-center gap-4'>
        
      { name ? <p>Welcome, {name}!</p> :
           <button onClick={()=> navigate('/login')} className='px-6 py-2 font-bold rounded-full md:block'>Login</button>}

       <div className='relative flex items-center gap-2 cursor-pointer group' >
            {/* <img className='w-8 rounded-full'   src={Bahman} alt="" /> */}
            <img className='w-6'  src='/images/icons8.png' alt="" />
            <div className='absolute right-0 z-20 hidden text-base font-medium top-6 pt-14 text-gay-600 group-hover:block'>
              <div className='flex flex-col gap-4 p-4 py-1 bg-gray-100 rounded min-w-48' >
               {!name && <p  onClick={()=>navigate('/signUp')} className='cursor-pointer hover:text-black'>Sign Up</p>}
               {name && <p  onClick={()=>navigate('/myAppointment')}  className='cursor-pointer hover:text-black'>My Appointments</p>}
               {name && <p  onClick={handleLogout}>Logout</p>}
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Navbar

 