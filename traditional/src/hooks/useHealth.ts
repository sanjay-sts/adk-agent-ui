import { useState, useEffect, useCallback } from 'react';
import { checkHealth } from '../services/agentApi';

export type HealthStatus = 'connected' | 'disconnected' | 'checking';

export function useHealth(pollInterval = 5000) {
  const [status, setStatus] = useState<HealthStatus>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const check = useCallback(async () => {
    try {
      const response = await checkHealth();
      setStatus(response.status === 'error' ? 'disconnected' : 'connected');
      setLastChecked(new Date());
    } catch {
      setStatus('disconnected');
      setLastChecked(new Date());
    }
  }, []);

  useEffect(() => {
    // Initial check
    check();

    // Poll at interval
    const interval = setInterval(check, pollInterval);

    return () => clearInterval(interval);
  }, [check, pollInterval]);

  return { status, lastChecked, check };
}
