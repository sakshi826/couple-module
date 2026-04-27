import { motion } from "framer-motion";

type Approach = { id: string; label: string; emoji: string };

const approachesByPerson: Record<string, Approach[]> = {
  friend: [
    { id: "message", label: "Send a casual check-in", emoji: "💬" },
    { id: "acknowledge", label: "Acknowledge the tension", emoji: "🫶" },
    { id: "pause", label: "Give each other some space", emoji: "⏸️" },
    { id: "letgo", label: "Let it go and move on", emoji: "🍃" },
    { id: "reflect", label: "Just reflect on it", emoji: "🪞" },
  ],
  family: [
    { id: "message", label: "Send a warm message", emoji: "💬" },
    { id: "acknowledge", label: "Name what happened honestly", emoji: "🫶" },
    { id: "pause", label: "Commit to pausing next time", emoji: "⏸️" },
    { id: "letgo", label: "Choose peace over being right", emoji: "🍃" },
    { id: "reflect", label: "Reflect on what you really need", emoji: "🪞" },
  ],
  colleague: [
    { id: "message", label: "Send a professional note", emoji: "💬" },
    { id: "acknowledge", label: "Address it respectfully", emoji: "🫶" },
    { id: "pause", label: "Plan a calmer response next time", emoji: "⏸️" },
    { id: "letgo", label: "Keep it professional and move on", emoji: "🍃" },
    { id: "reflect", label: "Think about boundaries", emoji: "🪞" },
  ],
  other: [
    { id: "message", label: "Reach out with a simple message", emoji: "💬" },
    { id: "acknowledge", label: "Acknowledge what happened", emoji: "🫶" },
    { id: "pause", label: "Take a pause next time", emoji: "⏸️" },
    { id: "letgo", label: "Let it go for now", emoji: "🍃" },
    { id: "reflect", label: "Just reflect (no action yet)", emoji: "🪞" },
  ],
  skip: [
    { id: "message", label: "Send a simple message", emoji: "💬" },
    { id: "acknowledge", label: "Acknowledge what happened", emoji: "🫶" },
    { id: "pause", label: "Take a pause next time", emoji: "⏸️" },
    { id: "letgo", label: "Let it go for now", emoji: "🍃" },
    { id: "reflect", label: "Just reflect (no action yet)", emoji: "🪞" },
  ],
};

interface Props {
  person: string;
  selected: string;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

const ChooseApproachScreen = ({ person, selected, onSelect, onContinue }: Props) => {
  const approaches = approachesByPerson[person] || approachesByPerson.skip;

  return (
    <div className="glass-card p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          What feels right for you?
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          Pick one small step that feels doable.
        </p>
      </div>

      <div className="space-y-3">
        {approaches.map((a, i) => (
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
        You don't have to fix everything—just choose one small step.
      </p>

      <button
        onClick={onContinue}
        disabled={!selected}
        className="btn-gradient w-full py-3.5 font-heading font-medium text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
      >
        Try This →
      </button>
    </div>
  );
};

export default ChooseApproachScreen;
