import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoBagAddOutline } from "react-icons/io5";
import { PiBackspaceBold } from "react-icons/pi";
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddProductAdminPage() {
    const [productId,setProductId] = useState('')
    const [productName,setProductName] = useState('')
    const [alternativeName,setAlternativeName] = useState('')
    const [stock,setStock] = useState('')
    const [catagory,setCatagory] = useState('Sri Lankans Foods')
    const [labelledPrice,setlabelledPrice] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState('')
    const [description,setDescription] = useState('')
    const [isAvailable,setIsAvailable] = useState(true)
    const navigate = useNavigate()

    function handleSubmit(){
        const altNamesInArray = alternativeName.split(',')
        const productData = {
            productId:productId,
            productName:productName,
            altName:altNamesInArray,
            labelledPrice:labelledPrice,
            price:price,
            image:image,
            description:description,
            stock:stock,
            isAvailable:isAvailable,
            catagory:catagory
        }

        const token = localStorage.getItem('token')

        if(token==null){
            window.location.href='/login'
            return
        }else{
            console.log('Token Found')
        }


        axios.post(import.meta.env.VITE_backendUrl+'/products',productData,
            {
                headers:{
                    Authorization:'Bearer '+ token
                }
            }
        ).then(
            (res)=>{
                console.log('Product Add Successfully !')
                navigate('/admin/products')
                toast.success('Product Add Successfully !' +" "+ productName)
            }
        ).catch(
            (error)=>{
                console.log('Product Add Faild !' +  error)
                navigate('/admin/newProduct')
                toast.error("Product Add Faild! Try again.")

            }
        )


        console.log(productData)
    }
  return (
    <div className='w-full h-full backdrop-blur-2xl shadow-2xl shadow-blue-400/20 rounded-2xl border-1 border-blue-500 flex flex-col justify-center items-center'>
        <span className='text-2xl font-bold'>Add New Product Form</span>
        <div className='flex  justify-center  w-[80%]'>
            <div className='w-full rounded-2xl border-1 border-blue-500 p-5 m-2 flex flex-col flex-wrap'>
                <label>Product Id: </label>
                <input type="text" value={productId} onChange={(e)=>{setProductId(e.target.value)}} placeholder='#CickenRice7575' className='w-full text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2' />
                <label>Product Name: </label>
                <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}} placeholder='Full Chicken Rice' className='w-full text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2' />
                <label>Alternative Name: </label>
                <input type="text" value={alternativeName} onChange={(e)=>{setAlternativeName(e.target.value)}} placeholder='Rice,Full Rice' className='w-full  text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2' />
                <label>Stock:</label>
                <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}} placeholder='3' className='w-full  text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2' />
                <label>Labelled Price: </label>
                <input type="number" value={labelledPrice} onChange={(e)=>{setlabelledPrice(e.target.value)}} placeholder='LKR 900.00' className='w-full text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2' />
                <label>Price: </label>
                <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='LKR 750.00' className='w-full text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2' />
            </div>
            <div className='w-full rounded-2xl border-1 border-blue-500 p-5 m-2 flex flex-col flex-wrap'>
                <label>Category: </label>                
                <select type="text" value={catagory} onChange={(e)=>{setCatagory(e.target.value)}} className='w-full  text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2'>
                    <option value="Sri Lankans Foods">Sri Lankans Foods</option>
                    <option value="Indian Foods">Indian Foods</option>
                    <option value="Pakisthan Foods">Pakisthan Foods</option>                    
                </select>                
                <label>Images: </label>
                <input type="text" value={image} onChange={(e)=>{setImage(e.target.value)}} placeholder='Upload Images' className='w-full text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2' />
                <label>Description: </label>
                <textarea type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Rice Ingredients' className='w-full  text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2' />
                <label>Is Available: </label>
                <select type="text" value={isAvailable} onChange={(e)=>{setIsAvailable(e.target.value)}} className='w-full  text-gray-900 font-bold bg-transparent border-b-2 border-blue-400 outline-none pb-2'>
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>                    
                </select>
                <div className='w-full flex justify-center mt-[2%]'>
                    <button onClick={handleSubmit} type="submit" className='w-[50%] h-full gap-1 flex justify-center items-center text-xl pb-1 pt-1 bg-blue-500 text-amber-50 rounded-full m-1 cursor-pointer'><IoBagAddOutline />Add Product</button>
                    <Link to='/admin/products' type="submit" className='w-[50%] h-full text-xl pb-1 pt-1 flex justify-center items-center  bg-red-700 text-amber-50 rounded-full gap-1 m-1 cursor-pointer'><PiBackspaceBold />Cancel</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
