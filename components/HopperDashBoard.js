import React from 'react'
import {ChartBarIcon, PencilIcon, TruckIcon, LockClosedIcon, LockOpenIcon, 
    DocumentReportIcon, ScaleIcon, LightningBoltIcon, CalculatorIcon, UserIcon} from '@heroicons/react/outline'
import SummaryComp from './SummaryComp'
import HopperTableSummary from './HopperTableSummary'
import SummaryCompTwo from './SummaryCompTwo'

function HopperDashBoard({hide}) {
  return (
    <div className=' absolute z-10 top-0 left-0 right-0 bottom-0 min-h-fit w-full bg-[#2f4f4f] opacity-95 sm:p-[80px] pb-10 '>
        <div className=' relative flex items-center space-x-5 p-10'>
            <DocumentReportIcon className='h-10 w-10 text-gray-300'/>
            <h1 className='text-gray-200 font-serif'>Hopper Summary ...</h1>
            <button className=' absolute right-2 px-2 text-gray-200 text-xl border-2 border-gray-200
             rounded-lg font-semibold hover:text-red-400'
             onClick={()=>hide()}
             >X</button>
        </div>

        <div className='flex sm:flex-row flex-col sm:justify-between justify-center items-center sm:space-y-0 space-y-4 mt-5'>
            <SummaryComp title = 'Total Trips' val = '120' Icon = {TruckIcon}/>
            <SummaryComp title = 'Closed Trips' val = '110' Icon = {LockClosedIcon}/>
            <SummaryComp title = 'Opened Trips' val = '10' Icon = {LockOpenIcon}/>
            <SummaryComp title = 'Payload' val = '2500' Icon = {ScaleIcon} unit = 'Ton'/>
            <SummaryComp title = 'Distance' val = '5632' Icon = {PencilIcon} unit = 'Km'/>
        </div>

        <div className='mt-16 w-full flex sm:flex-row flex-col sm:items-start items-center sm:justify-between sm:space-y-0 space-y-4'>
            <HopperTableSummary/>
            <SummaryCompTwo title = 'Fuel Consumption' val = '1000 L' subVal = '10 L / Ton' Icon = {LightningBoltIcon}/>
            <SummaryCompTwo title = 'Truk Count' val = '32' subVal = '5 Trip / Truk' Icon = {CalculatorIcon}/>
            <SummaryCompTwo title = 'Drivers Count' val = '42' subVal = '6 Trip / Driver' Icon = {UserIcon}/>
            
        </div>
    </div>
  )
}

export default HopperDashBoard