import React from 'react'

function AboutUs() {
  return (
    <div id="list-item-3" className='mt-3 bg-black flex justify-center '>
        <div className='sm:w-5/6 w-full flex sm:flex-row sm:justify-center flex-col-reverse items-center'>
            {/* left section */}
            <div className='sm:w-1/2 w-full flex flex-col justify-center items-center  sm:pt-4 p-3'>
                <h1 className=' text-TextColor2 sm:text-6xl text-4xl text-center'>Al-Watania Transport</h1>
                {/* <img src="/norma.gif" alt="" className=' w-56 h-46' /> */}
                {/* <h1 className=' text-white text-3xl '>Norma</h1> */}
                <h6 className=' font-semibold text-ColorFive text-center text-xl'>Achieve More Today And Be Ready For The Future. </h6>
                <p className='text-ColorFive text-center leading-10 text-xl'>
                    <span className='text-TextColor2 font-semibold'>Al-Watania Transport  </span>
                    is one of the Al-Watania Poultry Holding companies that works in the field of transportation, 
                    as we seek to provide the best services for transporting raw materials and products to all parts of the Kingdom 
                    of Saudi Arabia and to always achieve the goals and vision of the senior management with the latest means and methods 
                    of transporting goods and company employees. 
                </p>
                <button className=' mt-3 pl-10 pr-10 pt-2 pb-2 rounded-full font-bold
                 bg-TextColor2 text-gray-900 hover:bg-ColorOne hover:text-slate-50
                  transition duration-300 ease-in-out'
                 >
                    LEARN MORE
                </button>
                
            </div>
            
            {/* right section */}
            <div className='sm:w-1/2 w-full'>
                <img src="/Capture.PNG" alt="" className=' w-full h-full'/>
            </div>
        </div>
    </div>
  )
}

export default AboutUs