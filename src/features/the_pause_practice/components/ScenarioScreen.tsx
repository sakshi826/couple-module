import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/features/the_pause_practice/components/ui/button";

interface ScenarioScreenProps {
  onNext: (scenario: string) => void;
}

const ScenarioScreen = ({ onNext }: ScenarioScreenProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");

  const scenarios = t("scenario.options", { returnObjects: true }) as any[];

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
      className="flex flex-col items-center min-h-[80vh] px-6 pt-16 pb-8"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-2xl font-semibold text-foreground mb-2 text-center"
      >
        {t("scenario.title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-muted-foreground text-center mb-8"
      >
        {t("scenario.desc")}
      </motion.p>

      <div className="w-full max-w-sm space-y-3 mb-10">
        {Array.isArray(scenarios) && scenarios.map((s, i) => (
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
          transition={{ delay: 0.3 + (Array.isArray(scenarios) ? scenarios.length : 0) * 0.08, duration: 0.4 }}
          onClick={() => handleSelect("other")}
          className={`w-full rounded-2xl transition-all duration-300 cursor-pointer ${
            selected === "other"
              ? "bg-primary/10 border-2 border-primary shadow-sm"
              : "card-surface border-2 border-transparent"
          }`}
        >
          <input
            type="text"
            placeholder={t("scenario.placeholder")}
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
          {t("scenario.button")}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ScenarioScreen;
