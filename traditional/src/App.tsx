import { useEffect } from 'react';
import { ChatContainer } from './components/ChatContainer';
import { createSession } from './services/agentApi';

function App() {
  useEffect(() => {
    // Create session on app load
    createSession();
  }, []);

  return <ChatContainer />;
}

export default App;
