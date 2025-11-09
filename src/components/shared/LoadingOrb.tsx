import React from 'react';
import { motion } from 'framer-motion';

export const LoadingOrb: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-r from-gemini-blue to-ai-purple"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};