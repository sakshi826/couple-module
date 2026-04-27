import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/features/the_pause_practice/components/ui/button";

const scenarios = [
  { id: "interrupts", label: "Someone interrupts me", emoji: "😠" },
  { id: "plans", label: "Things don't go as planned", emoji: "😤" },
  { id: "ignored", label: "I feel ignored", emoji: "😔" },
  { id: "overwhelmed", label: "I feel overwhelmed", emoji: "😵‍💫" },
];

interface ScenarioScreenProps {
  onNext: (scenario: string) => void;
}

const ScenarioScreen = ({ onNext }: ScenarioScreenProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");

  const handleSelect = (id: string) => {
    setSelected(id);
    if (id !== "other") setCustomText("");
  };

  const isValid = selected && (selected !== "other" || customText.trim().length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center min-h-screen px-6 pt-16 pb-8"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-2xl font-semibold text-foreground mb-2 text-center"
      >
        What triggers you?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-muted-foreground text-center mb-8"
      >
        Pick a situation you relate to
      </motion.p>

      <div className="w-full max-w-sm space-y-3 mb-10">
        {scenarios.map((s, i) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            onClick={() => handleSelect(s.id)}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-300 ${
              selected === s.id
                ? "bg-primary/10 border-2 border-primary shadow-sm"
                : "card-surface border-2 border-transparent"
            }`}
          >
            <span className="text-xl">{s.emoji}</span>
            <span className={`font-body text-base ${selected === s.id ? "text-foreground font-medium" : "text-foreground"}`}>
              {s.label}
            </span>
          </motion.button>
        ))}

        {/* Custom typing option */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + scenarios.length * 0.08, duration: 0.4 }}
          onClick={() => handleSelect("other")}
          className={`w-full rounded-2xl transition-all duration-300 cursor-pointer ${
            selected === "other"
              ? "bg-primary/10 border-2 border-primary shadow-sm"
              : "card-surface border-2 border-transparent"
          }`}
        >
          <input
            type="text"
            placeholder="Type your own..."
            value={customText}
            onFocus={() => handleSelect("other")}
            onChange={(e) => {
              setCustomText(e.target.value);
              setSelected("other");
            }}
            className="w-full bg-transparent px-5 py-4 text-base font-body text-foreground placeholder:text-muted-foreground outline-none"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isValid ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="coral"
          size="lg"
          disabled={!isValid}
          onClick={() => selected && onNext(selected)}
          className="px-10 py-6 text-lg"
        >
          Practice Pause →
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ScenarioScreen;
