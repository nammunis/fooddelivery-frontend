import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    const product = props.product
    return (
        <Link to={"/overview/"+product.productId} className='w-[300px] h-[300px] shrink-0 flex flex-col  rounded-2xl shadow-2xl shadow-amber-400/20 overflow-hidden'>
            <img src={product.images[0]} className='w-full h-[60%] object-cover' />
            <div className='w-full p-2 flex flex-col'>
                <span className='text-gray-400 text-[10px] font-bold'>{product.productId}</span>
                <h1 className='text-gray-800 text-xl font-bold'>{product.productName} {' '}  </h1>
                <span className='text-gray-400 text-[10px] font-bold'>{product.catagory}</span>

                <span className='text-gray-400 text-[20px]'>
                    {
                        product.labelledPrice> product.price? 
                        <p className=' flex '>
                            <span className='line-through text-[15px]'>LKR {product.labelledPrice.toFixed(2)}</span>
                            <span className='text-gray-900 font-semibold'>LKR {product.price.toFixed(2)}</span>
                        </p>: <span className='text-gray-900 font-semibold'>LKR {product.price.toFixed(2)}</span>
                    }
                </span>
            </div>
        </Link>
    )
}