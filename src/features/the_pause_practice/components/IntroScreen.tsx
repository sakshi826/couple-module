import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/features/the_pause_practice/components/ui/button";

interface IntroScreenProps {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: IntroScreenProps) => {
  const { t } = useTranslation();

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
        {(typeof t !== "undefined" ? t : (k) => k)("intro.title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-lg text-muted-foreground leading-relaxed mb-3 max-w-xs"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("intro.description")}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-sm text-muted-foreground mb-10"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("intro.duration")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <Button variant="coral" size="lg" onClick={onNext} className="px-10 py-6 text-lg">
          {(typeof t !== "undefined" ? t : (k) => k)("intro.button")}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
