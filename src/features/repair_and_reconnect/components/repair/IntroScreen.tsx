import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onStart: () => void;
  onBack?: () => void;
}

const IntroScreen = ({ onStart, onBack }: Props) => {
  const { t } = useTranslation();
  
  return (
    <div className="glass-card p-8 text-center space-y-6 relative">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-3 left-3 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl"
      >
        🤝
      </motion.div>

      <h1 className="font-heading text-2xl font-semibold text-foreground">
        {t("intro.title")}
      </h1>

      <p className="font-body text-muted-foreground leading-relaxed">
        {t("intro.description")}
      </p>

      <div className="glass-card p-4">
        <p className="font-body text-sm text-muted-foreground italic">
          {t("intro.quote")}
        </p>
      </div>

      <p className="font-body text-xs text-muted-foreground">
        {t("intro.small_efforts")}
      </p>

      <button onClick={onStart} className="btn-gradient w-full py-3.5 font-heading font-medium text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
        {t("intro.button")}
      </button>
    </div>
  );
};

export default IntroScreen;
