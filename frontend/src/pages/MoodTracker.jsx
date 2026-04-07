import React, { useState } from 'react';
import { HeartPulse, CheckCircle } from 'lucide-react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const moods = [
    { name: 'Happy', emoji: '😊', color: 'bg-green-500/20 text-green-500 border-green-500 glow-primary', score: 100 },
    { name: 'Neutral', emoji: '😐', color: 'bg-blue-500/20 text-blue-500 border-blue-500 glow-secondary', score: 70 },
    { name: 'Tired', emoji: '🥱', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500', score: 40 },
    { name: 'Stressed', emoji: '😫', color: 'bg-red-500/20 text-red-500 border-red-500 glow-danger', score: 20 },
  ];

  const handleSubmit = () => {
    if (selectedMood) setSubmitted(true);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto mt-10">
      <div className="bg-cardBg rounded-3xl p-8 border border-[#27272a] shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-danger"></div>
        
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-primary">
          <HeartPulse className="text-primary" size={32} />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">How are you feeling today?</h1>
        <p className="text-gray-400 mb-8">Your mood directly correlates with screen time. Let's track it.</p>

        {!submitted ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {moods.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedMood(m.name)}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3
                    ${selectedMood === m.name ? m.color + ' scale-105' : 'bg-darkBg border-[#27272a] hover:border-gray-500 opacity-70 hover:opacity-100'}
                  `}
                >
                  <span className="text-4xl">{m.emoji}</span>
                  <span className="font-semibold text-white">{m.name}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!selectedMood}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                selectedMood ? 'bg-primary text-white glow-primary hover:bg-violet-600' : 'bg-darkBg text-gray-500 cursor-not-allowed'
              }`}
            >
              Log Mood
            </button>
          </>
        ) : (
          <div className="py-10 animate-in zoom-in duration-500">
            <CheckCircle className="text-success mx-auto mb-4 glow-primary" size={64} style={{ color: '#10b981' }} />
            <h2 className="text-2xl font-bold text-white">Mood Logged!</h2>
            <p className="text-gray-400 mt-2">Thank you! Your wellness score has been updated.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 font-semibold py-2 px-6 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              Update again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
