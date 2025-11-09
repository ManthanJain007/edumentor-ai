import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface HolographicButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const HolographicButton: React.FC<HolographicButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const baseClasses = "flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-gemini-blue to-ai-purple hover:from-gemini-blue/90 hover:to-ai-purple/90 text-white shadow-lg",
    secondary: "glass-effect border border-white/20 hover:border-gemini-blue/50 hover:bg-gemini-blue/10 text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </motion.button>
  );
};