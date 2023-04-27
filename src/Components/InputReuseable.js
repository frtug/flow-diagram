import React from 'react'
import file from '../Svgs/file.svg'
export default function InputReuseable({setIsError,setIsFilePicked,setInitialEdges,setInitialNodes}){
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
    return(
        <div className="file-box">
            <label>
                Import file
                <img width="40px" height="40px" src={file} alt="file"/>
                <input className="file-input" type="file" onChange={fileChangeHandler}/>
            </label>
        </div>
    )
}
