import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/features/safe_space/components/ui/textarea";
import { Button } from "@/features/safe_space/components/ui/button";
import { ChevronLeft } from "lucide-react";

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

// Background gradient shifts per screen
const bgGradients = [
  "from-[#EEF2F7] via-[#F0EEF5] to-[#F7F0F4]",
  "from-[#EDF4F8] via-[#F2EFF6] to-[#F5EDF2]",
  "from-[#EBF0F7] via-[#F0ECF5] to-[#F6EEF3]",
  "from-[#E8EDF5] via-[#EEEAF4] to-[#F4ECF2]",
  "from-[#F0EDF5] via-[#F4EFF6] to-[#F7F0F5]",
];

function Screen1({ onContinue }: { onContinue: () => void }) {
  const [feeling, setFeeling] = useState("");
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-6">
      <motion.span variants={floatEmoji} animate="animate" className="text-2xl select-none">🌿</motion.span>

      <motion.h1 variants={childFade} className="font-heading text-2xl leading-snug text-foreground">
        Let's find a place that feels okay
      </motion.h1>

      <motion.div variants={childFade} className="space-y-4 text-muted-foreground font-body leading-[1.65] text-[15px]">
        <p>Before we begin, take a moment to check in…</p>
        <p>How are you feeling right now?</p>
        <p>We're not looking for a perfect "safe place".<br />Just something that feels even a little calm or okay.</p>
        <p>You're in control the whole time.</p>
      </motion.div>

      <motion.div variants={childFade} className="w-full">
        <Textarea placeholder="How do you feel right now?" value={feeling} onChange={(e) => setFeeling(e.target.value)}
          className="w-full rounded-2xl border-border bg-input text-foreground placeholder:text-muted-foreground resize-none font-body text-sm min-h-[80px]" />
      </motion.div>
      <motion.div variants={childFade} className="w-full"><ContinueButton onClick={onContinue} /></motion.div>
    </motion.div>
  );
}

function Screen2({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-6">
      <motion.span variants={floatEmoji} animate="animate" className="text-2xl select-none">🧘</motion.span>

      <motion.h1 variants={childFade} className="font-heading text-2xl leading-snug text-foreground">
        Gently bring it to mind
      </motion.h1>

      <motion.div variants={childFade} className="space-y-4 text-muted-foreground font-body leading-[1.65] text-[15px]">
        <p>Think of a place where you felt even a little at ease…<br />or a place you wish existed.</p>
        <p>Now place yourself there…</p>
        <p>Are you sitting, standing, or lying down?</p>
      </motion.div>

      <motion.div variants={childFade} className="w-full"><ContinueButton onClick={onContinue} /></motion.div>
    </motion.div>
  );
}

function Screen3({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-6">
      <motion.span variants={floatEmoji} animate="animate" className="text-2xl select-none">🌅</motion.span>

      <motion.h1 variants={childFade} className="font-heading text-2xl leading-snug text-foreground">
        Look around slowly
      </motion.h1>

      <motion.div variants={childFade} className="space-y-4 text-muted-foreground font-body leading-[1.65] text-[15px]">
        <p>Take a gentle look around…</p>
        <p>What's one thing you can see?</p>
        <p>Now notice a sound…<br />what do you hear?</p>
      </motion.div>

      <motion.div variants={childFade} className="w-full"><ContinueButton onClick={onContinue} /></motion.div>
    </motion.div>
  );
}

