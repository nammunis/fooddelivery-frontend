import React, { useState } from 'react'

export default function TestPage() {
  const [count,setCount]=useState(0)

  function increment(){
    setCount(count+1)
  }
  function decriment(){
    setCount(count-1)
  }

  return (
    <div className='w-full h-screen bg-amber-100 flex items-center justify-center'>
        <div className="w-[400px] h-[500px] bg-white flex flex-col justify-center items-center rounded-2xl">
          <h1 className="text-5xl font-bold">{count}</h1>
          <div className="w-full flex flex-row justify-center gap-4 h-[100px] p-5">
          <button onClick={decriment} className="w-[100px] h-[50px] flex justify-center items-center bg-amber-500 text-white rounded-full">
            -
          </button>
          <button onClick={increment} className="w-[100px] h-[50px] flex justify-center items-center bg-amber-500 text-white rounded-full">
            +
          </button>
        </div>
    </div>
  </div>
  )
}
