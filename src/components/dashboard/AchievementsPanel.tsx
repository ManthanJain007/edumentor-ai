// src/components/dashboard/AchievementsPanel.tsx
import React from 'react';
import { useApp } from '../../contexts/AppContext';

export const AchievementsPanel: React.FC = () => {
  const { state } = useApp();
  const { achievements, userStats } = state;

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  const getAchievementProgress = (achievementId: string) => {
    switch (achievementId) {
      case 'first-steps':
        return userStats.messagesSent >= 1 ? 100 : (userStats.messagesSent / 1) * 100;
      case 'quick-learner':
        return userStats.messagesSent >= 10 ? 100 : (userStats.messagesSent / 10) * 100;
      case 'knowledge-seeker':
        return userStats.messagesSent >= 20 ? 100 : (userStats.messagesSent / 20) * 100;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-cyber-dark/40 backdrop-blur-lg rounded-2xl border border-quantum-purple/20 p-6 h-[600px] flex flex-col">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-gemini-blue to-ai-purple bg-clip-text text-transparent mb-6">
        Achievements
      </h2>

      {/* Progress Overview */}
      <div className="bg-cyber-dark/60 rounded-xl p-4 border border-quantum-purple/20 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Collection Progress</span>
          <span className="text-white font-bold">{unlockedCount}/{totalCount}</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-3">
          <div 
            className="h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-right mt-1">
          <span className="text-sm text-gray-400">{progressPercentage.toFixed(1)}% Complete</span>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const progress = getAchievementProgress(achievement.id);
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 backdrop-blur-lg transition-all duration-300 ${
                  achievement.unlocked
                    ? 'border-yellow-400/50 bg-yellow-500/10 shadow-lg shadow-yellow-500/20'
                    : 'border-gray-600/50 bg-cyber-dark/60 opacity-70'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`text-2xl p-2 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-yellow-500/20' 
                      : 'bg-gray-600/50'
                  }`}>
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.unlocked ? 'text-yellow-300' : 'text-gray-300'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          achievement.unlocked
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {achievement.unlocked ? 'Completed' : `${progress.toFixed(0)}%`}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        achievement.unlocked
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-gray-600/50 text-gray-400'
                      }`}>
                        {achievement.unlocked ? '✅ Unlocked' : '🔒 Locked'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 pt-4 border-t border-quantum-purple/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gemini-blue">{unlockedCount}</div>
            <div className="text-xs text-gray-400">Unlocked</div>
          </div>
          <div>
            <div className="text-lg font-bold text-ai-purple">{totalCount - unlockedCount}</div>
            <div className="text-xs text-gray-400">Locked</div>
          </div>
          <div>
            <div className="text-lg font-bold text-quantum-green">{progressPercentage.toFixed(0)}%</div>
            <div className="text-xs text-gray-400">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};