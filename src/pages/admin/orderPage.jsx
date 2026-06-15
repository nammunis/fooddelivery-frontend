import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PageInator from '../../components/pageInator'

export default function OrderPageAdmin() {
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(10)

  useEffect(
    () => {
        const token = localStorage.getItem('token')
        if (loading) {
            axios.get(import.meta.env.VITE_backendUrl + '/orders/' + page + '/' + limit, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            
            .then(
                (res) => {
                    setOrders(res.data.orders)
                    setTotalPage(res.data.totalPages)
                    setLoading(false)
                    console.log(res.data)
                }
            ).catch(
                (err) => {
                    console.error(err)
                    setLoading(false)
                }
            )
        }
    }, [loading, page, limit]
  )

  return (
    <div className='w-full min-h-screen p-8 bg-slate-50 flex flex-col gap-6'>
        
        {/* Header Section */}
        <div className='flex flex-row justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
            <div>
            <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>Order Management</h1>
            <p className='text-sm text-slate-500 mt-1'>Monitor and process store orders</p>
            </div>
            <div className='bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-2 text-right'>
            <span className='text-xs font-semibold text-slate-400 uppercase tracking-wider block'>Active Page</span>
            <span className='text-lg font-bold text-amber-700'>Page {page}</span>
            </div>
        </div>

        {/* Table Container */}
        <div className='w-full border border-slate-200/80 bg-white rounded-2xl shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
                <thead>
                <tr className='bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold text-sm uppercase tracking-wider'>
                    <th className='py-4 px-6'>Order Id</th>
                    <th className='py-4 px-6'>Customer</th>
                    <th className='py-4 px-6'>Delivery Address</th>
                    <th className='py-4 px-6'>Contact</th>
                    <th className='py-4 px-6 text-center'>Status</th>
                    <th className='py-4 px-6'>Date</th>
                    <th className='py-4 px-6 text-right'>Total Price</th>
                </tr>
                </thead>
                <tbody className='divide-y divide-slate-100 text-slate-600 text-[15px]'>
                {
                    orders.map((order) => (
                    <tr key={order.orderId} className='hover:bg-slate-50/60 transition-colors group'>
                        <td className='py-4 px-6 font-semibold text-amber-600 tracking-wide'>
                        #{order.orderId}
                        </td>
                        <td className='py-4 px-6'>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-slate-800 group-hover:text-amber-700 transition-colors'>{order.name || 'N/A'}</span>
                            <span className='text-xs text-slate-400 font-medium mt-0.5'>{order.email}</span>
                        </div>
                        </td>
                        <td className='py-4 px-6 max-w-[240px] truncate font-medium text-slate-700'>
                        {order.address}
                        </td>
                        <td className='py-4 px-6 font-medium text-slate-700'>
                        {order.phone}
                        </td>
                        <td className='py-4 px-6 text-center'>
                        <span className='inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm bg-gradient-to-r from-amber-50 to-amber-100/80 text-amber-800 border border-amber-200/50'>
                            {order.status}
                        </span>
                        </td>
                        <td className='py-4 px-6 font-medium text-slate-500'>
                        {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className='py-4 px-6 text-right font-bold text-slate-900 text-base'>
                        <span className='text-xs font-semibold text-slate-400 mr-1'>LKR</span>
                        {order.total?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
            </div>
        </div>

        {/* Pagination Component Container */}
        <div className='flex justify-center mt-2'>
            <PageInator currentPage={page} totalPage={totalPage} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading}/>
        </div>

    </div>
  )
}