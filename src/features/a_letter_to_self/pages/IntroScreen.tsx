import { useNavigate, Link } from "react-router-dom";
import { Mail, History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { motion } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const IntroScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PremiumLayout title={t("app_title")}>
      <div className="w-full">
        <PremiumIntro
          title={t("app_title")}
          description={t("app_description")}
          onStart={() => navigate("./write", { replace: true })}
          icon={<Mail size={32} />}
          benefits={[t('intro_p1'), t('intro_p2'), t('intro_p3')]}
          duration={t('app_duration', "10-15 minutes")}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <Link
              to="./letters"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-black text-[10px] uppercase tracking-widest transition-all hover:tracking-widest"
            >
              <History size={16} />
              {t("view_past_letters")}
            </Link>
          </motion.div>
        </PremiumIntro>
      </div>
    </PremiumLayout>
  );
};

export default IntroScreen;
