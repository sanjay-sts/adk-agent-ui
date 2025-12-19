import { useChat } from '../hooks/useChat';
import { Header } from './Header';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function ChatContainer() {
  const { messages, isLoading, sendMessage, clearChat } = useChat();

  return (
    <div className="h-screen flex flex-col">
      <Header onClearChat={clearChat} />
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
