import React from 'react'

export default function PageInator(props) {

  const { currentPage, setCurrentPage, totalPage, limit, setLimit, setLoading } = props

  return (
    <div className='w-full h-[50px] flex flex-row justify-center items-center gap-4 bg-white shadow-sm border border-gray-100 rounded-xl p-[5px]'>
      <select className='w-[110px] h-[40px] border border-amber-500 rounded-lg p-[8px] bg-white text-gray-700 font-semibold cursor-pointer outline-none focus:border-amber-600 transition-all' 
      value={currentPage} onChange={
        (e)=>{
            setLoading(true)
            setCurrentPage(parseInt(e.target.value))
        }
      }
      >
        {
            Array.from({
                length:totalPage
            },
            (_,index)=>(
                <option key={index} value={index+1}>
                    Page {index+1}
                </option>
            )
        )
        }
      </select>
      
      <select className='w-[110px] h-[40px] border border-amber-500 rounded-lg p-[8px] bg-white text-gray-700 font-semibold cursor-pointer outline-none focus:border-amber-600 transition-all' value={limit} onChange={
        (e)=>{
            setLoading(true)
            setLimit(parseInt(e.target.value))
        }
      }>
        <option value={5}>5 items</option>
        <option value={10}>10 items</option>
        <option value={20}>20 items</option>
        <option value={50}>50 items</option>
      </select>
    </div>
  )
}