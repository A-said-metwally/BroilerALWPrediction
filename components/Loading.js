import { tile } from '@tensorflow/tfjs'
import React from 'react'

function Loading({title, Icon, Status}) {
  return (
      <div className='absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full rounded-md '>
        {Icon && <Icon className="text-blue-600 w-14 h-14 animate-spin"/>}
        <p className='text-4xl text-gray-500 '>{title ? title : "Loading ...."}</p>
      </div>          
  )
}

export default Loading