import { useState } from 'react';
import { geminiService } from '../services/geminiAI';
import { smartAIService } from '../services/smartAIService';
import { ChatMessage, LearningLevel } from '../types';
import { useApp } from '../contexts/AppContext';

export const useGeminiAI = () => {
  const { state, dispatch } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  // Convert your LearningLevel to Gemini's expected format
  const convertLearningLevel = (level: LearningLevel): 'child' | 'teen' | 'college' | 'expert' => {
    switch (level) {
      case 'beginner': return 'child';
      case 'intermediate': return 'teen';
      case 'advanced': return 'college';
      case 'expert': return 'expert';
      default: return 'teen';
    }
  };

  const sendMessage = async (content: string, imageFile?: File): Promise<string> => {
    // Create and dispatch user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: content,
      timestamp: new Date(),
      learningLevel: state.learningLevel,
    };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });

    setIsProcessing(true);

    try {
      let response: string;

      // Try Gemini API first
      if (!usingFallback) {
        try {
          console.log('🔄 Attempting to use Gemini API...');
          // Convert learning level for Gemini service
          const geminiLevel = convertLearningLevel(state.learningLevel);
          response = await geminiService.sendMessage(
            content,
            geminiLevel,
            'curious',
            imageFile
          );
          console.log('✅ Gemini API successful');
        } catch (geminiError) {
          console.warn('❌ Gemini API failed, switching to fallback mode');
          setUsingFallback(true);
          
          // Now use smart service as fallback
          const smartLevel = convertLearningLevel(state.learningLevel);
          response = await smartAIService.sendMessage(
            content,
            smartLevel,
            'curious',
            imageFile
          );
        }
      } else {
        // Already in fallback mode, use smart service directly
        const smartLevel = convertLearningLevel(state.learningLevel);
        response = await smartAIService.sendMessage(
          content,
          smartLevel,
          'curious',
          imageFile
        );
      }

      // Create and dispatch AI message
      const aiMessage: ChatMessage = {
        role: 'ai',
        content: response,
        timestamp: new Date(),
        learningLevel: state.learningLevel,
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiMessage });

      // Update user stats
      dispatch({
        type: 'UPDATE_USER_STATS',
        payload: {
          messagesSent: state.userStats.messagesSent + 1,
        },
      });

      return response;

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Create and dispatch error message
      const errorMessage: ChatMessage = {
        role: 'ai',
        content: error instanceof Error ? error.message : "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        learningLevel: state.learningLevel,
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: errorMessage });
      
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  // Method to reset and try Gemini again
  const resetToGemini = () => {
    setUsingFallback(false);
  };

  return {
    sendMessage,
    isProcessing,
    usingFallback,
    resetToGemini,
  };
};