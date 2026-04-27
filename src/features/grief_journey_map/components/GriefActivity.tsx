import { useState, useCallback } from "react";
import { Compass, ChevronRight, Heart } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_SCREENS = 3;

/* ── Screen 1: Hook ── */
const Screen1 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-1 flex-col gap-6">
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px] flex flex-col justify-center text-center">
      <div className="text-6xl mb-6">🌊</div>
      <h1 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
        You're not grieving wrong
      </h1>
      <p className="text-slate-600 leading-relaxed text-sm mb-6">
        Grief doesn't arrive in neat stages and leave on schedule. It crashes in, retreats, and comes back when you least expect it. That's not a flaw in you — that's grief.
      </p>
      <div className="bg-sky-50 rounded-2xl p-6 italic text-sky-900 text-sm leading-relaxed border-l-4 border-sky-400">
        "There is no right way to grieve. There is only your way."
      </div>
    </div>
    <button
      onClick={onNext}
      className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
    >
      Tell me more
      <ChevronRight size={20} />
    </button>
  </div>
);

/* ── Screen 2: Graph ── */
const GriefGraph = () => (
  <div className="grid grid-cols-1 gap-4">
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">The Expectation</p>
      <svg viewBox="0 0 100 40" className="w-full">
        <path d="M10,35 L90,5" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="35" r="3" fill="#94a3b8" />
        <circle cx="90" cy="5" r="3" fill="#94a3b8" />
      </svg>
      <p className="text-[10px] text-slate-500 mt-2 text-center font-bold italic">Linear • Predictable • Clear</p>
    </div>

    <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-4">The Reality</p>
      <svg viewBox="0 0 100 40" className="w-full">
        <path d="M10,35 C20,5 30,45 40,15 C50,0 60,40 70,10 C80,25 90,5 90,5" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="35" r="3" fill="#e11d48" />
        <circle cx="90" cy="5" r="3" fill="#e11d48" />
      </svg>
      <p className="text-[10px] text-rose-600 mt-2 text-center font-bold italic">Chaotic • Looping • Human</p>
    </div>
  </div>
);

const Screen2 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-1 flex-col gap-6">
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px]">
      <span className="inline-block rounded-full bg-rose-100 text-rose-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">
        the real picture
      </span>
      <h1 className="text-2xl font-black text-slate-800 mb-2">Grief wears many faces</h1>
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
        This is what people expect grief to look like — vs what it actually is.
      </p>
      <GriefGraph />
      <p className="text-slate-400 text-[11px] mt-6 text-center italic font-medium leading-relaxed">
        "None of these waves are wrong. All of them are grief."
      </p>
    </div>
    <button
      onClick={onNext}
      className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
    >
      One more thing
      <ChevronRight size={20} />
    </button>
  </div>
);

/* ── Screen 3: Gentle Truths ── */
const TruthCard = ({ emoji, title, body }: { emoji: string; title: string; body: string }) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
    <p className="font-black text-slate-800 text-sm mb-1 flex items-center gap-2">
      <span className="text-xl">{emoji}</span> {title}
    </p>
    <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
  </div>
);

const Screen3 = () => (
  <div className="flex flex-1 flex-col gap-6">
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[400px]">
      <span className="inline-block rounded-full bg-emerald-100 text-emerald-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">
        gentle truths
      </span>
      <h1 className="text-2xl font-black text-slate-800 mb-6">Worth knowing</h1>

      <div className="space-y-4">
        <TruthCard
          emoji="🗓️"
          title="No deadline"
          body="There's no expiry date on loss. Feeling it months or years later doesn't mean you're stuck — it means you loved."
        />
        <TruthCard
          emoji="🌗"
          title="Contradictory feelings"
          body="You can miss someone and feel relieved. You can laugh and grieve. Grief holds opposites."
        />
        <TruthCard
          emoji="🤍"
          title="Love's transformation"
          body="The pain isn't separate from the love. It's the same thing, transformed."
        />
      </div>
    </div>
    <div className="bg-emerald-50 rounded-[2rem] p-6 flex items-center gap-4 border border-emerald-100">
      <Heart className="text-emerald-500 shrink-0" />
      <p className="text-emerald-900 text-sm font-bold leading-relaxed">
        You don't have to move on. You just learn to carry it differently.
      </p>
    </div>
  </div>
);

/* ── Main Activity ── */
const GriefActivity = () => {
  const [screen, setScreen] = useState(0);

  const screens = [
    <Screen1 key={0} onNext={() => setScreen(1)} />,
    <Screen2 key={1} onNext={() => setScreen(2)} />,
    <Screen3 key={2} />,
  ];

  return (
    <PremiumLayout
      title="Grief Journey"
      subtitle={`The map of loss • ${screen + 1}/${TOTAL_SCREENS}`}
      icon={<Compass className="w-6 h-6 text-primary" />}
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
};

export default GriefActivity;


export default GriefActivity;
