import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PageInator from '../../components/pageInator'
import toast from 'react-hot-toast'

export default function OrderPageAdmin() {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(10)
    const [popupVisible, setPopupVisible] = useState(false)
    const [clicked, setClicked] = useState(null)
    const [orderStatus, setOrderStatus] = useState('Pending')
    const [orderNotes, setOrderNotes] = useState('Pending')

    useEffect(() => {
        if (loading) {
            axios.get(import.meta.env.VITE_backendUrl + '/orders/' + page + '/' + limit, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then((res) => {
                    setOrders(res.data.orders)
                    setTotalPage(res.data.totalPages)
                    setLoading(false)
                    console.log(res.data)
                })
                .catch((err) => {
                    console.error(err)
                    setLoading(false)
                    toast.error("Failed to load orders!")
                })
        }
    }, [loading, page, limit])

    // Dynamic Tailwind classes for status colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'Complete':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'Reject':
                return 'bg-red-50 text-red-700 border-red-200';
            default: // Pending
                return 'bg-amber-50 text-amber-700 border-amber-200';
        }
    }

    return (
        <div className='w-full min-h-screen p-4 sm:p-6 md:p-8 bg-slate-50 flex flex-col gap-6'>

            {/* Header Section */}
            <div className='flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm'>
                <div>
                    <h1 className='text-xl sm:text-2xl font-bold text-slate-800 tracking-tight'>Order Management</h1>
                    <p className='text-xs sm:text-sm text-slate-500 mt-1'>Monitor and process store orders</p>
                </div>
                <div className='bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-2 w-full sm:w-auto text-left sm:text-right'>
                    <span className='text-xs font-semibold text-slate-400 uppercase tracking-wider block'>Active Page</span>
                    <span className='text-base sm:text-lg font-bold text-amber-700'>Page {page}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className='w-full border border-slate-200/80 bg-white rounded-2xl shadow-sm overflow-hidden'>
                <div className='overflow-x-auto w-full'>
                    <table className='w-full text-left border-collapse min-w-[800px] md:min-w-full'>
                        <thead>
                            <tr className='bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold text-xs sm:text-sm uppercase tracking-wider'>
                                <th className='py-4 px-4 sm:px-6'>Order Id</th>
                                <th className='py-4 px-4 sm:px-6'>Customer</th>
                                <th className='py-4 px-4 sm:px-6'>Delivery Address</th>
                                <th className='py-4 px-4 sm:px-6'>Contact</th>
                                <th className='py-4 px-4 sm:px-6 text-center'>Status</th>
                                <th className='py-4 px-4 sm:px-6'>Date</th>
                                <th className='py-4 px-4 sm:px-6 text-right'>Total Price</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100 text-slate-600 text-sm sm:text-[15px]'>
                            {orders.map((order) => (
                                <tr
                                    key={order.orderId}
                                    className='hover:bg-slate-50 transition-colors group cursor-pointer'
                                    onClick={() => {
                                        setOrderStatus(order.status)
                                        setOrderNotes(order.notes || '')
                                        setClicked(order)
                                        setPopupVisible(true)
                                    }}
                                >
                                    <td className='py-4 px-4 sm:px-6 font-semibold text-amber-600 tracking-wide'>
                                        #{order.orderId}
                                    </td>
                                    <td className='py-4 px-4 sm:px-6'>
                                        <div className='flex flex-col'>
                                            <span className='font-semibold text-slate-800 group-hover:text-amber-700 transition-colors'>{order.name || 'N/A'}</span>
                                            <span className='text-xs text-slate-400 font-medium mt-0.5'>{order.email}</span>
                                        </div>
                                    </td>
                                    <td className='py-4 px-4 sm:px-6 max-w-[200px] truncate font-medium text-slate-700'>
                                        {order.address}
                                    </td>
                                    <td className='py-4 px-4 sm:px-6 font-medium text-slate-700 whitespace-nowrap'>
                                        {order.phone}
                                    </td>
                                    <td className='py-4 px-4 sm:px-6 text-center'>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className='py-4 px-4 sm:px-6 font-medium text-slate-500 whitespace-nowrap'>
                                        {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className='py-4 px-4 sm:px-6 text-right font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap'>
                                        <span className='text-xs font-semibold text-slate-400 mr-1'>LKR</span>
                                        {order.total?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Popup Section */}
            {popupVisible && clicked && (
                <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto backdrop-blur-sm'>
                    <div className='w-full max-w-[550px] bg-white rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col relative border border-slate-100 max-h-[90vh] my-auto animate-in fade-in zoom-in-95 duration-150'>

                        {/* Close Button */}
                        <button
                            onClick={() => setPopupVisible(false)}
                            className='absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-red-500 hover:text-white text-slate-500 flex items-center justify-center rounded-full font-bold transition-colors cursor-pointer text-sm z-10'
                        >
                            ✕
                        </button>

                        {/* Popup Header */}
                        <div className='border-b border-slate-100 pb-4 mb-4 pr-10'>
                            <h2 className='text-lg sm:text-xl font-bold text-slate-800'>Order Details</h2>
                            <p className='text-amber-600 font-semibold mt-1 text-xs sm:text-sm'>Order ID: #{clicked.orderId}</p>
                        </div>

                        {/* Popup Body Content */}
                        <div className='flex flex-col gap-4 text-slate-700 overflow-y-auto pr-1 flex-1 max-h-[50vh] sm:max-h-full'>
                            <div className='bg-slate-50 p-3 rounded-xl border border-slate-100'>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Customer Name</p>
                                <p className='font-semibold text-slate-800 mt-0.5'>{clicked.name || 'N/A'}</p>
                            </div>

                            <div className='bg-slate-50 p-3 rounded-xl border border-slate-100'>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Email & Contact</p>
                                <p className='text-slate-800 mt-0.5 font-medium text-sm sm:text-base break-all'>{clicked.email || 'N/A'}</p>
                                <p className='text-slate-800 font-medium text-sm sm:text-base mt-0.5'>{clicked.phone || 'N/A'}</p>
                            </div>

                            <div className='bg-slate-50 p-3 rounded-xl border border-slate-100'>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Delivery Address</p>
                                <p className='text-slate-800 mt-0.5 font-medium text-sm sm:text-base leading-relaxed'>{clicked.address}</p>
                            </div>

                            {/* Notes Section */}
                            <div className='bg-slate-50 p-3 rounded-xl border border-slate-100'>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Order Notes / Additional Details</p>
                                <p className='text-slate-800 mt-0.5 font-medium text-sm sm:text-base leading-relaxed italic mb-2'>
                                    {clicked.notes || 'No notes provided.'}
                                </p>
                                <textarea
                                    className='w-full border border-slate-200 p-2 rounded-lg text-sm bg-white focus:outline-amber-400'
                                    rows="2"
                                    value={orderNotes}
                                    onChange={(e) => setOrderNotes(e.target.value)}
                                ></textarea>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                <div className='bg-slate-50 p-3 rounded-xl border border-slate-100'>
                                    <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Status</p>
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mt-1.5 border ${getStatusColor(clicked.status)}`}>
                                        {clicked.status}
                                    </span>
                                    <select
                                        className='block w-full mt-2 border border-slate-200 p-1.5 rounded-lg text-sm bg-white focus:outline-amber-400'
                                        value={orderStatus}
                                        onChange={(e) => setOrderStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Complete">Complete</option>
                                        <option value="Reject">Reject</option>
                                    </select>
                                </div>
                                <div className='bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-between'>
                                    <div>
                                        <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Order Date</p>
                                        <p className='text-slate-800 font-semibold mt-2 text-sm'>{clicked.date ? new Date(clicked.date).toLocaleDateString() : 'N/A'}</p>
                                    </div>

                                    {/* Action Button */}
                                    {(orderStatus !== clicked.status || orderNotes !== clicked.notes) && (
                                        <button
                                            onClick={async () => {
                                                setPopupVisible(false)
                                                const loadToast = toast.loading("Updating order...")
                                                try {
                                                    await axios.put(import.meta.env.VITE_backendUrl + '/orders/' + clicked.orderId,
                                                        { status: orderStatus, notes: orderNotes },
                                                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                                                    )
                                                    toast.success("Order updated successfully!", { id: loadToast })
                                                    setLoading(true)
                                                } catch (error) {
                                                    console.log(error)
                                                    toast.error("Failed to update order!", { id: loadToast })
                                                }
                                            }}
                                            className='bg-green-500 w-full py-1.5 rounded-xl text-white font-medium text-xs sm:text-sm mt-3 hover:bg-green-600 transition-colors shadow-sm cursor-pointer'
                                        >
                                            Update Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Popup Footer - Total Price */}
                        <div className='border-t border-slate-100 pt-4 mt-4 flex justify-between items-center bg-white'>
                            <span className='font-bold text-sm sm:text-base text-slate-500'>Total Amount:</span>
                            <span className='text-lg sm:text-xl font-black text-slate-900'>
                                <span className='text-xs font-bold text-slate-400 mr-1'>LKR</span>
                                {clicked.total?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>

                    </div>
                </div>
            )}

            {/* Pagination Component Container */}
            <div className='flex justify-center mt-2'>
                <PageInator currentPage={page} totalPage={totalPage} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading} />
            </div>

        </div>
    )
}