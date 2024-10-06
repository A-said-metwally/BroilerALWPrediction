import React, { useState } from 'react'
import { CheckIcon } from '@heroicons/react/outline'

function TrackingBtn({caption, end, submitData, step, stepNo, no}) {
    let currentBtn = stepNo + 1
    const [ShowConfirmation, setShowConfirmation] = useState(false)
    
    const [InputVal, setInputVal] = useState()
    
    let msg ;
    switch (currentBtn) { // to display input field and msg 
        case 1:
        case 6:
          msg = 'Inter Counter Reading';
          break;
        case 3:
          msg = 'Inter Loaded Qty';
          break;
      }


    const submit = ()=>{
        if(msg ){
            const value = InputVal
            value !== undefined && value >= 0
            ? (submitData(step, value), setShowConfirmation(false))
            : alert('Plz Inter Needed Value')
        }else{
            submitData(step)
            setShowConfirmation(false)
        }
    }

    return (
    <div className='  relative flex flex-col justify-center items-center'>

        {stepNo >= no && 
            <div className=' absolute top-[30px] right-[40px]'><CheckIcon className='h-14 w-14 text-lg font-semibold text-green-600'/></div>
        }

        <button className='rounded-full h-[125px] w-[125px]  text-slate-50 border-2 border-purple-500
            flex justify-center items-center p-3 text-xl font-bold cursor-pointer hover:bg-green-400 focus:bg-green-400 '
            style={{background:`${currentBtn === no ? 'blue' : stepNo >= no ? 'green' : 'gray'}`}}
            onClick={()=>{setShowConfirmation(true)}}
            disabled = {currentBtn !== no}
            >{caption}</button>
        {/* <p className=' text-xl font-semibold text-gray-500 p-1 shadow-md bg-slate-200 rounded-md px-3'>Location :<span className=' text-green-600'>123watania</span></p> */}
        
        {!end && 
            <div className='h-[60px] w-[2px] border-2 border-blue-600'></div> 
        }

        {/*confirm box and inter values (counters, qty) */}
        {ShowConfirmation &&
            <div className=' absolute top-0 left-0 w-full h-[150%] z-10 bg-gray-200 rounded-lg shadow-md flex flex-col justify-center items-center space-y-6'>
                {msg && 
                        <div className='w-full flex flex-col justify-center items-center'>
                            <span className=' text-lg'>{msg}</span>
                            <input type="number" className=' p-2 w-1/2 focus:outline-none border-2 border-blue-500 rounded-md text-center text-lg font-semibold text-gray-600'
                                onChange={(e)=>setInputVal(e.target.value)}
                            />
                        </div>
                }
                {/* confirm box */}
                <div className='w-full flex justify-center space-x-5 px-3'>
                    <button 
                        className='w-1/2 p-2 py-3 rounded-xl shadow-lg hover:scale-105 focus:scale-105
                         bg-green-500 text-white font-semibold font-serif'
                        onClick={()=>submit()}
                    >Confirm</button>
                    <button 
                        className='w-1/2 p-2 rounded-xl shadow-lg hover:scale-105 focus:scale-105
                         bg-gray-600 text-white font-semibold font-serif'
                        onClick={()=>setShowConfirmation(false)}
                    >Cancel</button>
                </div>
            </div>        
        }

    </div>
)
}

export default TrackingBtn