import { useCallback, useEffect } from "react";
import TextUpdaterNode from './Components/TextUpdater'
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider, useNodesState, useEdgesState} 
from "react-flow-renderer";

import NavRight from "./Components/NavRight";

const nodeTypes = { textUpdater: TextUpdaterNode };
function Flow({initialNodes,initialEdges}) {


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // useEffect(() => {
  //   console.log("loaded")
  //     setEdges(initialEdges);
  //     setNodes(initialNodes)
    
  // }, []);
  useEffect(()=>{
    const data={
      initialNodes:nodes,
      initialEdges:edges
    }
    if(nodes.length > 0)
      localStorage.setItem('data', JSON.stringify(data));
    else localStorage.removeItem('data')
  },[nodes,edges])
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)),[]);

  const defaultEdgeOptions = { animated: true };

  
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
