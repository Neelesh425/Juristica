import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import DocumentsPage from './pages/DocumentsPage'
import ChatPage from './pages/ChatPage'
import './styles/global.scss'

function App() {
  
  useEffect(() => {
    document.title = "LegalEase"
  }, []);

  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <Layout>
            <DocumentsPage />
          </Layout>
        } 
      />
      <Route 
        path='/chat' 
        element={
          <Layout>
            <ChatPage />
          </Layout>
        } 
      />
      <Route 
        path='/history' 
        element={
          <Layout>
            <div style={{ padding: '2rem' }}>
              <h2>History</h2>
              <p>Coming soon...</p>
            </div>
          </Layout>
        } 
      />
      <Route 
        path='/team' 
        element={
          <Layout>
            <div style={{ padding: '2rem' }}>
              <h2>Team Members</h2>
              <p>Coming soon...</p>
            </div>
          </Layout>
        } 
      />
      <Route 
        path='/settings' 
        element={
          <Layout>
            <div style={{ padding: '2rem' }}>
              <h2>Settings</h2>
              <p>Coming soon...</p>
            </div>
          </Layout>
        } 
      />
    </Routes>
  )
}

export default App