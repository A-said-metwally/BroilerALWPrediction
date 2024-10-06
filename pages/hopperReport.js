import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import {RefreshIcon, DocumentDownloadIcon, SortDescendingIcon, ChartBarIcon} from '@heroicons/react/outline'
import { handleExportExcel } from '../firebase/actions'
import HopperData from '../components/HopperData'
import NavBar from '../components/NavBar'
import Loading from '../components/Loading'
import { db } from '../firebase/init-firebase'
import {collection, addDoc ,getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import HopperDashBoard from '../components/HopperDashBoard'
import { useRouter } from 'next/router'
import secureLocalStorage from 'react-secure-storage'
import { encrypt } from '../utils/verifyLogin'



function HopperReport() {
    // const FeedName = ['','ذرة','صويا','نخالة']

    const [Data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [ShowDash, setShowDash] = useState(false)

    const hideDashBoard = ()=>{setShowDash(false)}

    const router = useRouter()
    const currentRef = router.pathname
    let decryptedData = secureLocalStorage.getItem('sessionInfo') // get encrypted user data 
  
    const [Verifying, setVerifying] = useState(false)

    // verify login and permission
    const verifySession = ()=>{
      // console.log('from verifySession', decryptedData)
      if(decryptedData !== null){
          const currentTime = new Date()
          const logInTime = new Date(decryptedData.stampTime) // check the last login time
          const timeDifference = currentTime - logInTime
  
          let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          
          if(minutes > 1){
            router.push('/')
          }else{
            // verify permissions
            const pages = decryptedData.data.pages.map((i)=>{return i.link})
            const allPages = [...pages, decryptedData.data.routeTo]
            const verifyPermission = allPages.indexOf(currentRef) // check that current page is available to user or not
            verifyPermission === -1
            ? router.push('/')
            : setVerifying(true)
          }
      }else{
        router.push('/')
        console.log('No Decrypted Data Exist')
      }
    }
    const updateLoginSession = ()=>{
      if(!Verifying) return
      setInterval(()=>{
        encrypt(decryptedData.data)
      },60000)
    }
    updateLoginSession()
    


    const fetchData = async ()=>{
        const hopperTrips = collection(db, 'hopperTripsMd')
        setLoading(true)
        try{
            // let q = query(hopperTrips, where("driverNo", "==" , driverNo))
            await getDocs(hopperTrips)
            .then(res => {
                    let trips = res.docs.map(doc =>(
                        {
                            id:doc.id,
                            ...doc.data()
                        }
                    ))
                    return trips
            })
            .then(trips =>{
                setData(trips)
                setLoading(false)
            })
        }
        catch(error) {console.error('Error fetching data: ', error)}
    }

    useEffect(()=>{ verifySession() },[])

    useEffect(()=>{ fetchData()},[Verifying])

  return (
    <div className='relative h-full w-full'>
        {Verifying && 
        <>
            <Header title={''}/>
            <NavBar/>

            {loading && <Loading/>}
            <div className='container mt-4 '>
                <h2 className='text-gray-500 font-serif text-xxl'>Hopper Follow-Up Report</h2>
                {/* controls period feed type untreated data */}
                <div className='w-full flex sm:flex-row flex-col sm:justify-between items-center '>
                    <div className='w-full mt-4 px-5 sm:flex sm:items-center sm:space-x-12'>
                        <div className='flex flex-col'>
                            <label htmlFor="fromDate" className='text-gray-600'>From Date</label>
                            <input 
                                id="fromDate" type="date" placeholder=''
                                className='w-full border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="toDate" className='text-gray-600'>To Date</label>
                            <input 
                                id="toDate" type="date" placeholder=''
                                className='w-full border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600'
                            />
                        </div>
                    </div>
                    <div className='flex justify-center space-x-3 pt-5'>
                            <button 
                                // onClick={filterData}
                                className=' pl-4 pr-4 pt-2 pb-2 transition duration-105 m-0
                                cursor-pointer hover:rotate-180 duration-200 ease-in-out text-blue-600 font-bold '
                                >
                            <RefreshIcon className=' h-8 w-8  cursor-pointer hover:text-green-500'/>
                            </button>

                            <button
                                onClick={()=>setShowDash(true)}
                                className=' pl-4 pr-4 pt-2 pb-2 transition duration-105 m-0
                                cursor-pointer hover:scale-105 text-blue-600 font-bold '
                                >
                                <ChartBarIcon className=' h-8 w-8  cursor-pointer hover:text-green-500'/>
                            </button>

                            <button
                                // onClick={()=>handleExportExcel(Results, 'Kpis Results')}
                                className=' pl-4 pr-4 pt-2 pb-2 transition duration-105 m-0
                                cursor-pointer hover:scale-105 text-blue-600 font-bold '
                                >
                                <DocumentDownloadIcon className=' h-8 w-8  cursor-pointer hover:text-green-500'/>
                            </button>
                    </div>
                </div>
                
                <HopperData data = {Data} />
            
            </div>
            {ShowDash && <HopperDashBoard hide = {hideDashBoard}/>}
        </>
        }
    </div>
  )
}

export default HopperReport