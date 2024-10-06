import React from 'react'
import ScoreCard from './ScoreCard'

function ScoreBoard() {
  return (
    <div className='container mx-auto flex flex-col items-center justify-center'>

        <h1 className='text-4xl text-ColorOne font-bold mt-12'>Our Score Board</h1>
        <p className=' text-gray-600 text-center font-bold text-lg tracking-wider p-4 w-2/4 leading-8 pt-2 f'>
         Up To Date Our Achievements Moment by Moment.
        </p>

        <div className='  flex sm:flex-row sm:justify-between sm:items-center sm:space-y-0  flex-wrap flex-col space-y-10 '>
          <ScoreCard title='Feed Hopper' pic='/feed2.jpg' trip='1,300' ton='85' km='23,000'/>
          <ScoreCard title='Feed Bulk' pic='/feed.jpg' trip='5,000' ton='158' km='16,000'/>
          <ScoreCard title='Coolers' pic='/vehicel.jpg' trip='126,000' ton='300' km='23,555'/>
          <ScoreCard title='Light Transport' pic='/bus.jpg' trip='230' ton='' client='450' km='66,230'/>
        </div>

    </div>
  )
}

export default ScoreBoard