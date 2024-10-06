import React from 'react'

function SummaryComp({title, val, unit, Icon}) {
  return (
    <div className='sm:w-[17%] w-[92%] flex flex-col items-center justify-center space-y-4 border-3 border-gray-500 rounded-xl 
        shadow-md px-3 py-2 hover:bg-[#1e3333] hover:scale-110 cursor-pointer'>
        <Icon className='h-9 w-9 text-yellow-300'/>
        <p className='text-3xl text-center font-serif text-gray-200'>{title}</p>
        <p className='text-3xl font-bold text-gray-200'>{val} <span className='text-xl'>{unit}</span></p>
    </div>

    )
}

export default SummaryComp