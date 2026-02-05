
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES } from '../constants';
import Doraemon from './Doraemon';
import confetti from 'canvas-confetti';

interface MemoryJourneyProps {
  onNext: () => void;
}

const HeartPop: React.FC<{ x: number, y: number }> = ({ x, y }) => {
  return (
    <div className="absolute pointer-events-none z-[100]" style={{ left: x, top: y }}>
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: [0, 1.8, 1.2], 
            x: (Math.random() - 0.5) * 200, 
            y: (Math.random() - 0.5) * 200,
            rotate: (Math.random() - 0.5) * 90
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute text-3xl"
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
};

const MemoryJourney: React.FC<MemoryJourneyProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paths, setPaths] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [showHearts, setShowHearts] = useState<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const handleResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    
    const generatedPaths: string[] = [];
    for (let i = 0; i < MEMORIES.length - 1; i++) {
      const start = MEMORIES[i];
      const end = MEMORIES[i+1];
      const midY = (start.y + end.y) / 2;
      const controlX = (start.x + end.x) / 2 + (i % 2 === 0 ? 200 : -200);
      generatedPaths.push(`M ${start.x} ${start.y} Q ${controlX} ${midY} ${end.x} ${end.y}`);
    }
    setPaths(generatedPaths);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setShowHearts({ id: Date.now(), x: MEMORIES[currentIndex].x, y: MEMORIES[currentIndex].y });
    
    if (currentIndex < MEMORIES.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 900);
    } else {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#ec4899', '#db2777']
      });
      setTimeout(onNext, 1500);
    }
  };

  const current = MEMORIES[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fffcfd]">
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          x: viewport.w / 2 - current.x, 
          y: viewport.h / 2 - current.y 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 35, 
          damping: 20,
          mass: 1.5
        }}
      >
        <svg className="absolute inset-0 w-[5000px] h-[6000px] pointer-events-none overflow-visible">
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#fbcfe8"
              strokeWidth="5"
              strokeDasharray="15,15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: i < currentIndex ? 1 : (i === currentIndex ? 0.35 : 0),
                opacity: i <= currentIndex ? 0.6 : 0.1
              }}
              transition={{ duration: 1.5 }}
            />
          ))}
        </svg>

        {showHearts && (
          <HeartPop key={showHearts.id} x={showHearts.x} y={showHearts.y} />
        )}

        <motion.div
          className="absolute pointer-events-none z-10"
          animate={{ 
            x: current.x + 100,
            y: current.y - 180,
            rotate: isTransitioning ? [0, -10, 10, 0] : [20, 25, 20],
            scale: isTransitioning ? 0.6 : 0.55
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            default: { duration: 1.2 }
          }}
        >
          <Doraemon mood={isTransitioning ? 'happy' : 'peek'} className="opacity-90 drop-shadow-lg" />
        </motion.div>

        {MEMORIES.map((memory, i) => (
          <motion.div
            key={memory.id}
            className={`absolute ${i === currentIndex ? 'z-30' : 'z-20'}`}
            style={{ 
              left: memory.x, 
              top: memory.y,
              x: "-50%",
              y: "-50%"
            }}
            animate={{ 
              scale: i === currentIndex ? 1 : 0.7,
              opacity: i === currentIndex ? 1 : 0.1,
              filter: i === currentIndex ? 'blur(0px)' : 'blur(2px)'
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Memory Card Frame */}
            <div className="w-[88vw] max-w-[340px] min-h-[500px] bg-white rounded-[3rem] p-5 shadow-[0_20px_50px_rgba(244,114,182,0.15)] border-white border-[6px] relative flex flex-col">
              
              {/* Fixed Aspect Ratio Media Container */}
              <div className="overflow-hidden rounded-[2.5rem] mb-5 aspect-[4/5] bg-pink-50/30 flex items-center justify-center relative shadow-inner shrink-0">
                {memory.video ? (
                  <video 
                    src={memory.video} 
                    className="w-full h-full object-contain"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={memory.image} 
                    alt="Memory" 
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                )}
              </div>
              
              {/* Caption Area */}
              <div className="px-4 pb-3 text-center flex-grow flex flex-col justify-between">
                 <p className="text-[15px] text-slate-700 leading-relaxed mb-6 font-serif-romantic italic whitespace-pre-line">
                  "{memory.caption}"
                </p>
                
                <AnimatePresence>
                  {i === currentIndex && !isTransitioning && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={handleNext}
                      className="w-full py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-[1.5rem] font-bold text-sm shadow-xl shadow-pink-200 uppercase tracking-widest"
                    >
                      {i === MEMORIES.length - 1 ? "Celebrate Now ✨" : "Next Memory →"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-10 left-0 w-full px-12 z-50 pointer-events-none">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">Memory Journey</span>
          <span className="text-[10px] font-bold text-pink-400">{Math.round(((currentIndex + 1) / MEMORIES.length) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-pink-500"
            animate={{ width: `${((currentIndex + 1) / MEMORIES.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute top-12 left-0 w-full text-center px-10 pointer-events-none z-50">
        <div className="flex justify-center space-x-2">
          {MEMORIES.map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                height: i === currentIndex ? 12 : 6,
                width: 6,
                backgroundColor: i === currentIndex ? '#f472b6' : '#fce7f3',
              }}
              className="rounded-full transition-all duration-500" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryJourney;
