import React, { useEffect, useState } from 'react'
import {useAuth} from '../contexts/AuthContext'

export default function PopulateData({setInitialEdges,setInitialNodes}) {

    const {fetchedData} = useAuth();
    const [searched,setSearched] = useState("");
    const [filteredData,setFilteredData] = useState();
    const [waiting,setWaiting] = useState(true);

    const setNewData =({data})=>{
        setInitialEdges(data.initialEdges)
        setInitialNodes(data.initialNodes)
        console.log("new data is set",data)
    }
    const getTitleAndTimeDate = (fileName,serverTime)=>{
        let result = fileName;    
        var newDate = new Date();
        newDate.setTime(serverTime*1000);
        let dateString = newDate.toUTCString();
        const istOptions = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };
        dateString = dateString.toLocaleString('en-IN', istOptions);
        console.log(dateString)
        result += ", created At-"+dateString;
        return result;  
    }
    const handleChange =(e)=>{
        console.log(e.target.value);
        setSearched(e.target.value);
        if(e.target.value === "" ){
            setFilteredData(fetchedData)
        }
        else setFilteredData(fetchedData.filter((data)=>
            data.fileName.toLowerCase().includes(searched.toLowerCase())
        ))
        // console.log(filteredData)
    }
    useEffect(()=>{
        if(fetchedData){
            setFilteredData(fetchedData)
            setWaiting(false)        
        }
    },[fetchedData])
  return (
    <div className="fetched-data">
        
        {console.log(fetchedData)}
        <input value={searched} onChange={handleChange} placeholder='search files' type="search"/>
        {waiting && !filteredData ? <>loading</>:
            <div className='data-all'>
            {filteredData && filteredData.map((data,index) => 
            {         
                return ( 
                    <button key={index} className="btn-class" title={getTitleAndTimeDate(data.fileName,data.timestamp)} onClick={()=>setNewData(data)}>{data.fileName.length > 12 ? data.fileName.substr(0,12).trim("")+"..." : data.fileName}</button>
                )}
            )}
         </div>
        }
       
    </div>
  )
}
