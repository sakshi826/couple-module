import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const PHASES = [
  { label: "Breathe in…", duration: 4000, scale: 1 },
  { label: "Hold…", duration: 2000, scale: 1 },
  { label: "Breathe out…", duration: 6000, scale: 0.6 },
];

const OVERLAYS = [
  "This is a difficult moment.",
  "You're not alone in feeling this.",
];

const TOTAL_CYCLES = 3;

const ScreenBreathe = ({ onContinue }: Props) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [done, setDone] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(-1);
  const [scale, setScale] = useState(0.6);

  const advancePhase = useCallback(() => {
    setPhaseIndex((prev) => {
      const next = (prev + 1) % 3;
      if (next === 0) {
        setCycle((c) => {
          const newC = c + 1;
          if (newC >= TOTAL_CYCLES) {
            setDone(true);
          }
          return newC;
        });
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (done) return;
    const phase = PHASES[phaseIndex];
    setScale(phase.scale);
    const timer = setTimeout(advancePhase, phase.duration);
    return () => clearTimeout(timer);
  }, [phaseIndex, done, advancePhase]);

  useEffect(() => {
    if (cycle === 1 && overlayIndex < 0) setOverlayIndex(0);
    if (cycle === 2 && overlayIndex < 1) setOverlayIndex(1);
  }, [cycle, overlayIndex]);

  const phase = PHASES[phaseIndex];

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 min-h-screen justify-center">
      <motion.h1
        className="font-heading text-2xl text-foreground mb-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Stay with me for a moment 🌿
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-base mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Let's slow this down together.
      </motion.p>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center mb-8" style={{ width: 200, height: 200 }}>
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 180,
            height: 180,
            background: "linear-gradient(135deg, hsl(204 35% 63% / 0.3), hsl(337 45% 81% / 0.3))",
          }}
          animate={{ scale: scale * 1.15 }}
          transition={{ duration: phase.duration / 1000, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: 160,
            height: 160,
            background: "linear-gradient(135deg, hsl(204 35% 63%), hsl(337 45% 81%))",
          }}
          animate={{ scale }}
          transition={{ duration: phase.duration / 1000, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={phase.label}
              className="text-sm font-medium"
              style={{ color: "white" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {phase.label}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Overlay text */}
      <div className="h-12 mb-4">
        <AnimatePresence>
          {overlayIndex >= 0 && (
            <motion.p
              key={OVERLAYS[overlayIndex]}
              className="text-sm text-foreground font-medium italic"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1 }}
            >
              {OVERLAYS[overlayIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-foreground mb-8 italic">
        Just follow the circle—no need to think.
      </p>

      <AnimatePresence>
        {done && (
          <motion.button
            className="wellness-btn max-w-[320px]"
            onClick={onContinue}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScreenBreathe;
