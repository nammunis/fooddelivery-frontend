import React from 'react'
import importLogo from '../img/admin-dashbord-logo.png';
import { Link, Route, Routes } from 'react-router-dom'
import { LuLayoutDashboard, LuUsers, LuSettings } from "react-icons/lu";
import { TbShoppingBagHeart } from "react-icons/tb";
import { FiPackage } from "react-icons/fi";
import ProductsAdmin from './admin/productsAdmin';
import AddProductAdminPage from './admin/addProductAdminPage';
import UpdateProductAdminPage from './admin/updateProduct.jsx';
import OrderPage from './admin/orderPage.jsx';

export default function AdminPage() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="fixed bottom-0 left-0 w-full z-50 bg-neutral-950 text-white p-3 border-t border-neutral-800 flex flex-row justify-around gap-1 md:relative md:bottom-auto md:left-auto md:w-[20%] md:h-screen md:sticky md:top-0 md:flex-col md:justify-start md:gap-3 md:p-4 md:pt-[2%]">
        <Link className="flex flex-col md:flex-row items-center gap-1 md:gap-4 w-full border border-neutral-800 hover:border-blue-500 hover:bg-neutral-900 rounded-xl md:rounded-2xl px-2 py-2 md:px-6 md:py-3 transition-colors text-center md:text-left" to="/admin/">
            <LuLayoutDashboard className="text-xl md:text-2xl text-blue-400" />
            <span className="text-[10px] sm:text-xs md:text-base font-medium">Dashboard</span>
        </Link>     
        <Link className="flex flex-col md:flex-row items-center gap-1 md:gap-4 w-full border border-neutral-800 hover:border-blue-500 hover:bg-neutral-900 rounded-xl md:rounded-2xl px-2 py-2 md:px-6 md:py-3 transition-colors text-center md:text-left" to="/admin/products">
            <TbShoppingBagHeart className="text-xl md:text-2xl text-pink-400" />
            <span className="text-[10px] sm:text-xs md:text-base font-medium">Products</span>
        </Link>     
        <Link className="flex flex-col md:flex-row items-center gap-1 md:gap-4 w-full border border-neutral-800 hover:border-blue-500 hover:bg-neutral-900 rounded-xl md:rounded-2xl px-2 py-2 md:px-6 md:py-3 transition-colors text-center md:text-left" to="/admin/orders">
            <FiPackage className="text-xl md:text-2xl text-amber-400" />
            <span className="text-[10px] sm:text-xs md:text-base font-medium">Orders</span>
        </Link>     
        <Link className="flex flex-col md:flex-row items-center gap-1 md:gap-4 w-full border border-neutral-800 hover:border-blue-500 hover:bg-neutral-900 rounded-xl md:rounded-2xl px-2 py-2 md:px-6 md:py-3 transition-colors text-center md:text-left" to="/admin/users">
            <LuUsers className="text-xl md:text-2xl text-teal-400" />
            <span className="text-[10px] sm:text-xs md:text-base font-medium">Users</span>
        </Link>     
        <Link className="flex flex-col md:flex-row items-center gap-1 md:gap-4 w-full border border-neutral-800 hover:border-blue-500 hover:bg-neutral-900 rounded-xl md:rounded-2xl px-2 py-2 md:px-6 md:py-3 transition-colors text-center md:text-left" to="/admin/setting">
            <LuSettings className="text-xl md:text-2xl text-purple-400" />
            <span className="text-[10px] sm:text-xs md:text-base font-medium">Setting</span>
        </Link>     
      </div>

      <div className='w-full md:w-[80%] min-h-screen bg-slate-50 p-4 md:p-6 pb-24 md:pb-6 overflow-y-auto'>
          <Routes>
              <Route path='/' element={<h1>Dashboard</h1>}/>
              <Route path='/products' element={<ProductsAdmin/>}/>
              <Route path='/orders' element={<OrderPage/>}/>
              <Route path='/newProduct' element={<AddProductAdminPage/>}/>
              <Route path='/updateproduct' element={<UpdateProductAdminPage/>}/>
          </Routes>
      </div>
    </div>
  )
}