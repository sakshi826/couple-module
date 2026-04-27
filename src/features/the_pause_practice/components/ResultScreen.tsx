import { motion } from "framer-motion";
import { Button } from "@/features/the_pause_practice/components/ui/button";

const scenarioMessages: Record<string, string> = {
  interrupts: "Next time someone interrupts you, try this before responding.",
  plans: "Next time things don't go as planned, try this before reacting.",
  ignored: "Next time you feel ignored, try this before responding.",
  overwhelmed: "Next time you feel overwhelmed, try this before doing anything.",
  other: "Next time you feel triggered, try this before reacting.",
};

interface ResultScreenProps {
  scenario: string;
  onTryAgain: () => void;
  onDone: () => void;
}

const ResultScreen = ({ scenario, onTryAgain, onDone }: ResultScreenProps) => {
  const message = scenarioMessages[scenario] || scenarioMessages.other;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
        className="text-5xl mb-6"
      >
        ✨
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-2xl font-semibold text-foreground mb-4"
      >
        That's the Pause
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-foreground/80 leading-relaxed mb-3 max-w-xs"
      >
        You just created space between what you felt and how you respond.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="card-surface px-6 py-4 mb-4 max-w-xs"
      >
        <p className="text-foreground/90 text-sm leading-relaxed">
          {message}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-muted-foreground mb-10 max-w-xs italic"
      >
        It won't always feel easy—but even a small pause helps.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <Button variant="coral" size="lg" onClick={onTryAgain} className="py-6 text-base">
          Try Again 🔁
        </Button>
        <Button variant="soft" size="lg" onClick={onDone} className="py-6 text-base">
          Done ✔
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;
