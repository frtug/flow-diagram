import React, { useEffect, useState } from 'react'
import {useAuth} from '../contexts/AuthContext'
import CustomModel from './CustomModel';
export default function PopulateData({setInitialEdges,setInitialNodes}) {

    const {fetchedData} = useAuth();
    const [searched,setSearched] = useState("");
    const [filteredData,setFilteredData] = useState();
    const [waiting,setWaiting] = useState(true);
    const [isActive,setIsActive] = useState(-1);
    const [model,setModel] = useState(false);
    const [modelPosition,setModelPosition] = useState({x:"",y:""})

    const buttonClick = (index)=>{

        if(isActive === -1){
            document.getElementById(index).classList.add('isActive');
            setIsActive(index);
        }
        else{
            document.getElementById(isActive).classList.remove('isActive');
            document.getElementById(index).classList.add('isActive');
            setIsActive(index);
        }
    }
    const setNewData =( {data},e) => {
        setInitialEdges(data.initialEdges)
        setInitialNodes(data.initialNodes)
        buttonClick(e.target.id)
        // console.log(index)

    }
    const handleRightClick = (e)=>{
        e.preventDefault();
        console.log("we need to give option of delete and cancel, just confirmation")
        buttonClick(e.target.id)
        setModel(true);
        const updated = {x:e.clientX, y:e.clientY};
        console.log(updated.x,updated.y)

        setModelPosition(updated)
    }
    const getTitleAndTimeDate = (fileName,serverTime)=>{
        let result = fileName;    
        var newDate = new Date();
        newDate.setTime(serverTime*1000);
        let dateString = newDate.toUTCString();
        result += ", created At-"+dateString;
        return result;
    }
    const handleChange =(e)=>{
        console.log(e.target.value);
        setSearched(e.target.value);
        if(e.target.value === "" ){
            setFilteredData(fetchedData)
        }
        else{
            setFilteredData(fetchedData.filter((data)=>
            data.fileName.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        }
    }
    useEffect(()=>{
        if(fetchedData){
            setFilteredData(fetchedData)
            setWaiting(false)
        }
    },[fetchedData])
  return (
    <div className="fetched-data">
        <div style={{ position:"absolute" }}>
            {
            model && <CustomModel setModel={setModel} location={modelPosition} />
            }
        </div>
        <input value={searched} onChange={handleChange} placeholder='search files' type="search"/>
        {waiting && !filteredData ? <>loading</>:
            <div className='data-all'>
            {filteredData && filteredData.map((data,index) => 
            {         
                return ( 
                    <button key={index} id={index} onContextMenu={handleRightClick} className="btn-class" title={getTitleAndTimeDate(data.fileName,data.timestamp)} onClick={(e)=>setNewData(data,e)}>{data.fileName.length > 6 ? data.fileName.substr(0,6).trim("")+"..." : data.fileName}</button>
                )}
            )}
         </div>
        }
    </div>
  )
}
