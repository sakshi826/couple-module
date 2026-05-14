import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TopLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const diff = Math.random() * 10;
        return Math.min(prev + diff, 90);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        className="h-[3px] bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"
      />
    </div>
  );
};
