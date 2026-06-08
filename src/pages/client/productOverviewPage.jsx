import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { ProductLoader } from '../../components/productLoading';
import ImageSlider from '../../components/imgeSlider';


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
          <div className='w-[49%] h-full'>

          </div>
        </div>}
      {status=='error' && <div>
        Product Loading Faild !
        </div>}
    </div>
  )
}
