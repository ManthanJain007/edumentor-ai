// src/components/dashboard/SettingsPanel.tsx
import React from 'react';
import { useApp } from '../../contexts/AppContext';

export const SettingsPanel: React.FC = () => {
  const { state, dispatch } = useApp();
  const { settings, learningLevel } = state;

  const learningLevels = {
    beginner: { name: 'Young Learner', color: 'text-green-400' },
    intermediate: { name: 'High School', color: 'text-blue-400' },
    advanced: { name: 'University', color: 'text-purple-400' },
    expert: { name: 'Advanced', color: 'text-orange-400' }
  };

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    dispatch({ 
      type: 'UPDATE_SETTINGS', 
      payload: { [key]: value } 
    });
  };

  const handleLevelChange = (level: any) => {
    dispatch({ 
      type: 'SET_LEARNING_LEVEL', 
      payload: level 
    });
  };

  const settingGroups = [
    {
      title: 'Preferences',
      icon: '⚙️',
      settings: [
        {
          key: 'notifications',
          label: 'Push Notifications',
          type: 'toggle',
          description: 'Receive learning reminders and updates'
        },
        {
          key: 'sound',
          label: 'Sound Effects',
          type: 'toggle',
          description: 'Enable interface sounds'
        },
        {
          key: 'darkMode',
          label: 'Dark Mode',
          type: 'toggle',
          description: 'Use dark theme interface'
        },
        {
          key: 'autoSave',
          label: 'Auto-save Progress',
          type: 'toggle',
          description: 'Automatically save your learning progress'
        }
      ]
    },
    {
      title: 'Appearance',
      icon: '🎨',
      settings: [
        {
          key: 'fontSize',
          label: 'Font Size',
          type: 'select',
          options: [
            { value: 14, label: 'Small' },
            { value: 16, label: 'Medium' },
            { value: 18, label: 'Large' }
          ],
          description: 'Adjust text size for better readability'
        },
        {
          key: 'language',
          label: 'Language',
          type: 'select',
          options: [
            { value: 'english', label: 'English' },
            { value: 'spanish', label: 'Spanish' },
            { value: 'french', label: 'French' }
          ],
          description: 'Interface language preference'
        }
      ]
    }
  ];

  return (
    <div className="bg-cyber-dark/40 backdrop-blur-lg rounded-2xl border border-quantum-purple/20 p-6 h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-gemini-blue to-ai-purple bg-clip-text text-transparent mb-6">
        Settings
      </h2>

      {/* Learning Level Setting */}
      <div className="bg-cyber-dark/60 rounded-xl p-4 border border-quantum-purple/20 mb-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <span className="mr-2">🎓</span>
          Learning Level
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Adjust the difficulty and style of AI responses to match your learning needs
        </p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(learningLevels).map(([key, level]) => (
            <button
              key={key}
              onClick={() => handleLevelChange(key)}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                learningLevel === key
                  ? 'border-gemini-blue bg-blue-500/20 shadow-lg shadow-blue-500/25'
                  : 'border-gray-600 bg-cyber-dark/40 hover:border-gray-500'
              }`}
            >
              <div className={`font-semibold ${level.color}`}>
                {level.name}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Level {Object.keys(learningLevels).indexOf(key) + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-cyber-dark/60 rounded-xl p-4 border border-quantum-purple/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">{group.icon}</span>
              {group.title}
            </h3>
            
            <div className="space-y-4">
              {group.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <div className="text-white font-medium">{setting.label}</div>
                    <div className="text-gray-400 text-sm">{setting.description}</div>
                  </div>
                  
                  <div className="ml-4">
                    {setting.type === 'toggle' && (
                      <button
                        onClick={() => handleSettingChange(
                          setting.key as keyof typeof settings, 
                          !settings[setting.key as keyof typeof settings]
                        )}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          settings[setting.key as keyof typeof settings] 
                            ? 'bg-gradient-to-r from-gemini-blue to-ai-purple' 
                            : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            settings[setting.key as keyof typeof settings] 
                              ? 'translate-x-6' 
                              : 'translate-x-0'
                          }`}
                        />
                      </button>
                    )}
                    
                    {setting.type === 'select' && (
                      <select
                        value={settings[setting.key as keyof typeof settings] as string | number}
                        onChange={(e) => handleSettingChange(
                          setting.key as keyof typeof settings, 
                          setting.key === 'fontSize' ? parseInt(e.target.value) : e.target.value
                        )}
                        className="bg-cyber-dark border border-quantum-purple/30 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-gemini-blue"
                      >
                        {setting.options?.map((option, optIndex) => (
                          <option key={optIndex} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-8 pt-6 border-t border-quantum-purple/20">
        <button className="flex-1 bg-gradient-to-r from-gemini-blue to-ai-purple text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
          Save Changes
        </button>
        <button 
          onClick={() => dispatch({ type: 'CLEAR_CHAT_HISTORY' })}
          className="px-6 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-colors"
        >
          Clear Data
        </button>
      </div>
    </div>
  );
};