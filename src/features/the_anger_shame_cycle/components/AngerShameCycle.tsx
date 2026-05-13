import { useState } from "react";
import { RefreshCw, ChevronRight, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_SCREENS = 4;

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${className}`}>
      {children}
    </span>
  );
}

function Screen1({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px] flex flex-col justify-center text-center">
        <div className="w-24 h-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center text-6xl mx-auto mb-8 shadow-inner">
          🔥
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-6 leading-tight">
          {(typeof t !== "undefined" ? t : (k) => k)("screens.s1.title")}
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed text-base mb-8">
          {(typeof t !== "undefined" ? t : (k) => k)("screens.s1.description")}
        </p>
        <div className="bg-red-50 rounded-3xl p-8 italic text-red-900 text-sm font-bold leading-relaxed border-l-8 border-red-400">
          {(typeof t !== "undefined" ? t : (k) => k)("screens.s1.quote")}
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("screens.s1.button")}
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function Screen2({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  const nodes_data = (typeof t !== "undefined" ? t : (k) => k)("screens.s2.nodes", { returnObjects: true }) as any[];
  const colors = [
    "text-red-600 bg-red-50",
    "text-indigo-600 bg-indigo-50",
    "text-amber-600 bg-amber-50",
    "text-red-600 bg-red-50"
  ];

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
        <Badge className="bg-red-100 text-red-600 mb-6">{(typeof t !== "undefined" ? t : (k) => k)("screens.s2.tag")}</Badge>
        <h1 className="text-3xl font-black text-slate-800 mb-8">{(typeof t !== "undefined" ? t : (k) => k)("screens.s2.title")}</h1>
        
        <div className="flex flex-col items-center gap-2 mb-8">
          {nodes_data.map((node, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div className={`w-full rounded-[1.5rem] px-8 py-5 font-black text-base flex items-center gap-4 ${colors[i]} border border-transparent hover:border-current/10 transition-all`}>
                <span className="text-2xl">{node.emoji}</span>
                {node.label}
              </div>
              {i < nodes_data.length - 1 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 20 }}
                  className="w-1 bg-slate-100 my-1 rounded-full" 
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("screens.s2.button")}
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function Screen3({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
        <Badge className="bg-indigo-100 text-indigo-600 mb-6">{(typeof t !== "undefined" ? t : (k) => k)("screens.s3.tag")}</Badge>
        <h1 className="text-3xl font-black text-slate-800 mb-8">{(typeof t !== "undefined" ? t : (k) => k)("screens.s3.title")}</h1>

        <div className="space-y-6">
          <div className="rounded-3xl border border-red-100 bg-red-50/30 p-8">
            <p className="font-black text-red-600 text-sm mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
              {(typeof t !== "undefined" ? t : (k) => k)("screens.s3.anger.title")}
            </p>
            <p className="text-slate-600 text-base leading-relaxed font-medium">
              {(typeof t !== "undefined" ? t : (k) => k)("screens.s3.anger.desc")}
            </p>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/30 p-8">
            <p className="font-black text-indigo-600 text-sm mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
              {(typeof t !== "undefined" ? t : (k) => k)("screens.s3.shame.title")}
            </p>
            <p className="text-slate-600 text-base leading-relaxed font-medium">
              {(typeof t !== "undefined" ? t : (k) => k)("screens.s3.shame.desc")}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("screens.s3.button")}
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function Screen4({ onFinish }: { onFinish: () => void }) {
  const { t } = useTranslation();
  const steps_data = (typeof t !== "undefined" ? t : (k) => k)("screens.s4.steps", { returnObjects: true }) as any[];
  const emojis = ["🔍", "🤲", "🕊️"];

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
        <Badge className="bg-emerald-100 text-emerald-600 mb-6">{(typeof t !== "undefined" ? t : (k) => k)("screens.s4.tag")}</Badge>
        <h1 className="text-3xl font-black text-slate-800 mb-8">{(typeof t !== "undefined" ? t : (k) => k)("screens.s4.title")}</h1>

        <div className="space-y-8">
          {steps_data.map((step, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl shadow-slate-900/20">
                {idx + 1}
              </div>
              <div className="space-y-2">
                <p className="font-black text-slate-800 text-base flex items-center gap-2">
                  <span className="text-xl">{emojis[idx]}</span> {step.title}
                </p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-emerald-50 rounded-[2.5rem] p-8 flex items-center gap-6 border border-emerald-100 shadow-sm">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          <Heart className="text-emerald-500 w-6 h-6" />
        </div>
        <p className="text-emerald-900 text-sm font-black leading-relaxed">
          {(typeof t !== "undefined" ? t : (k) => k)("screens.s4.notice")}
        </p>
      </div>
      <button
        onClick={onFinish}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("screens.s4.button")}
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

export default function AngerShameCycle() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(0);

  if (screen === 4) {
    return (
      <PremiumComplete
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        message={(typeof t !== "undefined" ? t : (k) => k)("complete.message")}
        onRestart={() => setScreen(0)}
      />
    );
  }

  return (
    <PremiumLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      subtitle={(typeof t !== "undefined" ? t : (k) => k)("app_subtitle", { step: screen + 1, total: TOTAL_SCREENS })}
      icon={<RefreshCw className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {screen === 0 && <Screen1 onNext={() => setScreen(1)} />}
            {screen === 1 && <Screen2 onNext={() => setScreen(2)} />}
            {screen === 2 && <Screen3 onNext={() => setScreen(3)} />}
            {screen === 3 && <Screen4 onFinish={() => setScreen(4)} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}
