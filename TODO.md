# ADK Agent UI - Implementation TODO List

## Quick Links
- Backend Service: http://127.0.0.1:8001/
- Health Check: http://127.0.0.1:8001/health
- Phoenix Tracing: http://127.0.0.1:6006

---

## Phase 1: Project Setup

### Initial Setup
- [ ] Create `traditional/` directory
- [ ] Create `ag-ui/` directory
- [ ] Update `.gitignore` for both projects

---

## Phase 2: Traditional App (React + Vite + Tailwind)

### 2.1 Project Initialization
- [ ] Initialize Vite project with React + TypeScript template
- [ ] Install dependencies (react, react-dom)
- [ ] Install dev dependencies (tailwindcss, postcss, autoprefixer)
- [ ] Configure `vite.config.ts`
- [ ] Configure `tsconfig.json`

### 2.2 Tailwind Setup
- [ ] Initialize Tailwind CSS (`npx tailwindcss init -p`)
- [ ] Configure `tailwind.config.js` with content paths
- [ ] Add Tailwind directives to `index.css`

### 2.3 Type Definitions
- [ ] Create `src/types/index.ts`
  - [ ] Define `ChatMessage` interface
  - [ ] Define `HealthResponse` interface
  - [ ] Define `InfoResponse` interface
  - [ ] Define `ChatState` interface

### 2.4 API Service Layer
- [ ] Create `src/services/agentApi.ts`
  - [ ] Implement `sendMessage()` function
  - [ ] Implement `checkHealth()` function
  - [ ] Implement `getInfo()` function
  - [ ] Add error handling
  - [ ] Handle streaming responses

### 2.5 Custom Hooks
- [ ] Create `src/hooks/useChat.ts`
  - [ ] Implement message state management
  - [ ] Implement `sendMessage` handler
  - [ ] Implement `clearChat` handler
  - [ ] Handle loading states
  - [ ] Handle error states
  - [ ] Support streaming response updates

- [ ] Create `src/hooks/useHealth.ts`
  - [ ] Implement health polling
  - [ ] Track connection status
  - [ ] Auto-retry on failure

### 2.6 UI Components
- [ ] Create `src/components/Header.tsx`
  - [ ] App title
  - [ ] Health status indicator
  - [ ] Clear chat button

- [ ] Create `src/components/ChatContainer.tsx`
  - [ ] Main layout wrapper
  - [ ] Flex column layout

- [ ] Create `src/components/MessageList.tsx`
  - [ ] Scrollable container
  - [ ] Auto-scroll to bottom
  - [ ] Empty state message

- [ ] Create `src/components/MessageBubble.tsx`
  - [ ] User message styling (right-aligned, blue)
  - [ ] Assistant message styling (left-aligned, gray)
  - [ ] Timestamp display
  - [ ] Markdown rendering (optional)

- [ ] Create `src/components/ChatInput.tsx`
  - [ ] Text input field
  - [ ] Send button
  - [ ] Enter key to send
  - [ ] Disabled state while loading
  - [ ] Auto-focus

- [ ] Create `src/components/HealthStatus.tsx`
  - [ ] Green dot for connected
  - [ ] Red dot for disconnected
  - [ ] Yellow dot for connecting

### 2.7 Main App Assembly
- [ ] Update `src/App.tsx`
  - [ ] Import and use all components
  - [ ] Wire up hooks
  - [ ] Add dark theme styling

- [ ] Update `src/main.tsx`
  - [ ] Standard React entry point

### 2.8 Styling
- [ ] Dark theme base styles
- [ ] Responsive design (mobile-friendly)
- [ ] Smooth animations for messages
- [ ] Loading spinner/indicator

### 2.9 Testing
- [ ] Test connection to health endpoint
- [ ] Test sending messages
- [ ] Test receiving responses
- [ ] Test streaming display
- [ ] Test error handling
- [ ] Test clear chat functionality

---

## Phase 3: AG-UI App (CopilotKit + Next.js)

### 3.1 Project Initialization
- [ ] Initialize Next.js project with TypeScript
- [ ] Install CopilotKit packages
  - [ ] `@copilotkit/react-core`
  - [ ] `@copilotkit/react-ui`
  - [ ] `@copilotkit/runtime`
- [ ] Configure `next.config.js`
- [ ] Configure `tsconfig.json`

### 3.2 Tailwind Setup
- [ ] Initialize Tailwind CSS
- [ ] Configure `tailwind.config.ts`
- [ ] Add Tailwind directives to `globals.css`

