import { useCallback, useEffect } from "react";
import TextUpdaterNode from './Components/TextUpdater'
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider, useReactFlow, useNodesState, useEdgesState} 
from "react-flow-renderer";

const nodeTypes = { textUpdater: TextUpdaterNode };
function Flow({initialNodes,initialEdges}) {

  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    console.log("loaded")
    setEdges(initialEdges);
    setNodes(initialNodes)
  }, []);
  
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const defaultEdgeOptions = { animated: true };

  const onChange = (event) => {
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
  const onClick = useCallback(() => {
    const id = `${reactFlowInstance.toObject().nodes.length}`;
    const newNode = {
      id,
      type: 'textUpdater',
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() *  window.innerHeight,
      },
      data: {
        onChange:onChange,
        label: ""
      },
    };
    reactFlowInstance.addNodes(newNode);
    console.log("node added");
  }, []);
  const onSave =()=>{
    const element = document.createElement('a');
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
    console.log("save called");
  }
  const onNew = useCallback(()=>{
    setEdges([]);
    setNodes([])
    console.log("New page")
  },[])
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
      <button onClick={onNew} className="btn-class new">Create New</button>
    </>
  );
}
export default function (props) {
  return (
    <ReactFlowProvider >
      <Flow initialNodes={props.initialNodes} initialEdges={props.initialEdges}/>
    </ReactFlowProvider> 
  );
}
