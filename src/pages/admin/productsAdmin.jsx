import React from 'react'
import { Link } from 'react-router-dom'
import { BiPlug, BiPlus } from 'react-icons/bi'

export default function ProductsAdmin() {
  return (
    <div className='bg-amber-50'>
        <Link to='/admin/newProduct' className='fixed right-[3%] bottom-[5%] bg-blue-500 text-amber-50 rounded-2xl shadow-2xl shadow-blue-500 cursor-pointer'>

            <BiPlus className='text-6xl'/>
        </Link>

    </div>
  )
}
