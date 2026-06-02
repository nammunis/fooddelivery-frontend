import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { PiBackspaceBold } from "react-icons/pi";
import axios from 'axios';
import toast from 'react-hot-toast';
import UploadFile from '../../utils/mediaUpload';

export default function UpdateProductAdminPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const [productId, setProductId] = useState(location.state?.productId || '')
    const [productName, setProductName] = useState(location.state?.productName || '')
    const [alternativeName, setAlternativeName] = useState(location.state?.altName?.join(',') || '')
    const [stock, setStock] = useState(location.state?.stock || '')
    const [catagory, setCatagory] = useState(location.state?.catagory || 'Sri Lankans Foods')
    const [labelledPrice, setlabelledPrice] = useState(location.state?.labelledPrice || '')
    const [price, setPrice] = useState(location.state?.price || '')
    const [image, setImage] = useState([])
    const [description, setDescription] = useState(location.state?.description || '')
    const [isAvailable, setIsAvailable] = useState(location.state?.isAvailable !== undefined ? location.state.isAvailable : true)

    async function handleSubmit(){

        let responses = []

        if (image && image.length > 0) {
            const promisesArray = []
            for(let i=0; i<image.length; i++){
                const promise = UploadFile(image[i])
                promisesArray[i] = promise
            }
            responses = await Promise.all(promisesArray)
        }
        
        const altNamesInArray = alternativeName ? alternativeName.split(',') : []

        const productData = {
            productId: productId,
            productName: productName,
            altName: altNamesInArray,
            labelledPrice: labelledPrice,
            price: price,
            images: responses.length > 0 ? responses : (location.state?.images || []),
            description: description,
            stock: stock,
            isAvailable: isAvailable,
            catagory: catagory
        }

        const token = localStorage.getItem('token')

        if(token == null){
            window.location.href = '/login'
            return
        }

        axios.put(import.meta.env.VITE_backendUrl + '/products/' + location.state?._id, productData,
            {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(
            (res)=>{
                console.log('Product Update Successfully !')
                navigate('/admin/products')
                toast.success('Product Update Successfully ! ' + productName)
            }
        ).catch(
            (error)=>{
                console.log('Product Update Failed !' + error)
                toast.error("Product Update Failed! Try again.")
            }
        )
    }

  return (
    <div className='w-full min-h-screen p-3 md:p-6 bg-slate-50 text-gray-900'>
        <div className='w-full max-w-5xl mx-auto rounded-xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 flex flex-col gap-6'>
            
            <div className='flex flex-col gap-1 border-b border-slate-100 pb-4'>
                <span className='text-xl md:text-2xl font-black text-slate-800 tracking-wide'>
                    Update Product Form
                </span>
            </div>

            <div className='w-full flex flex-col lg:flex-row gap-6 items-start'>
                
                <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Product Id</label>
                        <input type="text" disabled readOnly value={productId} onChange={(e)=>{setProductId(e.target.value)}} placeholder='#ChickenRice7575' className='w-full text-base font-semibold text-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none cursor-not-allowed shadow-sm' />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Product Name</label>
                        <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}} placeholder='Full Chicken Rice' className='w-full text-base font-semibold text-slate-800 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-2.5 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Alternative Name</label>
                        <input type="text" value={alternativeName} onChange={(e)=>{setAlternativeName(e.target.value)}} placeholder='Rice, Full Rice' className='w-full text-base font-semibold text-slate-800 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-2.5 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Stock</label>
                            <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}} placeholder='3' className='w-full text-base font-semibold text-slate-800 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-2.5 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Labelled Price</label>
                            <input type="number" value={labelledPrice} onChange={(e)=>{setlabelledPrice(e.target.value)}} placeholder='900.00' className='w-full text-base font-semibold text-slate-800 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-2.5 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Price</label>
                            <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='750.00' className='w-full text-base font-semibold text-slate-800 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-2.5 outline-none transition-all placeholder:text-slate-400 shadow-sm' />
                        </div>
                    </div>
                </div>

                <div className='w-full lg:w-1/2 flex flex-col gap-4 justify-between h-full'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Category</label>
                            <select value={catagory} onChange={(e)=>{setCatagory(e.target.value)}} className='w-full text-base font-semibold text-slate-800 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-2.5 outline-none transition-all cursor-pointer shadow-sm appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:18px] bg-[right_16px_center] bg-no-repeat'>
                                <option value="Sri Lankans Foods">Sri Lankans Foods</option>
                                <option value="Indian Foods">Indian Foods</option>
                                <option value="Pakisthan Foods">Pakisthan Foods</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Images</label>
                            <div className='w-full border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 rounded-xl p-2 transition-colors cursor-pointer'>
                                <input type="file" multiple onChange={(e)=>{setImage(e.target.files)}} className='w-full text-sm text-slate-600 font-medium cursor-pointer file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:transition-colors file:cursor-pointer' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Description</label>
                            <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Rice Ingredients' rows="2" className='w-full text-base font-semibold text-slate-800 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-2.5 outline-none resize-none transition-all placeholder:text-slate-400 shadow-sm' />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Is Available</label>
                            <select value={isAvailable} onChange={(e)=>{setIsAvailable(e.target.value === 'true' || e.target.value === true)}} className='w-full text-base font-semibold text-slate-800 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-2.5 outline-none transition-all cursor-pointer shadow-sm appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:18px] bg-[right_16px_center] bg-no-repeat'>
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full flex flex-col sm:flex-row gap-3 mt-6 lg:mt-auto'>
                        <button onClick={handleSubmit} type="submit" className='w-full sm:w-1/2 py-3 px-4 gap-2 flex justify-center items-center text-base font-bold bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl shadow-md shadow-blue-600/10 transition-all cursor-pointer'>
                            <FaEdit /> Update Product
                        </button>
                        <Link to='/admin/products' className='w-full sm:w-1/2 py-3 px-4 gap-2 flex justify-center items-center text-base font-bold bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 rounded-xl border border-slate-200 transition-all cursor-pointer'>
                            <PiBackspaceBold /> Cancel
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}