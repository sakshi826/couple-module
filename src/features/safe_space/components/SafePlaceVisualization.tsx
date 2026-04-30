import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/features/safe_space/components/ui/textarea";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { Shield, ChevronRight, Sparkles } from "lucide-react";

const transition = { duration: 0.6, ease: [0.4, 0, 0.2, 1] };

const variants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const staggerChildren = {
  center: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const childFade = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const floatEmoji = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const breathe = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.4, 0.8, 0.4],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

function Screen1({ onContinue }: { onContinue: () => void }) {
  const [feeling, setFeeling] = useState("");
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-10">
      <motion.div variants={floatEmoji} animate="animate" className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
        🌿
      </motion.div>

      <div className="space-y-4">
        <motion.h1 variants={childFade} className="text-3xl font-black text-slate-800 leading-tight">
          Let's find a place that feels okay
        </motion.h1>
        <motion.div variants={childFade} className="space-y-4 text-slate-500 font-medium leading-relaxed text-base">
          <p>Before we begin, take a moment to check in…</p>
          <p>How are you feeling right now?</p>
          <p>We're not looking for a perfect "safe place".<br />Just something that feels even a little calm or okay.</p>
        </motion.div>
      </div>

      <motion.div variants={childFade} className="w-full">
        <textarea 
          placeholder="How do you feel right now?" 
          value={feeling} 
          onChange={(e) => setFeeling(e.target.value)}
          className="w-full rounded-3xl border-2 border-slate-100 bg-white p-6 text-slate-700 placeholder:text-slate-200 focus:border-primary/30 outline-none transition-all font-bold min-h-[120px] shadow-inner" 
        />
      </motion.div>
      <motion.div variants={childFade} className="w-full">
        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          Begin Visualization
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </motion.div>
    </motion.div>
  );
}

function Screen2({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-10">
      <motion.div variants={floatEmoji} animate="animate" className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
        🧘
      </motion.div>

      <div className="space-y-4">
        <motion.h1 variants={childFade} className="text-3xl font-black text-slate-800 leading-tight">
          Gently bring it to mind
        </motion.h1>
        <motion.div variants={childFade} className="space-y-4 text-slate-500 font-medium leading-relaxed text-base">
          <p>Think of a place where you felt even a little at ease… or a place you wish existed.</p>
          <p>Now place yourself there…</p>
          <p className="font-black text-primary italic">Are you sitting, standing, or lying down?</p>
        </motion.div>
      </div>

      <motion.div variants={childFade} className="w-full">
        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          Continue
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </motion.div>
    </motion.div>
  );
}

function Screen3({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-10">
      <motion.div variants={floatEmoji} animate="animate" className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
        🌅
      </motion.div>

      <div className="space-y-4">
        <motion.h1 variants={childFade} className="text-3xl font-black text-slate-800 leading-tight">
          Look around slowly
        </motion.h1>
        <motion.div variants={childFade} className="space-y-4 text-slate-500 font-medium leading-relaxed text-base">
          <p>Take a gentle look around…</p>
          <p>What's one thing you can see?</p>
          <p className="font-black text-primary italic">Now notice a sound… what do you hear?</p>
        </motion.div>
      </div>

      <motion.div variants={childFade} className="w-full">
        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          Continue
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </motion.div>
    </motion.div>
  );
}

function Screen4({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-10">
      <motion.div variants={floatEmoji} animate="animate" className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
        🌙
      </motion.div>

      <div className="space-y-4">
        <motion.h1 variants={childFade} className="text-3xl font-black text-slate-800 leading-tight">
          Stay with this
        </motion.h1>
        <motion.div variants={childFade} className="space-y-4 text-slate-500 font-medium leading-relaxed text-base">
          <p>What is it about this place that makes it feel even a little safe or okay?</p>
          <p>As you notice that…</p>
          <p className="font-black text-primary italic">also bring your attention to your breath.</p>
        </motion.div>
      </div>

      <motion.div variants={childFade} className="relative flex items-center justify-center my-2">
        <motion.div variants={breathe} animate="animate"
          className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner">
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">breathe</span>
        </motion.div>
      </motion.div>

      <motion.div variants={childFade} className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
        <p className="text-slate-500 font-bold text-sm italic leading-relaxed">
          If imagining feels hard, just think about the idea of this place.
        </p>
      </motion.div>

      <motion.div variants={childFade} className="w-full">
        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          Continue
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </motion.div>
    </motion.div>
  );
}

function Screen5({ onDone }: { onDone: () => void }) {
  const [reflection, setReflection] = useState("");
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-10">
      <motion.div variants={floatEmoji} animate="animate" className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
        🌸
      </motion.div>

      <div className="space-y-4">
        <motion.h1 variants={childFade} className="text-3xl font-black text-slate-800 leading-tight">
          Take this with you
        </motion.h1>
        <motion.div variants={childFade} className="space-y-4 text-slate-500 font-medium leading-relaxed text-base">
          <p>Notice how you feel right now. Even a small shift matters.</p>
          <p className="font-black text-primary italic">See if you can carry even 5% of this feeling with you.</p>
        </motion.div>
      </div>

      <motion.div variants={childFade} className="w-full">
        <textarea 
          placeholder="How do you feel now?" 
          value={reflection} 
          onChange={(e) => setReflection(e.target.value)}
          className="w-full rounded-3xl border-2 border-slate-100 bg-white p-6 text-slate-700 placeholder:text-slate-200 focus:border-primary/30 outline-none transition-all font-bold min-h-[120px] shadow-inner" 
        />
      </motion.div>

      <motion.div variants={childFade} className="w-full">
        <button
          onClick={onDone}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
        >
          Complete Session
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function SafePlaceVisualization() {
  const [screen, setScreen] = useState(0);

  const next = useCallback(() => setScreen((s) => Math.min(s + 1, 5)), []);
  const reset = useCallback(() => setScreen(0), []);

  if (screen === 5) {
    return (
      <PremiumComplete
        title="Session Complete"
        message="This safe place is always available to you. You can return here whenever you need a moment of calm."
        onRestart={reset}
      />
    );
  }

  const titles = ["Check-in", "Gently Recall", "Observing", "Staying Present", "Taking Forward"];

  return (
    <PremiumLayout
      title="Safe Space"
      subtitle={titles[screen]}
      icon={<Shield className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 0 ? reset : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="flex-1 flex flex-col"
          >
            {screen === 0 && <Screen1 onContinue={next} />}
            {screen === 1 && <Screen2 onContinue={next} />}
            {screen === 2 && <Screen3 onContinue={next} />}
            {screen === 3 && <Screen4 onContinue={next} />}
            {screen === 4 && <Screen5 onDone={next} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}
