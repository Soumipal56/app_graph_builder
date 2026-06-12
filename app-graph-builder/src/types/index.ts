// Core domain types

export interface App {
  id: string;
  name: string;
}

export type NodeStatus = 'Healthy' | 'Degraded' | 'Down';

export interface ServiceNodeData extends Record<string, unknown> {
  name: string;
  status: NodeStatus;
  capacity: number;
  description?: string;
}

export interface GraphResponse {
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: ServiceNodeData;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    animated?: boolean;
  }>;
}
