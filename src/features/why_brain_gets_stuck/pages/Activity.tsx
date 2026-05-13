import { useState } from "react";
import { Brain, ChevronRight, ShieldCheck, Zap, Heart, History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_SCREENS = 2;

const Screen1 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px] flex flex-col justify-center text-center">
        <div className="text-6xl mb-6 animate-bounce-slow">🧠</div>
        <h1 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
          {(typeof t !== "undefined" ? t : (k) => k)("s1.title")}
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm mb-6">
          {(typeof t !== "undefined" ? t : (k) => k)("s1.description")}
        </p>
        <div className="bg-amber-50 rounded-2xl p-6 italic text-amber-900 text-sm leading-relaxed border-l-4 border-amber-400">
          {(typeof t !== "undefined" ? t : (k) => k)("s1.quote")}
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("s1.button")}
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

const Screen2 = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const truths_data = (typeof t !== "undefined" ? t : (k) => k)("s2.truths", { returnObjects: true }) as any[];
  const icons = [
    <Zap className="text-rose-500" />,
    <History className="text-blue-500" />,
    <ShieldCheck className="text-emerald-500" />,
  ];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px]">
        <span className="inline-block rounded-full bg-slate-100 text-slate-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">
          {(typeof t !== "undefined" ? t : (k) => k)("s2.tag")}
        </span>
        <h1 className="text-2xl font-black text-slate-800 mb-6">{(typeof t !== "undefined" ? t : (k) => k)("s2.title")}</h1>

        <div className="space-y-4">
          {truths_data.map((item, i) => (
            <button
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left group"
            >
              <div className={`p-5 rounded-2xl border transition-all duration-300 ${openIndex === i ? "bg-slate-50 border-slate-200" : "bg-white border-slate-100 shadow-sm"}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:scale-110 transition-transform">
                    {icons[i]}
                  </div>
                  <span className="font-bold text-slate-700 text-sm">{item.header}</span>
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-xs text-slate-500 mt-4 leading-relaxed overflow-hidden"
                    >
                      {item.body}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-emerald-50 rounded-[2rem] p-6 flex items-center gap-4 border border-emerald-100">
        <Heart className="text-emerald-500 shrink-0" />
        <p className="text-emerald-900 text-sm font-bold leading-relaxed">
          {(typeof t !== "undefined" ? t : (k) => k)("s2.healing")}
        </p>
      </div>
    </div>
  );
};

const Activity = () => {
  const [screen, setScreen] = useState(0);

  return (
    <PremiumLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      subtitle={(typeof t !== "undefined" ? t : (k) => k)("app_subtitle", { step: screen + 1, total: TOTAL_SCREENS })}
      icon={<Brain className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(0) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4">
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === screen ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            {screen === 0 ? <Screen1 onNext={() => setScreen(1)} /> : <Screen2 />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Activity;
