import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { Sparkles } from "lucide-react";

interface ResultScreenProps {
  scenario: string;
  onTryAgain: () => void;
  onDone: () => void;
}

const ResultScreen = ({ scenario, onTryAgain, onDone }: ResultScreenProps) => {
  const { t } = useTranslation();
  
  const scenarioMessages = t("result.scenario_messages", { returnObjects: true }) as Record<string, string>;
  const message = scenarioMessages[scenario] || scenarioMessages.other;

  return (
    <div className="w-full">
      <PremiumComplete
        title={t("result.title")}
        message={t("result.message")}
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
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 relative z-10">{t("result.tip_label")}</p>
            <p className="text-xl font-bold italic leading-tight relative z-10">
              "{message}"
            </p>
          </motion.div>
          
          <p className="text-slate-400 text-xs font-bold italic text-center">
            {t("result.italic")}
          </p>
        </div>
      </PremiumComplete>
    </div>
  );
};

export default ResultScreen;
