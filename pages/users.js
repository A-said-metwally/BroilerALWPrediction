import React, {useState, useEffect} from 'react'
import drivers from '../masterData/drivers.json'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import { db } from '../firebase/init-firebase'
import {collection, addDoc ,getDocs, query, where} from 'firebase/firestore'
import UsersTable from '../components/UsersTable'
import AddNewUser from '../components/AddNewUser'
import { PlusCircleIcon, SearchIcon } from '@heroicons/react/outline'
import UserPages from '../components/UserPages'


function Users() {

    const [UsersInfo, setUsersInfo] = useState([])

    const [ShowAddSec, setShowAddSec] = useState(false)
    const [ShowUserPages, setShowUserPages] = useState(false)

    const driversList = drivers.map((d)=>{
        return {
                sapNo: d.COM, 
                name:d.DRIVER, 
                pass:`${d.COM}-driver`, 
                section:'Hopper', 
                routeTo:`/drivers/${d.COM}`,
                pages:[{type:'Entries', name:'drivers', link:`/drivers/${d.COM}`}]
            }
    })


    const viewUserPages = (e)=>{
        setShowUserPages(true)
        console.log('pages are',e)
    }

    const usersRef = collection(db, "usersDb") 

    const upLoad = ()=>{
        driversList.map(async (d)=>{
                try{
                    await addDoc(usersRef, d)
                    .then((res)=>{
                        if(res._key.path.segments){ // get respond after submit data with res._key.path.segments
                            console.log('done')
                        }else{
                            alert('Bad Network Plz Try Again')
                        } 
                    })
                }catch(error) {console.error('Error adding document: ', error)}
        })
    }

    // fetch users
    const fetchAllUsersData = async ()=>{
        await getDocs(usersRef)
        .then(res => {
            let userData = res.docs.map(doc =>(
                {
                    id:doc.id,
                    ...doc.data()
                }
            ))
            return userData
        })
        .then(usersInfo =>{ setUsersInfo(usersInfo) })
        .catch(error => console.log("users fetch error", error.message))
    }
    
    useEffect(()=>{fetchAllUsersData()},[])
    
  return (
    <div className=' relative h-full w-full '>
        <Header title={''}/>
        <NavBar/>

        {ShowUserPages && <UserPages close = {()=>setShowUserPages(false)}/>}

        <div className='container mt-4'>

            {/* <button onClick={()=>upLoad()}>click</button> */}
            {!ShowAddSec && 
                <div className='w-full flex items-center justify-between'>
                    <div className='flex items-center space-x-3 hover:bg-gray-200 rounded-xl hover:shadow-md px-3 py-2 
                        w-fit cursor-pointer' >
                        <SearchIcon className='h-9 w-9 text-blue-600'/>
                        <input 
                            id="search" type="number" placeholder=''
                            className='w-full border-1 text-center border-gray-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600'
                        />
                    </div>            
                    <div className='flex items-center space-x-3 hover:bg-gray-200 rounded-xl hover:shadow-md px-3 py-2 
                        w-fit cursor-pointer' onClick={()=>setShowAddSec(true)}>
                        <PlusCircleIcon className='h-9 w-9 text-blue-600'/>
                        <p className='text-xl font-semibold font-serif text-gray-600'>New User</p>
                    </div>            
                </div>
            }

            {ShowAddSec && <AddNewUser close = {()=>setShowAddSec(false)}/> }
            
            {!ShowAddSec && <UsersTable UsersInfo = {UsersInfo} viewUserPages = {viewUserPages}/>}
        </div>
    </div>
  )
}

export default Users