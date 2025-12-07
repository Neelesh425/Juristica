// src/pages/ChatPage/index.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { askQuestion, deleteSession } from '../../services/api';

import './index.scss';

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [fileName, setFileName] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.sessionId) {
      setSessionId(location.state.sessionId);
      setFileName(location.state.fileName);
      setMessages([{
        type: 'system',
        content: `Document "${location.state.fileName}" uploaded successfully! (${location.state.chunksCreated} chunks created). Ask me anything about it.`
      }]);
    } else {
      // No document uploaded, redirect to home
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!sessionId || !question.trim()) return;

    const userQuestion = question.trim();
    
    setMessages(prev => [...prev, {
      type: 'user',
      content: userQuestion
    }]);
    
    setQuestion('');
    setLoading(true);

    try {
      const result = await askQuestion(userQuestion, sessionId);
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: result.answer,
        sources: result.sources
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Error: ' + error.message
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewDocument = async () => {
    if (sessionId) {
      try {
        await deleteSession(sessionId);
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
    navigate('/');
  };

  if (!sessionId) {
    return (
      <div className="chat-page">
        <div className="no-document">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <h2>No Document Loaded</h2>
          <p>Please upload a document to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="document-info">
          <div className="doc-details">
            <span className="doc-icon">📄</span>
            <div>
              <p className="doc-name">{fileName}</p>
              <p className="doc-status">Active Session</p>
            </div>
          </div>
          <button onClick={handleNewDocument} className="new-doc-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            New Document
          </button>
        </div>

        <div className="messages-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              {msg.type === 'user' && (
                <div className="message-header">
                  <div className="avatar user-avatar">👤</div>
                  <span className="message-label">You</span>
                </div>
              )}
              {msg.type === 'assistant' && (
                <div className="message-header">
                  <div className="avatar assistant-avatar">🤖</div>
                  <span className="message-label">AI Assistant</span>
                </div>
              )}
              
              <div className="message-content">
                {msg.content}
              </div>

              {msg.sources && (
                <details className="sources">
                  <summary>📚 View source context ({msg.sources.length} chunks)</summary>
                  <div className="sources-list">
                    {msg.sources.map((source, i) => (
                      <div key={i} className="source-chunk">
                        <div className="source-header">Chunk {i + 1}</div>
                        <p>{source}</p>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="message assistant">
              <div className="message-header">
                <div className="avatar assistant-avatar">🤖</div>
                <span className="message-label">AI Assistant</span>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleAskQuestion} className="question-form">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the document..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !question.trim()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}