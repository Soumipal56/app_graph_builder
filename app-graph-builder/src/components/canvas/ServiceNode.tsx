import { memo } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { Server } from 'lucide-react';
import { StatusPill } from '@/components/inspector/StatusPill';
import type { ServiceNodeData } from '@/types';

export type ServiceNodeType = Node<ServiceNodeData, 'serviceNode'>;

export const ServiceNode = memo(function ServiceNode({
  data,
  selected,
}: NodeProps<ServiceNodeType>) {
  return (
    <div
      className={`min-w-[170px] rounded-xl border bg-card shadow-sm transition-all duration-150 ${
        selected
          ? 'ring-2 ring-primary border-primary shadow-lg scale-[1.03]'
          : 'hover:border-primary/40 hover:shadow-md'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !border-2 !bg-background"
      />

      {/* Node body */}
      <div className="p-3 flex items-center gap-2.5">
        <div className="p-1.5 rounded-md bg-primary/10 text-primary shrink-0">
          <Server className="h-4 w-4" />
        </div>
        <span className="font-medium text-sm truncate max-w-[110px]">{data.name}</span>
      </div>

      <div className="px-3 pb-3">
        <StatusPill status={data.status} />
      </div>

      {/* Capacity bar at bottom */}
      <div className="h-1 bg-muted rounded-b-xl overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            data.capacity > 60 ? 'bg-emerald-500/70' :
            data.capacity > 25 ? 'bg-amber-500/70' : 'bg-red-500/70'
          }`}
          style={{ width: `${data.capacity}%` }}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !border-2 !bg-background"
      />
    </div>
  );
});
