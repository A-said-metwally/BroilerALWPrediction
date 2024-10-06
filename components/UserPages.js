import React from 'react'

function UserPages({close}) {
  return (
    <div className=' fixed top-0 left-0 bottom-0 right-0 min-h-screen  w-full
        z-10 flex items-center justify-center  '
    >
        <div className=' relative bg-black opacity-80 w-[80%] h-[80%] rounded-2xl flex items-center justify-center'>
            <button className=' absolute top-4 right-4 px-2 border-2 font-bold 
                rounded-lg bg-red-500 text-white hover:scale-110' onClick={()=>close()}
            >X</button>

            <ul className='m-0 p-0'>
                <li className='text-xl text-gray-200 font-semibold py-4'>Reports - Page Name - Link ref</li>
                <li className='text-xl text-gray-200 font-semibold py-4'>Reports - Page Name - Link ref</li>
                <li className='text-xl text-gray-200 font-semibold py-4'>Reports - Page Name - Link ref</li>
            </ul>
        </div>
    </div>
)
}

export default UserPages