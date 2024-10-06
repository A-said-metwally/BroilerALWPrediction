import React from 'react'
import {DocumentReportIcon, CalculatorIcon, SearchIcon, ScaleIcon, ShoppingCartIcon, CurrencyDollarIcon, CogIcon, PencilAltIcon} from '@heroicons/react/outline'
import Separator from './Separator'
import DriverKpis from './DriverKpis'

function DriverDashBoard({close, evaluation}) {

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  
    return (
        <div className=' absolute z-10 top-0 left-0 right-0 bottom-0 w-full h-[1000px] bg-[#2f4f4f] p-4 rounded-xl'>
            <div className=' relative flex space-x-4 text-gray-200 border-b-4 border-dotted border-gray-300 pb-3'>
                <DocumentReportIcon className='h-9 w-9'/>
                <h2 className=' font-serif font-semibold '>Achievements</h2>
                <button className=' absolute top-0 right-3 text-white text-2xl px-2 border-1 border-white rounded-md hover:bg-red-500 '
                    onClick={()=>close()}
                >X</button>
            </div>

            {/* select month */}
            <div className='mt-4 flex justify-between items-center flex-wrap '>
                {months.map((m, index)=>{
                    return (
                        <button 
                            key = {index}
                            className='w-[15%] py-1 mb-1 bg-gray-200 text-[#2f4f4f] font-semibold border-2 border-yellow-400 
                                rounded-md flex justify-center items-center hover:scale-105 hover:font-bold'
                            style={{background:`${m === 'Dec' ? 'green' : null}`, color:`${m === 'Dec' ? 'white' : null}`}}
                            >{m}</button>
                    )
                })}
            </div>

            <Separator/>

            {/* evaluation section */}
            <div className='w-full mt-5 flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    {evaluation()}
                </div>
                <span className='text-gray-200 text-2xl font-bold font-serif'>80%</span>
            </div>
            
            <Separator/>
            
            {/* summary */}
            <div className='w-full flex items-center justify-between mt-5'>
                <div className='w-1/3 flex flex-col items-center '>
                    <ShoppingCartIcon className='h-9 w-9 text-gray-200 pb-2'/>
                    <p className='font-semibold text-xl text-gray-200'>Total Trips</p>
                    <span className=' text-gray-200 text-xl font-mono p-2 text-center'>50</span>
                </div>
                <div className='w-1/3 flex flex-col items-center '>
                    <CalculatorIcon className='h-9 w-9 text-green-300 pb-2'/>
                    <p className='font-semibold text-xl text-green-300'>Distance</p>
                    <span className=' text-green-300 text-xl font-mono p-2 text-center'>1560 Km</span>
                </div>
                <div className='w-1/3 flex flex-col items-center '>
                    <ScaleIcon className='h-9 w-9 text-yellow-300 pb-2'/>
                    <p className='font-semibold text-xl text-yellow-300'>Tons</p>
                    <span className=' text-yellow-300 text-xl font-mono p-2 text-center'>950 ton</span>
                </div>
            </div>

            <Separator/>

            <div className='w-full flex items-center justify-center  mt-3'>
                <CogIcon  className='h-9 w-9 text-gray-200 mr-3'/>
                <h2 className='text-gray-200 p-0 m-0 font-bold font-serif'>KPIs</h2>
            </div>

            <div className='mt-4 '>
                <DriverKpis title = 'Attendance' val = '100%' />
                <DriverKpis title = 'Attitude' val = '95%' />
                <DriverKpis title = 'Vehicle Care' val = '90%' />
                <DriverKpis title = 'Breakdowns' val = '92%' />
                <DriverKpis title = 'Violations' val = '2' />
                <DriverKpis title = 'Accidents' val = '1' />
            </div>


        </div>
  )
}

export default DriverDashBoard