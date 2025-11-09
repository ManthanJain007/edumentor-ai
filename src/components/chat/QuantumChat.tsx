import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Image, Loader, Bot, RefreshCw } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { useApp } from '../../contexts/AppContext';
import { useGeminiAI } from '../../hooks/useGeminiAI';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { ChatMessage } from '../../types';

export const QuantumChat: React.FC = () => {
  const { state } = useApp();
  const { sendMessage, isProcessing, usingFallback, resetToGemini } = useGeminiAI();
  const { 
    startListening, 
    stopListening, 
    speakText, 
    isListening, 
    error, 
    clearError, 
    isSupported 
  } = useVoiceRecognition();
  
  const [inputMessage, setInputMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the correct state properties from your AppContext
  const messages = state.chatHistory || [];
  const currentLevel = state.learningLevel;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !imageFile) || isProcessing) return;

    try {
      // Let useGeminiAI handle ALL message dispatching
      await sendMessage(inputMessage.trim(), imageFile || undefined);
    } catch (error) {
      // Error is already handled by useGeminiAI
      console.error('Error in handleSendMessage:', error);
    } finally {
      setInputMessage('');
      setImageFile(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const toggleVoiceRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleRetryGemini = () => {
    resetToGemini();
    clearError();
  };

  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10 h-[600px] flex flex-col">
      {/* Header with Connection Status */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">AI Learning Assistant</h3>
        <div className="flex items-center space-x-2">
          {usingFallback ? (
            <div className="flex items-center space-x-2 text-yellow-400 text-sm">
              <span>Using Smart Responses</span>
              <button
                onClick={handleRetryGemini}
                className="p-1 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
                title="Retry Gemini API"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Gemini AI Connected</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-6">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-white/60 h-full flex items-center justify-center"
            >
              <div>
                <div className="text-6xl mb-4">🎓</div>
                <div className="text-xl font-semibold mb-2">Welcome to EduMentor AI!</div>
                <div className="text-sm mb-4">Ask me anything, and I'll adapt to your learning level.</div>
                <div className="text-xs text-white/40">
                  Current Level: <span className="text-gemini-blue capitalize">{currentLevel}</span>
                </div>
                {usingFallback && (
                  <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm">
                    <strong>Note:</strong> Using enhanced smart responses. Gemini AI will be used when available.
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <MessageBubble 
                key={`${message.timestamp.getTime()}-${index}`} 
                message={message} 
              />
            ))
          )}
        </AnimatePresence>
        
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neural-teal to-quantum-green flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl rounded-bl-none p-4 flex items-center space-x-3">
              <Loader className="w-5 h-5 text-gemini-blue animate-spin" />
              <div className="flex flex-col">
                <span className="text-white text-sm">AI is thinking...</span>
                <span className="text-white/40 text-xs">
                  {usingFallback ? 'Using smart responses' : 'Connecting to Gemini AI...'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Error Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm mb-3"
        >
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-red-300 hover:text-white text-lg"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {!isSupported && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm mb-3"
        >
          Voice features are not supported in your browser. Please use Chrome or Edge for full functionality.
        </motion.div>
      )}

      {/* Input Area */}
      <div className="space-y-3">
        {/* Image Preview */}
        {imageFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg"
          >
            <Image className="w-4 h-4 text-gemini-blue" />
            <span className="text-sm text-white/80 flex-1 truncate">
              {imageFile.name}
            </span>
            <button
              onClick={() => setImageFile(null)}
              className="text-white/60 hover:text-white text-lg"
            >
              ×
            </button>
          </motion.div>
        )}

        {/* Input Controls */}
        <div className="flex space-x-2">
          {/* Image Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing}
            title="Upload image for analysis"
          >
            <Image className="w-5 h-5 text-gemini-blue" />
          </button>

          {/* Voice Recording */}
          <button
            onClick={toggleVoiceRecording}
            disabled={!isSupported || isProcessing}
            className={`p-3 rounded-xl border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              isListening
                ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                : 'bg-white/10 border-white/10 hover:bg-white/20 text-gemini-blue'
            }`}
            title={isSupported ? "Voice input" : "Voice not supported"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything... or use voice/image input"
              className="w-full h-12 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:border-gemini-blue/50 disabled:opacity-50"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
              disabled={isProcessing}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={(!inputMessage.trim() && !imageFile) || isProcessing}
            className="p-3 rounded-xl bg-gradient-to-r from-gemini-blue to-ai-purple hover:from-gemini-blue/90 hover:to-ai-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            title="Send message"
          >
            {isProcessing ? (
              <Loader className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Helper Text */}
        <div className="text-center">
          <div className="text-xs text-white/40">
            💡 Current level: <span className="text-gemini-blue capitalize">{currentLevel}</span> - AI will adapt explanations accordingly
          </div>
          {usingFallback && (
            <div className="text-xs text-yellow-400 mt-1">
              🔄 Smart mode active - Responses adapt to your learning level
            </div>
          )}
        </div>
      </div>
    </div>
  );
};