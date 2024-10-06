import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import ScoreBoard from '../components/ScoreBoard'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'

import { db } from '../firebase/init-firebase'
import {collection, addDoc ,getDocs, query, where, updateDoc, doc, onSnapshot} from 'firebase/firestore'
import Loading from '../components/Loading'
import { useRouter } from 'next/router'
import secureLocalStorage from 'react-secure-storage'
import { encrypt } from '../utils/verifyLogin'


function MainPage() {

  
  const router = useRouter()
  const currentRef = router.pathname
  let decryptedData = secureLocalStorage.getItem('sessionInfo') // get encrypted user data 
  
  const [loading, setLoading] = useState(true)

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
  useEffect(()=>{ verifySession() },[])

  

  // const [HopperTrips, setHopperTrips]  = useState([])
  // const hopperRef = collection(db, 'hopperTripsMd')

  // real data base
  // useEffect(()=>{
  //   const getHopperTrips = onSnapshot(hopperRef, snapShot => {
  //     setHopperTrips(snapShot.docs.map(doc => ({id:doc.id, ...doc.data()})))
  //   })
  //   return ()=>{getHopperTrips()}
  // },[])

  return (
    <div className=' relative h-full overflow-x-hidden'>
        {!Verifying && <Loading/>}
        {Verifying && 
          <>
            <Header title={''}/>
            <NavBar/>
            <AboutUs/>
            <ScoreBoard/>
            <Footer/>                
          </>
        }
    </div>
  )
}

export default MainPage