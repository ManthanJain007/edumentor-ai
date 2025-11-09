// src/contexts/AppContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { LearningLevel, ActiveTab, ChatMessage, Achievement, Settings, UserStats } from '../types';

interface AppState {
  activeTab: ActiveTab;
  learningLevel: LearningLevel;
  chatHistory: ChatMessage[];
  achievements: Achievement[];
  settings: Settings;
  userStats: UserStats;
}

type AppAction =
  | { type: 'SET_ACTIVE_TAB'; payload: ActiveTab }
  | { type: 'SET_LEARNING_LEVEL'; payload: LearningLevel }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'CLEAR_CHAT_HISTORY' }
  | { type: 'UPDATE_ACHIEVEMENT'; payload: { id: string; unlocked: boolean } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'UPDATE_USER_STATS'; payload: Partial<UserStats> };

const initialState: AppState = {
  activeTab: 'learn',
  learningLevel: 'intermediate',
  chatHistory: [],
  achievements: [
    { id: 'first-steps', title: 'First Steps', description: 'Send your first message', unlocked: false, icon: '🎯', category: 'engagement' },
    { id: 'quick-learner', title: 'Quick Learner', description: 'Send 10 messages', unlocked: false, icon: '⚡', category: 'learning' },
    { id: 'knowledge-seeker', title: 'Knowledge Seeker', description: 'Ask 20 questions', unlocked: false, icon: '🔍', category: 'learning' },
  ],
  settings: {
    notifications: true,
    sound: true,
    darkMode: false,
    autoSave: true,
    language: 'english',
    fontSize: 16
  },
  userStats: {
    messagesSent: 0,
    lessonsCompleted: 0,
    currentStreak: 0,
    totalPoints: 0
  }
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_LEARNING_LEVEL':
      return { ...state, learningLevel: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { 
        ...state, 
        chatHistory: [...state.chatHistory, action.payload],
        userStats: { ...state.userStats, messagesSent: state.userStats.messagesSent + 1 }
      };
    case 'CLEAR_CHAT_HISTORY':
      return { ...state, chatHistory: [] };
    case 'UPDATE_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(ach =>
          ach.id === action.payload.id ? { ...ach, unlocked: action.payload.unlocked } : ach
        )
      };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'UPDATE_USER_STATS':
      return { ...state, userStats: { ...state.userStats, ...action.payload } };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};