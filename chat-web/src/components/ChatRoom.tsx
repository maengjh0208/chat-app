import { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';
import './ChatRoom.css';

interface ChatRoomProps {
    sessionId: string;
    username: string;
    onLeave: () => void;
}

export default function ChatRoom({ sessionId, username, onLeave }: ChatRoomProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                content: inputMessage.trim(),
                sender: username,
                timestamp: new Date(),
                isSent: true,
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
        }
    };

    const handleCopySessionId = () => {
        navigator.clipboard.writeText(sessionId);
        // TODO: Show toast notification
    };

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <div className="chat-header-info">
                    <h1 className="chat-title">채팅방</h1>
                    <span className="chat-session-id">세션 ID: {sessionId}</span>
                </div>
                <div className="chat-header-actions">
                    <button className="btn-icon" onClick={handleCopySessionId}>
                        📋 복사
                    </button>
                    <button className="btn-icon" onClick={onLeave}>
                        🚪 나가기
                    </button>
                </div>
            </header>

            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">💬</div>
                        <p className="empty-state-text">메시지를 보내서 대화를 시작하세요</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.isSent ? 'message-sent' : 'message-received'}`}
                        >
                            {!message.isSent && <div className="message-sender">{message.sender}</div>}
                            <div className="message-content">{message.content}</div>
                            <div className="message-timestamp">{formatTime(message.timestamp)}</div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
                <form className="chat-input-wrapper" onSubmit={handleSendMessage}>
                    <textarea
                        className="chat-input"
                        placeholder="메시지를 입력하세요..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.nativeEvent.isComposing) return;
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                            }
                        }}
                        rows={1}
                    />
                    <button type="submit" className="btn-send" disabled={!inputMessage.trim()}>
                        전송
                    </button>
                </form>
            </div>
        </div>
    );
}
