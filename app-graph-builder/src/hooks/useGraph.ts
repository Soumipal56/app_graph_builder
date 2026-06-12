import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/store/useAppStore';
import type { GraphResponse } from '@/types';

async function fetchGraph(appId: string): Promise<GraphResponse> {
  // Read simulateError directly from store without subscription (works inside queryFn)
  if (useAppStore.getState().simulateError) {
    await new Promise((r) => setTimeout(r, 400));
    throw new Error('Simulated network error — toggle off to retry');
  }
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) throw new Error(`Failed to fetch graph (${res.status})`);
  return res.json();
}

export function useGraph(appId: string | null) {
  return useQuery<GraphResponse>({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId!),
    enabled: !!appId,
    retry: 0,
  });
}
