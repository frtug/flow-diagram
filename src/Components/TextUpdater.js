import { useCallback, useEffect } from 'react';
import { Handle, Position,ReactFlowProvider,useReactFlow,useStore } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function TextUpdaterNode({ id }) {
    const node_state = useStore((state) => state);
    console.log(node_state);
    // const updateText = useStore(updateText)

    const reactFlowInstance = useReactFlow();
    // const onClick = useCallback((evt)=>{
    //     evt.target.value = reactFlowInstance.getNode(id).data.label;
    // })
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
    // updateText(id,evt);
    // console.log(id);
    // console.log(reactFlowInstance.toObject());
    // let node = reactFlowInstance.getNode(id);
    // node.data = {'label':evt.target.value};
    // evt.target.value = node.data.label;
    // console.log(node);

  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <input className="special-input input-node" id="text" name="text" onChange={onChange} placeholder={id == 0 ? 'Input Node':'New Node'} />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}
export default TextUpdaterNode;
