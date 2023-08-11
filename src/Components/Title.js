import React, { useState } from 'react'
import CustomAlertConfirmation from './CustomAlertConfirmation';

export default function Title({isPainted}) {
    const [alertMessage,setAlertMessage] = useState("");
    const [isClicked,setIsClicked] = useState(false);    
    const handleClick =(e)=>{
        setIsClicked(true);
        setAlertMessage("All Unsaved changes will lost")
    }
    const navigatedToAction =()=>{
        localStorage.removeItem("data");
        window.location.reload()
    }
  return (
    <>
    {isClicked && <CustomAlertConfirmation msg={alertMessage} setIsClicked={setIsClicked} navigatedToAction={navigatedToAction}/> }
    <div className="title">
        <button onClick={handleClick} className="btn-class title-btn">
          Dev Flow  
        </button>
        
    </div>
    </>
    
  )
}
