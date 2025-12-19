# ADK Agent UI

Two modern web interfaces for interacting with your ADK (Agent Development Kit) agent service.

## Overview

This repository provides two different approaches to building AI agent chat interfaces:

1. **Traditional** - React + Vite + Tailwind CSS
   - Full manual control over UI and behavior
   - Direct API integration with Google ADK
   - Lightweight and fast
   - Client-side rendering

2. **Next.js** - Next.js + App Router + Tailwind CSS
   - Server-side API routes for better security
   - Built-in API proxy to ADK backend
   - Server-side rendering (SSR)
   - Production-ready with Next.js optimizations

## Prerequisites

- Node.js 18+ and npm
- ADK agent service running at `http://127.0.0.1:8001/`
  - See: [adk-mcp-agent-service](https://github.com/sanjay-sts/adk-mcp-agent-service)

## Quick Start

### Option 1: Traditional App (React + Vite)

```bash
cd traditional
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Option 2: Next.js App

```bash
cd ag-ui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Comparison

| Feature | Traditional (React + Vite) | Next.js |
|---------|------------|-------|
| Rendering | Client-side (CSR) | Server-side (SSR) |
| API Security | Direct client calls | Server-side proxy |
| Setup Complexity | Lower | Medium |
| Build Tool | Vite (faster dev) | Next.js |
| Deployment | Static hosting | Node.js server |
| Bundle Size | Smaller (~200KB) | Larger (~400KB) |
| Production Ready | Yes | Yes (with more features) |

## Architecture

### Traditional App

**Tech Stack:**
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Custom hooks for state management

**Key Files:**
- `src/services/agentApi.ts` - API client
- `src/hooks/useChat.ts` - Chat state management
- `src/hooks/useHealth.ts` - Health status polling
- `src/components/` - UI components

### Next.js App

**Tech Stack:**
- Next.js 14 (App Router)
- Server-side API routes
- Tailwind CSS for styling
- TypeScript

**Key Files:**
- `src/app/api/chat/route.ts` - API proxy to ADK backend
- `src/app/page.tsx` - Main chat page
- `src/components/AgentChat.tsx` - Chat component

## Backend Service Endpoints

Your ADK agent service should expose:

| Service | Endpoint | Description |
|---------|----------|-------------|
| Agent Chat | `http://127.0.0.1:8001/` | Main agent endpoint |
| Health Check | `http://127.0.0.1:8001/health` | Service health status |
| Service Info | `http://127.0.0.1:8001/info` | Service metadata |
| Phoenix UI | `http://127.0.0.1:6006` | LLM tracing (optional) |

## Development

### Traditional App Commands

```bash
cd traditional

npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
```

### Next.js App Commands

```bash
cd ag-ui

npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run linter
```

## Project Structure

```
adk-agent-ui/
├── traditional/           # React + Vite app
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API client
│   │   └── types/        # TypeScript types
│   └── package.json
│
├── ag-ui/                # Next.js app
│   └── src/
│       ├── app/          # Next.js app router
│       │   └── api/      # API routes (chat proxy)
│       ├── components/   # UI components
│       └── lib/          # Utilities and config
│
├── CLAUDE.md             # Claude Code guidance
├── IMPLEMENTATION_PLAN.md # Detailed implementation plan
├── TODO.md               # Implementation checklist
└── README.md             # This file
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your ADK backend allows cross-origin requests:

```python
# Add to your FastAPI app
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Windows Docker Connectivity

On Windows, use `127.0.0.1` instead of `localhost` when connecting to Docker containers.

### Port Conflicts

- Traditional app uses port **5173** (configurable in `vite.config.ts`)
- AG-UI app uses port **3000** (configurable in `package.json`)

## Resources

### ADK Backend
- [Google ADK Documentation](https://google.github.io/adk-docs/)
- [ADK MCP Agent Service](https://github.com/sanjay-sts/adk-mcp-agent-service)

### Frontend Technologies
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### AG-UI Protocol (Future Enhancement)
- [AG-UI Documentation](https://docs.ag-ui.com/introduction)
- [Google ADK + AG-UI Integration](https://google.github.io/adk-docs/tools/third-party/ag-ui/)

## License

MIT