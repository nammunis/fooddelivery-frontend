import React, { useState, useEffect } from 'react'
import { addToCart, getCart, getTotal as getCartTotal } from '../../utils/cart'
import { TbTrash } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { header } from 'motion/react-client'

export default function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user,setUser]=useState(null)
  const [name,setName]=useState('')
  const [address,setAddress] = useState('')
  const [phone,setPhone]=useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token==null) {
      toast.error('Please Login to checkout');
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_backendUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      (res)=>{
        setUser(res.data)
        setName(res.data.firstName + ' '+res.data.lastName )
      }
    ).catch(
      (err)=>{
        console.error(err)
        toast.error('Faild to fetch user details')
        navigate('/login')
      }
    )
  }, []);

  const [cart, setCart] = useState(location.state?.item || [])

  useEffect(() => {
    if (!location.state || !location.state.item || location.state.item.length === 0) {
      toast.error('Please select items to checkout')
      navigate('/')
    }
  }, [location.state, navigate])

  function calculateTotal() {
    let total = 0;
    cart.forEach((item) => {
        total += item.quantity * item.price
    })
    return total;
  }

  if (cart.length === 0) return null;

  async function placeOrder(){
    const token = localStorage.getItem('token')

    if(token == null){
        toast.error('Please login to place an order')
        navigate('/login')
        return
    }

    if(name===''|| address==='' || phone===''){
      toast.error('Please fill all the fields')
      return
    }

    const order ={
        address: address,
        phone: phone,
        total: calculateTotal(),
        items: []
    }

    cart.forEach((item)=>{
        order.items.push(
            {
                productId: item.productId,
                qty: item.quantity,
                price: item.price,
                name: item.name,
                image: item.image,
                total: item.quantity * item.price
            }
        )
    })

    try {
        await axios.post(
            import.meta.env.VITE_backendUrl + '/orders/',
            order,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        toast.success('Order Placed Successfully !')
        localStorage.setItem('cart', '[]')
        navigate('/product')
    } catch (err) {}
  }

  return (
      <div className='w-full min-h-screen items-center py-20 bg-gray-50 flex flex-col gap-6'>
      
      {/* Delivery Details Form */}
      <div className='w-[60%] bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4'>
        <h2 className='text-xl font-bold text-gray-800 border-b pb-2 border-amber-200'>Delivery Details</h2>
        
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-semibold text-gray-600'>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your full name"
            className='w-full h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 transition-all text-gray-800'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-semibold text-gray-600'>Delivery Address</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter your delivery address"
            className='w-full h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 transition-all text-gray-800'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-semibold text-gray-600'>Phone Number</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Enter your phone number"
            className='w-full h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 transition-all text-gray-800'
          />
        </div>
      </div>

      {/* Cart Items */}
      <div className='w-full flex flex-col items-center'>
        {
          cart.map(
            (item, index) => {
              return (
                <div key={item.productId} className='w-[60%] h-[100px] m-[10px] bg-white border rounded-2xl border-amber-600 shadow-xl shadow-amber-50 flex flex-row items-center justify-between px-4 relative'>
                  
                  <div className='flex flex-row items-center gap-3 flex-1'>
                    <img src={item.image} className='w-[80px] h-[80px] object-cover rounded-2xl' alt={item.name}/>
                    <div className='flex flex-col justify-center font-semibold'>
                      <span className='text-gray-900'>{item.name}</span>
                      <span className='text-gray-900 font-normal'>LKR {item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-4 font-semibold w-[150px]">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg cursor-pointer" 
                      onClick={() => {
                          const newCart = [...cart]
                          newCart[index].quantity -= 1;
                          if (newCart[index].quantity <= 0) {
                            newCart.splice(index, 1);
                          }
                          setCart(newCart)
                          localStorage.setItem('cart', JSON.stringify(newCart))
                      }}>
                      -
                    </button>
                    <span className="w-8 text-center text-lg">{item.quantity}</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-amber-200 text-lg cursor-pointer"
                      onClick={() => {
                          const newCart = [...cart]
                          newCart[index].quantity += 1;
                          setCart(newCart)
                          localStorage.setItem('cart', JSON.stringify(newCart))
                      }}>
                      +
                    </button>
                  </div>

                  <div className='flex justify-end items-center font-semibold min-w-[120px]'>
                    <span>LKR {(item.quantity * item.price).toFixed(2)}</span>
                  </div> 
                  
                  <button className='w-[30px] h-[30px] shadow rounded-2xl flex justify-center items-center text-red-500 border border-red-500 absolute right-[-50px] cursor-pointer bg-white hover:bg-red-50'
                    onClick={() => {
                      const newCart = [...cart]
                      newCart.splice(index, 1);
                      setCart(newCart)
                      localStorage.setItem('cart', JSON.stringify(newCart))
                    }}>
                    <TbTrash/>
                  </button>
                </div>              
              )
            }
          )
        }
      </div>

      {/* Summary Footer */}
      <div className='w-[60%] h-[90px] m-[10px] px-6 bg-white border border-amber-200 rounded-2xl flex flex-row items-center justify-between shadow-sm'>
        <button className='w-[180px] h-[45px] bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-md shadow-amber-600/20'
        onClick={placeOrder}>
          Place order 
        </button>
        
        <div className='text-right'>
          <div className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>Total</div>
          <div className='text-2xl font-bold text-gray-800'>
            LKR <span className='text-amber-600 font-extrabold'>{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  )
}