import React, { useState } from 'react';
import { PlusCircleIcon, SearchIcon } from '@heroicons/react/outline'


const PredFactorsInputs = ({addInputs, PredictedResults}) => {

    const [Inputs, setInputs] = useState({})

    const [Validate, setValidate] = useState(true)

    const validateSubmit = ()=>{
        // validate inputs
        const {wt0, wt4, wt7, wt14, wt21, age} = Inputs

        if(wt0 > 0 && wt4 > 0 && wt7 > 0 && wt14 > 0 && wt21 > 0 && age > 0){
            addInputs(Inputs)
            setInputs(
                        {  
                        "farmNo":'',
                        "houseNo":'',
                        "wt0":0,
                        "wt4":0,        
                        "wt7":0,        
                        "wt14":0,        
                        "wt21":0, 
                        "age":0       
                }
            ) 
            setValidate(true)
        }else{
            setValidate(false)
        }

    }


    return (
        <div>
            <div className='container flex-row justify-center mt-10 space-y-3 sm:flex sm:items-end sm:justify-between sm:space-x-3' >
                <div className='flex flex-col flex-1'>
                    <label htmlFor="factor1" className='font-semibold text-blue-700'>Farm Describtion</label>
                    <input id='factor1' type='text' value = {Inputs.farmNo} 
                        className='w-full p-2 text-lg text-center text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none'
                        onChange={(e)=>setInputs({...Inputs, "farmNo":e.target.value})}
                    />
                </div>
                <div className='flex flex-col flex-1'>
                    <label htmlFor="factor2" className='font-semibold text-blue-700'>House Describtion</label>
                    <input id='factor2' type='text'  value = {Inputs.houseNo}
                        className='w-full p-2 text-lg text-center text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none'
                        onChange={(e)=>setInputs({...Inputs, "houseNo":e.target.value})}
                    />
                </div>                
                <div className='flex flex-col flex-1'>
                    <label htmlFor="factor3" className='font-semibold text-blue-700'>Zero Body Wt.</label>
                    <input id='factor3' type='number'  value = {Inputs.wt0}
                        className='w-full p-2 text-lg text-center text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none'
                        onChange={(e)=>setInputs({...Inputs, "wt0":+e.target.value})}
                    />
                </div>                
                <div className='flex flex-col flex-1'>
                    <label htmlFor="factor4" className='font-semibold text-blue-700'>4 Days Wt.</label>
                    <input id='factor4' type='number'  value = {Inputs.wt4}
                        className='w-full p-2 text-lg text-center text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none'
                        onChange={(e)=>setInputs({...Inputs, "wt4":+e.target.value})}
                    />
                </div>                
                <div className='flex flex-col flex-1'>
                    <label htmlFor="factor5" className='font-semibold text-blue-700'>7 Days Wt.</label>
                    <input id='factor5' type='number'  value = {Inputs.wt7}
                        className='w-full p-2 text-lg text-center text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none'
                        onChange={(e)=>setInputs({...Inputs, "wt7":+e.target.value})}
                    />
                </div>                
                <div className='flex flex-col flex-1'>
                    <label htmlFor="factor6" className='font-semibold text-blue-700'>14 Days Wt.</label>
                    <input id='factor6' type='number'  value = {Inputs.wt14}
                        className='w-full p-2 text-lg text-center text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none'
                        onChange={(e)=>setInputs({...Inputs, "wt14":+e.target.value})}
                    />
                </div>
                <div className='flex flex-col flex-1'>
                    <label htmlFor="factor7" className='font-semibold text-blue-700'>21 Days Wt.</label>
                    <input id='factor7' type='number'  value = {Inputs.wt21}
                        className='w-full p-2 text-lg text-center text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none'
                        onChange={(e)=>setInputs({...Inputs, "wt21":+e.target.value})}
                    />
                </div>
                <div className='flex flex-col flex-1'>
                    <label htmlFor="factor8" className='font-semibold text-blue-700'>Catch Age</label>
                    <input id='factor8' type='number'  value = {Inputs.age}
                        className='w-full p-2 text-lg text-center text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none'
                        onChange={(e)=>setInputs({...Inputs, "age":+e.target.value})}
                    />
                </div>

                <button onClick={()=>validateSubmit()}>
                    <PlusCircleIcon 
                    className='hidden w-10 h-10 mb-2 sm:block text-sky-500 hover:text-green-500 hover:cursor-pointer'
                    />
                </button>
                    
                <button 
                    className='w-full px-4 py-2 font-serif text-xl text-white rounded-lg sm:hidden bg-sky-400 hover:bg-green-400 hover:cursor-pointer'
                    onClick={()=>validateSubmit()}
                >Submit</button>
            </div>
            {!Validate && <p className='mt-2 text-xl font-semibold text-center text-red-500 animate-pulse'>Please Complete Data</p>}
        </div>

);
}

export default PredFactorsInputs;
