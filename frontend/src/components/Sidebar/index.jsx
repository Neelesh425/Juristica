// src/components/Sidebar/index.jsx
import { Link, useLocation } from 'react-router-dom';
import './index.scss';

export default function Sidebar({ isOpen, onUploadClick }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-logo">LE</h2>
        {isOpen && <span className="sidebar-title">LegalEase</span>}
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Main</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                <span className="nav-icon">📄</span>
                {isOpen && <span className="nav-text">Documents</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chat" className={`nav-link ${isActive('/chat') ? 'active' : ''}`}>
                <span className="nav-icon">💬</span>
                {isOpen && <span className="nav-text">Chat</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>
                <span className="nav-icon">⏱️</span>
                {isOpen && <span className="nav-text">History</span>}
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">Team</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/team" className={`nav-link ${isActive('/team') ? 'active' : ''}`}>
                <span className="nav-icon">👥</span>
                {isOpen && <span className="nav-text">Team Members</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'active' : ''}`}>
                <span className="nav-icon">⚙️</span>
                {isOpen && <span className="nav-text">Settings</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="upload-btn" onClick={onUploadClick}>
          <span className="upload-icon">📤</span>
          {isOpen && <span className="upload-text">Upload Document</span>}
        </button>
      </div>
    </aside>
  );
}