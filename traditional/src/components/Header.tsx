import { HealthStatus } from './HealthStatus';

interface HeaderProps {
  onClearChat: () => void;
}

export function Header({ onClearChat }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">ADK Agent UI</h1>
          <p className="text-sm text-gray-400">Traditional React App</p>
        </div>
        <div className="flex items-center gap-4">
          <HealthStatus />
          <button
            onClick={onClearChat}
            className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>
    </header>
  );
}
