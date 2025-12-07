// src/components/DocumentQA.jsx
import { useState, useRef } from 'react';
import { uploadDocument, askQuestion, deleteSession } from '../services/api';
import '../styles/DocumentQA.scss';

function DocumentQA() {
  const [sessionId, setSessionId] = useState(null);
  const [fileName, setFileName] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['.pdf', '.docx', '.txt'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      alert('Please upload a PDF, DOCX, or TXT file');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadDocument(file);
      setSessionId(result.session_id);
      setFileName(file.name);
      setMessages([{
        type: 'system',
        content: `Document "${file.name}" uploaded successfully! (${result.chunks_created} chunks created). You can now ask questions about it.`
      }]);
    } catch (error) {
      alert('Upload error: ' + error.message);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!sessionId || !question.trim()) return;

    const userQuestion = question.trim();
    
    // Add user question to messages
    setMessages(prev => [...prev, {
      type: 'user',
      content: userQuestion
    }]);
    
    setQuestion('');
    setLoading(true);

    try {
      const result = await askQuestion(userQuestion, sessionId);
      
      // Add AI answer to messages
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
    
    setSessionId(null);
    setFileName('');
    setMessages([]);
    setQuestion('');
  };

  return (
    <div className="document-qa">
      <div className="qa-header">
        <h2>Document Q&A</h2>
        <p>Upload a legal document and ask questions about it</p>
      </div>

      {!sessionId ? (
        <div className="upload-section">
          <div className="upload-box">
            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              onChange={handleFileUpload}
              accept=".pdf,.docx,.txt"
              disabled={uploading}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="upload-label">
              {uploading ? (
                <>
                  <div className="spinner"></div>
                  <span>Uploading and processing...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Click to upload document</span>
                  <span className="file-types">PDF, DOCX, or TXT</span>
                </>
              )}
            </label>
          </div>
        </div>
      ) : (
        <div className="chat-section">
          <div className="document-info">
            <span className="doc-icon">📄</span>
            <span className="doc-name">{fileName}</span>
            <button onClick={handleNewDocument} className="new-doc-btn">
              New Document
            </button>
          </div>

          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.type === 'user' && <div className="message-label">You</div>}
                {msg.type === 'assistant' && <div className="message-label">AI Assistant</div>}
                {msg.type === 'system' && <div className="message-label">System</div>}
                
                <div className="message-content">
                  {msg.content}
                </div>

                {msg.sources && (
                  <details className="sources">
                    <summary>View sources</summary>
                    {msg.sources.map((source, i) => (
                      <div key={i} className="source-chunk">
                        <strong>Chunk {i + 1}:</strong>
                        <p>{source}</p>
                      </div>
                    ))}
                  </details>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="message assistant loading">
                <div className="message-label">AI Assistant</div>
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
      )}
    </div>
  );
}

export default DocumentQA;