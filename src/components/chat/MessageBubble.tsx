import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Volume2 } from 'lucide-react';
import { ChatMessage } from '../../types';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { speakText } = useVoiceRecognition();
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-r from-gemini-blue to-ai-purple' 
          : 'bg-gradient-to-r from-neural-teal to-quantum-green'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? 'bg-gemini-blue/20 border border-gemini-blue/30 rounded-br-none'
            : 'bg-white/10 border border-white/20 rounded-bl-none'
        }`}>
          <p className="text-white leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          
          {!isUser && (
            <button
              onClick={() => speakText(message.content)}
              className="mt-2 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Listen to response"
            >
              <Volume2 className="w-4 h-4 text-white/60" />
            </button>
          )}
        </div>
        
        <div className={`text-xs text-white/40 mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString()} • Level: <span className="capitalize">{message.learningLevel}</span>
        </div>
      </div>
    </motion.div>
  );
};