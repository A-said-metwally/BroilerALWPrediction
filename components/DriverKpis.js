import { PencilAltIcon } from '@heroicons/react/outline'
import React from 'react'

function DriverKpis({title, val}) {
  return (
    <div className='flex justify-between items-center  mb-3'>
        <div className='flex items-center space-x-4 w-2/3'>
            <PencilAltIcon className='h-7 w-7 text-sky-300'/>
            <p className='text-xl font-bold font-serif text-gray-200'>{title}</p>
        </div>
        <p className='w-1/2 pl-4 text-xl font-bold font-serif text-gray-200 text-center'>{val}</p>
    </div>
)
}

export default DriverKpis