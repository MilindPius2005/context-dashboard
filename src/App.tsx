import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import ContextManager from './pages/ContextManager'
import TokenAnalyzer from './pages/TokenAnalyzer'
import PromptTester from './pages/PromptTester'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/context" element={<ContextManager />} />
            <Route path="/tokens" element={<TokenAnalyzer />} />
            <Route path="/prompts" element={<PromptTester />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 