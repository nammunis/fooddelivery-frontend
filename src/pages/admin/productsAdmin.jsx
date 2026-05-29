import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BiPlug, BiPlus } from 'react-icons/bi'
import axios from 'axios'
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';

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
  const [a,setA] = useState(0);
  
  useEffect(
    ()=>{
      axios.get(import.meta.env.VITE_backendUrl+'/products').then((res)=>{
        setProducts(res.data)
      }).catch(
        (err)=>{
          console.log(err)
        }
      )
    },
    [a]
  )
  const navigate = useNavigate()
  

  return (
    <div className='w-full h-[100%] rounded-[1%] p-5 bg-blue-50 text-gray-900'>
        
        <h1 className='text-2xl font-bold mb-5 text-slate-800'>Products Dashboard</h1>

        <table className='w-[100%] text-left border-collapse bg-white rounded-lg shadow-sm overflow-hidden'>
          <thead>
            <tr className='bg-blue-100 border-b border-blue-200 text-xs font-semibold text-slate-700 uppercase tracking-wider' >
              <th className='p-[10px] text-left'>Image</th>
              <th className='p-[10px] text-left'>Product Id</th>
              <th className='p-[10px] text-left'>Product Name</th>
              <th className='p-[10px] text-left'>Price</th>
              <th className='p-[10px] text-left'>Labled Price</th>
              <th className='p-[10px] text-left'>Catogory</th>
              <th className='p-[10px] text-left'>Stock</th>
              <th className='p-[10px] text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products && products.map(
                (product,index)=>{
                  return(
                    <tr key={index} className='border-b border-gray-100 hover:bg-blue-50/50 transition-colors'>
                      <td className='p-[10px]'>
                        <img src={product.images?.[0] || '/default-product.jpg'} alt={product.productName} 
                        className='w-[50px] h-[50px] object-cover rounded'
                        />
                      </td>
                      <td className='p-[10px]'>{product.productId}</td>
                      <td className='p-[10px]'>{product.productName}</td>
                      <td className='p-[10px]'>${product.price}</td>
                      <td className='p-[10px]'>${product.labelledPrice}</td>
                      <td className='p-[10px]'>{product.catagory}</td>
                      <td className='p-[10px]'>{product.stock}</td>
                      <td className='p-[10px]'> 
                        <MdDeleteForever className='bg-red-500 text-white p-1 rounded cursor-pointer text-3xl shadow-md hover:bg-red-600 transition-colors' 
                        onClick={()=>{
                          const token = localStorage.getItem('token')
                          if(token==null){
                            navigate('/login')
                            return
                          }
                          axios.delete(import.meta.env.VITE_backendUrl+'/products/'+product.productId,
                            {
                              headers:{
                                Authorization:`Bearer ${token}`
                              }
                            }
                          ).then(
                            (res)=>{
                              toast.success('Deleted Successfully!')
                              setA(a+1)
                            }
                          ).catch(
                            (err)=>{
                              toast.error("Deleted Faild!")
                            }
                          )
                        }}
                        />
                      </td>

                    </tr>
                  )
                }
              )
            }
          </tbody>
        </table>
        <Link to='/admin/newProduct' className='fixed right-[3%] bottom-[5%] bg-blue-500 text-amber-50 rounded-2xl shadow-2xl shadow-blue-500 cursor-pointer z-10'>
            <BiPlus className='text-6xl'/>
        </Link>
    </div>
  )
}