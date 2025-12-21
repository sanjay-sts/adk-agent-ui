import type { HealthResponse, InfoResponse } from '../types';

// Use Vite proxy to avoid CORS issues - requests to /api/* are proxied to the ALB
const AGENT_BASE_URL = '/api';
const APP_NAME = 'datetime_agent';
const USER_ID = 'user';

// Generate a session ID for this browser session
const SESSION_ID = `web-session-${Date.now()}`;

export interface AgentEvent {
  author?: string;
  content?: {
    parts?: Array<{
      text?: string;
      functionCall?: unknown;
      functionResponse?: unknown;
    }>;
  };
  timestamp?: number;
  [key: string]: unknown;
}

export interface SendMessageResponse {
  message: string;
  [key: string]: unknown;
}

/**
 * Create a session (call once at startup)
 */
export async function createSession(): Promise<void> {
  try {
    await fetch(`${AGENT_BASE_URL}/apps/${APP_NAME}/users/${USER_ID}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId: SESSION_ID }),
    });
  } catch (error) {
    // Session might already exist, that's okay
    console.warn('Session creation warning:', error);
  }
}

/**
 * Send a message to the ADK agent with streaming support
 * @param message The user's message
 * @param onChunk Callback for each streamed chunk
 * @returns Promise that resolves when streaming is complete
 */
export async function sendMessageStreaming(
  message: string,
  onChunk: (text: string) => void
): Promise<void> {
  const response = await fetch(`${AGENT_BASE_URL}/run_sse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify({
      appName: APP_NAME,
      userId: USER_ID,
      sessionId: SESSION_ID,
      newMessage: {
        parts: [
          {
            text: message,
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      // Keep the last incomplete line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.substring(6));

            // Extract text from the event
            if (data.content?.parts) {
              for (const part of data.content.parts) {
                if (part.text) {
                  onChunk(part.text);
                }
              }
            }
          } catch (e) {
            // Skip invalid JSON
            console.warn('Failed to parse SSE data:', e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Check the health of the ADK agent service
 * @returns Health status
 */
export async function checkHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${AGENT_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    // Return error status if health check fails
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get information about the ADK agent service
 * @returns Service information
 */
export async function getInfo(): Promise<InfoResponse> {
  const response = await fetch(`${AGENT_BASE_URL}/info`);

  if (!response.ok) {
    throw new Error(`Failed to get info: ${response.statusText}`);
  }

  return await response.json();
}
