import { useState } from "react";
import { motion } from "framer-motion";


interface Props {
  onContinue: (sentence: string) => void;
}

const ScreenKindResponse = ({ onContinue }: Props) => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 min-h-screen justify-center">
      <motion.h1
        className="font-heading text-2xl text-foreground mb-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Try a kinder voice
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-base mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Write one sentence you need to hear right now.
      </motion.p>

      <motion.p
        className="text-xs text-muted-foreground italic mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        Say it like you would to a friend.
      </motion.p>

      <motion.div
        className="w-full max-w-[320px] mb-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <textarea
          className="wellness-input text-center resize-none"
          rows={3}
          placeholder="One kind sentence…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </motion.div>


      <motion.button
        className="wellness-btn max-w-[320px]"
        onClick={() => onContinue(text)}
        disabled={!text.trim()}
        style={{ opacity: text.trim() ? 1 : 0.5 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: text.trim() ? 1 : 0.5, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default ScreenKindResponse;
