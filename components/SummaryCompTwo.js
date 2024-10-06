import React from 'react'

export default function SummaryCompTwo({title, val, subVal, Icon}) {
  return (
    <div className='sm:w-auto w-[92%] flex flex-col items-start justify-center space-y-5  border-3 border-gray-500 rounded-xl 
        shadow-md px-4 py-4 hover:bg-[#1e3333] hover:scale-110 cursor-pointer'>
        <div className='w-full flex items-center justify-center space-x-4'>
            <Icon className='h-9 w-9 text-yellow-300'/>
            <p className='text-3xl text-center font-serif text-gray-200'>{title}</p>
        </div>
        <p className='w-full text-4xl font-bold text-gray-200 text-center'>{val}</p>
        <p className='w-full text-2xl font-bold text-[#7fff00] text-center'>{subVal}</p>
    </div>
  )
}
