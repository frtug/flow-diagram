import React from 'react'

export default function CustomAlertConfirmation({msg,setIsClicked,navigatedToAction}) {
  return (
    <div className='fullscreen'>
        <h3>{msg}</h3>
        <div>
           <button className="btn alertButton" onClick={navigatedToAction} >
            Proceed 
            </button>
            <button className="btn alertButton" onClick={()=>setIsClicked(false)}>
                Stay on page
            </button> 
        </div>
        </div>
  )
}
