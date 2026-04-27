import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/features/a_gentle_wish/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface Props {
  name: string;
  setName: (v: string) => void;
  relation: string;
  setRelation: (v: string) => void;
  wish: string;
  setWish: (v: string) => void;
  why: string;
  setWhy: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const ConnectionScreen = ({
  name, setName, relation, setRelation,
  wish, setWish, why, setWhy,
  onBack, onContinue,
}: Props) => {
  const [showCue, setShowCue] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showDeeper, setShowDeeper] = useState(false);

  useEffect(() => {
    if (name.trim().length > 0) {
      const t = setTimeout(() => setShowCue(true), 600);
      return () => clearTimeout(t);
    }
    setShowCue(false);
    setShowPrompt(false);
    setShowDeeper(false);
  }, [name]);

  useEffect(() => {
    if (showCue) {
      const t = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(t);
    }
  }, [showCue]);

  useEffect(() => {
    if (wish.trim().length > 0 && showPrompt) {
      const t = setTimeout(() => setShowDeeper(true), 800);
      return () => clearTimeout(t);
    }
    setShowDeeper(false);
  }, [wish, showPrompt]);

  return (
    <div className="flex-1 flex flex-col">
      <button onClick={onBack} className="self-start text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ChevronLeft size={24} />
      </button>

      <h2 className="font-display text-xl font-semibold text-foreground text-center mb-8">
        Who are you thinking of? 💛
      </h2>

      <div className="space-y-5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type their name…"
          className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/60 font-body text-base focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        <input
          type="text"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          placeholder="How do you know them? (optional)"
          className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
      </div>

      <AnimatePresence>
        {showCue && (
          <motion.p
            variants={reveal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-center text-sm text-muted-foreground italic mt-8 leading-relaxed"
          >
            Take a moment to picture {name.trim()}…<br />
            the way they spoke, cared, or looked at you.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPrompt && (
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-8 space-y-3"
          >
            <p className="font-display text-base text-foreground text-center leading-relaxed">
              What do you feel {name.trim()} would gently want for you right now?
            </p>
            <p className="text-xs text-muted-foreground text-center">
              It can be something small, simple, or kind.
            </p>
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Their gentle wish for you…"
              rows={3}
              className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/60 font-body text-base focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeeper && (
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-6 space-y-3"
          >
            <p className="text-sm text-muted-foreground text-center italic">
              Why does this feel like something they would want for you?
            </p>
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="Because… (optional)"
              rows={2}
              className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-8">
        <Button
          variant="grief"
          size="lg"
          className="w-full text-base py-6"
          onClick={onContinue}
          disabled={!wish.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
