import { useNavigate } from "react-router-dom";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { useTranslation } from "react-i18next";
import { History, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const CompletionScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}>
      <div className="w-full h-full">
        <PremiumComplete
          title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
          message={(typeof t !== "undefined" ? t : (k) => k)("completion_message")}
          onRestart={() => navigate("..")}
          icon={<Mail size={48} />}
        >
          <div className="w-full max-w-md mx-auto mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("../letters")}
                className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center gap-3"
              >
                <History size={20} />{(typeof t !== "undefined" ? t : (k) => k)("view_past_letters")}</motion.button>
          </div>
        </PremiumComplete>
      </div>
    </PremiumLayout>
  );
};

export default CompletionScreen;
