// src/pages/DocumentsPage.jsx
import './index.scss';

export default function DocumentsPage() {
  return (
    <div className="documents-page">
      <div className="page-header">
        <h1>Your Documents</h1>
        <p>Upload and manage your legal documents</p>
      </div>

      <div className="welcome-card">
        <div className="welcome-icon">📄</div>
        <h2>Welcome to LegalEase</h2>
        <p>Get started by uploading a document using the button in the sidebar</p>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🤖</span>
            <h3>AI-Powered Analysis</h3>
            <p>Ask questions and get instant answers about your documents</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔍</span>
            <h3>Smart Search</h3>
            <p>Find relevant information quickly with semantic search</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <h3>Document Insights</h3>
            <p>Get summaries and key points extracted automatically</p>
          </div>
        </div>

        <div className="quick-start">
          <h3>Quick Start Guide:</h3>
          <ol>
            <li>Click the "Upload Document" button in the sidebar</li>
            <li>Select a PDF, DOCX, or TXT file to upload</li>
            <li>Start asking questions in the chat interface</li>
            <li>Get AI-powered answers based on your document</li>
          </ol>
        </div>
      </div>
    </div>
  );
}