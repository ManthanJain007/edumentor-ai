// src/components/dashboard/ProgressDashboard.tsx
import React from 'react';
import { useApp } from '../../contexts/AppContext';

export const ProgressDashboard: React.FC = () => {
  const { state } = useApp();
  const { userStats, learningLevel, achievements } = state;

  const learningLevels = {
    beginner: { name: 'Young Learner', level: 1, color: 'from-green-500 to-emerald-500' },
    intermediate: { name: 'High School', level: 2, color: 'from-blue-500 to-cyan-500' },
    advanced: { name: 'University', level: 3, color: 'from-purple-500 to-pink-500' },
    expert: { name: 'Advanced', level: 4, color: 'from-orange-500 to-red-500' }
  };

  const progressData = [
    {
      label: 'Learning Level',
      value: learningLevels[learningLevel].name,
      progress: (learningLevels[learningLevel].level / 4) * 100,
      color: learningLevels[learningLevel].color,
      icon: '🎓'
    },
    {
      label: 'Messages Sent',
      value: userStats.messagesSent.toString(),
      progress: Math.min((userStats.messagesSent / 50) * 100, 100),
      color: 'from-blue-500 to-purple-500',
      icon: '💬'
    },
    {
      label: 'Total Points',
      value: userStats.totalPoints.toString(),
      progress: Math.min((userStats.totalPoints / 1000) * 100, 100),
      color: 'from-yellow-500 to-orange-500',
      icon: '⭐'
    },
    {
      label: 'Achievements',
      value: `${achievements.filter(a => a.unlocked).length}/${achievements.length}`,
      progress: (achievements.filter(a => a.unlocked).length / achievements.length) * 100,
      color: 'from-green-500 to-teal-500',
      icon: '🏆'
    }
  ];

  return (
    <div className="bg-cyber-dark/40 backdrop-blur-lg rounded-2xl border border-quantum-purple/20 p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-gemini-blue to-ai-purple bg-clip-text text-transparent mb-6">
        Learning Progress
      </h2>
      
      <div className="space-y-6">
        {progressData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-gray-300 font-medium">{item.label}</span>
              </div>
              <span className="text-white font-bold">{item.value}</span>
            </div>
            
            <div className="w-full bg-gray-700/50 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            
            <div className="text-right">
              <span className="text-sm text-gray-400">{item.progress.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-cyber-dark/60 rounded-xl p-4 border border-quantum-purple/20 text-center">
          <div className="text-2xl font-bold text-gemini-blue">{userStats.currentStreak}</div>
          <div className="text-sm text-gray-400">Day Streak</div>
        </div>
        <div className="bg-cyber-dark/60 rounded-xl p-4 border border-quantum-purple/20 text-center">
          <div className="text-2xl font-bold text-ai-purple">{userStats.lessonsCompleted}</div>
          <div className="text-sm text-gray-400">Lessons</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mt-6 p-4 bg-cyber-dark/60 rounded-xl border border-quantum-purple/20">
        <h3 className="text-lg font-semibold text-white mb-3">Level Progression</h3>
        <div className="flex justify-between items-center mb-2">
          {Object.entries(learningLevels).map(([key, level]) => (
            <div
              key={key}
              className={`text-center ${
                learningLevel === key ? 'scale-110 transform' : 'opacity-60'
              } transition-all duration-300`}
            >
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                learningLevel === key 
                  ? `bg-gradient-to-r ${level.color}`
                  : 'bg-gray-600'
              }`}></div>
              <span className="text-xs text-gray-400">L{level.level}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-1000"
            style={{ width: `${(learningLevels[learningLevel].level / 4) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};