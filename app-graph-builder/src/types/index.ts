// Core domain types

export interface App {
  id: string;
  name: string;
}

export type NodeStatus = 'Healthy' | 'Degraded' | 'Down';

export interface ServiceNodeData {
  name: string;
  status: NodeStatus;
  capacity: number;
  cpu?: number;
  memory?: number;
  disk?: number;
  region?: string;
  costPerHour?: number;
  cloudProvider?: 'aws' | 'gcp' | 'azure';
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
