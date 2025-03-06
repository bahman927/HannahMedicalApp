import React, {useState, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
const Login = () => {
   const [state, setState] = useState('Login')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   
   const { login, name } = useContext(AuthContext)
   const navigate = useNavigate()
   
   const submitHandler = async (e) => {
      e.preventDefault()
        // console.log('email = ', email, 'password = ', password)  
      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }
       await login(email, password)
       
      
       navigate("/");  // Redirect to home page
      
   }
  return (
    <form  onSubmit={submitHandler}  className='min-h-[80vh] flex item-center'>
     <div className='flex flex-col gap-3 p-8 m-auto item-start min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
      
      <p className='text-2xl font-semibold text-center text-primary'>Login</p>
      <div className='w-full' >
        <p> Email</p>
        <input   onChange={(e)=> setEmail(e.target.value)}  value={email} name=
        'email' className='w-full p-2 mt-1 border rounded border-zinc-300' type="email" required />
      </div>
      <div className='w-full' >
        <p> Password</p>
        <input  onChange={(e)=> setPassword(e.target.value)}  value={password} name='password' className='w-full p-2 mt-1 border rounded border-zinc-300' type="password" required />
      </div>    
       <button type="submit" className="p-2 mt-4 text-white bg-blue-300 rounded">Submit</button>   
     </div>
    </form>
  )
}

export default Login
