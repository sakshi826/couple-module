import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onContinue: (afterIntensity: number) => void;
}

const ScreenNoticeShift = ({ onContinue }: Props) => {
  const [intensity, setIntensity] = useState(5);
  const [ripple, setRipple] = useState(false);

  const handleSliderChange = (val: number) => {
    setIntensity(val);
    setRipple(true);
    setTimeout(() => setRipple(false), 1500);
  };

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 min-h-screen justify-center">
      <motion.h1
        className="font-heading text-2xl text-foreground mb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Check in again 🌼
      </motion.h1>

      <motion.div
        className="wellness-card w-full max-w-[320px] mb-6 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {ripple && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full animate-ripple" style={{
              background: "hsl(337 45% 81% / 0.3)",
            }} />
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-4">
          How intense does it feel now?
        </p>

        <input
          type="range"
          min={0}
          max={10}
          value={intensity}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(204 35% 63%) 0%, hsl(337 45% 81%) ${intensity * 10}%, hsl(214 20% 91%) ${intensity * 10}%)`,
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0</span>
          <span>10</span>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-[320px] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="text-sm text-muted-foreground mb-2">
          What feels even slightly different?
        </p>
        <input
          type="text"
          className="wellness-input text-center"
          placeholder="Optional"
        />
      </motion.div>

      <motion.p
        className="text-sm text-foreground font-medium mb-8 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Even a small shift matters.
      </motion.p>

      <motion.button
        className="wellness-btn max-w-[320px]"
        onClick={() => onContinue(intensity)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default ScreenNoticeShift;
