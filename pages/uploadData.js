import React, { useState, useEffect} from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import driversDf from '../masterData/drivers.json'
import { db } from '../firebase/init-firebase'
import {collection, addDoc ,getDocs, query, where} from 'firebase/firestore'
import Loading from '../components/Loading'
import secureLocalStorage from 'react-secure-storage'
import { useRouter } from 'next/router'
import { encrypt } from '../utils/verifyLogin'


function UploadData() {

    const [UserInfo, setUsersInfo] = useState()

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


    const LoadingArea = ['--','حائل','وادى عنيرة','وطنية 1','وطنية 2','ينبع التجارى']
    const DispatchArea = ['--','وادى عنيرة','وطنية 1','وطنية 2']
    const FeedName = ['--','ذرة','صويا','نخالة']

    const [Trips, setTrips] = useState([])
    const [TripStatus, setTripStatus] = useState(true) 
    const [CheckDriver, setCheckDriver ] = useState()

    const [loading, setLoading] = useState(false)


      const [NewTrip, setNewTrip] = useState({
        waybillDate:'',
        waybillNo:'',
        driverNo:'',
        driverName:'',
        sideNo:'',
        backNo:'',
        loadingArea:'',
        dispatchArea:'',
        feedName:'',
        status:'new',
        extendedTo:'',
        userName:'',
        stampTime: '',
        closing:false
    })

    // fetch trips data
    const fetchTrips = async ()=>{
        const hopperTrips = collection(db, 'hopperTripsMd')
        setLoading(true)
        try{
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
            .then((trips)=>{
                return (setTrips(trips), setLoading(false))
            })
        }
        catch(error) {console.error('Error fetching data: ', error)}
    }


    // verify date 
    const dateVerify = (e)=>{
        const selectedDate = new Date(e).toDateString()
        const today = new Date().toDateString()
        selectedDate !== today
        ? (setNewTrip({...NewTrip, waybillDate: ''}, alert('Date Must Be Today')))
        : null
    } 

    // validate waybill no if exist and not repeated
    let wayBillsList = []
    const wayBills = ()=>{
        Trips.map((t)=>{wayBillsList.push(t.waybillNo)})
        return wayBillsList
    }
    wayBills()


    const waybillVerify = (e)=>{
        const val = + e.target.value
        const index = wayBillsList.indexOf(val)
        index >= 0
        ? (setNewTrip({...NewTrip, waybillNo: ''}, alert('This Waybill Number Already Exist, Plz Check Again')))
        : null
    }

    
    // get driver information & complete remained data
    const getDriverInfo = (e)=>{
        const comNo = e.target.value
        const driverInfo = driversDf.filter((n)=>{return n.COM === +comNo})[0]
        if(driverInfo){
            setCheckDriver(true)
            setNewTrip({...NewTrip, driverName:driverInfo.DRIVER, sideNo:driverInfo.SideNo, backNo:driverInfo.TraileSideNo})
        }else{
            setCheckDriver(false)
            setNewTrip({...NewTrip, driverName:'', sideNo:'', backNo:''})

        }
    }
    
    // check that every driver has just one waybill
    const driverVerify = (e)=>{
        const driverNo = e.target.value
        const openedTrips = Trips.filter((t)=>{return t.driverNo === driverNo && t.closing === false})
        openedTrips.length > 0 // has opened trips 
        ? (setNewTrip({...NewTrip, driverNo: '', driverName:'', sideNo:'', backNo:''}, alert('This Driver Has Opened Trips, Plz Contact Him To Close It')))
        : getDriverInfo(e)
    }

    // clear user form
    function clear(){
        setNewTrip({
            waybillDate:'',
            waybillNo:'',
            driverNo:'',
            driverName:'',
            sideNo:'',
            backNo:'',
            loadingArea:'',
            dispatchArea:'',
            feedName:'',
            status:'new',
            extendedTo:'',
            userName:'',  
            stampTime: '',
            closing:false     
        })
        
      }

    // inputs data validation
    const validate = ()=>{
        let {waybillDate,waybillNo,driverNo,sideNo,backNo,loadingArea,dispatchArea,feedName} = NewTrip
        let obj = {waybillDate:waybillDate, waybillNo:waybillNo, driverNo:driverNo, sideNo:sideNo, backNo: backNo, loadingArea:loadingArea , dispatchArea:dispatchArea ,feedName:feedName}

        const areAllValuesNotNull = Object.values(obj).every(value => value !== null && value !== "--" && value !== "");
        if(areAllValuesNotNull && NewTrip.status === 'new'){
            return true
        }else{
            if(areAllValuesNotNull && NewTrip.status === 'extend' && NewTrip.extendedTo.toString().length >= 1 && NewTrip.extendedTo !== 0 ){
                return true
            }else{
                return false
            }
        }
    }

    // upload data fn
    const upLoad = async ()=>{
        if(!validate() ){
            alert('Plz Complete Data')
            return
        } 
        setLoading(true)
        try{
            const hopperRef = collection(db, "hopperTripsMd") // hooper trips main data
            await addDoc(hopperRef, {...NewTrip, stampTime:new Date(), userName:UserInfo.name, stepNo:0})
            .then((res)=>{
                res._key.path.segments // get respond after submit data with res._key.path.segments
                ? (clear(), setLoading(false))
                : alert('Bad Network Plz Try Again')
            })
        }catch(error) {console.error('Error adding document: ', error)}
    }

    useEffect(()=>{ verifySession() },[])

    useEffect(()=>{
        fetchTrips()
        setUsersInfo(decryptedData?.data)
    },[Verifying])


  return (
    <div className=' relative'>
        {Verifying && 
            <>
                <Header title={'Hopper Upload Data'}/>
                <NavBar/>
                {loading && <Loading/>}
                <div className='container mt-4'>

                    <h2 className='font-serif text-xl font-semibold text-blue-500'>Waybill Information</h2>
                    <div className='mt-4 px-5 flex sm:flex-row sm:items-center sm:justify-between flex-col'>
                        <div className='sm:flex sm:items-center sm:space-x-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="waybillDate" className='text-gray-600'>Waybill Date</label>
                                <input 
                                    id="waybillDate" type="date" placeholder='Tripe Date' value={NewTrip.waybillDate}
                                    className='w-full border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold'
                                    onChange={(e)=>setNewTrip({...NewTrip, waybillDate:e.target.value})}
                                    onBlur={(e)=>dateVerify(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="newWaybillNo" className='text-gray-600'>Waybill No</label>
                                <input 
                                    id="newWaybillNo" type="number" placeholder='New Waybill No' value={NewTrip.waybillNo}
                                    className=' border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold text-center'
                                    onChange={(e)=>setNewTrip({...NewTrip, waybillNo:+ e.target.value})}
                                    onBlur={(e)=>waybillVerify(e)} // verify if waybill no is exist
                                />
                            </div>
                            { !TripStatus && // display when tripe Status is extended
                                <div className='flex flex-col'>
                                    <label htmlFor="oldWaybillNo" className='text-gray-600'>Old Waybill No</label>
                                    <input 
                                        id="oldWaybillNo" type="number" placeholder='Old Waybill No' value={NewTrip.extendedTo}
                                        className=' border-1 border-red-500 bg-red-100 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold text-center'
                                        onChange={(e)=>setNewTrip({...NewTrip, extendedTo:+e.target.value})}
                                    />
                                </div>
                            }
                        </div>
                        {/* select trip type */}
                        <div className='flex sm:space-x-10 space-x-5 sm:ml-[100px] pt-[35px]'>
                            <div className=' flex items-center space-x-2 text-xl text-gray-500 font-semibold'>
                                <label htmlFor="new">New</label>
                                <input type="radio" id='new' name='new' className='h-5 w-5' value={NewTrip.status}
                                    checked={TripStatus}
                                    onChange={(e)=>{
                                        setTripStatus(true)
                                        setNewTrip({...NewTrip, status:'new', extendedTo:''})
                                    }} 
                                />
                            </div>
                            <div className=' flex items-center space-x-2 text-xl text-gray-500 font-semibold'>
                                <label htmlFor="extend">Extend</label>
                                <input type="radio" id='extend' name='extend' className='h-5 w-5' value={NewTrip.status}
                                    checked={!TripStatus}
                                    onChange={(e)=>{
                                        setTripStatus(false)
                                        setNewTrip({...NewTrip, status:'extend'})
                                    }} 
                                />
                            </div>
                            <div className=' flex items-center space-x-2 text-xl text-gray-500 font-semibold'>
                                    <button className=' bg-blue-500 p-1 px-3 text-white rounded-md border-2 hover:border-red-500 '>Edit</button>
                            </div>

                        </div>
                    </div>


                    <h2 className='font-serif text-xl font-semibold text-blue-500 mt-5'>Driver Information</h2>
                    <div className=' mt-4 px-5 sm:flex sm:items-center sm:space-x-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="driverNo" className='text-gray-600'>Driver No</label>
                            <input 
                                id="driverNo" type="text" placeholder='Inter Driver No' value={NewTrip.driverNo}
                                className=' border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold'
                                onChange={(e)=>{ setNewTrip({...NewTrip, driverNo: e.target.value})}}
                                onBlur={(e)=>{ driverVerify(e)}}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="driverName" className='text-gray-600'>Driver Name</label>
                            <input 
                                id="driverName" type="text" placeholder='Driver Name' disabled = 'true' 
                                className=' border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold'
                                value = {NewTrip.driverName}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="headNo" className='text-gray-600'>Side No</label>
                            <input 
                                id="headNo" type="text" placeholder='Head No' value={NewTrip.sideNo}
                                className=' border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold'
                                onChange={(e)=>{setNewTrip({...NewTrip, sideNo:e.target.value})}}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="backNo" className='text-gray-600'>Back No</label>
                            <input 
                                id="backNo" type="text" placeholder='Back No' value={NewTrip.backNo}
                                className=' border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold'
                                onChange={(e)=>{ setNewTrip({...NewTrip, backNo:e.target.value})}}
                            />
                        </div>
                        {!CheckDriver && CheckDriver !== undefined && <p className=' text-red-500 font-bold pt-4'>Driver Not Exist</p>}
                    </div>

                    <h2 className='font-serif text-xl font-semibold text-blue-500 mt-5'>Trip Information</h2>
                    <div className='mt-4 px-5 sm:flex sm:items-center sm:space-x-3'>
                    <div className='flex flex-col'>
                            <label htmlFor="loadingArea" className='text-gray-600'>Loading Area</label>
                            <select 
                                type="text" name='loadingArea' id='loadingArea' value={NewTrip.loadingArea}
                                className=' outline-none border-2 border-orange-400 shadow-md rounded-md p-2 text-blue-600 font-semibold text-lg bg-transparent sm:w-[250px]'
                                onChange={(e)=>setNewTrip({...NewTrip, loadingArea:e.target.value})}
                                >
                                {LoadingArea.map(l => (
                                    <option key = {l} value={l} className='bg-inherit  text-gray-600 font-bold'>{l}</option>
                                    ))}

                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="dispatchArea" className='text-gray-600'>Dispatch Area</label>
                            <select 
                                type="text" name='dispatchArea' id='dispatchArea' value={NewTrip.dispatchArea}
                                className=' outline-none border-2 border-orange-400 shadow-md rounded-md p-2 text-blue-600 font-semibold text-lg bg-transparent sm:w-[250px]' 
                                onChange={(e)=>setNewTrip({...NewTrip, dispatchArea:e.target.value})}
                                >
                                {DispatchArea.map(l => (
                                    <option key = {l} value={l} className='bg-inherit  text-gray-600 font-bold'>{l}</option>
                                    ))}
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="feedName" className='text-gray-600'>Feed Name</label>
                            <select 
                                type="text" name='feedName' id='feedName' value={NewTrip.feedName}
                                className=' outline-none border-2 border-orange-400 shadow-md rounded-md p-2 text-blue-600 font-semibold text-lg bg-transparent sm:w-[250px]'
                                onChange={(e)=>setNewTrip({...NewTrip, feedName:e.target.value})}
                                >
                                {FeedName.map(l => (
                                    <option key = {l} value={l} className='bg-inherit  text-gray-600 font-bold'>{l}</option>
                                    ))}
                            </select>
                        </div>
                        <button 
                            className=' py-2 px-4 bg-sky-500 text-white font-semibold rounded-md border-2 shadow-md
                            text-lg  mt-[26px] hover:bg-sky-700 hover:border-yellow-400 cursor-pointer ease-in-out duration-150'
                            onClick={()=>upLoad()}
                        >Submit</button>
                    </div>
                </div>
        </>
        }
    </div>
  )
}

export default UploadData