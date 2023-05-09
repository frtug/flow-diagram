
import React, { useEffect, useState } from 'react'
import App from '../App';
import DefaultHome from './DefaultHome';

const Dashboard=()=>{
    const [isFilePicked,setIsFilePicked] = useState(false);
    const [initialNodes,setInitialNodes] = useState([]);
    const [initialEdges,setInitialEdges] = useState([]);
    const [createNew,setCreateNew] = useState(false);

    useEffect(()=>{
        const data =  JSON.parse(localStorage.getItem('data'))
        if(data && data.initialNodes && data.initialEdges){
            setInitialNodes(data.initialNodes);
            setInitialEdges(data.initialEdges)
            setIsFilePicked(true);
            console.log("file  picked from local store");
        }
    },[])
    return(
        <>
        { 
        (createNew || isFilePicked) ? 
            <App 
                initialNodes={initialNodes} 
                initialEdges={initialEdges}
            />  
            :
            <DefaultHome  
                setCreateNew={setCreateNew}
                setIsFilePicked={setIsFilePicked} 
                setInitialEdges={setInitialEdges}
                setInitialNodes={setInitialNodes}
            />
        }
    </>
    )
}

export default Dashboard