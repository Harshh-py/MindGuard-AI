import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { BarChart2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const Analytics = () => {
  const weeklyUsage = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Screen Time (mins)',
        data: [180, 220, 240, 190, 280, 310, 320],
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: '#8b5cf6',
        borderWidth: 2,
        borderRadius: 4,
      }
    ]
  };

  const moodPattern = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Mood Score',
        data: [70, 60, 40, 50, 80, 90, 85],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#e5e7eb' } } },
    scales: {
      y: { grid: { color: '#27272a' }, ticks: { color: '#9ca3af' } },
      x: { grid: { color: '#27272a' }, ticks: { color: '#9ca3af' } }
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-8 flex items-center gap-3">
        <div className="p-3 bg-primary/20 rounded-xl glow-primary">
          <BarChart2 className="text-primary" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Weekly Analytics</h1>
          <p className="text-gray-400 mt-1">Detailed breakdown of your usage and wellness trends.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-cardBg rounded-2xl p-6 border border-[#27272a] shadow-xl">
          <h3 className="text-xl font-bold mb-6 text-primary">Screen Time Trends</h3>
          <div className="h-72">
            <Bar data={weeklyUsage} options={chartOptions} />
          </div>
        </div>
        <div className="bg-cardBg rounded-2xl p-6 border border-[#27272a] shadow-xl">
          <h3 className="text-xl font-bold mb-6 text-secondary">Mood Patterns</h3>
          <div className="h-72">
            <Line data={moodPattern} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-cardBg rounded-2xl p-6 border border-[#27272a] shadow-xl">
        <h3 className="text-xl font-bold mb-4">Weekly Insights</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-4 bg-darkBg p-4 border border-white/5 rounded-xl hover:border-primary/30 transition-colors">
            <span className="text-2xl">📉</span>
            <div>
              <p className="font-medium text-white">Mood Drops on Wednesdays</p>
              <p className="text-gray-400 text-sm mt-1">We noticed your mood significantly dropping mid-week. Consider taking a 30-minute break away from screens on Wednesdays.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-darkBg p-4 border border-white/5 rounded-xl hover:border-primary/30 transition-colors">
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-medium text-white">Weekend Usage Spike</p>
              <p className="text-gray-400 text-sm mt-1">Your screen time increased by 40% over the weekend. Try setting aside 1 hour for offline hobbies.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
