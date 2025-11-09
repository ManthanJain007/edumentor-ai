import React from 'react';
import { Brain, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useGeminiAI } from '../../hooks/useGeminiAI';

export const Header: React.FC = () => {
  const { state } = useApp();
  const { usingFallback, resetToGemini } = useGeminiAI();

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'child': return 'Young Learner';
      case 'teen': return 'High School';
      case 'college': return 'University';
      case 'expert': return 'Advanced';
      default: return 'Adaptive';
    }
  };

  return (
    <header className="glass-effect rounded-2xl m-4 p-6 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-gemini-blue to-ai-purple rounded-xl flex items-center justify-center animate-pulse-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-quantum-green rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gemini-blue to-neural-teal bg-clip-text text-transparent">
              EduMentor AI
            </h1>
            <p className="text-white/60 text-sm">Revolutionary Learning Platform</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-white/60">Current Level</div>
            <div className="text-gemini-blue font-semibold">{getLevelLabel(state.currentLevel)}</div>
            <div className={`flex items-center space-x-1 text-xs ${usingFallback ? 'text-yellow-400' : 'text-green-400'}`}>
              {usingFallback ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
              <span>{usingFallback ? 'Mock Mode' : 'Gemini AI'}</span>
              {usingFallback && (
                <button 
                  onClick={resetToGemini}
                  className="text-blue-400 hover:text-blue-300"
                  title="Retry Gemini API"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gemini-blue to-ai-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};