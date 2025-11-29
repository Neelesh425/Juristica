import './index.scss';

export default function Sidebar({ isOpen }) {
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
              <a href="/dashboard" className="nav-link active">
                <span className="nav-icon">📄</span>
                {isOpen && <span className="nav-text">Documents</span>}
              </a>
            </li>
            <li className="nav-item">
              <a href="/chat" className="nav-link">
                <span className="nav-icon">💬</span>
                {isOpen && <span className="nav-text">Chat</span>}
              </a>
            </li>
            <li className="nav-item">
              <a href="/history" className="nav-link">
                <span className="nav-icon">⏱️</span>
                {isOpen && <span className="nav-text">History</span>}
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">Team</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/team" className="nav-link">
                <span className="nav-icon">👥</span>
                {isOpen && <span className="nav-text">Team Members</span>}
              </a>
            </li>
            <li className="nav-item">
              <a href="/settings" className="nav-link">
                <span className="nav-icon">⚙️</span>
                {isOpen && <span className="nav-text">Settings</span>}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="upload-btn">
          <span className="upload-icon">📤</span>
          {isOpen && <span className="upload-text">Upload Document</span>}
        </button>
      </div>
    </aside>
  );
}