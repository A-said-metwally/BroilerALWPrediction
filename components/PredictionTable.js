import React from 'react';
import {DesktopComputerIcon, PencilIcon, TrashIcon} from '@heroicons/react/outline'


const PredictionTable = ({data}) => {
    const styleOne = `pt-5 pb-4 group-hover:text-blue-600 text-gray-500 font-semibold text-md`

    return (
        <div>
            <table className="table mt-3">
                <thead>
                    <tr className='font-serif bg-gray-300 '>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>Sr.</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>Farm Desc.</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>House Desc.</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>Zero Day Wt.</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>4 Day Wt.</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>7 Day Wt.</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>14 Day Wt.</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>21 Day Wt.</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-600'>Catch Age</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-red-500'>Predicted ALWt</span>
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {data.map((d, index)=>{
                        return (
                            <tr key = {index} className='cursor-pointer hover:bg-gray-200 group hover:font-bold text-md'>
                                <td scope="row " className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.Sr}</span>
                                </td>
                                <td scope="row " className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.farmNo}</span>
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.houseNo}</span>
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.wt0}</span>
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.wt4}</span> 
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.wt7}</span> 
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.wt14}</span> 
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.wt21}</span> 
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.age}</span> 
                                </td>
                                <td  className='py-3 text-center'>
                                    {/* <span className = {`${styleOne}`}>{Math.round(((d.predictedAvgWt)),3).toLocaleString()}</span>  */}
                                    <span className = {`${styleOne} text-red-500` }>{d.predictedAvgWt.toFixed(3)}</span> 
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PredictionTable;
