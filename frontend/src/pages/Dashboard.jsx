import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { Smartphone, Clock, ShieldAlert, HeartPulse, Zap } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data] = useState({
    totalUsage: 320,
    dailyLimit: 240, 
    riskLevel: 'High',
    moodStr: 'Stressed',
    wellnessScore: 45,
    topApps: [
      { name: 'Instagram', mins: 120, color: '#f43f5e' },
      { name: 'TikTok', mins: 90, color: '#06b6d4' },
      { name: 'YouTube', mins: 70, color: '#8b5cf6' },
      { name: 'Others', mins: 40, color: '#4b5563' }
    ]
  });

  const chartData = {
    labels: data.topApps.map(a => a.name),
    datasets: [{
      data: data.topApps.map(a => a.mins),
      backgroundColor: data.topApps.map(a => a.color),
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Overview</h1>
        <p className="text-gray-400 mt-2">Welcome back! Here is your wellness summary for today.</p>
      </header>

      {/* AI Smart Alert */}
      {data.riskLevel === 'High' && (
        <div className="mb-8 rounded-2xl bg-danger/10 border border-danger p-5 flex items-start gap-4 glow-danger">
          <div className="p-2 bg-danger rounded-full text-white mt-1 shadow-lg">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-danger font-bold text-lg">AI Notice: High Risk Detected</h3>
            <p className="text-red-200/80 mt-1">
              You have exceeded your recommended screen time limits. Night time usage is exceptionally high. 
              We strongly suggest entering Focus Mode to block social media applications.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Screen Time" 
          value={`${Math.floor(data.totalUsage / 60)}h ${data.totalUsage % 60}m`}
          subtitle={`Daily limit: ${Math.floor(data.dailyLimit / 60)}h`}
          icon={<Clock size={24} />} 
          highlight={data.totalUsage > data.dailyLimit ? 'danger' : 'primary'}
          glowType={data.totalUsage > data.dailyLimit ? 'danger' : 'primary'}
        />
        <DashboardCard 
          title="App Limit Blocks" 
          value="2 Active"
          subtitle="Instagram, TikTok restricted"
          icon={<ShieldAlert size={24} />} 
          highlight="secondary"
          glowType="secondary"
        />
        <DashboardCard 
          title="AI Risk Score" 
          value={data.riskLevel}
          subtitle="Based on behavior patterns"
          icon={<Smartphone size={24} />} 
          highlight={data.riskLevel === 'High' ? 'danger' : 'secondary'}
          glowType={data.riskLevel === 'High' ? 'danger' : 'secondary'}
        />
        <DashboardCard 
          title="Wellness Score" 
          value={`${data.wellnessScore}/100`}
          subtitle={`Current mood: ${data.moodStr}`}
          icon={<HeartPulse size={24} />} 
          highlight={data.wellnessScore < 50 ? 'danger' : 'primary'}
          glowType={data.wellnessScore < 50 ? 'danger' : 'primary'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-1 bg-cardBg rounded-2xl p-6 border border-[#27272a] shadow-xl">
          <h3 className="text-xl font-bold mb-6">Usage by App</h3>
          <div className="relative h-64 flex justify-center items-center">
            <Doughnut data={chartData} options={{ maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false } } }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold">{data.totalUsage}</span>
              <span className="text-sm text-gray-400">mins</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {data.topApps.map((app, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shadow-[0_0_8px]" style={{ backgroundColor: app.color, boxShadow: `0 0 8px ${app.color}` }}></div>
                  <span className="text-gray-300">{app.name}</span>
                </div>
                <span className="font-semibold">{app.mins}m</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#18181b] to-primary/10 rounded-2xl p-6 border border-primary/20 glow-primary shadow-xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
            <Zap size={20} /> AI Personalized Recommendations
          </h3>
          <div className="space-y-4">
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold text-white">Enable Wind Down Routine</h4>
              <p className="text-sm text-gray-400 mt-1">You often use TikTok past 11 PM. Setting a strict block at 10 PM will improve your sleep quality by 25% based on your historical data.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold text-white">Take A Walk Break</h4>
              <p className="text-sm text-gray-400 mt-1">Your mood score is trending downwards during long continuous sessions. Try stepping away from the screen for 10 minutes right now.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold text-white">Focus Mode Candidate</h4>
              <p className="text-sm text-gray-400 mt-1">Instagram accounts for 37.5% of your screen time today. Consider adding it to Focus Mode while working.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
