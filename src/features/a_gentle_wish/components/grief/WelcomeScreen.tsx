import { motion } from "framer-motion";
import { Heart, BookOpen, ChevronLeft, ChevronRight, History } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onBegin: () => void;
  onViewPast: () => void;
  hasPastEntries: boolean;
}

export const WelcomeScreen = ({ onBegin, onViewPast, hasPastEntries }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex-1 flex flex-col items-center text-center gap-10 py-10" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl animate-pulse"
      >
        🕊️
      </motion.div>

      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-800 leading-tight">
          {(typeof t !== "undefined" ? t : (k) => k)("welcome_title")}
        </h1>
        <p className="text-slate-500 font-medium text-lg italic">{(typeof t !== "undefined" ? t : (k) => k)("welcome_subtitle")}</p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="space-y-6 text-slate-500 font-medium leading-relaxed max-w-xs mx-auto text-base"
      >
        <p>{(typeof t !== "undefined" ? t : (k) => k)("welcome_description")}</p>
        
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-200/50 italic text-slate-400">
          {(typeof t !== "undefined" ? t : (k) => k)("breathing_instruction")}
        </div>
        
        <p className="text-sm font-black uppercase tracking-widest text-slate-300">{(typeof t !== "undefined" ? t : (k) => k)("pace_instruction")}</p>
      </motion.div>

      <div className="w-full space-y-4">
        <button
          onClick={onBegin}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          {(typeof t !== "undefined" ? t : (k) => k)("begin_button")}
          <ChevronRight size={20} strokeWidth={3} />
        </button>
        
        {hasPastEntries && (
          <button
            onClick={onViewPast}
            className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
          >
            <History size={20} strokeWidth={3} />
            {(typeof t !== "undefined" ? t : (k) => k)("view_past_button")}
          </button>
        )}
      </div>
    </div>
  );
};