### 3.3 API Route
- [ ] Create `src/app/api/copilotkit/route.ts`
  - [ ] Handle POST requests
  - [ ] Transform CopilotKit format to ADK format
  - [ ] Proxy to ADK backend (http://127.0.0.1:8001)
  - [ ] Handle streaming response
  - [ ] Error handling

### 3.4 App Layout
- [ ] Create `src/app/layout.tsx`
  - [ ] Root layout with metadata
  - [ ] Font configuration
  - [ ] Global providers

### 3.5 Main Page
- [ ] Create `src/app/page.tsx`
  - [ ] CopilotKit provider wrapper
  - [ ] CopilotChat component
  - [ ] Custom labels and styling
  - [ ] Header with app title

### 3.6 Optional Components
- [ ] Create `src/components/AgentChat.tsx` (custom wrapper)
  - [ ] Additional customization if needed
  - [ ] Custom action handlers

### 3.7 Configuration
- [ ] Create `src/lib/agentConfig.ts`
  - [ ] Agent endpoint configuration
  - [ ] Environment variables setup

### 3.8 Styling
- [ ] Import CopilotKit default styles
- [ ] Override with custom Tailwind styles
- [ ] Dark theme matching traditional app
- [ ] Responsive design

### 3.9 Testing
- [ ] Test CopilotKit initialization
- [ ] Test message sending
- [ ] Test streaming responses
- [ ] Test tool rendering (if applicable)
- [ ] Test error handling

---

## Phase 4: Documentation

### README Updates
- [ ] Update main `README.md`
  - [ ] Project overview
  - [ ] Both app descriptions
  - [ ] Quick start for traditional
  - [ ] Quick start for ag-ui
  - [ ] Screenshots (after completion)

### CLAUDE.md Updates
- [ ] Update `CLAUDE.md`
  - [ ] Add development commands for both apps
  - [ ] Document architecture
  - [ ] Add file structure overview

### Additional Docs
- [ ] Document API integration patterns
- [ ] Document CORS setup if needed
- [ ] Add troubleshooting section

---

## Phase 5: Enhancements (Future)

### Traditional App Enhancements
- [ ] Add session persistence (localStorage)
- [ ] Add conversation export
- [ ] Add file upload support
- [ ] Add code syntax highlighting
- [ ] Add copy-to-clipboard for messages
- [ ] Add keyboard shortcuts

### AG-UI App Enhancements
- [ ] Implement custom tools
- [ ] Add human-in-the-loop confirmations
- [ ] Add generative UI components
- [ ] Add shared state management

### Both Apps
- [ ] Add unit tests
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Add CI/CD pipeline
- [ ] Docker containerization
- [ ] Production deployment guide

---

## File Creation Checklist

### Traditional App Files (13 files)
- [ ] `traditional/package.json`
- [ ] `traditional/vite.config.ts`
- [ ] `traditional/tsconfig.json`
- [ ] `traditional/tsconfig.node.json`
- [ ] `traditional/tailwind.config.js`
- [ ] `traditional/postcss.config.js`
- [ ] `traditional/index.html`
- [ ] `traditional/src/main.tsx`
- [ ] `traditional/src/App.tsx`
- [ ] `traditional/src/index.css`
- [ ] `traditional/src/vite-env.d.ts`
- [ ] `traditional/src/types/index.ts`
- [ ] `traditional/src/services/agentApi.ts`
- [ ] `traditional/src/hooks/useChat.ts`
- [ ] `traditional/src/hooks/useHealth.ts`
- [ ] `traditional/src/components/Header.tsx`
- [ ] `traditional/src/components/ChatContainer.tsx`
- [ ] `traditional/src/components/MessageList.tsx`
- [ ] `traditional/src/components/MessageBubble.tsx`
- [ ] `traditional/src/components/ChatInput.tsx`
- [ ] `traditional/src/components/HealthStatus.tsx`

### AG-UI App Files (10 files)
- [ ] `ag-ui/package.json`
- [ ] `ag-ui/next.config.js`
- [ ] `ag-ui/tsconfig.json`
- [ ] `ag-ui/tailwind.config.ts`
- [ ] `ag-ui/postcss.config.js`
- [ ] `ag-ui/src/app/layout.tsx`
- [ ] `ag-ui/src/app/page.tsx`
- [ ] `ag-ui/src/app/globals.css`
- [ ] `ag-ui/src/app/api/copilotkit/route.ts`
- [ ] `ag-ui/src/lib/agentConfig.ts`

---

## Commands Reference

### Traditional App
```bash
cd traditional
npm install
npm run dev          # http://localhost:5173
npm run build
npm run preview
```

### AG-UI App
```bash
cd ag-ui
npm install
npm run dev          # http://localhost:3000
npm run build
npm run start
```

---

## Progress Tracking

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Setup | Not Started | 0% |
| Phase 2: Traditional | Not Started | 0% |
| Phase 3: AG-UI | Not Started | 0% |
| Phase 4: Docs | Not Started | 0% |
| Phase 5: Enhancements | Future | - |

**Last Updated:** $(date)