import React, { useState } from 'react'
import * as XLSX from 'xlsx'


function Convert() {

    const [UploadedData, setUploadedData] = useState([])
    const [FilesListName, setFilesListName] = useState([])
    const [Status, setStatus] = useState(null)
    const [ConvertedData, setConvertedData] = useState([])


    // fn to execute file selector
    const executeSelect = ()=>{
        const input = document.getElementById('file-select')
        input.click()
    }

    // function to import data from excel
    const handleUpload = ($e)=>{
        const file = $e.target.files[0]
        const fileName = file.name
        if(FilesListName.indexOf(fileName) !== -1){ // check if file name is already exist
            alert('File Already Exist')
            return
        } else{
            setFilesListName([...FilesListName, {fileName, state:null}])
        }

        const reader = new FileReader()
        reader.onload = (e)=>{
            const wb = XLSX.read(e.target.result)
            const sheets = wb.SheetNames
            const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]) // store data in rows
            setUploadedData([...UploadedData, {fileName, rows}])
        }
        reader.readAsArrayBuffer(file)
        }

// fn to remove all null fields
function removeNullValues(object){
    const cleanedObject = {}
    for(const key in object){
        object[key] ? cleanedObject[key] = object[key] : null
    } 
    return cleanedObject
}

const newArr = []

const convert = ()=>{
    
            setStatus('in-progress')

            UploadedData.map((d)=>{
                d.rows.forEach((originObj)=>{
                    const cleanedObject = removeNullValues(originObj) // first remove null vales 
                    newArr.push(cleanedObject)
                })
            })
        
            let longObject = []
            
            newArr.forEach((obj)=>{ //convert new data from wide data to long data 
                let {Id_Numeric, Id_Text, LoginDate, Sampling_Point, Sample_Type, ...rest} = obj
                const newFields = {}
                
                for(const key in rest){
                    newFields['Test_Name'] = key
                    newFields['Quantity'] = rest[key]
                    longObject.push({Id_Numeric, Id_Text,LoginDate, Sampling_Point, Sample_Type, ...newFields})
                } 
                return longObject
            })
        
            setConvertedData([...ConvertedData, longObject])
            setStatus('success')
            console.log(longObject)
}

// export excel
const handleExportExcel = ()=>{
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(...ConvertedData);
  
    XLSX.utils.book_append_sheet(wb, ws, 'worksheet' )
        XLSX.writeFile(wb, `Converted_data.xlsx` )
  }



  return (
    <div>
        <div className=' text-center mt-5'>
            <h1 className=' text-purple-700'>Welcome to New Converter App</h1>
            <p>El-Mohandes Programming</p>
            <p>Copy Rights @ Ahmed Said, +966569619269</p>
        </div>
        
        <div className=' w-1/3 mt-5 mx-auto p-3 border-1 border-gray-500 rounded-lg shadow-lg'>
            {Status !== 'success' && 
                <>
                    <button 
                        className='p-2 w-full bg-blue-600 rounded-lg shadow-md border text-white font-semibold text-lg hover:bg-blue-800 cursor-pointer'
                        onClick={()=>executeSelect()}    
                    >Select File</button> 
                    
                    <input 
                    type="file" 
                    className='hidden' 
                    id='file-select'
                    onChange={handleUpload}
                    />
                
                    <div className='text-center'>
                        {FilesListName.map((f, index)=>{
                            return (
                                <div key = {index}
                                    className={`p-2 text-lg  border-b-2 border-gray-400 ${f.state === 'success' ? 'bg-green-400' : null}`}
                                >{f.fileName}</div>  
                            )
                        })}
                    </div>
                </>
            }

            {FilesListName.length > 0 && Status === null && 
                <button
                    className='p-2 mt-3 w-full bg-blue-600 rounded-lg shadow-md border text-white font-semibold text-lg hover:bg-blue-800 cursor-pointer'
                    onClick={()=>convert()}
                >Convert</button>            
            }

            {Status === 'in-progress' && 
                <p className='  text-orange-600 font-bold text-center p-2 text-lg '>Loading ...</p>
            }

            {Status === 'success' &&
                <>
                    <p className='  text-green-600 font-bold text-center p-2 text-lg '>Success</p>
                    <button
                            className='p-2 mt-3 w-full bg-blue-600 rounded-lg shadow-md border text-white font-semibold text-lg hover:bg-blue-800 cursor-pointer'
                            onClick={()=>handleExportExcel()}
                            >Xlsx</button>                                    
                </>
            }
        </div>
    </div>
  )
}

export default Convert