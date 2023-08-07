import React from 'react';
import Delete from '../Svgs/delete.svg'
import Cancel from '../Svgs/cancel.svg'


export default function CustomModel({setModel},{x,y}) {
    const deleteModel =()=>{
        console.log("delete")
        // deleting the .........
    }
    const cancelModel =()=>{
        console.log("cancel")
        setModel(false)
    }
  return (

    <div className='model' style={{ left: x + 'px', top: y + 'px' }}>
        <button onClick={deleteModel} className='btn'> 
        <img src={Delete} alt="delete" width="13px" height="13px"/>
         </button>
        <button onClick={cancelModel} className='btn'> 
        <img src={Cancel} alt="cancel" width="13px" height="13px"/>
         </button>
    </div>
  )
}
