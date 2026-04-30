import { ChevronLeft, History, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onContinue: () => void;
  onBack: () => void;
  onHistory: () => void;
}

const ScreenEntry = ({ onContinue, onBack, onHistory }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center text-center gap-8 py-10" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl animate-bounce-slow">
        📖
      </div>
      
      <div className="space-y-6">
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          Let's take this one step at a time. 💛
        </h1>
        
        <div className="space-y-4 text-slate-500 font-medium leading-relaxed max-w-xs mx-auto text-base">
          <p>
            You don't have to tell your whole story today. Just a small part is enough.
          </p>
          <p>
            You're safe right now. You're in control of what you write—and what you don't.
          </p>
          <p className="italic">Take a slow breath before we begin.</p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          I'm ready
          <ChevronRight size={20} strokeWidth={3} />
        </button>
        
        <button
          onClick={onHistory}
          className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <History size={20} strokeWidth={3} />
          Past Narratives
        </button>
      </div>

      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
        Your words • Your pace • Your story
      </p>
    </div>
  );
};

export default ScreenEntry;

