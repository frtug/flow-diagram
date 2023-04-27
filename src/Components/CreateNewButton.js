import React from 'react'

function CreateNewButton({setCreateNew}){
    const onClickButton =(event)=>{
        setCreateNew(true);
        localStorage.removeItem('data');
    }
    return(
        <button  className='btn-class create-file' onClick={onClickButton}> Create New</button>
    )
}

export default CreateNewButton