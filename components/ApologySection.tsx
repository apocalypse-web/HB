
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Doraemon from './Doraemon';
import confetti from 'canvas-confetti';

interface ApologySectionProps {
  onNext: () => void;
}

const ApologySection: React.FC<ApologySectionProps> = ({ onNext }) => {
  const [typedText, setTypedText] = useState("");
  const fullText = `Hey Prenuuu…

I want to say this slowly, properly, and from my heart.

I really wanted to make your birthday special. I had planned to surprise you with a birthday video just for you. I spent a lot of time trying to make it, but the app kept crashing again and again. I tried so many times, but nothing worked, and I couldn’t finish it the way I wanted to.

At the same time, I made a mistake. I behaved rudely with you today. I know it hurt you, and I am truly sorry for that. You did not deserve that at all.

The truth is, I was acting that way only because I was trying to hide the surprise. I thought if I stayed distant, you wouldn’t guess anything. But instead of protecting the surprise, I ended up hurting you — and that’s on me.

I never want to be the reason you feel sad, confused, or unwanted. You mean too much to me for that. Even when I mess up, my intentions are never to hurt you.

I know sorry is a small word, but I really mean it. I’m sorry for the way I spoke. I’m sorry for making you feel bad on a day that should only be happy for you.

I hope you can forgive me. And I promise to do better — not just today, but always.

You are very special to me, Prenuuu. More than you know. 🤍`;

  const [showButton, setShowButton] = useState(false);
  const [isForgiven, setIsForgiven] = useState<null | boolean>(null);
  const [noClicks, setNoClicks] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i += 4; // Faster typing for the long heartfelt text
      if (i > fullText.length) {
        clearInterval(interval);
        setShowButton(true);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleYes = () => {
    setIsForgiven(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffc0cb', '#e6e6fa', '#ffdab9']
    });
  };

  const handleNo = () => {
    setNoClicks(prev => prev + 1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-pink-50 px-4 py-6 relative overflow-hidden">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm glass rounded-3xl p-6 text-slate-700 relative z-10 flex flex-col max-h-[80vh] shadow-2xl"
      >
        <div className="font-semibold text-lg mb-3 text-pink-600 flex items-center shrink-0">
          <span className="mr-2">💌</span> A Special Letter
        </div>
        <div className="text-sm leading-relaxed overflow-y-auto pr-2 flex-grow custom-scrollbar">
          <p className="whitespace-pre-wrap">
            {typedText}
            <span className="animate-pulse inline-block w-1.5 h-4 bg-pink-400 ml-1"></span>
          </p>
        </div>

        <AnimatePresence>
          {showButton && !isForgiven && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setIsForgiven(false)}
              className="mt-6 w-full py-4 bg-pink-400 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 shrink-0 active:scale-95 transition-transform"
            >
              Forgive me, Please? 🥺
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-end w-full max-w-sm mt-4">
        <Doraemon mood={isForgiven === true ? 'happy' : (isForgiven === false ? 'worried' : 'sad')} className="scale-75 -mr-4" />
      </div>

      <AnimatePresence>
        {(isForgiven === false) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
          >
            <motion.div 
              animate={noClicks > 0 ? { x: [-5, 5, -5, 5, 0] } : {}}
              className="w-full max-w-xs bg-white rounded-3xl p-8 text-center shadow-2xl"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-2">pakku?</h3>
              {noClicks > 0 && (
                <p className="text-red-400 font-bold mb-1">Khbr j hati 😭</p>
              )}
              {noClicks > 0 && (
                <p className="text-sm text-slate-400 mb-6">I really wanted to surprise you...</p>
              )}
              
              <div className="flex flex-col space-y-3 mt-4">
                <button 
                  onClick={handleYes}
                  className="w-full py-4 bg-green-400 text-white rounded-2xl font-bold active:scale-95 transition-transform"
                >
                  Yes, I forgive you ❤️
                </button>
                <button 
                  onClick={handleNo}
                  className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-medium active:scale-95 transition-transform"
                >
                  No 😔
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isForgiven === true && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md p-6"
          >
            <div className="text-center">
              <Doraemon mood="happy" className="mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-pink-600 mb-8 px-4 leading-relaxed">
                Thank You So Much, Prenuuu! 🤗
              </h2>
              <button
                onClick={onNext}
                className="px-12 py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl animate-bounce"
              >
                Let’s Continue →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApologySection;
