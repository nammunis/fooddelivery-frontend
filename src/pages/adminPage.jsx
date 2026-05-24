import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function AdminPage() {
  return (
<div className='w-full h-screen flex'>
    <div className='w-[20%] h-full bg-green-600 text-white p-4'>
        <span>Admin</span>
    </div>
    <div className='w-[calc(100%-20%)] h-full bg-green-50'>
        <Routes path='/*'>
            <Route path='/' element={<h1>Dashbord</h1>}/>
            <Route path='/products' element={<h1>Products</h1>}/>
            <Route path='/orders' element={<h1>orders</h1>}/>
        </Routes>
    </div>
</div>
  )
}
