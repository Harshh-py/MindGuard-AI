import React, { useState } from 'react';
import { ShieldAlert, Crosshair, Ban } from 'lucide-react';

const FocusMode = () => {
  const [active, setActive] = useState(false);
  const [apps] = useState([
    { name: 'Instagram', category: 'Social', blocked: true },
    { name: 'TikTok', category: 'Social', blocked: true },
    { name: 'YouTube', category: 'Entertainment', blocked: false },
    { name: 'WhatsApp', category: 'Communication', blocked: false }
  ]);

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-primary">
          <Crosshair className="text-primary" size={40} />
        </div>
        <h1 className="text-3xl font-bold text-white">Focus Mode</h1>
        <p className="text-gray-400 mt-2">Block distracting apps and maintain your concentration.</p>
      </header>

      <div className="bg-cardBg rounded-2xl p-8 border border-[#27272a] text-center shadow-xl mb-8 transition-colors duration-500" style={active ? { borderColor: '#8b5cf6', boxShadow: '0 0 30px rgba(139,92,246,0.2)'} : {}}>
        <h2 className="text-2xl font-bold mb-4">{active ? 'Focus Mode is Active' : 'Ready to Focus?'}</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          When active, selected applications will be blocked. AI will also monitor your session to ensure maximum productivity.
        </p>
        <button 
          onClick={() => setActive(!active)}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
            active ? 'bg-danger text-white glow-danger' : 'bg-primary text-white glow-primary hover:bg-violet-600'
          }`}
        >
          {active ? 'Deactivate Focus Mode' : 'Start Focus Mode'}
        </button>
      </div>

      <h3 className="text-xl font-bold mb-4">Focus Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apps.map((app, i) => (
          <div key={i} className={`p-4 rounded-xl border flex justify-between items-center transition-colors ${app.blocked ? 'bg-danger/5 border-danger/30' : 'bg-cardBg border-[#27272a]'}`}>
            <div>
              <p className={`font-bold ${app.blocked ? 'text-white' : 'text-gray-300'}`}>{app.name}</p>
              <p className="text-sm text-gray-500">{app.category}</p>
            </div>
            <button className={`p-2 rounded-lg transition-colors ${
              app.blocked ? 'text-danger shadow-[0_0_10px_rgba(244,63,94,0.3)] bg-danger/20' : 'bg-darkBg text-gray-400 hover:text-white'
            }`}>
              <Ban size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusMode;
