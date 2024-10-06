import React from 'react'
import {DesktopComputerIcon, PencilIcon} from '@heroicons/react/outline'

function UsersTable({UsersInfo, viewUserPages}) {

    const styleOne = `pt-5 pb-4 group-hover:text-blue-600 text-gray-500 font-semibold text-xl`

  return (
    <div className='mt-4 border-t-2 border-t-orange-500'>
        <table className="table mt-3">
            <thead>
                <tr className=' font-serif bg-gray-500 '>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Sap No</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Name</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Password</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Section</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Route To</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Pages</span>
                    </th>
                    <th scope="col" className=' align-middle text-center'>
                        <span className='text-gray-200'>Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody className=''>
                {UsersInfo.map((d, index)=>{
                    return (
                        <tr key = {index} className=' hover:bg-gray-200  group hover:font-bold cursor-pointer text-md'>
                            <td scope="row " className='text-center py-3'>
                                <span className = {`${styleOne}`}>{d.sapNo}</span>
                            </td>
                            <td  className='text-center py-3'>
                                <span className = {`${styleOne}`}>{d.name}</span>
                            </td>
                            <td  className='text-center py-3'>
                                <span className = {`${styleOne}`}>{d.pass}</span>
                            </td>
                            <td  className='text-center py-3'>
                                <span className = {`${styleOne}`}>{d.section}</span> 
                            </td>
                            <td  className='text-center py-3'>
                                <span className = {`${styleOne}`}>{d.routeTo}</span> 
                            </td>
                            <td  className='text-center py-3' >
                                <span className = {`${styleOne} `} onClick={()=>viewUserPages(d.pages)}>
                                    <DesktopComputerIcon className='h-6 pl-5'/>
                                </span> 
                            </td>
                            <td  className='text-center py-3' >
                                <span className = {`${styleOne} `}>
                                    <PencilIcon className='h-6 pl-5 hover:text-red-500 hover:scale-110'/>
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

export default UsersTable