function Screen4({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-6">
      <motion.span variants={floatEmoji} animate="animate" className="text-2xl select-none">🌙</motion.span>

      <motion.h1 variants={childFade} className="font-heading text-2xl leading-snug text-foreground">
        Stay with this
      </motion.h1>

      <motion.div variants={childFade} className="space-y-4 text-muted-foreground font-body leading-[1.65] text-[15px]">
        <p>What is it about this place that makes it feel even a little safe or okay?</p>
        <p>As you notice that…</p>
        <p>also bring your attention to your breath.</p>
        <p>Slow and steady.</p>
        <p>And feel your body where you are right now.</p>
      </motion.div>

      <motion.div variants={childFade} className="relative flex items-center justify-center my-2">
        <motion.div variants={breathe} animate="animate"
          className="w-16 h-16 rounded-full bg-accent/30 border border-accent/40 flex items-center justify-center">
          <span className="text-sm font-body text-muted-foreground">breathe</span>
        </motion.div>
      </motion.div>

      <motion.div variants={childFade} className="bg-card rounded-2xl p-4 border border-border">
        <p className="text-muted-foreground font-body text-sm italic leading-relaxed">
          If imagining feels hard, just think about the idea of this place.
        </p>
      </motion.div>

      <motion.div variants={childFade} className="w-full"><ContinueButton onClick={onContinue} /></motion.div>
    </motion.div>
  );
}

function Screen5({ onDone }: { onDone: () => void }) {
  const [reflection, setReflection] = useState("");
  return (
    <motion.div variants={staggerChildren} initial="enter" animate="center" className="flex flex-col items-center text-center gap-6">
      <motion.span variants={floatEmoji} animate="animate" className="text-2xl select-none">🌸</motion.span>

      <motion.h1 variants={childFade} className="font-heading text-2xl leading-snug text-foreground">
        Take this with you
      </motion.h1>

      <motion.div variants={childFade} className="space-y-4 text-muted-foreground font-body leading-[1.65] text-[15px]">
        <p>Notice how you feel right now.</p>
        <p>Even a small shift matters.</p>
        <p>See if you can carry even 5% of this feeling with you.</p>
      </motion.div>

      <motion.div variants={childFade} className="bg-card rounded-2xl p-4 border border-border">
        <p className="text-foreground font-body text-sm leading-relaxed">
          Take one slow breath in… and out.
        </p>
      </motion.div>

      <motion.div variants={childFade} className="w-full">
        <Textarea placeholder="How do you feel now?" value={reflection} onChange={(e) => setReflection(e.target.value)}
          className="w-full rounded-2xl border-border bg-input text-foreground placeholder:text-muted-foreground resize-none font-body text-sm min-h-[80px]" />
      </motion.div>

      <motion.p variants={childFade} className="text-muted-foreground font-body text-sm italic">
        This place is always available to you.
      </motion.p>

      <motion.div variants={childFade} className="w-full">
        <Button onClick={onDone}
          className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-body text-base hover:opacity-90 transition-opacity">
          Done
        </Button>
      </motion.div>
    </motion.div>
  );
}

function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
      <Button onClick={onClick}
        className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-body text-base hover:opacity-90 transition-opacity mt-2">
        Continue
      </Button>
    </motion.div>
  );
}

export default function SafePlaceVisualization() {
  const [screen, setScreen] = useState(0);

  const next = useCallback(() => setScreen((s) => Math.min(s + 1, 4)), []);
  const reset = useCallback(() => setScreen(0), []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`min-h-screen bg-gradient-to-b ${bgGradients[screen]} flex items-start justify-center overflow-hidden`}
      >
        <div className="w-full max-w-[360px] min-h-screen px-6 py-8 flex flex-col relative">
          {screen === 0 && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="absolute top-8 left-6 text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label="Exit activity">
              <ChevronLeft size={24} />
            </motion.button>
          )}

          <div className="flex-1 flex items-center pt-8">
            <motion.div variants={variants} initial="enter" animate="center" exit="exit" transition={transition} className="w-full">
              {screen === 0 && <Screen1 onContinue={next} />}
              {screen === 1 && <Screen2 onContinue={next} />}
              {screen === 2 && <Screen3 onContinue={next} />}
              {screen === 3 && <Screen4 onContinue={next} />}
              {screen === 4 && <Screen5 onDone={reset} />}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
