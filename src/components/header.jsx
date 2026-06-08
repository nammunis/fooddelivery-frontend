import { FlameIcon } from "@animateicons/react/lucide";
import React from 'react'
import { Link, Links } from 'react-router-dom'


export default function Header() {
  return (
  <div className='h-[80px] w-full bg-white/20 backdrop-blur-lg border border-white/30 flex justify-center items-center gap-6 mb-5 shadow-2xl shadow-amber-500/5 rounded-xl'>
      <Link className='font-semibold text-gray-800 hover:text-amber-500 hover:border-b transition-all duration-200 border-b border-transparent' to='/'>Home</Link>
      
      <Link className='font-semibold text-gray-800 hover:text-amber-500 hover:border-b transition-all duration-200 border-b border-transparent flex justify-center' to='/product'>
      
      <FlameIcon/>Product</Link>
      <Link className='font-semibold text-gray-800 hover:text-amber-500 hover:border-b transition-all duration-200 border-b border-transparent' to='/reviews'>Reviews</Link>
      <Link className='font-semibold text-gray-800 hover:text-amber-500 hover:border-b transition-all duration-200 border-b border-transparent' to='/about-us'>About Us</Link>
      <Link className='font-semibold text-gray-800 hover:text-amber-500 hover:border-b transition-all duration-200 border-b border-transparent' to='/contact-us'>Contact Us</Link>
  </div>
  )
}
