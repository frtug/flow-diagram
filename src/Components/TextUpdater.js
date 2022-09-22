import { Handle, Position } from 'react-flow-renderer';

function TextUpdaterNode({ data,id }) {
  return (
    <div className="text-updater-node">
      {
        id == 0  ? 
        null
        :
        <Handle type="target" position={Position.Top} />
      }
      <div>
        <input className="special-input input-node" id={id} defaultValue={data.label} name="text" onChange={data.onChange} placeholder={ id == 0 ? 'Input Node':'New Node'} />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}
export default TextUpdaterNode;
