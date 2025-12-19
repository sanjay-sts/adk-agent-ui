import { useHealth, type HealthStatus } from '../hooks/useHealth';

const statusConfig: Record<HealthStatus, { color: string; label: string }> = {
  connected: { color: 'bg-green-500', label: 'Connected' },
  disconnected: { color: 'bg-red-500', label: 'Disconnected' },
  checking: { color: 'bg-yellow-500', label: 'Checking...' },
};

export function HealthStatus() {
  const { status } = useHealth();
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color}`} />
      <span className="text-sm text-gray-400">{config.label}</span>
    </div>
  );
}
