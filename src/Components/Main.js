import { useCallback, useEffect } from "react";
import TextUpdaterNode from './TextUpdater'
import  ReactFlow,{
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider, useNodesState, useEdgesState} 
from "react-flow-renderer";

import 'reactflow/dist/style.css';

import NavRight from "./NavRight";
import Title from "./Title";
import DownloadButton from "./DownloadButton";

const nodeTypes = { textUpdater: TextUpdaterNode };
function Flow({initialNodes,initialEdges}) {


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(()=>{
    const data={
      initialNodes:nodes,
      initialEdges:edges
    }
    if(nodes?.length > 0)
      localStorage.setItem('data', JSON.stringify(data));
    else localStorage.removeItem('data')
  },[nodes,edges])
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)),[setEdges]);

  const defaultEdgeOptions = { animated: false };

  
  return (
    <>
    <Title/>
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
      <DownloadButton />
      <NavRight nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>
      </>
  );
}
export default function ({initialNodes,initialEdges}) {
  return (
    <ReactFlowProvider >
      <Flow initialNodes={initialNodes} initialEdges={initialEdges}/>
    </ReactFlowProvider> 
  );
}