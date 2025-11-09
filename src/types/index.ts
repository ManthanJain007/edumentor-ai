export type LearningLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type EmotionType = 'curious' | 'confused' | 'frustrated' | 'excited' | 'neutral';
export type ActiveTab = 'learn' | 'progress' | 'achievements' | 'settings';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
  progress?: number;
  category: 'learning' | 'engagement' | 'mastery';
}

export interface LearningProgress {
  currentLevel: LearningLevel;
  points: number;
  streak: number;
  totalQuestions: number;
  sessionsCompleted: number;
  lastActive: Date;
}

export interface Settings {
  notifications: boolean;
  sound: boolean;
  darkMode: boolean;
  autoSave: boolean;
  language: string;
  fontSize: number;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  learningLevel: LearningLevel;
}

export interface UserStats {
  messagesSent: number;
  lessonsCompleted: number;
  currentStreak: number;
  totalPoints: number;
}