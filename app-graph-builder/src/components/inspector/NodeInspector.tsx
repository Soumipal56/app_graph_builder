import { useReactFlow, useNodesData } from '@xyflow/react';
import { useAppStore } from '@/store/useAppStore';
import { StatusPill } from './StatusPill';
import { SyncedSlider } from './SyncedSlider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ServiceNodeData } from '@/types';

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore();
  const { setNodes } = useReactFlow();

  const raw = useNodesData(selectedNodeId ?? '');
  const data = raw?.data as ServiceNodeData | undefined;

  if (!selectedNodeId || !data) return null;

  const update = (patch: Partial<ServiceNodeData>) => {
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === selectedNodeId ? { ...n, data: { ...n.data, ...patch } } : n
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <p className="font-semibold text-sm leading-none truncate">{data.name}</p>
          <p className="text-xs text-muted-foreground mt-1 font-mono truncate">{selectedNodeId}</p>
        </div>
        <StatusPill status={data.status} />
      </div>

      {/* Tabs */}
      <Tabs
        value={activeInspectorTab}
        onValueChange={setActiveInspectorTab}
        className="flex-1 flex flex-col min-h-0"
      >
        <div className="px-4 pt-3 shrink-0">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="runtime">Runtime</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* ── Config Tab ── */}
          <TabsContent value="config" className="m-0 p-4 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="node-name">Service Name</Label>
              <Input
                id="node-name"
                value={data.name}
                onChange={(e) => update({ name: e.target.value })}
                className="bg-muted/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="node-desc">Description</Label>
              <Textarea
                id="node-desc"
                value={data.description ?? ''}
                onChange={(e) => update({ description: e.target.value })}
                placeholder="Optional service description..."
                className="bg-muted/40 resize-none h-20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Capacity</Label>
                <span className="text-xs text-muted-foreground font-mono">{data.capacity}%</span>
              </div>
              <SyncedSlider
                value={data.capacity}
                onChange={(v) => update({ capacity: v })}
              />
            </div>
          </TabsContent>

          {/* ── Runtime Tab — shows live API data ── */}
          <TabsContent value="runtime" className="m-0 p-4 space-y-4">
            <div className="rounded-lg border bg-muted/30 divide-y text-sm">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-muted-foreground">Status</span>
                <StatusPill status={data.status} />
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-muted-foreground">Capacity</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        data.capacity > 60 ? 'bg-emerald-500' :
                        data.capacity > 25 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${data.capacity}%` }}
                    />
                  </div>
                  <span className="font-mono font-medium text-xs w-8 text-right">{data.capacity}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-muted-foreground">Node ID</span>
                <span className="font-mono text-xs">{selectedNodeId}</span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">
                Raw payload · <code className="text-primary normal-case">GET /api/apps/:id/graph</code>
              </p>
              <pre className="text-xs font-mono bg-muted/40 rounded-md p-3 border overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
