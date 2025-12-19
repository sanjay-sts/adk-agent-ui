# ADK Agent UI - Implementation Plan

## Project Overview

Build two web app interfaces to interact with the ADK agent service running at `http://127.0.0.1:8001/`:

| Service | Endpoint | Description |
|---------|----------|-------------|
| Agent Web UI | http://127.0.0.1:8001/ | ADK Dev UI - Interactive chat |
| Agent Health | http://127.0.0.1:8001/health | Health check endpoint |
| Agent Info | http://127.0.0.1:8001/info | Service information |
| Phoenix UI | http://127.0.0.1:6006 | LLM tracing (optional) |

---

## Option 1: Traditional Web App (React + Tailwind)

### Recommendation: React over Vanilla JS

| Factor | React + Tailwind | Vanilla JS + Tailwind |
|--------|------------------|----------------------|
| Component Reusability | ✅ Excellent | ❌ Manual |
| State Management | ✅ Built-in hooks | ❌ Custom implementation |
| Streaming Responses | ✅ Easy with hooks | ⚠️ More complex |
| Build Tooling | ✅ Vite (fast HMR) | ✅ Optional |
| Learning Curve | ⚠️ React knowledge | ✅ Lower |
| Maintenance | ✅ Easier to scale | ⚠️ Gets complex |

**Verdict:** React + Tailwind is recommended for better developer experience and maintainability.

### File Structure

```
traditional/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── main.tsx                    # Entry point
    ├── App.tsx                     # Main app component
    ├── index.css                   # Tailwind imports + global styles
    ├── vite-env.d.ts
    ├── types/
    │   └── index.ts                # TypeScript interfaces
    ├── services/
    │   └── agentApi.ts             # API client for agent endpoints
    ├── hooks/
    │   ├── useChat.ts              # Chat state management
    │   └── useHealth.ts            # Health check polling
    └── components/
        ├── ChatContainer.tsx       # Main chat wrapper
        ├── MessageList.tsx         # Scrollable message area
        ├── MessageBubble.tsx       # Individual message styling
        ├── ChatInput.tsx           # Input field + send button
        ├── HealthStatus.tsx        # Connection status indicator
        └── Header.tsx              # App header with info
```

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

### Core Implementation Details

#### API Service (`services/agentApi.ts`)
```typescript
const AGENT_BASE_URL = 'http://127.0.0.1:8001';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface HealthResponse {
  status: string;
}

export interface InfoResponse {
  name: string;
  version: string;
  // ... other fields from your service
}

// Send message to agent (handles streaming)
export async function sendMessage(message: string): Promise<Response> {
  return fetch(`${AGENT_BASE_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
}

// Check service health
export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${AGENT_BASE_URL}/health`);
  return response.json();
}

// Get service info
export async function getInfo(): Promise<InfoResponse> {
  const response = await fetch(`${AGENT_BASE_URL}/info`);
  return response.json();
}
```

#### Chat Hook (`hooks/useChat.ts`)
```typescript
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    // Add user message
    // Call API
    // Handle streaming response
    // Add assistant message
  };

  const clearChat = () => setMessages([]);

  return { messages, isLoading, error, sendMessage, clearChat };
}
```

### Commands

```bash
cd traditional
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
```

---

## Option 2: AG-UI (CopilotKit + Next.js)

### What is AG-UI?

AG-UI (Agent-User Interaction Protocol) is an open, lightweight, event-based protocol that standardizes how AI agents connect to user-facing applications.

**Key Features:**
- ~16 standardized event types for agent communication
- Built-in streaming with token-level events
- Generative UI support
- Human-in-the-loop interactions
- Frontend tool calls
- Shared state between frontend and backend

**Google ADK Integration:** AG-UI has native support for Google ADK through CopilotKit, making it ideal for your service.

### File Structure

```
ag-ui/
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── src/
    ├── app/
    │   ├── layout.tsx              # Root layout with providers
    │   ├── page.tsx                # Main chat page
    │   ├── globals.css             # Global styles
    │   └── api/
    │       └── copilotkit/
    │           └── route.ts        # API route to proxy to ADK
    ├── components/
    │   └── AgentChat.tsx           # Custom chat component wrapper
    └── lib/
        └── agentConfig.ts          # Agent configuration
```

