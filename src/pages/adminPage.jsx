import React from 'react'
import importLogo from '../img/admin-dashbord-logo.png';
import { Link, Route, Routes } from 'react-router-dom'
import { LuLayoutDashboard, LuUsers, LuSettings } from "react-icons/lu";
import { TbShoppingBagHeart } from "react-icons/tb";
import { FiPackage } from "react-icons/fi";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[20%] pt-[2%] flex flex-col gap-2 bg-neutral-950 text-white p-4">
        <Link className="flex items-center gap-4 w-[100%] border border-neutral-800 rounded-2xl px-6 py-2" to="/admin/">
            <LuLayoutDashboard className="text-xl" />
            <span>Dashboard</span>
        </Link>     
        <Link className="flex items-center gap-4 w-[100%] border border-neutral-800 rounded-2xl px-6 py-2" to="/admin/products">
            <TbShoppingBagHeart className="text-xl" />
            <span>Products</span>
        </Link>     
        <Link className="flex items-center gap-4 w-[100%] border border-neutral-800 rounded-2xl px-6 py-2" to="/admin/orders">
            <FiPackage className="text-xl" />
            <span>Orders</span>
        </Link>     
        <Link className="flex items-center gap-4 w-[100%] border border-neutral-800 rounded-2xl px-6 py-2" to="/admin/users">
            <LuUsers className="text-xl" />
            <span>Users</span>
        </Link>     
        <Link className="flex items-center gap-4 w-[100%] border border-neutral-800 rounded-2xl px-6 py-2" to="/admin/setting">
            <LuSettings className="text-xl" />
            <span>Setting</span>
        </Link>     
      </div>

      <div className='w-[80%] h-full bg-gray-100 p-6'>
          <Routes>
              <Route path='/' element={<h1>Dashboard</h1>}/>
              <Route path='/products' element={<h1>Products</h1>}/>
              <Route path='/orders' element={<h1>Orders</h1>}/>
          </Routes>
      </div>
    </div>
  )
}