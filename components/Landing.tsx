
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Doraemon from './Doraemon';

interface LandingProps {
  onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
  const [showDoraemon, setShowDoraemon] = useState(false);
  const words = "Happiest Birthday, Prenuuu ❤️❤️❤️❤️".split(" ");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-200 via-lavender-100 to-peach-100 animate-gradient">
      <div className="px-8 text-center">
        <motion.h1 
          className="text-4xl font-romantic font-bold text-pink-600 leading-tight"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.8, ease: "easeOut" }}
              className="inline-block mr-2"
              onAnimationComplete={() => i === words.length - 1 && setShowDoraemon(true)}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <AnimatePresence>
        {showDoraemon && (
          <>
            <motion.div
              initial={{ y: 100, x: -50 }}
              animate={{ y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="absolute bottom-[-20px] left-[-20px]"
            >
              <Doraemon mood="peek" className="scale-75" />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="mt-12 px-10 py-4 bg-white/60 glass rounded-full text-pink-500 font-bold shadow-pink-200 shadow-xl relative z-10"
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
              >
                Come here 💫
              </motion.span>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
