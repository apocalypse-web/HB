import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REASONS } from '../constants';
import Doraemon from './Doraemon';
import { DoraemonMood } from '../types';

interface SpecialReasonsProps {
  onNext: () => void;
}

const HeartBurst: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 2, 
            x: (Math.random() - 0.5) * 200, 
            y: (Math.random() - 0.5) * 200 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 text-xl"
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
};

const SpecialReasons: React.FC<SpecialReasonsProps> = ({ onNext }) => {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [doraemonMood, setDoraemonMood] = useState<DoraemonMood>('neutral');
  const [bursts, setBursts] = useState<{ id: number; key: number }[]>([]);

  const getMoodForReason = (id: number): DoraemonMood => {
    switch (id) {
      case 1: return 'happy';  // Mature and Childish
      case 2: return 'neutral'; // Respectful
      case 3: return 'peek';    // Caring
      case 4: return 'happy';  // Support
      case 5: return 'cake';   // Worth Everything
      case 6: return 'happy';  // Cheerleader
      default: return 'neutral';
    }
  };

  const toggleFlip = (id: number) => {
    const isNowFlipped = !flippedIds.includes(id);
    if (isNowFlipped) {
      setFlippedIds(prev => [...prev, id]);
      setDoraemonMood(getMoodForReason(id));
      // Revert to neutral after a short delay
      setTimeout(() => setDoraemonMood('neutral'), 3000);
    } else {
      setFlippedIds(prev => prev.filter(i => i !== id));
      setDoraemonMood('neutral');
    }
  };

  const handleBackTap = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setBursts(prev => [...prev, { id, key: Date.now() }]);
    setDoraemonMood(getMoodForReason(id));
    setTimeout(() => setDoraemonMood('neutral'), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#fff5f7] flex flex-col items-center px-6 py-16">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-romantic text-pink-600 mb-2"
        >
          Why You're So Special
        </motion.h2>
        <p className="text-slate-400 text-xs italic tracking-wider">Tap a reason to see what I think ❤️</p>
      </div>

      <div className="grid grid-cols-1 gap-5 w-full max-w-sm">
        {REASONS.map((reason) => (
          <div 
            key={reason.id} 
            className="h-44 relative perspective-1000 cursor-pointer"
            onClick={() => toggleFlip(reason.id)}
          >
            <motion.div
              className="w-full h-full relative"
              initial={false}
              animate={{ rotateY: flippedIds.includes(reason.id) ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Side */}
              <div 
                className="absolute inset-0 backface-hidden glass rounded-3xl flex flex-col items-center justify-center p-6 text-center border-pink-100 border-2 shadow-sm"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="w-12 h-12 bg-pink-100/50 rounded-full flex items-center justify-center mb-3 mx-auto">
                   <span className="text-2xl">💖</span>
                </div>
                <div className="font-bold text-pink-500 text-lg">Reason #{reason.id}</div>
              </div>

              {/* Back Side */}
              <div 
                className="absolute inset-0 backface-hidden glass rounded-3xl flex flex-col items-center justify-center p-5 text-center border-pink-300 border-2 bg-pink-50/50 shadow-inner overflow-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                onClick={(e) => handleBackTap(e, reason.id)}
              >
                <div className="font-bold text-pink-600 mb-2 text-lg">{reason.title}</div>
                <div className="text-sm text-slate-600 leading-relaxed px-2">{reason.description}</div>
                
                {bursts.filter(b => b.id === reason.id).map(burst => (
                  <HeartBurst key={burst.key} x={0} y={0} />
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="mt-16 sticky bottom-8 flex flex-col items-center z-50">
        <div className="relative">
          <Doraemon mood={doraemonMood} className="scale-75 mb-4" />
          <AnimatePresence>
            {flippedIds.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/90 rounded-full text-xs font-bold text-pink-400 shadow-md border border-pink-100 whitespace-nowrap"
              >
                {doraemonMood === 'happy' ? 'MY FAVORITE! ✨' : doraemonMood === 'peek' ? 'HEHE... 🙈' : 'YOU ARE AMAZING!'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {flippedIds.length >= REASONS.length && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-12 py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl shadow-pink-200 mt-2"
          >
            One Last Surprise... 🎁
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default SpecialReasons;