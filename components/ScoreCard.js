import React from 'react'

function ScoreCard({title,pic, trip, ton, km, client}) {
  return (
        <div className='group lg:w-[47%] w-full sm:p-10 p-2 hover:border-2 hover:border-orange-500 rounded-lg hover:shadow-md cursor-pointer'>
            <div className=' bg-ColorOne h-[50px] rounded-3xl'>
                <p className=' text-white text-xl text-center font-bold p-2'> {title}</p>
            </div>
            <div className='mt-2 bg-gray-100 shadow-md rounded-b-3xl rounded-t-3xl overflow-hidden'>
                <img src={pic} alt="" className='h-[350px] w-full  rounded-t-3xl shadow-md group-hover:scale-110 transition-all ease-in-out duration-1000'/>
                <div className='p-3 pb-3'>
                    <div className='flex justify-between w-1/2 items-center'>
                        <span className=' text-[30px] font-bold font-serif text-gray-600'>{trip}</span>
                        <p className=' font-bold font-serif text-[25px] text-ColorOne'>Trip</p>
                    </div>
                    {ton && 
                        <div className='flex justify-between w-1/2 items-center'>
                            <span className=' text-[30px] font-bold font-serif text-gray-600'>{ton}</span>
                            <p className=' font-bold font-serif text-[25px] text-ColorOne'>Ton</p>
                        </div>                    
                    }
                    {client && 
                        <div className='flex justify-between w-1/2 items-center'>
                            <span className=' text-[30px] font-bold font-serif text-gray-600'>{client}</span>
                            <p className=' font-bold font-serif text-[25px] text-ColorOne'>Client</p>
                        </div>                    
                    }
                    <div className='flex justify-between w-1/2 items-center'>
                        <span className=' text-[30px] font-bold font-serif text-gray-600'>{km}</span>
                        <p className=' font-bold font-serif text-[25px] text-ColorOne'>Km</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ScoreCard