### Key Dependencies

```json
{
  "dependencies": {
    "@copilotkit/react-core": "latest",
    "@copilotkit/react-ui": "latest",
    "@copilotkit/runtime": "latest",
    "next": "14.x",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5"
  }
}
```

### Core Implementation Details

#### API Route (`src/app/api/copilotkit/route.ts`)
```typescript
import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/runtime";
import { NextRequest } from "next/server";

// This route proxies CopilotKit requests to your ADK backend
export async function POST(req: NextRequest) {
  // Transform and forward to http://127.0.0.1:8001/
  // Handle AG-UI event protocol
}
```

#### Main Page (`src/app/page.tsx`)
```typescript
"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <div className="h-screen flex flex-col">
        <header className="p-4 border-b bg-gray-900">
          <h1 className="text-xl font-bold">ADK Agent</h1>
        </header>
        <main className="flex-1 overflow-hidden">
          <CopilotChat
            labels={{
              title: "ADK Agent Assistant",
              initial: "Hello! How can I help you today?",
              placeholder: "Type your message..."
            }}
          />
        </main>
      </div>
    </CopilotKit>
  );
}
```

### Commands

```bash
cd ag-ui
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
```

---

## Comparison: Traditional vs AG-UI

| Aspect | Traditional (React) | AG-UI (CopilotKit) |
|--------|--------------------|--------------------|
| Setup Complexity | Lower | Medium |
| Customization | Full control | Component-based |
| Streaming | Manual implementation | Built-in |
| Typing Indicators | Manual | Built-in |
| Tool Rendering | Manual | Built-in |
| Human-in-the-Loop | Manual | Built-in |
| Learning Curve | React basics | CopilotKit + AG-UI |
| Bundle Size | Smaller | Larger |
| Future Compatibility | Custom | Protocol standard |

---

## Implementation Phases

### Phase 1: Project Setup (Both)
- [ ] Initialize git branches for development
- [ ] Create directory structure

### Phase 2: Traditional App
- [ ] Set up Vite + React + TypeScript
- [ ] Configure Tailwind CSS
- [ ] Create type definitions
- [ ] Implement API service layer
- [ ] Build useChat hook
- [ ] Build useHealth hook
- [ ] Create ChatContainer component
- [ ] Create MessageList component
- [ ] Create MessageBubble component
- [ ] Create ChatInput component
- [ ] Create HealthStatus component
- [ ] Create Header component
- [ ] Style with Tailwind (dark theme)
- [ ] Test against Docker service
- [ ] Add error handling
- [ ] Add loading states

### Phase 3: AG-UI App
- [ ] Set up Next.js + TypeScript
- [ ] Install CopilotKit packages
- [ ] Configure Tailwind CSS
- [ ] Create API route for CopilotKit
- [ ] Set up CopilotKit provider
- [ ] Configure CopilotChat component
- [ ] Customize styling
- [ ] Test streaming functionality
- [ ] Test against Docker service

### Phase 4: Documentation
- [ ] Update CLAUDE.md
- [ ] Update main README.md
- [ ] Add setup instructions for both versions
- [ ] Document API integration patterns

---

## Notes

### CORS Configuration
If your Docker service doesn't allow cross-origin requests, you may need to:
1. Add CORS headers to the ADK service, OR
2. Use a proxy in development (Vite/Next.js config)

### Ports
- Traditional app: `http://localhost:5173` (Vite default)
- AG-UI app: `http://localhost:3000` (Next.js default)
- ADK service: `http://127.0.0.1:8001`

### Windows Docker Note
Use `127.0.0.1` instead of `localhost` for Docker access on Windows.

---

## Resources

- [AG-UI Documentation](https://docs.ag-ui.com/introduction)
- [AG-UI GitHub](https://github.com/ag-ui-protocol/ag-ui)
- [CopilotKit Documentation](https://docs.copilotkit.ai/)
- [Google ADK + AG-UI Blog](https://developers.googleblog.com/en/delight-users-by-combining-adk-agents-with-fancy-frontends-using-ag-ui/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)