import { motion } from "framer-motion";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { Sparkles, RefreshCw } from "lucide-react";

const scenarioMessages: Record<string, string> = {
  interrupts: "Next time someone interrupts you, try this before responding.",
  plans: "Next time things don't go as planned, try this before reacting.",
  ignored: "Next time you feel ignored, try this before responding.",
  overwhelmed: "Next time you feel overwhelmed, try this before doing anything.",
  other: "Next time you feel triggered, try this before reacting.",
};

interface ResultScreenProps {
  scenario: string;
  onTryAgain: () => void;
  onDone: () => void;
}

const ResultScreen = ({ scenario, onTryAgain, onDone }: ResultScreenProps) => {
  const message = scenarioMessages[scenario] || scenarioMessages.other;

  return (
    <div className="w-full">
      <PremiumComplete
        title="That's the Pause"
        message="You just created space between what you felt and how you respond. Even a small pause helps you reclaim your center."
        onRestart={onTryAgain}
        onHome={onDone}
        icon={<Sparkles size={48} />}
      >
        <div className="space-y-6 my-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform">
                <Sparkles size={120} strokeWidth={1} />
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 relative z-10">Pro Tip</p>
            <p className="text-xl font-bold italic leading-tight relative z-10">
              "{message}"
            </p>
          </motion.div>
          
          <p className="text-slate-400 text-xs font-bold italic text-center">
            It won't always feel easy—but consistency is key.
          </p>
        </div>
      </PremiumComplete>
    </div>
  );
};

export default ResultScreen;
