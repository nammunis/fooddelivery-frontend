import React, { useState } from 'react'
import { IoLogIn } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const navigate = useNavigate()

  function loging(){
    if(email==''){
      toast.error("Enter Your Email")
      return
    }else if(password==''){
      toast.error("Enter Your Password")
      return
    }else{
     
    
    axios.post(import.meta.env.VITE_backendUrl+'/user/login',{
      email:email,
      password:password
    }).then(
      (response)=>{
        console.log(response.data)
        localStorage.setItem('token',response.data.token)
        //const token = localStorage.getItem('token') Token Read Krganna Pawichchi krnw
        toast.success('Login Successfully!')
        if(response.data.role=='admin'){
          navigate('/admin')
        }else if(response.data.role=='user'){
          navigate('/users')
        }
      }
    ).catch((err)=>{
      console.log(err)
      toast.error("Login Faild!")
    })}
  }

  return (
    <div className='w-full min-h-screen bg-neutral-950 flex justify-center items-center p-4'>
      <div className='w-full max-w-md backdrop-blur-md bg-neutral-900/40 shadow-2xl shadow-blue-500/10 rounded-2xl border border-neutral-800 flex flex-col justify-center items-center p-6 md:p-8'>
        <div className='w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-xl flex justify-center items-center shadow-lg shadow-blue-500/5'>
          <IoLogIn className='text-blue-400 text-3xl' />
        </div>
        
        <span className='text-xl md:text-2xl font-black text-white text-center mt-4 tracking-wide'>Login to your Account</span>
    
        <div className='w-full flex flex-col gap-5 mt-8'>
          <div className='flex flex-col gap-1.5'>
            <input  
              onChange={(e)=>{setEmail(e.target.value)}} 
              type="email" 
              placeholder="Username or Email" 
              className='w-full text-base font-semibold text-white bg-neutral-900/60 border border-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-neutral-500 shadow-sm'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <input 
              onChange={(e)=>{setPassword(e.target.value)}} 
              type="password" 
              placeholder="Password" 
              className='w-full text-base font-semibold text-white bg-neutral-900/60 border border-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-neutral-500 shadow-sm'
            />
          </div>

          <button 
            onClick={loging} 
            type="submit" 
            className='w-full py-3 px-4 mt-2 text-base font-bold bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl shadow-md shadow-blue-600/10 transition-all cursor-pointer'
          >
            Log In
          </button>

          <p className='text-sm text-neutral-400 text-center mt-2 font-medium'>
            Don't have an account? <Link to='/register' className='text-blue-400 hover:text-blue-300 font-bold transition-colors ml-1'>Create an Account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
