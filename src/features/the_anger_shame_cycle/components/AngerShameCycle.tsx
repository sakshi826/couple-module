import { useState, useCallback } from "react";
import { RefreshCw, ChevronRight, ChevronLeft, Heart } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
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
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px] flex flex-col justify-center text-center">
        <div className="text-6xl mb-6">🔥</div>
        <h1 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
          Why does anger keep coming back?
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm mb-6">
          It might not be your temper. There's a hidden loop between anger and shame — and once you see it, everything changes.
        </p>
        <div className="bg-red-50 rounded-2xl p-6 italic text-red-900 text-sm leading-relaxed border-l-4 border-red-400">
          "Most people try to fix the anger. But shame is what quietly keeps it going."
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
      >
        Let's explore
        <ChevronRight size={20} />
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
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px]">
        <Badge className="bg-red-100 text-red-600 mb-4">the cycle</Badge>
        <h1 className="text-2xl font-black text-slate-800 mb-6">The loop explained</h1>
        
        <div className="flex flex-col items-center gap-2 mb-6">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div className={`w-full rounded-2xl px-6 py-4 font-bold text-sm flex items-center gap-3 ${node.color}`}>
                <span className="text-xl">{node.emoji}</span>
                {node.label}
              </div>
              {i < nodes.length - 1 && <div className="h-4 w-0.5 bg-slate-100 my-1" />}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
      >
        I see it
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function Screen3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px]">
        <Badge className="bg-indigo-100 text-indigo-600 mb-4">What's happening</Badge>
        <h1 className="text-2xl font-black text-slate-800 mb-6">Two emotions, one trap</h1>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="font-black text-red-600 text-sm mb-1 uppercase tracking-widest flex items-center gap-2">
              🔥 Anger
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              A secondary emotion — underneath lives hurt, fear, or rejection. It's the alarm, not the fire.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="font-black text-indigo-600 text-sm mb-1 uppercase tracking-widest flex items-center gap-2">
              😔 Shame
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              "I am bad" — not just "I did something bad." It hides, silences, and keeps the cycle spinning.
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
      >
        Breaking Free
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function Screen4() {
  const steps = [
    { num: 1, emoji: "🔍", title: "Name the source", desc: "Ask: 'What am I actually feeling?' Hurt? Scared? Unseen? Naming it weakens it." },
    { num: 2, emoji: "🤲", title: "Compassion pause", desc: "Hand on chest. Say: 'This is hard. I'm human. I can get through this.'" },
    { num: 3, emoji: "🕊️", title: "Repair with grace", desc: "Make amends if needed — but don't spiral. You're not your worst moment." },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px]">
        <Badge className="bg-emerald-100 text-emerald-600 mb-4">Interruption</Badge>
        <h1 className="text-2xl font-black text-slate-800 mb-6">Interrupt the cycle</h1>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-black text-sm shadow-lg shadow-primary/20">
                {step.num}
              </div>
              <div className="space-y-1">
                <p className="font-black text-slate-800 text-sm">
                  {step.emoji} {step.title}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-emerald-50 rounded-[2rem] p-6 flex items-center gap-4 border border-emerald-100">
        <Heart className="text-emerald-500 shrink-0" />
        <p className="text-emerald-900 text-sm font-bold leading-relaxed">
          Noticing the cycle is already the first step. You're doing the work.
        </p>
      </div>
    </div>
  );
}

export default function AngerShameCycle() {
  const [screen, setScreen] = useState(0);

  const screens = [
    <Screen1 key={0} onNext={() => setScreen(1)} />,
    <Screen2 key={1} onNext={() => setScreen(2)} />,
    <Screen3 key={2} onNext={() => setScreen(3)} />,
    <Screen4 key={3} />,
  ];

  return (
    <PremiumLayout
      title="Anger-Shame Cycle"
      subtitle={`Understanding the loop • ${screen + 1}/${TOTAL_SCREENS}`}
      icon={<RefreshCw className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4">
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
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
            {screens[screen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

