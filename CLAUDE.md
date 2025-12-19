# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **adk-agent-ui** repository - providing two web application interfaces for interacting with an ADK (Agent Development Kit) agent service.

The repository contains two separate implementations:
1. **Traditional** - React + Vite + Tailwind CSS (full manual control)
2. **AG-UI** - Next.js + CopilotKit + AG-UI protocol (standardized agent protocol)

Both apps connect to an ADK agent backend running at `http://127.0.0.1:8001/`

## Backend Service Endpoints

The ADK agent service provides these endpoints:
- **Agent Chat**: `http://127.0.0.1:8001/` - Main agent endpoint
- **Health Check**: `http://127.0.0.1:8001/health` - Service health status
- **Service Info**: `http://127.0.0.1:8001/info` - Service metadata
- **Phoenix UI**: `http://127.0.0.1:6006` - LLM tracing (optional)

## Development Commands

### Traditional App (React + Vite)
```bash
cd traditional
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
```

### AG-UI App (Next.js + CopilotKit)
```bash
cd ag-ui
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
```

## Architecture

### Traditional App Structure
```
traditional/
├── src/
│   ├── components/     # React components (Header, ChatContainer, MessageBubble, etc.)
│   ├── hooks/          # Custom hooks (useChat, useHealth)
│   ├── services/       # API client (agentApi.ts)
│   └── types/          # TypeScript type definitions
```

**Key Patterns**:
- React 18 with TypeScript
- Custom hooks for state management (no Redux/Zustand)
- Tailwind CSS for styling with dark theme
- Direct fetch API calls to backend
- Manual streaming response handling

### AG-UI App Structure
```
ag-ui/
└── src/
    ├── app/
    │   ├── api/copilotkit/  # API route proxying to ADK backend
    │   ├── layout.tsx       # Root layout
    │   └── page.tsx         # Main chat page
    ├── components/          # React components
    └── lib/                 # Configuration and utilities
```

**Key Patterns**:
- Next.js 14 App Router
- CopilotKit for AG-UI protocol implementation
- AG-UI standardized events (~16 event types)
- Server-side API route for backend proxy
- Built-in streaming, typing indicators, tool rendering

## API Communication

### Traditional App
- Direct POST to `http://127.0.0.1:8001/`
- Request format: `{ message: string }`
- Response format: `{ message: string, ... }`
- Health polling every 5 seconds

### AG-UI App
- Frontend → `/api/copilotkit` → ADK backend
- AG-UI protocol event transformation
- CopilotKit runtime handles streaming and state

## Important Notes

- Use `127.0.0.1` instead of `localhost` for Windows Docker compatibility
- Both apps require the ADK agent service to be running
- CORS may need configuration on the backend if not already enabled
- Traditional app runs on port 5173, AG-UI on port 3000
