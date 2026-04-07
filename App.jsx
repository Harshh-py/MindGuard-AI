import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import FocusMode from './pages/FocusMode';
import MoodTracker from './pages/MoodTracker';
import Login from './pages/Login';
import { Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <div className="flex w-full h-screen overflow-hidden bg-darkBg relative">
            {/* Mobile Header with Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-cardBg border-b border-[#27272a] flex items-center px-6 z-20">
              <button 
                onClick={toggleSidebar}
                className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                <Menu size={24} />
              </button>
              <h2 className="ml-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">MindGuard AI</h2>
            </div>

            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <div className={`flex-1 overflow-y-auto p-6 md:p-10 relative pt-20 lg:pt-10 transition-all duration-300`}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/focus" element={<FocusMode />} />
                <Route path="/mood" element={<MoodTracker />} />
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
