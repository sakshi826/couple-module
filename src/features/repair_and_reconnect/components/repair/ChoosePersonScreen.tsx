import { motion } from "framer-motion";

const people = [
  { id: "friend", label: "A friend", emoji: "👋" },
  { id: "family", label: "A family member", emoji: "🏠" },
  { id: "colleague", label: "A colleague", emoji: "💼" },
  { id: "someone", label: "Someone else", emoji: "🌿" },
  { id: "skip", label: "Skip for now", emoji: "⏭️" },
];

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

const ChoosePersonScreen = ({ selected, onSelect, onContinue }: Props) => (
  <div className="glass-card p-8 space-y-6">
    <div className="text-center space-y-2">
      <h1 className="font-heading text-2xl font-semibold text-foreground">
        Who is on your mind?
      </h1>
      <p className="font-body text-sm text-muted-foreground">
        Think of someone you recently felt upset with.
      </p>
    </div>

    <div className="space-y-3">
      {people.map((p, i) => (
        <motion.button
          key={p.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          onClick={() => onSelect(p.id)}
          className={`w-full glass-card p-4 text-left flex items-center gap-3 transition-all duration-200 hover:scale-[1.01] ${
            selected === p.id
              ? "ring-2 ring-primary shadow-md"
              : ""
          }`}
        >
          <span className="text-xl">{p.emoji}</span>
          <span className="font-body text-sm text-foreground">{p.label}</span>
        </motion.button>
      ))}
    </div>

    <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
      This isn't about blaming yourself—just noticing where things felt off.
    </p>

    <button
      onClick={onContinue}
      disabled={!selected}
      className="btn-gradient w-full py-3.5 font-heading font-medium text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
    >
      Continue →
    </button>
  </div>
);

export default ChoosePersonScreen;
