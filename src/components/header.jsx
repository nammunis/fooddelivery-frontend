import React from 'react'
import { Link, Links } from 'react-router-dom'

export default function Header() {
  return (
    <div className='h-[60px] w-full bg-blue-100 flex justify-center items-center gap-5'>
        <Link className='font-semibold' to='/'>Home</Link>
        <Link className='font-semibold' to='/product'>Product</Link>
        <Link className='font-semibold' to='/reviews'>Reviews</Link>
        <Link className='font-semibold' to='/about-us'>About Us</Link>
        <Link className='font-semibold' to='/contact-us'>Contact Us</Link>
    </div>
  )
}
