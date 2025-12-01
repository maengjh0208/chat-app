import { useState } from 'react';
import Landing from './components/Landing';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [currentSession, setCurrentSession] = useState<{
    sessionId: string;
    username: string;
  } | null>(null);

  const handleJoinSession = (sessionId: string, username: string) => {
    setCurrentSession({ sessionId, username });
  };

  const handleCreateSession = (username: string) => {
    // Generate a random session ID
    const sessionId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setCurrentSession({ sessionId, username });
  };

  const handleLeaveSession = () => {
    setCurrentSession(null);
  };

  return (
    <>
      {currentSession ? (
        <ChatRoom
          sessionId={currentSession.sessionId}
          username={currentSession.username}
          onLeave={handleLeaveSession}
        />
      ) : (
        <Landing onJoinSession={handleJoinSession} onCreateSession={handleCreateSession} />
      )}
    </>
  );
}

export default App;
