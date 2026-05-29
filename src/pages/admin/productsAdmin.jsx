import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiPlug, BiPlus } from 'react-icons/bi'
import axios from 'axios'



const sampleProduct = [
  {
    "productId": "FOOD-001",
    "productName": "Classic Cheeseburger",
    "altName": ["Cheese Burger", "Beef Burger"],
    "labelledPrice": 12.99,
    "price": 9.99,
    "images": ["/images/cheeseburger.jpg"],
    "description": "Juicy grilled beef patty topped with melted cheddar cheese, fresh lettuce, and tomatoes on a toasted brioche bun.",
    "stock": 50,
    "isAvailable": true,
    "catagory": "Burgers"
  },
  {
    "productId": "FOOD-002",
    "productName": "Pepperoni Feast Pizza",
    "altName": ["Pepperoni Pizza"],
    "labelledPrice": 18.50,
    "price": 14.99,
    "images": ["/images/pepperoni-pizza.jpg"],
    "description": "12-inch stone-baked crust loaded with premium pepperoni slices, mozzarella cheese, and rich Italian tomato sauce.",
    "stock": 35,
    "isAvailable": true,
    "catagory": "Pizza"
  },
  {
    "productId": "FOOD-003",
    "productName": "Crunchy Caesar Salad",
    "altName": ["Caesar Salad"],
    "labelledPrice": 10.00,
    "price": 8.50,
    "images": ["/images/caesar-salad.jpg"],
    "description": "Crisp romaine lettuce tossed in creamy Caesar dressing, topped with garlic croutons and freshly grated parmesan cheese.",
    "stock": 20,
    "isAvailable": true,
    "catagory": "Salads"
  }
]

export default function ProductsAdmin() {
  const [products,setProducts] = useState(sampleProduct)
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
    []
  )


  return (
    <div className='w-full h-[100%] rounded-[1%] p-5 bg-blue-50 text-gray-900'>

        <table>
          <thead>
            <tr>
              <th className='p-[5px]'>Image</th>
              <th className='p-[5px]'>Product Id</th>
              <th className='p-[5px]'>Product Name</th>
              <th className='p-[5px]'>Price</th>
              <th className='p-[5px]'>Labled Price</th>
              <th className='p-[5px]'>Catogory</th>
              <th className='p-[5px]'>Stock</th>
              <th className='p-[5px]'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(
                (product,index)=>{
                  return(
                    <tr key={index}>
                      <td className='p-[5px]'>
                        <img src={product.images[0]} alt={product.productName} 
                        className='w-[50px] object-cover'
                        />
                      </td>
                      <td className='p-[5px]'>{product.productId}</td>
                      <td className='p-[5px]'>{product.productName}</td>
                      <td className='p-[5px]'>{product.price}</td>
                      <td className='p-[5px]'>{product.labelledPrice}</td>
                      <td className='p-[5px]'>{product.catagory}</td>
                      <td className='p-[5px]'>{product.stock}</td>
                      <td className='p-[5px]'>Not Set</td>

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
