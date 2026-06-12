import type { NodeStatus } from '@/types';

interface StatusPillProps {
  status: NodeStatus;
}

const styles: Record<NodeStatus, string> = {
  Healthy: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
  Degraded: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
  Down: 'bg-red-500/15 text-red-700 border-red-500/30',
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
        status === 'Healthy' ? 'bg-emerald-500' :
        status === 'Degraded' ? 'bg-amber-500' : 'bg-red-500'
      }`} />
      {status}
    </span>
  );
}
