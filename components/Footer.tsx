
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-transparent text-center">
      <p className="text-pink-300/60 text-xs font-medium tracking-widest flex items-center justify-center">
        Made by your Doracake with 
        <motion.span
          whileTap={{ scale: 2, rotate: 15 }}
          className="mx-1 cursor-pointer inline-block text-pink-500"
        >
          ❤️
        </motion.span>
      </p>
    </footer>
  );
};

export default Footer;
