// src/components/Layout/index.jsx
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import UploadModal from '../UploadModel';
import './index.scss';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleCloseModal = () => {
    setUploadModalOpen(false);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onUploadClick={handleUploadClick} />
      <div className="layout-main">
        <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="layout-content">
          {children}
        </main>
      </div>
      
      {uploadModalOpen && (
        <UploadModal 
          isOpen={uploadModalOpen} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}