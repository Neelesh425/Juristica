import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
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
            <div className="dashboard-placeholder">
              <h2>Welcome to LegalEase</h2>
              <p>This is where your content will go</p>
            </div>
          </Layout>
        } 
      />
    </Routes>
  )
}

export default App