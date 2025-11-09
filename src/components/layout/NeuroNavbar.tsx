// src/components/layout/NeuroNavbar.tsx
import React from 'react';
import { useApp } from '../../contexts/AppContext';

export const NeuroNavbar: React.FC = () => {
  const { state, dispatch } = useApp();
  const { activeTab } = state;

  const tabs = [
    { id: 'learn' as const, label: '🚀 Learn', icon: '⚡' },
    { id: 'progress' as const, label: '📊 Progress', icon: '📈' },
    { id: 'achievements' as const, label: '🏆 Achievements', icon: '⭐' },
    { id: 'settings' as const, label: '⚙️ Settings', icon: '🔧' },
  ];

  return (
    <nav className="bg-cyber-dark/80 backdrop-blur-lg border-b border-quantum-purple/30">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gemini-blue to-ai-purple text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};