import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { BatteryMedium, History } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IntroScreen = ({ onStart }: { onStart: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PremiumIntro
      title={t("app_title")}
      description={t("app_description")}
      onStart={onStart}
      icon={<BatteryMedium size={32} />}
      benefits={[t('intro_p1'), t('intro_p2'), t('intro_p3')]}
      duration={t('app_duration', "1 minute")}
    >
      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("weekly")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors"
        >
          <History size={18} />
          {t("view_weekly")}
        </motion.button>
      </div>
    </PremiumIntro>
  );
};

export default IntroScreen;
