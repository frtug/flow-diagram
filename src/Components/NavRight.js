import { useCallback, useEffect, useState } from "react";
import Icon from '../Svgs/icon.svg'
import add from '../Svgs/add.svg'
 import down from '../Svgs/downsvg.svg'
import cross from '../Svgs/crosssvg.svg'
import { useReactFlow } from "react-flow-renderer";
import InputReuseable from "./InputReuseable";
import { useAuth } from "../contexts/AuthContext";
import PopulateData from "./PopulateData";

function NavRight({nodes,edges,setNodes,setEdges}) {
    const reactFlowInstance = useReactFlow();
    const [isOpen, setIsOpen] = useState(true);
    const [isError,setIsError] = useState(false);
    const [isFilePicked,setIsFilePicked] = useState(false);
    const {saveToDatabase} = useAuth();


    const onChange = (event) => {
        if(event.target.readOnly === true)
          event.target.style.cursor = "pointer";
        else 
          event.target.style.cursor = "auto";
        setNodes((nds) =>
          nds.map((node) => {
            const {id,value} = event.target;
            if(node.id !== id){
              return node;
            }
            return {
              ...node,
              data: {
                ...node.data,
                label:value,
              },
            };
          })
        );
      };
      const onNewInput = useCallback((event) => {
        // window.location.reload();
        const id = `nodeid-${reactFlowInstance.toObject().nodes.length}`;
        const newNode = {
          id,
          type: 'textUpdater',
          position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() *  window.innerHeight -100,
          },
          data: {
            onChange:onChange,
            label: "",
            type:`${event.target.id}`
          },
        };
        reactFlowInstance.addNodes(newNode);
        console.log(id)   
        console.log("node added");
      }, []);
      const onSave = async(nodes,edges)=>{
        // const element = document.createElement('a');
        // const {nodes,edges} = reactFlowInstance.toObject();
        // this will run when user hit the save button
        // nodes and edges are coming from react Flow library 
        const data={
          initialNodes:nodes,
          initialEdges:edges
        }
        try{
          await saveToDatabase(data);
        }
        catch(err){
          console.log("error in saving into the firestore",err);
        }

        // const file = new Blob([JSON.stringify(data)],{type: "application/json"});
        // element.href = URL.createObjectURL(file);
        // element.download = "data.json"
        // document.body.appendChild(element);
        // element.click();
        // console.log("save called");
      }
      const onNewWindow = useCallback(()=>{
        localStorage.removeItem('data');
        setEdges([]);
        setNodes([]);
        console.log("New page");
      },[])
  return (
    <>
      {isOpen ? 
      <div className="button-section">
        <button style={{marginBottom:"15px"}}onClick={()=>setIsOpen(false)}>
          <img src={cross} className="cross" alt="cross" width="15px" height="15px"/>
        </button>
        { 
        // TODO: make this more ui friendly and get rid of redundent code.
        }
        <button onClick={onNewInput} id="input" className="btn-class">Input Node</button>
        <button onClick={onNewInput} id="middle" className="btn-class">Middle Node</button>        
        <button onClick={onNewInput} id="output" className="btn-class">Output Node</button>
            <button onClick={()=> onSave(nodes,edges)} id="save" className="btn-class">
        Save <img src={Icon}  alt="icon save" width="13px" height="13px"/>
        </button>
        <button onClick={onNewWindow} id="create" className="btn-class">
        Create <img src={add}  alt="add icon" width="13px" height="13px"/>
        </button>
        <InputReuseable setIsError={setIsError}
            setIsFilePicked={setIsFilePicked} 
            setInitialEdges={setEdges}
            setInitialNodes={setNodes}
        />
        <PopulateData setInitialEdges={setEdges}
            setInitialNodes={setNodes}/>        
      </div>
      :
      <div className="section-close">
        <button  onClick={()=>setIsOpen(true)}>
            <img src={down} className="arrow" alt="arrow" width="20px" height="20px"/>
        </button>
      </div>
      }
    </>
  )
}

export default NavRight