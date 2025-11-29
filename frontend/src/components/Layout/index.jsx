import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import './index.scss';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className="layout-main">
        <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}