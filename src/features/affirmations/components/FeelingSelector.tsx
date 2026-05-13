import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { feelings } from '../data/affirmations';

interface FeelingSelectorProps {
  onSelect: (feelingId: string, colorIndex: number) => void;
}

const FEELING_COLORS = [
  "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100",
  "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100",
  "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100",
  "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100",
  "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100",
  "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100",
  "bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-100",
  "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100",
];

const FeelingSelector: React.FC<FeelingSelectorProps> = ({ onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">How are you feeling?</h2>
        <p className="text-slate-500 text-sm font-medium">Select the emotion you're experiencing right now.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {feelings.map((feeling, index) => (
          <motion.button
            key={feeling.id}
            whileHover={{ scale: 1.01, x: 4 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(feeling.id, index % FEELING_COLORS.length)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${FEELING_COLORS[index % FEELING_COLORS.length]}`}
          >
            <span className="font-bold text-base">{t(`feelings.${feeling.id}.label`)}</span>
            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-xl font-bold">→</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FeelingSelector;
