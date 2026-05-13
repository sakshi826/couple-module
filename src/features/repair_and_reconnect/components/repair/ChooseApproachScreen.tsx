import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type Approach = { id: string; label: string; emoji: string };

interface Props {
  person: string;
  selected: string;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

const ChooseApproachScreen = ({ person, selected, onSelect, onContinue }: Props) => {

  const approaches = ((typeof t !== "undefined" ? t : (k) => k)(`choose_approach.approaches.${person}`, { returnObjects: true }) || 
                     (typeof t !== "undefined" ? t : (k) => k)(`choose_approach.approaches.other`, { returnObjects: true })) as Approach[];

  return (
    <div className="glass-card p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          {(typeof t !== "undefined" ? t : (k) => k)("choose_approach.title")}
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          {(typeof t !== "undefined" ? t : (k) => k)("choose_approach.desc")}
        </p>
      </div>

      <div className="space-y-3">
        {Array.isArray(approaches) && approaches.map((a, i) => (
          <motion.button
            key={a.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => onSelect(a.id)}
            className={`w-full glass-card p-4 text-left flex items-center gap-3 transition-all duration-200 hover:scale-[1.01] ${
              selected === a.id
                ? "ring-2 ring-primary shadow-md"
                : ""
            }`}
          >
            <span className="text-xl">{a.emoji}</span>
            <span className="font-body text-sm text-foreground">{a.label}</span>
          </motion.button>
        ))}
      </div>

      <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
        {(typeof t !== "undefined" ? t : (k) => k)("choose_approach.safety")}
      </p>

      <button
        onClick={onContinue}
        disabled={!selected}
        className="btn-gradient w-full py-3.5 font-heading font-medium text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("choose_approach.button")}
      </button>
    </div>
  );
};

export default ChooseApproachScreen;
