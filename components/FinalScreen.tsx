
import React from 'react';
import { motion } from 'framer-motion';
import Doraemon from './Doraemon';

const FinalScreen: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-pink-100 to-lavender-50 flex flex-col items-center justify-center text-center px-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Doraemon mood="cake" className="mx-auto mb-10" />
      </motion.div>

      <motion.h1 
        className="text-4xl font-romantic text-pink-600 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Happy Birthday, My Love
      </motion.h1>

      <motion.p
        className="text-slate-600 leading-relaxed mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        You are the most amazing person I've ever known. Thank you for being you, for laughing at my jokes, and for staying by my side. I hope this little journey made you smile even just a tiny bit. I promise to always try my best for you. ❤️
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex space-x-2 text-pink-300"
      >
        <span>🌸</span>
        <span>✨</span>
        <span>🌸</span>
      </motion.div>
    </div>
  );
};

export default FinalScreen;
