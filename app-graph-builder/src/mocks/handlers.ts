import { http, HttpResponse, delay } from 'msw';
import type { App, GraphResponse } from '../types';

const apps: App[] = [
  { id: 'app-1', name: 'E-Commerce Backend' },
  { id: 'app-2', name: 'Auth Service' },
  { id: 'app-3', name: 'Notification Worker' },
];

const graphs: Record<string, GraphResponse> = {
  'app-1': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 100, y: 100 }, data: { name: 'Postgres', status: 'Healthy', capacity: 20, cpu: 0.02, memory: 0.05, disk: 10.00, region: '1', costPerHour: 0.03, cloudProvider: 'aws' } },
      { id: 'n2', type: 'serviceNode', position: { x: 520, y: 80 }, data: { name: 'Redis', status: 'Healthy', capacity: 20, cpu: 0.02, memory: 0.05, disk: 10.00, region: '1', costPerHour: 0.03, cloudProvider: 'aws' } },
      { id: 'n3', type: 'serviceNode', position: { x: 300, y: 410 }, data: { name: 'Mongodb', status: 'Degraded', capacity: 20, cpu: 0.02, memory: 0.05, disk: 10.00, region: '1', costPerHour: 0.03, cloudProvider: 'aws' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n1', target: 'n3' },
    ],
  },
  'app-2': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 180, y: 120 }, data: { name: 'OAuth Server', status: 'Healthy', capacity: 100, cpu: 0.08, memory: 0.25, disk: 5.00, region: '2', costPerHour: 0.15, cloudProvider: 'aws' } },
      { id: 'n2', type: 'serviceNode', position: { x: 180, y: 340 }, data: { name: 'Redis Cache', status: 'Down', capacity: 0, cpu: 0.02, memory: 0.05, disk: 10.00, region: '1', costPerHour: 0.03, cloudProvider: 'aws' } },
      { id: 'n3', type: 'serviceNode', position: { x: 480, y: 120 }, data: { name: 'Token Service', status: 'Healthy', capacity: 70, cpu: 0.04, memory: 0.10, disk: 2.00, region: '2', costPerHour: 0.05, cloudProvider: 'aws' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n1', target: 'n3', animated: true },
    ],
  },
  'app-3': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 240, y: 80 }, data: { name: 'Queue Manager', status: 'Degraded', capacity: 45, cpu: 0.02, memory: 0.05, disk: 10.00, region: '1', costPerHour: 0.03, cloudProvider: 'aws' } },
      { id: 'n2', type: 'serviceNode', position: { x: 80, y: 280 }, data: { name: 'Email Worker', status: 'Healthy', capacity: 62, cpu: 0.02, memory: 0.05, disk: 10.00, region: '1', costPerHour: 0.03, cloudProvider: 'aws' } },
      { id: 'n3', type: 'serviceNode', position: { x: 400, y: 280 }, data: { name: 'SMS Worker', status: 'Healthy', capacity: 71, cpu: 0.02, memory: 0.05, disk: 10.00, region: '1', costPerHour: 0.03, cloudProvider: 'aws' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n1', target: 'n3' },
    ],
  },
};

export const handlers = [
  http.get('/api/apps', async () => {
    await delay(400);
    return HttpResponse.json(apps);
  }),

  http.get('/api/apps/:appId/graph', async ({ params }) => {
    await delay(600);
    const graph = graphs[params.appId as string];
    if (!graph) {
      return new HttpResponse(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return HttpResponse.json(graph);
  }),
];
