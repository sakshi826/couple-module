import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onContinue: (intensity: number) => void;
  onExit: () => void;
}

const getFeedback = (value: number) => {
  if (value <= 3) return "You're doing okay.";
  if (value <= 6) return "Thanks for noticing that.";
  return "That sounds really heavy right now.";
};

const ScreenPauseCheckIn = ({ onContinue, onExit }: Props) => {
  const [intensity, setIntensity] = useState(5);

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 min-h-screen justify-center">
      <button
        onClick={onExit}
        className="absolute top-6 left-6 text-muted-foreground text-xl font-body hover:text-foreground transition-colors"
        aria-label="Exit activity"
      >
        ‹
      </button>

      <motion.h1
        className="font-heading text-2xl text-foreground mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Let's pause for a moment 💛
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-base mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        Take a breath.
        <br />
        Let's check in with how you're feeling right now.
      </motion.p>

      <motion.div
        className="wellness-card w-full max-w-[320px] mb-8"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <p className="text-sm text-muted-foreground mb-4">
          How intense does this feel?
        </p>

        <div className="relative mb-3">
          <input
            type="range"
            min={0}
            max={10}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(204 35% 63%) 0%, hsl(337 45% 81%) ${intensity * 10}%, hsl(214 20% 91%) ${intensity * 10}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>10</span>
          </div>
        </div>

        <motion.p
          key={getFeedback(intensity)}
          className="text-sm text-foreground font-medium mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {getFeedback(intensity)}
        </motion.p>
      </motion.div>

      <motion.button
        className="wellness-btn max-w-[320px]"
        onClick={() => onContinue(intensity)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default ScreenPauseCheckIn;
