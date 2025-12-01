import { useState } from 'react';
import './Landing.css';

interface LandingProps {
    onJoinSession: (sessionId: string, username: string) => void;
    onCreateSession: (username: string) => void;
}

export default function Landing({ onJoinSession, onCreateSession }: LandingProps) {
    const [sessionId, setSessionId] = useState('');
    const [username, setUsername] = useState('');

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (sessionId.trim() && username.trim()) {
            onJoinSession(sessionId.trim(), username.trim());
        }
    };

    const handleCreate = () => {
        if (username.trim()) {
            onCreateSession(username.trim());
        }
    };

    return (
        <div className="landing-container">
            <div className="landing-card">
                <div className="landing-header">
                    <h1 className="landing-title gradient-text">💬 Chat App</h1>
                    <p className="landing-subtitle">실시간 채팅을 시작하세요</p>
                </div>

                <form className="landing-form" onSubmit={handleJoin}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            사용자 이름
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="form-input"
                            placeholder="이름을 입력하세요"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sessionId" className="form-label">
                            세션 ID (선택사항)
                        </label>
                        <input
                            id="sessionId"
                            type="text"
                            className="form-input"
                            placeholder="기존 세션에 참여하려면 입력하세요"
                            value={sessionId}
                            onChange={(e) => setSessionId(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={!username.trim() || !sessionId.trim()}>
                        세션 참여
                    </button>

                    <div className="divider">또는</div>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCreate}
                        disabled={!username.trim()}
                    >
                        새 세션 만들기
                    </button>
                </form>
            </div>
        </div>
    );
}
