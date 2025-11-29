import './index.scss';

export default function Header({ onToggleSidebar, sidebarOpen }) {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className={`toggle-icon ${sidebarOpen ? 'open' : 'closed'}`}>
            ☰
          </span>
        </button>
        <h1 className="header-title">LegalEase</h1>
      </div>

      <div className="header-search">
        <input 
          type="text" 
          placeholder="Search documents..." 
          className="search-input"
        />
      </div>

      <div className="header-right">
        <button className="icon-btn" aria-label="Notifications">
          🔔
        </button>
        <div className="user-menu">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <p className="user-name">Vinland Saga</p>
            <p className="user-email">vin@example.com</p>
          </div>
          <button className="dropdown-btn">⋮</button>
        </div>
      </div>
    </header>
  );
}