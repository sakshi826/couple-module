import { motion } from "framer-motion";
import { Button } from "@/features/the_pause_practice/components/ui/button";

interface IntroScreenProps {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: IntroScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="text-6xl mb-8"
      >
        ⏸️
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-semibold text-foreground mb-4"
      >
        The 5-Second Pause
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-lg text-muted-foreground leading-relaxed mb-3 max-w-xs"
      >
        A small pause between feeling and reacting can change everything.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-sm text-muted-foreground mb-10"
      >
        Takes less than 15 seconds. Really.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <Button variant="coral" size="lg" onClick={onNext} className="px-10 py-6 text-lg">
          Try It →
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
