import React, {useState, useContext} from 'react'
import {useNavigate, Link} from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
const Login = () => {
   const [state, setState] = useState('Login')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [role, setRole] = useState('patient')
   const { login, name,setName, showToast, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
   const navigate = useNavigate()
   
   const submitHandler = async (e) => {
      e.preventDefault()
     //    console.log('email = ', email, 'password = ', password, ' role : ', role)  
      if (!email || !password || !role) {
        showToast("Please enter email and password and role.", "warning")
        return;
      }
       await login(email, password, role)
     
       navigate("/");    
   }
  return (
    <form  onSubmit={submitHandler}  className='min-h-[80vh] flex item-center'>
     <div className='flex flex-col gap-3 p-8 m-auto item-start min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
      
      <p className='text-2xl font-semibold text-center text-primary'>Login</p>
      <div className='w-full font-medium' >
        <p> Email</p>
        <input   onChange={(e)=> setEmail(e.target.value)}  value={email} name=
        'email' className='w-full p-2 mt-1 border rounded border-zinc-300' type="email" required />
      </div>
      <div className='w-full font-medium' >
        <p> Password</p>
        <input  onChange={(e)=> setPassword(e.target.value)}  value={password} name='password' className='w-full p-2 mt-1 border rounded border-zinc-300' type="password" required />
      </div>   
      <div className='w-full font-medium'>
          <p>Role</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full p-2 mt-1 border rounded border-zinc-300'
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div> 
       <button type="submit" className="p-2 mt-4 text-lg font-medium text-white bg-blue-300 rounded">Submit
       </button> 
       <p className="mt-2 text-sm">
        Don’t have an account?{'  '}
        <Link to="/signup" className="font-medium text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
     </div>
    </form>
  )
}

export default Login
