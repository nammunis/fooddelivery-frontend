import React, { useState } from 'react'
import { addToCart, getCart, getTotal } from '../../utils/cart'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const [cart, setCart] = useState(getCart())
  const navigate = useNavigate()

  return (
    <div className='w-full h-screen items-center py-30 flex flex-col'>
      {
        cart.map(
          (item) => {
            return (
              <div key={item.productId} className='w-[60%] h-[100px] m-[10px] border rounded-2xl border-amber-600 shadow-xl shadow-amber-50 flex flex-row items-center justify-between px-4 relative'>

                <div className='flex flex-row items-center gap-3 flex-1'>
                  <img src={item.image} className='w-[80px] h-[80px] object-cover rounded-2xl' />
                  <div className='flex flex-col justify-center font-semibold'>
                    <span className='text-gray-900'>{item.name}</span>
                    <span className='text-gray-900 font-normal'>LKR {item.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-4 font-semibold w-[150px]">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg cursor-pointer"
                    onClick={() => {
                      addToCart(item, -1)
                      setCart(getCart())
                    }}>

                    -</button>
                  <span className="w-8 text-center text-lg">{item.quantity}</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg cursor-pointer"
                    onClick={() => {
                      addToCart(item, 1)
                      setCart(getCart())
                    }}
                  >+</button>
                </div>

                <div className='flex justify-end items-center font-semibold min-w-[120px]'>
                  <span>LKR {(item.quantity * item.price).toFixed(2)}</span>
                </div>
                <button className='w-[30px] h-[30px] shadow rounded-2xl flex justify-center items-center text-red-500 border-1 border-red-500 absolute right-[-50px] cursor-pointer'
                  onClick={
                    () => {
                      addToCart(item, -item.quantity)
                      setCart(getCart())
                    }
                  }
                ><TbTrash /></button>
              </div>
            )
          }
        )
      }
      <div className='w-[60%] h-[90px] m-[10px] px-6 bg-amber-50/40 border border-amber-200 rounded-2xl flex flex-row items-center justify-between shadow-sm'>
        <button className='w-[180px] h-[45px] bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-md shadow-amber-600/20'
          onClick={() => {
            navigate('/checkout', { state: { item: cart } })
          }}
        >
          Checkout
        </button>

        <div className='text-right'>
          <div className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>Total</div>
          <div className='text-2xl font-bold text-gray-800'>
            LKR <span className='text-amber-600 font-extrabold'>{getTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>

  )
}
