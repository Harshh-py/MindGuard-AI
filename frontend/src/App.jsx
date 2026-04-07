import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import FocusMode from './pages/FocusMode';
import MoodTracker from './pages/MoodTracker';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <div className="flex w-full h-screen overflow-hidden bg-darkBg relative">
            <Sidebar />
            <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
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
