import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HOLD_DURATION = 5000;
const microcopy = [
  { at: 0, text: "Press and hold…" },
  { at: 0.15, text: "Stay with it…" },
  { at: 0.5, text: "You're doing it…" },
  { at: 0.8, text: "Almost there…" },
];

function getMicrocopy(progress: number) {
  let current = microcopy[0].text;
  for (const m of microcopy) {
    if (progress >= m.at) current = m.text;
  }
  return current;
}

interface HoldScreenProps {
  onComplete: () => void;
}

const HoldScreen = ({ onComplete }: HoldScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [completed, setCompleted] = useState(false);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const elapsed = Date.now() - startRef.current;
    const p = Math.min(elapsed / HOLD_DURATION, 1);
    setProgress(p);
    if (p >= 1) {
      setCompleted(true);
      setTimeout(onComplete, 800);
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [onComplete]);

  const startHold = useCallback(() => {
    if (completed) return;
    setHolding(true);
    startRef.current = Date.now() - progress * HOLD_DURATION;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, completed, progress]);

  const endHold = useCallback(() => {
    if (completed) return;
    setHolding(false);
    cancelAnimationFrame(rafRef.current);
    // Gently ease progress back
    setProgress(0);
  }, [completed]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen px-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-foreground mb-2"
      >
        Hold to Pause ⏸️
      </motion.h1>
      
      <AnimatePresence mode="wait">
        <motion.p
          key={getMicrocopy(progress)}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground mb-12 text-center"
        >
          {getMicrocopy(progress)}
        </motion.p>
      </AnimatePresence>

      {/* Circle + button */}
      <div className="relative flex items-center justify-center mb-12">
        {/* Breathing pulse background */}
        <div
          className={`absolute w-48 h-48 rounded-full bg-primary/10 ${holding ? "" : "animate-breathe"}`}
          style={holding ? { transform: `scale(${1 + progress * 0.15})`, opacity: 0.3 + progress * 0.3, transition: "all 0.3s ease" } : {}}
        />

        {/* SVG progress ring */}
        <svg width="180" height="180" className="absolute -rotate-90">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: holding ? "none" : "stroke-dashoffset 0.6s ease-out" }}
          />
        </svg>

        {/* Hold button */}
        <button
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 select-none touch-none ${
            completed
              ? "bg-primary scale-110"
              : holding
              ? "bg-primary scale-105 shadow-lg"
              : "bg-primary/80 hover:bg-primary"
          }`}
          style={{
            boxShadow: holding ? "0 0 40px hsla(185, 60%, 45%, 0.35)" : "0 4px 20px hsla(185, 60%, 45%, 0.2)",
          }}
        >
          {completed ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-primary-foreground text-3xl"
            >
              ✓
            </motion.span>
          ) : (
            <span className="text-primary-foreground text-4xl">
              {holding ? "🤚" : "👆"}
            </span>
          )}
        </button>
      </div>

      {!holding && progress === 0 && !completed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          Hold the circle for 5 seconds
        </motion.p>
      )}
    </motion.div>
  );
};

export default HoldScreen;
