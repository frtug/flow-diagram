import React, { useState } from 'react'
import CreateNewButton from './CreateNewButton';
import InputReuseable from './InputReuseable';

export default function DefaultHome({setCreateNew,setIsFilePicked,setInitialEdges,setInitialNodes}) {
    const [isError,setIsError] = useState(false);
  return (
    <>
        <div className="header">
            <h1>Flow Diagram</h1>
        </div>
        <div className='card'>
            <div className='left-side'>
                    <InputReuseable setIsError={setIsError}
                        setIsFilePicked={setIsFilePicked} 
                        setInitialEdges={setInitialEdges}
                        setInitialNodes={setInitialNodes}
                    />
            </div>
            <div className='right-side'>
            <CreateNewButton setCreateNew={setCreateNew}/>
            </div>   
        </div>
    </>
    
    
  )
}
