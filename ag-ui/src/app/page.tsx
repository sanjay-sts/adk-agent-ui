"use client";

import { AgentChat } from "@/components/AgentChat";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">ADK Agent UI</h1>
            <p className="text-sm text-gray-400">Next.js + Google ADK</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-400">Connected</span>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <AgentChat />
      </main>
    </div>
  );
}
