import { useState } from 'react';
import { voiceService } from '../services/voiceService';
import { useGeminiAI } from './useGeminiAI';

export const useVoiceRecognition = () => {
  const { sendMessage, usingFallback } = useGeminiAI();
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = async () => {
    try {
      if (!voiceService.isSpeechRecognitionSupported()) {
        setError('Voice recognition not supported in your browser. Please use Chrome or Edge.');
        return;
      }

      setError(null);
      setIsListening(true);
      
      const transcript = await voiceService.startListening();
      
      if (transcript.trim()) {
        await sendMessage(transcript);
      }
    } catch (error) {
      console.error('Voice recognition error:', error);
      setError(error instanceof Error ? error.message : 'Voice recognition failed');
    } finally {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
  };

  const speakText = (text: string) => {
    if (!voiceService.isSpeechSynthesisSupported()) {
      setError('Text-to-speech not supported in your browser');
      return;
    }
    voiceService.speak(text);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    startListening,
    stopListening,
    speakText,
    isListening,
    error,
    clearError,
    isSupported: voiceService.isSpeechRecognitionSupported() && voiceService.isSpeechSynthesisSupported(),
    usingFallback,
  };
};