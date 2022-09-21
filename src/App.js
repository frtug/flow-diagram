import { useCallback, useEffect, useMemo, useState } from "react";
import TextUpdaterNode from './Components/TextUpdater'
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges, 
  ReactFlowProvider, useReactFlow, useNodesState, useEdgesState} 
from "react-flow-renderer";

// const initialNodes = [];

// const initialEdges = [];
let nodeId = 0
// let initialNodes = [];
// let initialEdges = [];
const nodeTypes = { textUpdater: TextUpdaterNode };
function Flow({initialNodes,initialEdges}) {
  console.log("initialEdges")
  console.log(initialNodes)
  console.log(initialEdges)
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    console.log("called useEffect");
    setEdges(initialEdges);
    setNodes(initialNodes)
  }, []);
  
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const defaultEdgeOptions = { animated: true };

  // console.log(reactFlowInstance.getNodes());
  // console.log(reactFlowInstance.toObject());

  const onClick = useCallback(() => {
    const viewport = reactFlowInstance.toObject().viewport;
    console.log(reactFlowInstance.toObject());
    const id = `${reactFlowInstance.toObject().nodes.length}`;
    console.log('id',id);
    const newNode = {
      id,
      type: 'textUpdater',
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() *  window.innerHeight,
      },
      data: {
        // label: <input className="special-input input-node" type="text" placeholder={nodeId === 1 ? 'Input Node':'New Node'} />,
        label: ""
      },
    };
    reactFlowInstance.addNodes(newNode);
    console.log("node added");
  }, []);
  const onSave =()=>{
    const element = document.createElement('a');
    console.log("save");
    const {nodes,edges} = reactFlowInstance.toObject();
    const data={
      initialNodes:nodes,
      initialEdges:edges
    }
    const file = new Blob([JSON.stringify(data)],{type: "application/json"});
    element.href = URL.createObjectURL(file);
    element.download = "data.json"
    document.body.appendChild(element);
    element.click();
  }
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}

        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background/>
        <MiniMap/>
        <Controls/>
      </ReactFlow>
      <button onClick={onClick} className="btn-class create-node">Add Node</button>
      <button onClick={onSave} className="btn-class save">Save</button>
    </>
  );
}
export default function (props) {
  return (
    <ReactFlowProvider >
      {console.log(props)}
      <Flow initialNodes={props.initialNodes} initialEdges={props.initialEdges} />
    </ReactFlowProvider>
  );
}
