import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { ProductLoader } from '../../components/productLoading';
import ImageSlider from '../../components/imgeSlider';
import { div, span } from 'motion/react-client';
import { BsCart3 } from "react-icons/bs";


export default function ProductOverviewPage() {
     const params = useParams()
     const [product,setProduct] = useState(null);
     const [status,setStatus] = useState('Loading') //Loading,Success or Error
     useEffect(()=>{
      
      
      if(status==='Loading'){
        axios.get(import.meta.env.VITE_backendUrl + `/products/${params.productId}`).then(
          (res)=>{
            setProduct(res.data)
            setStatus('success')
            
          }
        ).catch(
          (error)=>{
            setStatus('error')
            toast.error(error)
          }
        )
      }
     },[status])
  return (
    <div className='w-full h-full'>
      {status=='Loading' && <ProductLoader/>}
      {status=='success' && 
        <div className='w-full h-full flex flex-row'>
          <div className='w-[49%] h-full flex flex-col justify-center items-center'>
            <ImageSlider images = {product.images}/>
          </div>
          <div className='w-[49%] h-full flex flex-col items-center pt-[50px] '>
            {console.log(product)}
            <h1 className='text-2xl font-semibold'>{product.productName} <span className='text-2xl font-extralight'>{product.altName.join(' | ')}</span></h1>
            <p className=' mt-[2px]'>{product.description}</p>
            <div className='w-full flex flex-col items-center mt-[20px]'>
            {
              product.labelledPrice> product.price? 
              <div>
                <span className='text-2xl font-normal line-through'>LKR {product.labelledPrice.toFixed(2)} </span>
                <span className='text-2xl font-bold'>LKR {product.price.toFixed(2)}</span>
              </div>:
              <div>
                <span className='text-2xl font-bold'>LKR {product.price.toFixed(2)}</span>
              </div>
            }
            </div>
            <div className='w-full flex flex-row justify-center items-center mt-[5px] gap-1'>
              <button className='cursor-pointer shadow-2xl rounded-2xl  shadow-amber-300 bg-amber-600 text-gray-900'>Buy Now</button>
              <button className='cursor-pointer shadow-2xl rounded-2xl shadow-amber-300 bg-amber-600 text-gray-900'><BsCart3 />Add to cart</button>
            </div>

          </div>
        </div>}
      {status=='error' && <div>
        Product Loading Faild !
        </div>}
    </div>
  )
}
