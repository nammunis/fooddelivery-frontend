import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BiEdit, BiPlug, BiPlus } from 'react-icons/bi'
import axios from 'axios'
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';
import Loader from '../../components/loader';

const sampleProduct = [
  {
    "productId": "",
    "productName": "",
    "altName": [""],
    "labelledPrice": 0,
    "price": 0,
    "images": [""],
    "description": "",
    "stock": 0,
    "isAvailable": true,
    "catagory": "0"
  }
]

export default function ProductsAdmin() {
const [products,setProducts] = useState(sampleProduct)
const [isLoading,setIsLoading] =useState(true)
//const [a,setA] = useState(0);

useEffect(
  ()=>{
    if(isLoading){
          const token = localStorage.getItem('token')

    axios.get(import.meta.env.VITE_backendUrl+'/products', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }).then((res)=>{
      setProducts(res.data)
      setIsLoading(false)
    }).catch(
      (err)=>{
        console.log(err)
      }
    )
  }
    
  },
  [isLoading]
)
const navigate = useNavigate()
  

  return (
  <div className='w-full min-h-screen p-3 md:p-6 bg-slate-50 text-gray-900'>
        
        <h1 className='text-xl md:text-2xl font-black mb-5 text-slate-800 tracking-wide'>Products Dashboard</h1>

        <div className='w-full overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm bg-white'>
          {(isLoading)?(<Loader/>):(<table className='w-full text-left border-collapse min-w-[800px]'>
            <thead>
              <tr className='bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider' >
                <th className='p-3 md:p-4 text-left'>Image</th>
                <th className='p-3 md:p-4 text-left'>Product Id</th>
                <th className='p-3 md:p-4 text-left'>Product Name</th>
                <th className='p-3 md:p-4 text-left'>Price</th>
                <th className='p-3 md:p-4 text-left'>Labled Price</th>
                <th className='p-3 md:p-4 text-left'>Catogory</th>
                <th className='p-3 md:p-4 text-left'>Stock</th>
                <th className='p-3 md:p-4 text-left'>Avalable</th>
                <th className='p-3 md:p-4 text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 text-sm md:text-base font-medium text-slate-700'>
              {
                products && products.map(
                  (product,index)=>{
                    return(
                      <tr key={index} className='hover:bg-slate-50/80 transition-colors'>
                        <td className='p-3 md:p-4'>
                          <img src={product.images?.[0] || '/default-product.jpg'} alt={product.productName} 
                          className='w-[44px] h-[44px] object-cover rounded-lg ring-1 ring-slate-200 shadow-sm'
                          />
                        </td>
                        <td className='p-3 md:p-4 font-mono text-xs text-slate-500'>{product.productId}</td>
                        <td className='p-3 md:p-4 font-semibold text-slate-900'>{product.productName}</td>
                        <td className='p-3 md:p-4 text-blue-600 font-semibold'>LKR {product.price}</td>
                        <td className='p-3 md:p-4 text-slate-400 line-through text-xs'>LKR {product.labelledPrice}</td>
                        <td className='p-3 md:p-4'><span className='bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200/60'>{product.catagory}</span></td>
                        <td className='p-3 md:p-4 font-mono'>{product.stock}</td>
                        <td className='p-3 md:p-4'>
                          {product.isAvailable ? (
                            <span className='inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200'>
                              <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse'></span>
                              Available
                            </span>
                          ) : (
                            <span className='inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full text-xs font-bold border border-rose-200'>
                              <span className='w-1.5 h-1.5 rounded-full bg-rose-500'></span>
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className='p-3 md:p-4'>
                          <div className='flex justify-center items-center gap-2'>
                            <BiEdit onClick={
                              ()=>{
                                navigate('/admin/updateproduct/',{
                                  state:product
                                })
                              }
                            }
                            className='bg-blue-50 hover:bg-blue-100 text-blue-600 p-1.5 rounded-lg cursor-pointer text-3xl border border-blue-200/60 transition-colors shadow-sm'/>
                            
                            <MdDeleteForever className='bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg cursor-pointer text-3xl border border-rose-200/60 transition-colors shadow-sm' 
                            onClick={()=>{
                              const token = localStorage.getItem('token')
                              if(token==null){
                                navigate('/login')
                                return
                              }
                              axios.delete(import.meta.env.VITE_backendUrl+'/products/'+product._id,
                                {
                                  headers:{
                                    Authorization:`Bearer ${token}`
                                  }
                                }
                              ).then(
                                (res)=>{
                                  toast.success('Deleted Successfully!')
                                  setIsLoading(!isLoading)
                                }
                              ).catch(
                                (err)=>{
                                  toast.error("Deleted Faild!")
                                }
                              )
                            }}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  }
                )
              }
            </tbody>
          </table>)}
        </div>
        
        <Link to='/admin/newProduct' className='fixed right-6 bottom-20 md:bottom-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all p-3 z-40 cursor-pointer flex items-center justify-center'>
            <BiPlus className='text-4xl md:text-5xl'/>
        </Link>
  </div>
  )
}