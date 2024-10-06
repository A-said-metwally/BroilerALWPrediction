import React, { useState } from 'react'
import {TrashIcon} from '@heroicons/react/outline'

import { db } from '../firebase/init-firebase'
import {collection, addDoc ,getDocs, query, where} from 'firebase/firestore'



function AddNewUser({close}) {
    const sections = ['--','CI','Transport','Hopper', 'Coolers']
    const navBar = ['--', 'Entries','Reports','Other',]
    const pages = [
        {
            type:'Entries',
            pages:[
                {name:'--', link:''},
                {name:'New Hopper Trip', link:'/uploadData'},
                {name:'New FeedBulk Trip', link:''},
                {name:'New Cooler Trip', link:''},
            ]
        },
        {
            type:'Reports',
            pages:[
                {name:'--', link:''},
                {name:'Hopper', link:'/hopperReport'},
                {name:'Feed Bulk', link:''},
                {name:'Coolers', link:''},
                {name:'Light Transport', link:''},
            ]
        },
        {
            type:'Other',
            pages:[
                {name:'--', link:''},
                {name:'Visual Management', link:''},
                {name:'Master Data', link:''},
                {name:'Users', link:'/users'},
                {name:'Location', link:'/viewLocation'},
            ]
        },
    ]

    // show pages depend on selected type in navbar
    const [PgList, setPgList] = useState([])
    const pagesFilter = (n)=>{
        if(n === '--'){ 
            setPgList([])
            return
        }
        const newList = pages.filter((p)=>{return p.type === n})
        setPgList(newList[0].pages)
    }


    const [SelectedPages, setSelectedPages ] = useState([])
    const [Types, setTypes ] = useState([])

    // add selected pages in state
    const getSelectedPages = (e)=>{
        const currentType = document.getElementById('navbarOptions').value
        const currentPage = (e.target.value).split('-')
        if(currentPage[0] === '') return
        setSelectedPages([...SelectedPages, {type :currentType, name:currentPage[0], link:currentPage[1]}])

        // make unique list of types 
        const typeIndex = Types.indexOf(currentType) // 1st check if current type is exist || not
        if(typeIndex === -1){setTypes([...Types, currentType])}
    }

    const [NewUser, setNewUser] = useState({
        sapNo:0,
        name:'',
        pass:'',
        section:'',
        routeTo:'',
    })


    // upload data
    const usersRef = collection(db, "usersDb") 

    const upLoad = async ()=>{
            try{
                await addDoc(usersRef, {...NewUser, pages:SelectedPages})
                .then((res)=>{
                    if(res._key.path.segments){ // get respond after submit data with res._key.path.segments
                        setNewUser({
                            sapNo:0,
                            name:'',
                            pass:'',
                            section:'',
                            routeTo:'',
                        })
                        setSelectedPages([])
                        setTypes([])
                    }else{
                        alert('Bad Network Plz Try Again')
                    } 
                })
            }catch(error) {console.error('Error adding document: ', error)}
    }
    


  return (
    <div className=' mt-5 pb-5'>
        <h2 className='font-serif text-xl font-semibold text-blue-500'>Add New User</h2>
        <div className=' relative border-1 border-gray-300 rounded-xl shadow-md mt-3 px-4 py-10' >
            <button className=' absolute top-4 right-4 px-2 border-2 font-bold 
                rounded-lg bg-red-500 text-white hover:scale-110' onClick={()=>close()}
            >X</button>
            <div className='w-full flex items-center space-x-3'>
                <div className='flex flex-col'>
                    <label htmlFor="sapNo" className='text-gray-600'>Sap No</label>
                    <input 
                        id="sapNo" type="number" placeholder='Employee Sap No' value={NewUser.sapNo}
                        className=' border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold text-center'
                        onChange={(e)=>setNewUser({...NewUser, sapNo:+ e.target.value})}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='text-gray-600'>Name</label>
                    <input 
                        id="name" type="text" placeholder='Employee Name' value={NewUser.name}
                        className=' border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold text-center'
                        onChange={(e)=>setNewUser({...NewUser, name:e.target.value})}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="pass" className='text-gray-600'>Password</label>
                    <input 
                        id="pass" type="text" placeholder='Login Password' value={NewUser.pass}
                        className=' border-1 border-orange-400 rounded-md shadow-md p-2 text-lg focus:outline-none text-blue-600 font-semibold text-center'
                        onChange={(e)=>setNewUser({...NewUser, pass:e.target.value})}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="section" className='text-gray-600'>Section</label>
                    <select 
                        type="text" name='section' id='section' value={NewUser.section}
                        className='text-center outline-none border-2 border-orange-400 shadow-md rounded-md p-2 text-blue-600 font-semibold text-lg bg-transparent sm:w-[250px]'
                        onChange={(e)=>{
                            e.target.value === '--' 
                            ? alert('Plz Select Another Option')
                            : setNewUser({...NewUser, section:e.target.value})
                        }}
                        >
                        {sections.map(l => (
                            <option key = {l} value={l} className='bg-inherit  text-gray-600 font-bold'>{l}</option>
                            ))}
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="routeTo" className='text-gray-600'>Main Route</label>
                    <select 
                        type="text" name='routeTo' id='routeTo' value={NewUser.routeTo}
                        className='text-center outline-none border-2 border-orange-400 shadow-md rounded-md p-2 text-blue-600 font-semibold text-lg bg-transparent sm:w-[250px]'
                        onChange={(e)=>{
                            e.target.value === '--' 
                            ? alert('Plz Select Another Option')
                            : setNewUser({...NewUser, routeTo:e.target.value})}}
                        >
                            <option value='--' className='bg-inherit  text-gray-600 font-bold'>--</option>
                            <option value='/mainPage' className='bg-inherit  text-gray-600 font-bold'>Main Page</option>
                            <option value={`/drivers/${NewUser.sapNo}`} className='bg-inherit  text-gray-600 font-bold'>Drivers</option>
                    </select>
                </div>
            </div>
            <div className=' mt-3 w-full flex items-end space-x-3'>
                <div className='flex flex-col'>
                    <label htmlFor="navbarOptions" className='text-gray-600'>Navbar Options</label>
                    <select 
                        type="text" name='navbarOptions' id='navbarOptions' 
                        className='text-center outline-none border-2 border-orange-400 shadow-md rounded-md p-2 text-blue-600 font-semibold text-lg bg-transparent sm:w-[250px]'
                        onChange={(e)=>pagesFilter(e.target.value)}
                        >
                        {navBar.map(l => (
                                <option key = {l} value={l} className='bg-inherit  text-gray-600 font-bold'>{l}</option>
                            ))}
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="pages" className='text-gray-600'>Pages</label>
                    <select 
                        type="text" name='pages' id='pages' 
                        className='text-center outline-none border-2 border-orange-400 shadow-md rounded-md p-2 text-blue-600 font-semibold text-lg bg-transparent sm:w-[250px]'
                        onChange={(e)=>getSelectedPages(e)}
                        >
                        {PgList?.map((l, index)=> (
                                <option key = {index} value={`${l.name}-${l.link}` } className='bg-inherit  text-gray-600 font-bold'>{l.name}</option>
                            ))}
                    </select>
                </div>

                <button 
                    className=' py-2 px-5 rounded-lg bg-sky-600 text-xl font-semibold text-white hover:bg-green-500'
                    onClick={()=>upLoad()}
                >Submit</button>
            </div>

            {/* navbar preview */}
            <div className='flex items-start space-x-5 mt-5'>
                {Types.map((t, index)=>{return (
                    <div key = {index} className='w-[250px] p-2 flex flex-col items-center border-2 border-gray-300 rounded-lg shadow-md'>
                        <p className=' font-semibold text-xl text-gray-700 bg-gray-300 w-full text-center py-2 rounded-t-lg'>{t}</p>
                        <ul className='p-2 m-0  w-full'>
                            {SelectedPages.filter((p)=>{return p.type === t}).map((p, index)=>{return (
                                <li key = {index} className='text-xl'>
                                    <div className='w-full flex justify-between items-center py-2 hover:bg-yellow-100 cursor-pointer'>
                                        {p.name} 
                                        <TrashIcon className='h-6 w-6 text-red-500 font-semibold'/>
                                    </div>
                                </li>
                            )})}
                        </ul>
                    </div>
                )})}
            </div>
        </div>
    </div>
  )
}

export default AddNewUser