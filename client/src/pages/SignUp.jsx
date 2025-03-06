
// client/src/components/SignUp.js
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
 
export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('Sign Up')
   const navigate = useNavigate()
  async function handleSignUp(e) {
    e.preventDefault() 
   try { 
    const response = await fetch('http://localhost:3000/api/auth/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });

    const data = await response.json(); // Convert response to JSON

    if (response.ok) {
      alert(data.message)
      navigate("/login")
    } else {
      alert(`Error: ${data.message || "Something went wrong signing up"}`);
  }
   } catch(err) {
    console.error('error message = ', err.message);
   }
  }

  return (
    <form  onSubmit={handleSignUp}  className='min-h-[80vh] flex item-center'>
     <div className='flex flex-col gap-3 p-8 m-auto item-start min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
      <p className='text-2xl font-semibold text-center text-primary'>Sign Up</p>
      
      
          <div className='w-full'>
              <p>Full Name</p>
              <input   onChange={(e)=> setName(e.target.value)}  value={name} name='name' className='w-full p-2 mt-1 border rounded border-zinc-300' type="text" required />
          </div>
      
      <div className='w-full' >
        <p> Email</p>
        <input   onChange={(e)=> setEmail(e.target.value)}  value={email} name=
        'email ' className='w-full p-2 mt-1 border rounded border-zinc-300' type="email" required />
      </div>
      <div className='w-full' >
        <p> Password</p>
        <input  onChange={(e)=> setPassword(e.target.value)}  value={password} name='password' className='w-full p-2 mt-1 border rounded border-zinc-300' type="password" required />
      </div>    
      <button type="submit" className="p-2 mt-4 text-white bg-blue-300 rounded">Submit</button>
       <button className='w-full py-2 text-black rounded-md white text-text-base' >
          
       </button>       
     </div>
    </form>
  )
}



