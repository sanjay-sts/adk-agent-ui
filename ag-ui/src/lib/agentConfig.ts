/**
 * Configuration for the ADK agent backend
 */

export const AGENT_CONFIG = {
  baseUrl: 'http://127.0.0.1:8001',
  endpoints: {
    agent: '/',
    health: '/health',
    info: '/info',
  },
} as const;

export function getAgentUrl(endpoint: keyof typeof AGENT_CONFIG.endpoints = 'agent'): string {
  return `${AGENT_CONFIG.baseUrl}${AGENT_CONFIG.endpoints[endpoint]}`;
}
