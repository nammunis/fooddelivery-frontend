import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoBagAddOutline } from "react-icons/io5";
import { PiBackspaceBold } from "react-icons/pi";
import axios from 'axios';
import toast from 'react-hot-toast';
import UploadFile from '../../utils/mediaUpload';

export default function AddProductAdminPage() {
    const [productId,setProductId] = useState('')
    const [productName,setProductName] = useState('')
    const [alternativeName,setAlternativeName] = useState('')
    const [stock,setStock] = useState('')
    const [catagory,setCatagory] = useState('Sri Lankans Foods')
    const [labelledPrice,setlabelledPrice] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState([])
    const [description,setDescription] = useState('')
    const [isAvailable,setIsAvailable] = useState(true)
    const navigate = useNavigate()

    async function handleSubmit(){

        const promisesArray = []

        for(let i=0;i<image.length; i++){
            
            const promise = UploadFile(image[i])
            promisesArray[i]= promise
            
        }
        
        const reponses = await Promise.all(promisesArray)
        console.log(reponses)
        


        const altNamesInArray = alternativeName.split(',')
        const productData = {
            productId:productId,
            productName:productName,
            altName:altNamesInArray,
            labelledPrice:labelledPrice,
            price:price,
            images:reponses,
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
    <div className='w-full min-h-screen p-4 sm:p-6 md:p-10 bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center font-sans'>
        <div className='w-full max-w-5xl backdrop-blur-xl bg-white/70 shadow-[0_20px_50px_rgba(59,130,246,0.15)] rounded-3xl border border-white/80 p-6 md:p-8 flex flex-col gap-8'>
            
            {/* Form Header */}
            <div className='flex flex-col gap-1 border-b border-slate-200 pb-4'>
                <span className='text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                    Add New Food Product
                </span>
                <p className='text-sm text-slate-500 font-medium'>Insert the details of the new dish or beverage to the menu.</p>
            </div>

            {/* Responsive Content Wrapper */}
            <div className='w-full flex flex-col lg:flex-row gap-8 items-start'>
                
                {/* Left Column (Pricing & Identity) */}
                <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                    
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Product Id</label>
                        <input type="text" value={productId} onChange={(e)=>{setProductId(e.target.value)}} placeholder='#ChickenRice7575' className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Product Name</label>
                        <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}} placeholder='Full Chicken Rice' className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Alternative Name</label>
                        <input type="text" value={alternativeName} onChange={(e)=>{setAlternativeName(e.target.value)}} placeholder='Rice, Full Rice' className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                    </div>

                    {/* Grid for Numbers */}
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Stock</label>
                            <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}} placeholder='3' className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Labelled Price</label>
                            <input type="number" value={labelledPrice} onChange={(e)=>{setlabelledPrice(e.target.value)}} placeholder='900.00' className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Selling Price</label>
                            <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='750.00' className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                        </div>
                    </div>
                </div>

                {/* Right Column (Categorization & Media) */}
                <div className='w-full lg:w-1/2 flex flex-col gap-5 h-full justify-between'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Category</label>
                            <select value={catagory} onChange={(e)=>{setCatagory(e.target.value)}} className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none transition-all cursor-pointer shadow-sm appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:20px] bg-[right_16px_center] bg-no-repeat'>
                                <option value="Sri Lankans Foods">Sri Lankans Foods</option>
                                <option value="Indian Foods">Indian Foods</option>
                                <option value="Pakisthan Foods">Pakisthan Foods</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Product Images</label>
                            <div className='w-full relative border border-dashed border-blue-300 bg-blue-50/30 hover:bg-blue-50/60 rounded-xl p-3 transition-colors group cursor-pointer'>
                                <input type="file" multiple onChange={(e)=>{setImage(e.target.files)}} className='w-full text-sm text-slate-600 font-medium cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:transition-colors file:cursor-pointer' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Description / Ingredients</label>
                            <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='List the ingredients and preparation notes...' rows="3" className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none resize-none transition-all placeholder:text-slate-400 shadow-sm' />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Availability Status</label>
                            <select value={isAvailable} onChange={(e)=>{setIsAvailable(e.target.value)}} className='w-full text-base font-semibold text-slate-800 bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 outline-none transition-all cursor-pointer shadow-sm appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:20px] bg-[right_16px_center] bg-no-repeat'>
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                            </select>
                        </div>
                    </div>

                    {/* Form Action Buttons */}
                    <div className='w-full flex flex-col sm:flex-row gap-4 mt-6'>
                        <button onClick={handleSubmit} type="submit" className='w-full sm:w-1/2 py-3.5 px-5 gap-2 flex justify-center items-center text-base font-bold bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer'>
                            <IoBagAddOutline className="text-xl" /> Add Product
                        </button>
                        <Link to='/admin/products' className='w-full sm:w-1/2 py-3.5 px-5 gap-2 flex justify-center items-center text-base font-bold bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 rounded-xl border border-slate-200 transition-all cursor-pointer'>
                            <PiBackspaceBold className="text-xl" /> Cancel
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
