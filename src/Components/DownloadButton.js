import React from 'react'
import Down from '../Svgs/download.svg'
import { useReactFlow } from "react-flow-renderer";

export default function DownloadButton() {
    const reactFlowInstance = useReactFlow();

    const handleDownload = ()=>{
        const data={
            initialNodes:reactFlowInstance.toObject().nodes,
            initialEdges:reactFlowInstance.toObject().edges
        }
        const element = document.createElement('a');
        console.log("download");
        const file = new Blob([JSON.stringify(data)],{type: "application/json"});
        element.href = URL.createObjectURL(file);
        element.download = "locally_save.json"
        document.body.appendChild(element);
        element.click();
        console.log("save called");
    }
  return (
    <div className="sec">
        <button className="btn-class" id="btn-download" onClick={handleDownload}> 
        <img src={Down} alt="download button" width="25px" height="25px"/>
        </button>
    </div>
  )
}
