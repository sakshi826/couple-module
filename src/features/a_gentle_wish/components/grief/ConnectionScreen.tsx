import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  setName: (v: string) => void;
  relation: string;
  setRelation: (v: string) => void;
  wish: string;
  setWish: (v: string) => void;
  why: string;
  setWhy: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const ConnectionScreen = ({
  name, setName, relation, setRelation,
  wish, setWish, why, setWhy,
  onBack, onContinue,
}: Props) => {
  const { t } = useTranslation();
  const [showCue, setShowCue] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showDeeper, setShowDeeper] = useState(false);

  useEffect(() => {
    if (name.trim().length > 0) {
      const t = setTimeout(() => setShowCue(true), 600);
      return () => clearTimeout(t);
    }
    setShowCue(false);
    setShowPrompt(false);
    setShowDeeper(false);
  }, [name]);

  useEffect(() => {
    if (showCue) {
      const t = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(t);
    }
  }, [showCue]);

  useEffect(() => {
    if (wish.trim().length > 0 && showPrompt) {
      const t = setTimeout(() => setShowDeeper(true), 800);
      return () => clearTimeout(t);
    }
    setShowDeeper(false);
  }, [wish, showPrompt]);

  return (
    <div className="flex-1 flex flex-col gap-8 py-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-800 leading-tight">
          {(typeof t !== "undefined" ? t : (k) => k)("connection_title")}
        </h2>
        <p className="text-slate-500 font-medium text-base italic">{(typeof t !== "undefined" ? t : (k) => k)("connection_subtitle")}</p>
      </header>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] pl-4">{(typeof t !== "undefined" ? t : (k) => k)("label_name")}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={(typeof t !== "undefined" ? t : (k) => k)("placeholder_name")}
            className="w-full bg-white border border-slate-100 rounded-3xl px-8 py-5 text-slate-800 text-lg font-black placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-xl shadow-slate-200/50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] pl-4">{(typeof t !== "undefined" ? t : (k) => k)("label_relation")}</label>
          <input
            type="text"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            placeholder={(typeof t !== "undefined" ? t : (k) => k)("placeholder_relation")}
            className="w-full bg-white border border-slate-100 rounded-3xl px-8 py-4 text-slate-800 text-base font-bold placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-lg shadow-slate-200/40"
          />
        </div>
      </div>

      <AnimatePresence>
        {showCue && (
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-rose-50 border border-rose-100/50 rounded-[2.5rem] p-8 text-center space-y-4 shadow-inner"
          >
            <Heart className="w-8 h-8 text-rose-300 mx-auto" />
            <p className="text-slate-600 font-medium italic leading-relaxed text-base">
              {(typeof t !== "undefined" ? t : (k) => k)("cue_body", { name: name.trim() })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPrompt && (
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <div className="text-center space-y-2 px-4">
              <p className="text-slate-800 font-black text-lg leading-snug">
                {(typeof t !== "undefined" ? t : (k) => k)("prompt_wish", { name: name.trim() })}
              </p>
              <p className="text-slate-400 font-medium text-xs italic">
                {(typeof t !== "undefined" ? t : (k) => k)("prompt_wish_subtitle")}
              </p>
            </div>
            
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder={(typeof t !== "undefined" ? t : (k) => k)("placeholder_wish")}
              rows={3}
              className="w-full bg-white border border-slate-100 rounded-[2rem] px-8 py-6 text-slate-800 text-lg font-medium placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-2xl shadow-slate-200/50 resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeeper && (
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-4"
          >
            <p className="text-center text-slate-400 font-medium text-sm italic flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              {(typeof t !== "undefined" ? t : (k) => k)("prompt_why")}
            </p>
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder={(typeof t !== "undefined" ? t : (k) => k)("placeholder_why")}
              rows={2}
              className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] px-8 py-5 text-slate-700 text-base font-medium placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all resize-none shadow-inner"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto py-6">
        <button
          onClick={onContinue}
          disabled={!wish.trim()}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-20 disabled:shadow-none disabled:grayscale"
        >
          {(typeof t !== "undefined" ? t : (k) => k)("continue_button")}
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
