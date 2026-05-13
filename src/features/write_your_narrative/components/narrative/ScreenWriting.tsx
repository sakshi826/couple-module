import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  writing: string;
  setWriting: (v: string) => void;
  onContinue: () => void;
}

const ScreenWriting = ({ writing, setWriting, onContinue }: Props) => {
  const { t } = useTranslation();
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const prompts = (typeof t !== "undefined" ? t : (k) => k)("writing.prompts", { returnObjects: true }) as any[];

  const handlePromptClick = (prompt: string) => {
  const { t } = useTranslation();
    setActivePrompt(prompt);
    if (!writing) {
      setWriting(prompt + " ");
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          {(typeof t !== "undefined" ? t : (k) => k)("writing.title")}
        </h1>
        <p className="text-slate-500 font-medium text-base italic">{(typeof t !== "undefined" ? t : (k) => k)("writing.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          {(typeof t !== "undefined" ? t : (k) => k)("writing.prompt_label")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {prompts && prompts.map((p) => (
            <button
              key={p.text}
              onClick={() => handlePromptClick(p.text)}
              className={`text-sm font-black rounded-2xl px-5 py-3 transition-all duration-300 border ${
                activePrompt === p.text
                  ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.03]"
                  : "bg-white border-slate-100 text-slate-600 hover:border-primary/30 hover:bg-slate-50 shadow-sm"
              }`}
            >
              {p.emoji} {p.text}
            </button>
          ))}
        </div>
      </div>

      {/* Notebook effect */}
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 bg-white group transition-all duration-500 hover:shadow-primary/5">
        {/* Notebook spine */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-100 group-hover:bg-primary/20 transition-colors z-10" />
        {/* Red margin line */}
        <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-100/50 z-10" />
        
        {/* Lined background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 39px, #f1f5f9 39px, #f1f5f9 40px)",
            backgroundPosition: "0 24px",
          }}
        />
        
        <textarea
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          placeholder={(typeof t !== "undefined" ? t : (k) => k)("writing.placeholder")}
          className="relative z-[1] w-full min-h-[350px] bg-transparent pl-16 pr-10 py-8 text-slate-800 text-lg leading-[40px] text-left placeholder:text-slate-200 focus:outline-none resize-none font-medium"
        />
      </div>

      <div className="space-y-6">
        <p className="text-center text-slate-400 text-[13px] flex items-center justify-center gap-2 italic">
          <Sparkles size={14} className="text-primary/40" />
          {(typeof t !== "undefined" ? t : (k) => k)("writing.notice")}
        </p>

        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          {(typeof t !== "undefined" ? t : (k) => k)("writing.button")}
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default ScreenWriting;
