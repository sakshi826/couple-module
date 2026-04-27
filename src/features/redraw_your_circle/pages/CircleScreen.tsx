import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProgressDots from "@/features/redraw_your_circle/components/ProgressDots";
import BackgroundOrbs from "@/features/redraw_your_circle/components/BackgroundOrbs";
import { PROMPTS } from "@/features/redraw_your_circle/lib/circleStore";
import { Info, X, Users } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";

const BUBBLE_COLORS = [
  "bg-bubble-1",
  "bg-bubble-2",
  "bg-bubble-3",
  "bg-bubble-4",
  "bg-bubble-5",
];

const BUBBLE_EMOJIS = ["💬", "🤗", "💪", "🎉", "🌟"];

const POSITIONS = [
  { angle: -90, r: 110 },
  { angle: -18, r: 110 },
  { angle: 54, r: 110 },
  { angle: 126, r: 110 },
  { angle: 198, r: 110 },
];

function getPos(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

interface CircleScreenProps {
  names: Record<string, string>;
  onNamesChange: (names: Record<string, string>) => void;
}

const CircleScreen = ({ names, onNamesChange }: CircleScreenProps) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleBubbleTap = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setInputValue(names[String(index)] || "");
    },
    [names]
  );

  const handleSave = useCallback(() => {
    if (activeIndex === null) return;
    const trimmed = inputValue.trim();
    const updated = { ...names };
    if (trimmed) {
      updated[String(activeIndex)] = trimmed;
    } else {
      delete updated[String(activeIndex)];
    }
    onNamesChange(updated);
    setActiveIndex(null);
    setInputValue("");
  }, [activeIndex, inputValue, names, onNamesChange]);

  return (
    <PremiumLayout
      title="Redraw Your Circle"
      subtitle="Who is in your support system?"
      icon={<Users className="w-6 h-6 text-primary" />}
      onBack={() => navigate("../intro")}
    >
      <div className="flex-1 flex flex-col items-center px-6 pb-8 relative z-10">
        <BackgroundOrbs />
        <ProgressDots current={2} />

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2 text-center">
          Who's In Your Circle Right Now? 🔮
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-xs mb-2">
          Think about the people in your life and where they show up for you.
        </p>

        {/* Instruction bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2.5 flex items-center gap-2 max-w-xs mb-6 border border-slate-100 shadow-sm">
          <Info className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-xs text-muted-foreground">
            👆 Tap each bubble and add someone who fits that space in your life.
          </span>
        </div>

        {/* Circle container */}
        <div className="relative w-72 h-72 mx-auto mt-4">
          {/* Center node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center z-10">
            <span className="text-sm font-semibold text-primary-foreground">You</span>
          </div>

          {/* Floating bubbles */}
          {PROMPTS.map((prompt, i) => {
            const { x, y } = getPos(POSITIONS[i].angle, POSITIONS[i].r);
            const hasName = !!names[String(i)];

            return (
              <motion.button
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBubbleTap(i)}
                className={`absolute w-[76px] h-[76px] rounded-full flex flex-col items-center justify-center text-center p-1.5 transition-shadow ${
                  BUBBLE_COLORS[i]
                } ${
                  hasName
                    ? "shadow-md ring-2 ring-primary/20"
                    : "shadow-sm opacity-80"
                }`}
                style={{
                  left: `calc(50% + ${x}px - 38px)`,
                  top: `calc(50% + ${y}px - 38px)`,
                }}
                aria-label={prompt}
              >
                <span className="text-sm mb-0.5">{BUBBLE_EMOJIS[i]}</span>
                <span className="text-[9px] leading-tight text-foreground font-medium">
                  {hasName ? names[String(i)] : prompt.split(" ").slice(0, 2).join(" ") + "…"}
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-6 italic text-center">
          🤍 It's okay if your circle feels small.
        </p>

        <button
          onClick={() => navigate("../reflection")}
          className="mt-8 bg-primary text-primary-foreground font-semibold px-12 py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          Continue →
        </button>
      </div>

      {/* Input Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-end justify-center z-50 px-4"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-12 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-800">
                  {BUBBLE_EMOJIS[activeIndex]} Add a name
                </h3>
                <button
                  onClick={() => setActiveIndex(null)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                {PROMPTS[activeIndex]}
              </p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="Enter a name…"
                autoFocus
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary/20 transition-all"
              />
              <button
                onClick={handleSave}
                className="mt-6 w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                Save Name
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PremiumLayout>
  );
};

export default CircleScreen;
