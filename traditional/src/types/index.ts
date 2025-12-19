export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface HealthResponse {
  status: string;
  [key: string]: unknown;
}

export interface InfoResponse {
  name?: string;
  version?: string;
  [key: string]: unknown;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}
