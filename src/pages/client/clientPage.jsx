import React from 'react'
import Header from '../../components/header'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './productPage'
import ProductOverviewPage from './productOverviewPage'
import CartPage from './cart'
import checkoutPage from './checkoutPage'
import CheckoutPage from './checkoutPage'

export default function ClientPage() {
  return (
    
    <div className='w-full h-screen overflow-hidden'>
        <Header/>
        
       
        <div className='w-full h-[calc(100%_-_100px)] flex justify-center items-center'>
            <Routes>
                <Route path='/' element={<h1>Welcome</h1>}/>
                <Route path='/product' element={<ProductPage/>}/>
                <Route path='/overview/:productId' element={<ProductOverviewPage/>}/>
                <Route path='/reviews' element={<h1>Reviews</h1>}/>
                <Route path='/about-us' element={<h1>About Us</h1>}/>
                <Route path='/contact-us' element={<h1>Contact Us</h1>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/checkout' element={<CheckoutPage/>}/>
                <Route path='/*' element={<h1>Sorry for not found page !</h1>}/>
            </Routes>
        </div>
    </div>
  )
}