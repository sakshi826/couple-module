import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

const ChoosePersonScreen = ({ selected, onSelect, onContinue }: Props) => {
  
  const options = [
    { id: "friend", label: (typeof t !== "undefined" ? t : (k) => k)("choose_person.options.friend"), emoji: "🤝" },
    { id: "family", label: (typeof t !== "undefined" ? t : (k) => k)("choose_person.options.family"), emoji: "🏠" },
    { id: "colleague", label: (typeof t !== "undefined" ? t : (k) => k)("choose_person.options.colleague"), emoji: "💼" },
    { id: "other", label: (typeof t !== "undefined" ? t : (k) => k)("choose_person.options.other"), emoji: "👤" },
  ];

  return (
    <div className="glass-card p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          {(typeof t !== "undefined" ? t : (k) => k)("choose_person.title")}
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          {(typeof t !== "undefined" ? t : (k) => k)("choose_person.desc")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(opt.id)}
            className={`glass-card p-5 flex flex-col items-center gap-3 transition-all duration-200 hover:scale-[1.02] ${
              selected === opt.id
                ? "ring-2 ring-primary shadow-lg bg-primary/5"
                : "hover:bg-slate-50"
            }`}
          >
            <span className="text-3xl">{opt.emoji}</span>
            <span className="font-heading text-xs font-bold text-slate-600 uppercase tracking-widest">
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>

      <button
        onClick={onContinue}
        disabled={!selected}
        className="btn-gradient w-full py-3.5 font-heading font-medium text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none mt-4"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("choose_person.button")}
      </button>
    </div>
  );
};

export default ChoosePersonScreen;
