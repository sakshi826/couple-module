import { motion } from "framer-motion";
import { Button } from "@/features/a_gentle_wish/components/ui/button";
import { Heart, BookOpen, ChevronLeft } from "lucide-react";

interface Props {
  onBegin: () => void;
  onViewPast: () => void;
  hasPastEntries: boolean;
}

export const WelcomeScreen = ({ onBegin, onViewPast, hasPastEntries }: Props) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 relative">
    <button
      onClick={() => window.history.back()}
      className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Exit activity"
    >
      <ChevronLeft size={24} />
    </button>
    {hasPastEntries && (
      <button
        onClick={onViewPast}
        className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="View past entries"
      >
        <BookOpen size={22} />
      </button>
    )}

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    >
      <Heart className="w-12 h-12 text-primary mx-auto mb-2" strokeWidth={1.5} />
    </motion.div>

    <div className="space-y-3">
      <h1 className="font-display text-2xl font-semibold text-foreground leading-snug">
        One Thing They'd<br />Want for Me 🕊️
      </h1>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-xs"
    >
      <p>Sometimes, even when someone is gone,<br />we can still feel what they wished for us.</p>
      <p className="text-sm italic">
        Take a slow breath in…<br />
        …and gently breathe out.
      </p>
      <p className="text-sm">Go at your own pace. You can stop anytime.</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="space-y-3 w-full max-w-xs"
    >
      <Button variant="grief" size="lg" className="w-full text-base py-6" onClick={onBegin}>
        Begin
      </Button>
      <Button variant="griefSecondary" size="default" className="w-full" onClick={() => window.history.back()}>
        Maybe later
      </Button>
    </motion.div>
  </div>
);
