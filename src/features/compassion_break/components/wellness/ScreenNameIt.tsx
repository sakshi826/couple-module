import { useState } from "react";
import { motion } from "framer-motion";

const EMOTIONS = ["anxious", "guilty", "overwhelmed", "tense", "tired", "sad"];

interface Props {
  onContinue: (emotions: string[]) => void;
}

const ScreenNameIt = ({ onContinue }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState("");

  const toggleEmotion = (e: string) => {
    setSelected((prev) => {
      if (prev.includes(e)) return prev.filter((x) => x !== e);
      if (prev.length >= 2) return [prev[1], e];
      return [...prev, e];
    });
  };

  const handleContinue = () => {
    const result = custom.trim()
      ? [custom.trim()]
      : selected;
    if (result.length > 0) onContinue(result);
  };

  const hasSelection = selected.length > 0 || custom.trim().length > 0;

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 min-h-screen justify-center">
      <motion.h1
        className="font-heading text-2xl text-foreground mb-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Put it into words
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-base mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Right now, I feel _______
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-2.5 mb-6 max-w-[320px]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {EMOTIONS.map((e) => (
          <button
            key={e}
            className={`emotion-chip ${selected.includes(e) ? "selected" : ""}`}
            onClick={() => toggleEmotion(e)}
          >
            {e}
          </button>
        ))}
      </motion.div>

      <motion.div
        className="w-full max-w-[320px] mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
      >
        <p className="text-xs text-muted-foreground mb-2">or type your own</p>
        <input
          type="text"
          className="wellness-input text-center"
          placeholder="1–2 words"
          maxLength={30}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      </motion.div>

      <motion.p
        className="text-xs text-muted-foreground mb-8 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        Simple is enough.
      </motion.p>

      <motion.button
        className="wellness-btn max-w-[320px]"
        onClick={handleContinue}
        disabled={!hasSelection}
        style={{ opacity: hasSelection ? 1 : 0.5 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: hasSelection ? 1 : 0.5, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default ScreenNameIt;
