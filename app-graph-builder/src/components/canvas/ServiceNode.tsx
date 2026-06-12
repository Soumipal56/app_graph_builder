import { memo, useCallback } from 'react';
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react';
import { Settings, Cpu, HardDrive, Database, Globe, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import type { ServiceNodeData } from '@/types';

export type ServiceNodeType = Node<ServiceNodeData, 'serviceNode'>;

export const ServiceNode = memo(function ServiceNode({
  id,
  data,
  selected,
}: NodeProps<ServiceNodeType>) {
  const { setNodes } = useReactFlow();

  // Slider change updates local ReactFlow node state
  const handleCapacityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10) || 0;
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === id) {
          return { ...n, data: { ...n.data, capacity: val } };
        }
        return n;
      })
    );
  }, [id, setNodes]);

  const StatusIcon = data.status === 'Healthy' ? CheckCircle2 : data.status === 'Degraded' ? AlertTriangle : XCircle;
  const statusColor = data.status === 'Healthy' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' : data.status === 'Degraded' ? 'text-amber-500 border-amber-500/20 bg-amber-500/10' : 'text-red-500 border-red-500/20 bg-red-500/10';

  return (
    <div
      className={`min-w-[340px] rounded-xl border bg-[#0a0a0a] shadow-xl transition-all duration-150 ${
        selected
          ? 'ring-1 ring-primary border-primary scale-[1.02]'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !border-0 !bg-white/20" />

      <div className="p-4 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-md text-white">
              <Database className="h-4 w-4" />
            </div>
            <span className="font-semibold text-white tracking-wide">{data.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-md text-xs font-medium">
              ${data.costPerHour}/HR
            </span>
            <div className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
              <Settings className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-2 text-[10px] text-gray-400 font-medium">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-white">{data.cpu}</span>
            <div className="flex items-center gap-1 border border-white/10 bg-white/5 px-2 py-0.5 rounded w-full justify-center">
              <Cpu className="h-3 w-3" /> CPU
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-white">{data.memory} GB</span>
            <div className="flex items-center gap-1 border border-white/10 bg-white/5 px-2 py-0.5 rounded w-full justify-center">
              <Database className="h-3 w-3" /> Memory
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-white">{data.disk} GB</span>
            <div className="flex items-center gap-1 border border-white/10 bg-white/5 px-2 py-0.5 rounded w-full justify-center">
              <HardDrive className="h-3 w-3" /> Disk
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-white">{data.region}</span>
            <div className="flex items-center gap-1 border border-white/10 bg-white/5 px-2 py-0.5 rounded w-full justify-center">
              <Globe className="h-3 w-3" /> Region
            </div>
          </div>
        </div>

        {/* Capacity Slider & Input directly on the node */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative h-2 rounded-full overflow-hidden bg-white/10">
            {/* Multi-color gradient track matching screenshot */}
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-emerald-500 to-red-500 rounded-full"
              style={{ width: `${data.capacity}%` }}
            />
            {/* Native slider overlaid */}
            <input
              type="range"
              min="0"
              max="100"
              value={data.capacity}
              onChange={handleCapacityChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* Thumb indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-sm pointer-events-none"
              style={{ left: `calc(${data.capacity}% - 7px)` }}
            />
          </div>
          
          <input
            type="number"
            value={data.capacity / 100}
            readOnly
            className="w-14 bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-white text-center focus:outline-none"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-1">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${statusColor}`}>
            <StatusIcon className="h-3 w-3" />
            <span className="text-xs font-medium">{data.status === 'Healthy' ? 'Success' : data.status === 'Degraded' ? 'Warning' : 'Error'}</span>
          </div>
          <div className="font-bold text-amber-500 tracking-tighter text-lg opacity-80">
            aws
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !border-0 !bg-white/20" />
    </div>
  );
});
