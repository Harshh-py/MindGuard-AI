import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart2, ShieldAlert, HeartPulse, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a full implementation, you would clear auth tokens here (e.g. localStorage.removeItem('token'))
    navigate('/login');
  };

  return (
    <div className="w-64 bg-cardBg glow-primary h-full flex flex-col p-6 z-10 border-r border-[#27272a] shadow-xl">
      <div className="mb-10 flex items-center pr-2">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center glow-primary mr-3 shadow-lg">
          <ShieldAlert className="text-white" size={20} />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">MindGuard AI</h1>
      </div>

      <nav className="flex-1 space-y-4">
        <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/analytics" icon={<BarChart2 size={20} />} label="Analytics" />
        <NavItem to="/focus" icon={<ShieldAlert size={20} />} label="Focus Mode" />
        <NavItem to="/mood" icon={<HeartPulse size={20} />} label="Mood Tracker" />
      </nav>

      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center space-x-3 text-gray-400 hover:text-danger hover:bg-danger/10 transition-colors w-full p-3 rounded-xl">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to} 
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
