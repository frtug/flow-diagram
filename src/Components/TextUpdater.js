import { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export default memo(({ data,id }) => {
  return (
    <div className="text-updater-node">
      { data.type !== "input" && 
        <Handle type="target" position={Position.Top} />
      }
        <input  readOnly={true} onBlur={(e)=>e.target.readOnly=true} 
          onDoubleClick={(e)=> e.target.readOnly=false} 
          className="special-input input-node" 
          id={id} defaultValue={data.label} 
          name="text" onChange={data.onChange} placeholder={`${data.type} Node`} 
        />
      { data.type !== "output" && 
        <Handle type="source" position={Position.Bottom} id="b" />
      }
    </div>
  );
});
