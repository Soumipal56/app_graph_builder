import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type NodeChange,
  type NodeMouseHandler,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraph } from '@/hooks/useGraph';
import { useAppStore } from '@/store/useAppStore';
import { ServiceNode } from './ServiceNode';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const nodeTypes: NodeTypes = {
  serviceNode: ServiceNode as unknown as NodeTypes['serviceNode'],
};

export function AppCanvas() {
  const { selectedAppId, selectedNodeId, setSelectedNodeId } = useAppStore();
  const { data, isLoading, isError, error, refetch } = useGraph(selectedAppId);
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Sync graph data into ReactFlow state on load / app change
  useEffect(() => {
    if (data) {
      setNodes(data.nodes as Node[]);
      setEdges(data.edges);
      setTimeout(() => fitView({ padding: 0.25, duration: 600 }), 50);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [data, setNodes, setEdges, fitView]);

  // Clear inspector when switching apps
  useEffect(() => {
    setSelectedNodeId(null);
  }, [selectedAppId, setSelectedNodeId]);

  // Custom fit-view event (TopBar button / Shift+F)
  useEffect(() => {
    const handler = () => fitView({ padding: 0.25, duration: 600 });
    window.addEventListener('fit-view', handler);
    return () => window.removeEventListener('fit-view', handler);
  }, [fitView]);

  // ✅ Use onNodeClick for reliable selection (not onNodesChange)
  const handleNodeClick: NodeMouseHandler = useCallback(
    (_, node) => setSelectedNodeId(node.id),
    [setSelectedNodeId]
  );

  // Deselect when clicking canvas background
  const handlePaneClick = useCallback(
    () => setSelectedNodeId(null),
    [setSelectedNodeId]
  );

  // Handle node deletions — sync to Zustand
  const handleNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      onNodesChange(changes);
      const removed = changes.find((c) => c.type === 'remove');
      if (removed && removed.id === selectedNodeId) {
        setSelectedNodeId(null);
      }
    },
    [onNodesChange, selectedNodeId, setSelectedNodeId]
  );

  // ── Empty state ──
  if (!selectedAppId) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
        <div className="text-center max-w-xs p-8 bg-background rounded-xl border shadow-sm">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Select an application from the right panel to view its service graph.
          </p>
        </div>
      </div>
    );
  }

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading graph…</p>
      </div>
    );
  }

  // ── Error ──
  if (isError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
        <div className="bg-background p-8 rounded-xl border shadow-md flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="font-semibold">Failed to load graph</p>
            <p className="text-sm text-muted-foreground mt-1">
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <ReactFlow
        key={selectedAppId}
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
        className="bg-muted/5"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1.5} color="hsl(var(--border))" />
        <Controls
          showInteractive={false}
          className="bg-background border rounded-lg shadow-md overflow-hidden [&>button]:border-0"
        />
      </ReactFlow>
    </div>
  );
}
