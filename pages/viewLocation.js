import React, { useState } from 'react'
import { fetchIpInfo } from '../utils/location'

function ViewLocation() {

    const [Location, setLocation] = useState()

    const getLocation = async ()=>{
        try{
            await fetchIpInfo() // get ip information
            .then((res)=>{
                if(res?.status === 200){
                    const {ip, country, city, loc} = res.data
                    setLocation({ip, country, city, loc})
                }
            })
        }catch(error){console.log(error)}
    }

  return (
    <div className='container'>
        <h1>View Location</h1>
        <br />
        <button 
            className='bg-blue-500 p-4'
            onClick={()=>getLocation()}
        >click</button>
        <p>ip : {Location?.ip}</p>
        <p>country : {Location?.country}</p>
        <p>city : {Location?.city}</p>
        <p>loc : {Location?.loc}</p>
    </div>
  )
}

export default ViewLocation