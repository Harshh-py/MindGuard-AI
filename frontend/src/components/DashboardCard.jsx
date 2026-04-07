import React from 'react';

const DashboardCard = ({ title, value, subtitle, icon, highlight, glowType }) => {
  const glowClass = glowType === 'primary' ? 'group-hover:glow-primary shadow-[0_0_10px_rgba(139,92,246,0.1)]' 
                  : glowType === 'secondary' ? 'group-hover:glow-secondary shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                  : glowType === 'danger' ? 'group-hover:glow-danger shadow-[0_0_10px_rgba(244,63,94,0.1)]'
                  : 'group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]';
                  
  const textHighlight = highlight === 'primary' ? 'text-primary'
                      : highlight === 'secondary' ? 'text-secondary'
                      : highlight === 'danger' ? 'text-danger'
                      : 'text-white';

  return (
    <div className={`bg-cardBg rounded-2xl p-6 border border-[#27272a] transition-all duration-300 group ${glowClass}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
          <div className={`text-3xl font-bold mt-2 ${textHighlight}`}>{value}</div>
          {subtitle && <p className="text-gray-500 text-xs mt-2">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-opacity-10 ${
          highlight === 'primary' ? 'bg-primary text-primary' : 
          highlight === 'secondary' ? 'bg-secondary text-secondary' : 
          highlight === 'danger' ? 'bg-danger text-danger' : 'bg-gray-500 text-gray-400'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
