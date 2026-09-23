import { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { RoadmapNodeCard } from '@/app/ui/roadmap/rodampNodeCard'
import { ConnectorNode } from '@/app/ui/roadmap/roadmapNodeConnector'

export function RoadmapCustomNode({ data }: NodeProps) {
    return (
    <>
        {data.hideTopNode === false? <Handle type="target" position={Position.Top} isConnectable={false} style={{ opacity: 0 }}/> : '' }
        
        <div className={`pop [--pop-delay:${data.popDelay as number ?? 0}ms]`} >
            <RoadmapNodeCard
                title={(data.label as string).replace(/^[0-9]+/, '')}
                progress={data.progress as number ?? 1}
                isComplete={data.isComplete as boolean ?? false}
                onClick={data.onClick as () => void ?? (() => {})}
            />
        </div>

        {data.hideBottomNode === false? <Handle type="source" position={Position.Bottom} isConnectable={false} style={{ opacity: 0 }}/> : ''}
    </>
    );
}

export function RoadmapConnectorNode({data} : NodeProps){
  return (
    <>
      {data.hideTopNode === false? <Handle type="target" position={Position.Top} isConnectable={false} style={{ opacity: 0 }}/> : ''}
      
      <div className={`connector-pop [--pop-delay:${data.popDelay as number ?? 0}ms]`}>
        <ConnectorNode />
      </div>

      {data.hideBottomNode === false? <Handle type="source" position={Position.Bottom} isConnectable={false} style={{ opacity: 0 }}/> : ''}
    </>
  );
}