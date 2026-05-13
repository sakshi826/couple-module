import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScreenWrapper from "./ScreenWrapper";

interface Props {
  name: string;
  setName: (v: string) => void;
  relation: string;
  setRelation: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const WhoScreen = ({ name, setName, relation, setRelation, category, setCategory, onContinue, onBack }: Props) => {
  const { t } = useTranslation();
  const CATEGORIES = (typeof t !== "undefined" ? t : (k) => k)("who.categories", { returnObjects: true }) as any[];

  return (
    <ScreenWrapper>
      <div className="absolute top-0 left-0 px-5 py-4 z-20">
        <button onClick={onBack} className="p-2 rounded-full text-muted-foreground hover:bg-card transition-colors">
          <ChevronLeft size={22} />
        </button>
      </div>

      <div className="space-y-7 w-full max-w-xs">
        <div className="text-4xl">🌸</div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder={(typeof t !== "undefined" ? t : (k) => k)("who.placeholder_name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-center font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
          <input
            type="text"
            placeholder={(typeof t !== "undefined" ? t : (k) => k)("who.placeholder_relation")}
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-center font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>

        <div className="space-y-2.5">
          {Array.isArray(CATEGORIES) && CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCategory(cat.label)}
              className={`w-full py-3 px-4 rounded-xl text-sm font-body transition-all duration-300 border flex items-center justify-center gap-2 ${
                category === cat.label
                  ? "bg-secondary border-accent text-foreground shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          disabled={!name.trim() || !category}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {(typeof t !== "undefined" ? t : (k) => k)("who.continue")}
        </motion.button>
      </div>
    </ScreenWrapper>
  );
};

export default WhoScreen;
