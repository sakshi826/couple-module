import { useState, useCallback } from "react";
import { RefreshCw, ChevronRight, ChevronLeft, Heart, Sparkles } from "lucide-react";
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
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px] flex flex-col justify-center text-center">
        <div className="w-24 h-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center text-6xl mx-auto mb-8 shadow-inner">
          🔥
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-6 leading-tight">
          Why does anger keep coming back?
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed text-base mb-8">
          It might not be your temper. There's a hidden loop between anger and shame — and once you see it, everything changes.
        </p>
        <div className="bg-red-50 rounded-3xl p-8 italic text-red-900 text-sm font-bold leading-relaxed border-l-8 border-red-400">
          "Most people try to fix the anger. But shame is what quietly keeps it going."
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
      >
        Let's explore
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function Screen2({ onNext }: { onNext: () => void }) {
  const nodes = [
    { emoji: "🔥", label: "Anger surfaces", color: "text-red-600 bg-red-50" },
    { emoji: "😔", label: 'Shame: "I\'m bad"', color: "text-indigo-600 bg-indigo-50" },
    { emoji: "🤐", label: "Shame gets buried", color: "text-amber-600 bg-amber-50" },
    { emoji: "🔥", label: "Anger erupts again", color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
        <Badge className="bg-red-100 text-red-600 mb-6">the cycle</Badge>
        <h1 className="text-3xl font-black text-slate-800 mb-8">The loop explained</h1>
        
        <div className="flex flex-col items-center gap-2 mb-8">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div className={`w-full rounded-[1.5rem] px-8 py-5 font-black text-base flex items-center gap-4 ${node.color} border border-transparent hover:border-current/10 transition-all`}>
                <span className="text-2xl">{node.emoji}</span>
                {node.label}
              </div>
              {i < nodes.length - 1 && (
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
        I see it
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function Screen3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
        <Badge className="bg-indigo-100 text-indigo-600 mb-6">What's happening</Badge>
        <h1 className="text-3xl font-black text-slate-800 mb-8">Two emotions, one trap</h1>

        <div className="space-y-6">
          <div className="rounded-3xl border border-red-100 bg-red-50/30 p-8">
            <p className="font-black text-red-600 text-sm mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
              🔥 Anger
            </p>
            <p className="text-slate-600 text-base leading-relaxed font-medium">
              A secondary emotion — underneath lives hurt, fear, or rejection. It's the alarm, not the fire.
            </p>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/30 p-8">
            <p className="font-black text-indigo-600 text-sm mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
              😔 Shame
            </p>
            <p className="text-slate-600 text-base leading-relaxed font-medium">
              "I am bad" — not just "I did something bad." It hides, silences, and keeps the cycle spinning.
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
      >
        Breaking Free
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function Screen4({ onFinish }: { onFinish: () => void }) {
  const steps = [
    { num: 1, emoji: "🔍", title: "Name the source", desc: "Ask: 'What am I actually feeling?' Hurt? Scared? Unseen? Naming it weakens it." },
    { num: 2, emoji: "🤲", title: "Compassion pause", desc: "Hand on chest. Say: 'This is hard. I'm human. I can get through this.'" },
    { num: 3, emoji: "🕊️", title: "Repair with grace", desc: "Make amends if needed — but don't spiral. You're not your worst moment." },
  ];

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
        <Badge className="bg-emerald-100 text-emerald-600 mb-6">Interruption</Badge>
        <h1 className="text-3xl font-black text-slate-800 mb-8">Interrupt the cycle</h1>

        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl shadow-slate-900/20">
                {step.num}
              </div>
              <div className="space-y-2">
                <p className="font-black text-slate-800 text-base flex items-center gap-2">
                  <span className="text-xl">{step.emoji}</span> {step.title}
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
          Noticing the cycle is already the first step. You're doing the work.
        </p>
      </div>
      <button
        onClick={onFinish}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
      >
        Complete Activity
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

export default function AngerShameCycle() {
  const [screen, setScreen] = useState(0);

  if (screen === 4) {
    return (
      <PremiumComplete
        title="Cycle Interrupted"
        message="You've gained the awareness to see the link between anger and shame. This is the foundation for lasting emotional freedom."
        onRestart={() => setScreen(0)}
      />
    );
  }

  return (
    <PremiumLayout
      title="Anger-Shame Cycle"
      subtitle={`Understanding the loop • ${screen + 1}/${TOTAL_SCREENS}`}
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


