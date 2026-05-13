import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
  onContinue: (intensity: number) => void;
  onExit: () => void;
}

const ScreenPauseCheckIn = ({ onContinue, onExit }: Props) => {
  const { t } = useTranslation();
  const [intensity, setIntensity] = useState(5);

  const getFeedback = (value: number) => {
  const { t } = useTranslation();
    if (value <= 3) return t("feedback_calm");
    if (value <= 6) return t("feedback_noticing");
    return t("feedback_heavy");
  };

  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <motion.h1
        className="font-heading text-3xl text-slate-800 mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {t("pause_title")}
      </motion.h1>

      <motion.p
        className="text-slate-500 text-base mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        {t("pause_description")}
      </motion.p>

      <motion.div
        className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50 w-full mb-8"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <p className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">
          {t("intensity_label")}
        </p>

        <div className="relative mb-6">
          <input
            type="range"
            min={0}
            max={10}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-100"
            style={{
              background: `linear-gradient(to right, #94a3b8 0%, #4F95FF ${intensity * 10}%, #f1f5f9 ${intensity * 10}%)`,
            }}
          />
          <div className="flex justify-between text-xs font-black text-slate-300 mt-3">
            <span>{t("label_calm")}</span>
            <span>{t("label_intense")}</span>
          </div>
        </div>

        <motion.div
          key={getFeedback(intensity)}
          className="bg-slate-50 rounded-2xl p-4 border border-slate-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm text-slate-700 font-bold">
            {getFeedback(intensity)}
          </p>
        </motion.div>
      </motion.div>

      <motion.button
        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
        onClick={() => onContinue(intensity)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {t("continue_button")}
      </motion.button>
    </div>
  );
};

export default ScreenPauseCheckIn;
