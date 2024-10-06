import React from 'react'
import {ArrowDownIcon, ArrowUpIcon} from '@heroicons/react/outline'

function HopperTableSummary() {
    const df = [
        {
            name:'صويا',
            count:10,
            qty:200,
        },
        {
            name:'نخالة',
            count:15,
            qty:370,
        },
        {
            name:'ذرة',
            count:17,
            qty:390,
        },
    ]
const styleOne = `pt-5 pb-4 group-hover:text-blue-600 text-gray-200 font-semibold text-xl`

  return (
    <div className='sm:w-[30%] w-[95%]'>
        <table className="table">
            <thead>
                <tr className=' font-serif bg-yellow-700 '>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Feed Name</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Trip Count</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Qty</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Avg Trip</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'></span>
                    </th>
                </tr>
            </thead>
            <tbody className=''>
                {df.map((d, index)=>{
                    return (
                        <tr key = {index} className=' hover:bg-gray-200  group hover:font-bold cursor-pointer text-md'>
                            <td scope="row " className='text-center py-3'>
                                <span className = {`${styleOne}`}>{d.name}</span>
                            </td>
                            <td  className='text-center py-3'>
                                <span className = {`${styleOne}`}>{d.count}</span>
                            </td>
                            <td  className='text-center py-3'>
                                <span className = {`${styleOne}`}>{d.qty}</span>
                            </td>
                            <td  className='text-center py-3'>
                                <span className = {`${styleOne}`}>{(d.qty / d.count).toFixed()}</span> 
                            </td>
                            <td  className='text-center py-3'>
                                <span className = {`${styleOne}`}>
                                    {
                                        (d.qty / d.count / 25 * 100) > 90 
                                        ? <ArrowUpIcon className='h-7 w-7 text-[#7fff00] font-bold'/>
                                        : <ArrowDownIcon className='h-7 w-7 text-yellow-300 font-bold'/>
                                    }
                                </span> 
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default HopperTableSummary