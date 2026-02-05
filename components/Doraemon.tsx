
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoraemonMood } from '../types';

interface DoraemonProps {
  mood: DoraemonMood;
  className?: string;
}

const Doraemon: React.FC<DoraemonProps> = ({ mood, className = "" }) => {
  const variants = {
    peek: { y: 20, rotate: -5 },
    neutral: { y: 0, scale: 1 },
    sad: { y: 5, scale: 0.95 },
    worried: { x: [-2, 2, -2, 2, 0], transition: { repeat: Infinity, duration: 0.3 } },
    happy: { y: [0, -20, 0], transition: { repeat: Infinity, duration: 0.6 } },
    cake: { scale: 1.1 }
  };

  return (
    <motion.div 
      className={`relative w-32 h-32 pointer-events-none z-50 ${className}`}
      variants={variants}
      animate={mood}
    >
      {/* Head */}
      <div className="absolute inset-0 bg-blue-500 rounded-full border-2 border-black overflow-hidden shadow-lg">
        {/* Face White Area */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[80%] bg-white rounded-full border border-black/20" />
        
        {/* Eyes Container */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-0">
          <div className="w-8 h-10 bg-white border border-black rounded-full relative">
            <AnimatePresence mode="wait">
              {mood === 'sad' ? (
                <motion.div key="sad" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 left-2 w-1.5 h-1.5 bg-black rounded-full" />
              ) : mood === 'happy' ? (
                <motion.div key="happy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 left-2 w-4 h-1 border-t-2 border-black rounded-full" />
              ) : (
                <motion.div key="normal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 left-4 w-1.5 h-1.5 bg-black rounded-full" />
              )}
            </AnimatePresence>
          </div>
          <div className="w-8 h-10 bg-white border border-black rounded-full relative">
            <AnimatePresence mode="wait">
              {mood === 'sad' ? (
                <motion.div key="sad" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 right-2 w-1.5 h-1.5 bg-black rounded-full" />
              ) : mood === 'happy' ? (
                <motion.div key="happy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 right-2 w-4 h-1 border-t-2 border-black rounded-full" />
              ) : (
                <motion.div key="normal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 left-2 w-1.5 h-1.5 bg-black rounded-full" />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Nose */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 border border-black rounded-full shadow-inner" />

        {/* Mouth/Whiskers Logic */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-16 h-8 border-b-2 border-black rounded-full" />
      </div>

      {/* Bell */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 border border-black rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
      </div>

      {/* Special: Cake */}
      {mood === 'cake' && (
        <motion.div 
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-14"
        >
          <div className="relative">
             <div className="bg-pink-100 border-2 border-pink-300 w-12 h-8 rounded-t-lg shadow-sm" />
             <div className="bg-pink-200 border-x-2 border-b-2 border-pink-300 w-12 h-4 rounded-b-lg flex justify-center space-x-1 py-1">
                <div className="w-1 h-1 bg-red-400 rounded-full" />
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="w-1 h-1 bg-yellow-400 rounded-full" />
             </div>
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-orange-400 rounded-full">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-300 rounded-full blur-[2px]" 
                />
             </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Doraemon;
