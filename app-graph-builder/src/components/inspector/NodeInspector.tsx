import { useReactFlow, useNodesData } from '@xyflow/react';
import { useAppStore } from '@/store/useAppStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusPill } from './StatusPill';
import { SyncedSlider } from './SyncedSlider';
import type { ServiceNodeData } from '@/types';

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore();
  const { setNodes } = useReactFlow();

  const nodeData = useNodesData<ServiceNodeData>(selectedNodeId || '');

  if (!selectedNodeId || !nodeData) return null;

  const data = nodeData.data;

  const handleUpdate = (updates: Partial<ServiceNodeData>) => {
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === selectedNodeId) {
          return { ...n, data: { ...n.data, ...updates } };
        }
        return n;
      })
    );
  };

  return (
    <div className="p-4 flex flex-col gap-6 text-gray-700 dark:text-gray-300 transition-colors duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{data.name}</h3>
          <StatusPill status={data.status} />
        </div>
        <p className="text-xs text-gray-500 font-mono">{selectedNodeId}</p>
      </div>

      <Tabs value={activeInspectorTab} onValueChange={setActiveInspectorTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-1 rounded-lg">
          <TabsTrigger value="config" className="data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-xs transition-all">Config</TabsTrigger>
          <TabsTrigger value="runtime" className="data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-xs transition-all">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="mt-4 flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Service Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleUpdate({ name: e.target.value })}
              className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-md p-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Description</label>
            <textarea
              rows={3}
              value={data.description || ''}
              onChange={(e) => handleUpdate({ description: e.target.value })}
              placeholder="Optional service description..."
              className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-md p-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white/30 resize-none"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Capacity Allocation</label>
              <span className="text-xs font-mono text-gray-500">{data.capacity}%</span>
            </div>
            <SyncedSlider
              value={data.capacity}
              onChange={(val) => handleUpdate({ capacity: val })}
            />
          </div>

          <div className="pt-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Environment</label>
                <select className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-md p-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white/30">
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Region</label>
                <select className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-md p-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white/30">
                  <option>us-east-1</option>
                  <option>eu-west-1</option>
                  <option>ap-south-1</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5">
              <div className="space-y-0.5">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Auto-Scaling</label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Automatically adjust capacity</p>
              </div>
              <button className="w-9 h-5 bg-blue-600 rounded-full relative transition-colors shadow-inner">
                <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="mt-4">
          <div className="rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 flex flex-col items-center justify-center text-center gap-2 h-40">
            <p className="text-sm text-gray-500 dark:text-gray-400">Runtime metrics not available in mock mode.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
