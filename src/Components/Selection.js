import React, { useState } from 'react'
// import { ReactFlowProvider } from 'react-flow-renderer';
import App from '../App';

const Selection = ()=> {
    const [isFilePicked,setIsFilePicked] = useState(false);
    const [createNew,setCreateNew] = useState(false);
    const [initialNodes,setInitialNodes] = useState([]);
    const [initialEdges,setInitialEdges] = useState([]);

    const [isError,setIsError] = useState(false);

    const onClickButton =(event)=>{
        setCreateNew(true);
    }
    const fileChangeHandler =(event)=>{
        const file = event.target.files[0];

        if(!file.name.endsWith(".json")){
            setIsError(true);
            setIsFilePicked(false);
            return;
        }
        var fileread = new FileReader();
        try{
            fileread.onload = function(e) {
                setIsFilePicked(true);
                setIsError(false);

                var initial = JSON.parse(e.target.result);
                setInitialEdges(initial.initialEdges);                
                setInitialNodes(initial.initialNodes);
            };
            fileread.onerror = function (error) {
                console.log('Error: ');
                setIsFilePicked(false);
                setIsError(true);
            }
        }
        catch(err){
            console.log('Error: ');
            setIsFilePicked(false);
            setIsError(true);
        }
        fileread.readAsText(file);
    }
    return (    
        <>
        {createNew || isFilePicked ? 
            <>
                <App initialNodes={initialNodes} initialEdges={initialEdges}/>
            </>
            :
            <>
                <div className="header">
                    <h1>React Flow App</h1>
                </div>
                <div className='card'>
                    <div className='left-side'>
                        <label>
                            <input  className="special-input" type="file" onChange={fileChangeHandler}/>
                        </label> 
                    </div>
                    <div className='right-side'>
                        <button type="submit" className='btn-class create-file' onClick={onClickButton}> Create New</button>
                    </div>
                    
                </div>
            </>
            
        }
        {
        isError ?
            <div className="error">File error is found </div>
            : 
            null
        }
        
        </>
    
  )
}

export default Selection