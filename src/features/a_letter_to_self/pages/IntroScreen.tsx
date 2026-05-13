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
    <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}>
      <div className="w-full">
        <PremiumIntro
          title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
          description={(typeof t !== "undefined" ? t : (k) => k)("app_description")}
          onStart={() => navigate("./write", { replace: true })}
          icon={<Mail size={32} />}
          benefits={[(typeof t !== "undefined" ? t : (k) => k)('intro_p1'), (typeof t !== "undefined" ? t : (k) => k)('intro_p2'), (typeof t !== "undefined" ? t : (k) => k)('intro_p3')]}
          duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration', "10-15 minutes")}
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
              {(typeof t !== "undefined" ? t : (k) => k)("view_past_letters")}
            </Link>
          </motion.div>
        </PremiumIntro>
      </div>
    </PremiumLayout>
  );
};

export default IntroScreen;
