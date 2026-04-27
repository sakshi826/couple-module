import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { ReflectionEntry } from "./GriefActivity";

interface Props {
  entries: ReflectionEntry[];
  onBack: () => void;
}

export const PastEntries = ({ entries, onBack }: Props) => (
  <div className="flex-1 flex flex-col">
    <button onClick={onBack} className="self-start text-muted-foreground hover:text-foreground transition-colors mb-6">
      <ChevronLeft size={24} />
    </button>

    <h2 className="font-display text-xl font-semibold text-foreground text-center mb-6">
      Past reflections 📖
    </h2>

    {entries.length === 0 ? (
      <p className="text-center text-muted-foreground text-sm">No entries yet.</p>
    ) : (
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-card rounded-2xl p-5 border border-border space-y-2"
          >
            <div className="flex justify-between items-baseline">
              <p className="font-display text-base text-foreground">{entry.name}</p>
              <p className="text-xs text-muted-foreground">{entry.date}</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{entry.wish}</p>
            {entry.smallStep && (
              <p className="text-xs text-muted-foreground italic">Step: {entry.smallStep}</p>
            )}
          </motion.div>
        ))}
      </div>
    )}
  </div>
);
