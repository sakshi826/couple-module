import { History, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onContinue: () => void;
  onBack: () => void;
  onHistory: () => void;
}

const ScreenEntry = ({ onContinue, onHistory }: Props) => {
  const { t } = useTranslation();
  const description = (typeof t !== "undefined" ? t : (k) => k)("entry.description", { returnObjects: true }) as string[];

  return (
    <div className="flex-1 flex flex-col items-center text-center gap-8 py-10" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl animate-bounce-slow">
        📖
      </div>
      
      <div className="space-y-6">
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          {(typeof t !== "undefined" ? t : (k) => k)("entry.title")}
        </h1>
        
        <div className="space-y-4 text-slate-500 font-medium leading-relaxed max-w-xs mx-auto text-base">
          {description && description.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
          <p className="italic">{(typeof t !== "undefined" ? t : (k) => k)("entry.breath")}</p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          {(typeof t !== "undefined" ? t : (k) => k)("entry.button_ready")}
          <ChevronRight size={20} strokeWidth={3} />
        </button>
        
        <button
          onClick={onHistory}
          className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <History size={20} strokeWidth={3} />
          {(typeof t !== "undefined" ? t : (k) => k)("entry.button_history")}
        </button>
      </div>

      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
        {(typeof t !== "undefined" ? t : (k) => k)("entry.footer")}
      </p>
    </div>
  );
};

export default ScreenEntry;
