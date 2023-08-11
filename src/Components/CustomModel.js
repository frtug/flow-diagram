import React from 'react';
import Delete from '../Svgs/delete.svg'
import Cancel from '../Svgs/cancel.svg'


export default function CustomModel({selectedFile,setModel,deleteFileName,onHandleDelete,modelPosition}) {
    const deleteModel =()=>{
        console.log("delete")
        
        deleteFileName(selectedFile)
        onHandleDelete(selectedFile)
        setModel(false)
    }
    const cancelModel =()=>{
        console.log("cancel")
        setModel(false)
    }
  return (
    <div className='model' style={{ left: modelPosition?.x - 50 + 'px', top: modelPosition?.y + 'px' }}>
        <div className='file-topic'>
            <h5>{selectedFile.length > 5 ? selectedFile.substr(0,5)+"...":selectedFile.substr(0,5) }</h5>
        </div>
        <div className='model-collection'>
            <button onClick={deleteModel} className='btn'> 
                <img src={Delete} alt="delete" width="25px" height="25px"/>
            </button>
            <button onClick={cancelModel} className='btn'> 
                <img src={Cancel} alt="cancel" width="25px" height="25px"/>
            </button>
        </div>
        
        
    </div>
  )
}
