// src/components/UploadModal/index.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument } from '../../services/api';
import './index.scss';

export default function UploadModal({ isOpen, onClose }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
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
      
      // Navigate to chat page with the session ID
      navigate('/chat', { 
        state: { 
          sessionId: result.session_id,
          fileName: file.name,
          chunksCreated: result.chunks_created
        } 
      });
      
      onClose();
    } catch (error) {
      alert('Upload error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload Document</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInputChange}
              accept=".pdf,.docx,.txt"
              disabled={uploading}
              style={{ display: 'none' }}
            />
            
            {uploading ? (
              <>
                <div className="spinner"></div>
                <p>Uploading and processing...</p>
                <p className="upload-subtext">This may take a moment</p>
              </>
            ) : (
              <>
                <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p className="upload-text">
                  <strong>Click to upload</strong> or drag and drop
                </p>
                <p className="upload-subtext">PDF, DOCX, or TXT (Max 10MB)</p>
              </>
            )}
          </div>

          <div className="upload-info">
            <h3>Supported File Types:</h3>
            <ul>
              <li><strong>PDF:</strong> Portable Document Format</li>
              <li><strong>DOCX:</strong> Microsoft Word Document</li>
              <li><strong>TXT:</strong> Plain Text File</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}