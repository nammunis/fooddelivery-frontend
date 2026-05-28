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
    <div className='w-full h-screen bg-neutral-950 flex justify-center items-center'>
      <div className='w-[30%] h-[50%] backdrop-blur-2xl shadow-2xl shadow-blue-400/20 rounded-2xl border-1 border-blue-500 flex flex-col justify-center items-center p-6'>
        <IoLogIn className='text-amber-50 text-5xl' />
        <span className='text-2xl text-amber-50 text-center pt-2'>Login to your Account</span>
    
        <div className='w-full px-6 mt-6 flex flex-col justify-center items-center'>
          <input  onChange={(e)=>{
            setEmail(e.target.value)
          }} 
            type="email" placeholder="Username or Email" className='w-[80%] text-amber-50 bg-transparent border-b-2 border-blue-400 outline-none pb-2'/>
          <input onChange={(e)=>{
            setPassword(e.target.value)
          }} 
            type="password" placeholder="Password" className='w-[80%] text-amber-50 bg-transparent border-b-2 border-blue-400 outline-none pt-4 pb-2'/>
          <button onClick={loging} type="submit" className='w-[80%] h-[30%] text-xl pb-1 pt-1 bg-blue-500 text-amber-50 rounded-2xl m-5'>Login In</button>
          <p className='text-white'>Don't have an account? <Link to='/register' className='text-blue-500 font-bold'>Creat an Account </Link>from here</p>
        </div>
      </div>
    </div>
  )
}
