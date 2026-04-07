import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart2, ShieldAlert, HeartPulse, LogOut, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-cardBg glow-primary h-full flex flex-col p-6 z-40 
        border-r border-[#27272a] shadow-xl transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center glow-primary mr-3 shadow-lg">
              <ShieldAlert className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">MindGuard AI</h1>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-4">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={() => setIsOpen(false)} />
          <NavItem to="/analytics" icon={<BarChart2 size={20} />} label="Analytics" onClick={() => setIsOpen(false)} />
          <NavItem to="/focus" icon={<ShieldAlert size={20} />} label="Focus Mode" onClick={() => setIsOpen(false)} />
          <NavItem to="/mood" icon={<HeartPulse size={20} />} label="Mood Tracker" onClick={() => setIsOpen(false)} />
        </nav>

        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center space-x-3 text-gray-400 hover:text-danger hover:bg-danger/10 transition-colors w-full p-3 rounded-xl">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label, onClick }) => {
  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => 
        `flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 relative group
        ${isActive ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-md glow-primary"></div>
          )}
          {icon}
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default Sidebar;
