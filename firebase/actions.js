import {collection, getDocs, query, where} from 'firebase/firestore'
import {db} from '../firebase/init-firebase'
import XLSX from 'xlsx'

const usersRef = collection(db, 'usersDb')

// fetch all users data
export const fetchAllUsersData = async (f)=>{
    await getDocs(usersRef)
    .then(res => {
        let userData = res.docs.map(doc =>(
            {
                id:doc.id,
                data:doc.data()
            }
        ))
        return userData
    })
    .then(userInfo =>{ f(userInfo) })
    .catch(error => console.log("users fetch error", error.message))
}

// fetch user data
export const fetchUserData = async (userCode, f)=>{
    let q = query(usersRef, where("sapNo", "==" , userCode))
    await getDocs(q)
    .then(res => {
        let userData = res.docs.map(doc =>(
            {
                id:doc.id,
                ...doc.data()
            }
        ))
        return userData
    })
    .then(userInfo =>{ f(userInfo)})
    .catch(error => console.log("user fetch error", error.message))
}


// export excel
export const handleExportExcel = (data, title)=>{
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(data);
  
    XLSX.utils.book_append_sheet(wb, ws, 'worksheet' )
        XLSX.writeFile(wb, `${title}.xlsx` )
  }
  

//   *******************************************

export const addProject = async (data)=>{
    await fetch('/api/projects',{
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    })
}

export const newHopperTrip = async (data)=>{
    const response = await fetch('/api/addHopperTrip',{
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    })
    const res = await response.json()
    return res
}

