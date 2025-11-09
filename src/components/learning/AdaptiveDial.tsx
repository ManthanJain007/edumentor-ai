// src/components/learning/AdaptiveDial.tsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';

export const AdaptiveDial: React.FC = () => {
  const { state, dispatch } = useApp();
  const { learningLevel } = state;
  const [rotation, setRotation] = useState(0);

  // Define learning levels with proper structure
  const learningLevels = {
    beginner: { 
      name: 'Young Learner', 
      level: 1, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      description: 'Ages 6-12: Basic concepts with fun examples'
    },
    intermediate: { 
      name: 'High School', 
      level: 2, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      description: 'Ages 13-18: Real-world examples and modern references'
    },
    advanced: { 
      name: 'University', 
      level: 3, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Ages 18-22: Advanced concepts and critical thinking'
    },
    expert: { 
      name: 'Advanced', 
      level: 4, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-r from-orange-500 to-red-500',
      description: 'Ages 22+: Expert-level analysis and research'
    }
  };

  // Get current level with fallback
  const currentLevel = learningLevels[learningLevel] || learningLevels.intermediate;

  // Calculate rotation based on level
  useEffect(() => {
    const levelIndex = Object.keys(learningLevels).indexOf(learningLevel);
    const newRotation = (levelIndex / Object.keys(learningLevels).length) * 360;
    setRotation(newRotation);
  }, [learningLevel]);

  const handleLevelChange = (newLevel: keyof typeof learningLevels) => {
    dispatch({ type: 'SET_LEARNING_LEVEL', payload: newLevel });
  };

  const levels = Object.entries(learningLevels) as [keyof typeof learningLevels, typeof learningLevels[keyof typeof learningLevels]][];

  return (
    <div className="bg-cyber-dark/40 backdrop-blur-lg rounded-2xl border border-quantum-purple/20 p-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-gemini-blue to-ai-purple bg-clip-text text-transparent mb-4">
        Learning Level
      </h2>
      
      {/* Dial Visualization */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-600/30"></div>
          
          {/* Progress Ring */}
          <div 
            className="absolute inset-2 rounded-full border-4 border-transparent"
            style={{
              background: `conic-gradient(
                from 0deg,
                ${getGradientColors(learningLevels)},
                #3b82f6 360deg
              )`
            }}
          ></div>
          
          {/* Center Display */}
          <div className="absolute inset-8 rounded-full bg-cyber-dark/80 backdrop-blur-lg border border-quantum-purple/20 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${currentLevel.bgColor} bg-clip-text text-transparent`}>
                L{currentLevel.level}
              </div>
              <div className="text-xs text-gray-400 mt-1">Level</div>
            </div>
          </div>
          
          {/* Indicator */}
          <div 
            className="absolute top-2 left-1/2 w-2 h-6 bg-gemini-blue rounded-full transform -translate-x-1/2"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
          ></div>
        </div>
      </div>

      {/* Level Selector */}
      <div className="space-y-3">
        {levels.map(([key, level]) => (
          <button
            key={key}
            onClick={() => handleLevelChange(key)}
            className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-300 ${
              learningLevel === key
                ? 'border-gemini-blue bg-blue-500/20 shadow-lg shadow-blue-500/25'
                : 'border-gray-600/50 bg-cyber-dark/60 hover:border-gray-500'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`font-semibold ${
                learningLevel === key ? 'text-white' : 'text-gray-300'
              }`}>
                {level.name}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                learningLevel === key 
                  ? 'bg-gemini-blue text-white' 
                  : 'bg-gray-600 text-gray-400'
              }`}>
                Level {level.level}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {level.description}
            </div>
          </button>
        ))}
      </div>

      {/* Current Level Info */}
      <div className="mt-4 p-3 bg-cyber-dark/60 rounded-lg border border-quantum-purple/20">
        <div className="text-sm text-gray-400 mb-1">Current Level</div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white">{currentLevel.name}</span>
          <div className={`w-3 h-3 rounded-full ${currentLevel.bgColor}`}></div>
        </div>
      </div>
    </div>
  );
};

// Helper function for gradient colors
function getGradientColors(levels: any) {
  const colors = Object.values(levels).map((level: any) => 
    level.color.replace('from-', '').replace('to-', '').split(' to ')
  ).flat();
  
  return colors.join(', ');
}