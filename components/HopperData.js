import React, {useState} from 'react'
import {RefreshIcon, ChevronDownIcon, ChevronUpIcon,  DocumentDownloadIcon, SortDescendingIcon} from '@heroicons/react/outline'


function HopperData({data}) {

    const tableHeader = {
        waybillDate:'Waybill Date',
        waybillNo:'Waybill No',
        driver:'Driver',
        sideNo:'Side No',
        backNo:'Back No',
        exitTime:'Exit Time',
        exitCounter:'Exit Counter',
        loadingArea:'Loading Area',
        dispatchArea:'Dispatch Area',
        feedName:'Feed Name',
        loadingArrivalTime:'Loading Arrival Time',
        loadingDepartureTime:'Loading Departure Time',
        loadingQty:'Loading Qty',
        dispatchArrivalTime:'Dispatch Arrival Time',
        dispatchDepartureTime:'Dispatch Departure Time',
        comeBackTime: 'ComeBack Time',
        comeBackCounter:'ComBack Counter',
        distance:'Distance',
        fuel:'Fuel Consumption',
        tripTime:'Trip Time',
        status:'Status',
        extendedTo:'Extend To',
        closing:'Closing',
        userName:'User Name',

    }

    
    const convertTime = (t)=>{
        if(!t) return
        const timestamp = t;
        const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    
        const dateObject = new Date(milliseconds);
    
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Months are zero-based
        const day = dateObject.getDate();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const seconds = dateObject.getSeconds();
    
        const newTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        return newTime
    }
    
    const calcDistance = (dt)=>{
        const comeBack = dt.comeBackCounter
        const exit = dt.exitCounter
        if(comeBack && exit){
            return comeBack - exit 
        }else{
            return 0
        }
    }


  return (
    <div className='w-full overflow-x-scroll'>
        <table className="table mt-10 mb-5">
            <thead className='text-gray-500'>
                <tr >
                    {Object.entries(tableHeader).map(([key, value])=>{
                        return (
                            <th scope="col" className=' align-middle' key={key}>
                                <div className='flex items-center  justify-center  space-x-3 w-[150px]'>
                                    <span className='text-gray-500'>{value}</span>
                                    <div >
                                        <ChevronUpIcon 
                                            className='h-5 w-5 text-blue-600 text-lg hover:scale-105 cursor-pointer'
                                            // onClick={()=>sort({key},'asc')}
                                            />
                                        <ChevronDownIcon 
                                            className='h-5 w-5 text-blue-600 text-lg hover:scale-105 cursor-pointer'
                                            // onClick={()=>sort({key}, 'dec')}
                                            />
                                    </div>
                                </div> 
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody className=''>
                {data.map((d)=>(
                    <tr key = {d.index} className=' hover:bg-gray-200  group hover:font-bold cursor-pointer text-md'>
                        <td scope="row" className=' pt-2 pb-1 group-hover:text-blue-600 text-center'>{d.waybillDate}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center'>{d.waybillNo}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center'>{d.driverName}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center'>{d.sideNo}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center'>{d.backNo}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center'>{convertTime(d.exitTime)}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.exitCounter}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.loadingArea}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.dispatchArea}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.feedName}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{convertTime(d.loadingArrivalTime)}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{convertTime(d.loadingDepartureTime)}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.loadedQty}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{convertTime(d.dispatchArrivalTime)}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{convertTime(d.dispatchDepartureTime)}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{convertTime(d.comeBackTime)}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.comeBackCounter}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{calcDistance(d) + '  Km'}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{(calcDistance(d) / 2.5).toFixed() + ' L'}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{'trip time'}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.status}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.extendedTo}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '
                            style={{color:`${d.closing ? 'green':'#c98304'}`}}
                        >{d.closing? 'Closed' : 'Inprogress'}</td>
                        <td className=' pt-2 pb-1 group-hover:text-blue-600 text-center '>{d.userName}</td>
                    </tr>
                ))}
            </tbody>
        </table>    

    </div>
  )
}

export default HopperData