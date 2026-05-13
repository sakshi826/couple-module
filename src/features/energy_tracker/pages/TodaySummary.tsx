import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEnergy, EnergyLevel } from "../context/EnergyContext";
import { Droplets, Footprints, Coffee, History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { Sparkles } from "lucide-react";

const emojiMap: Record<EnergyLevel, string> = {
  "very-low": "😴",
  low: "😔",
  okay: "😐",
  good: "🙂",
  high: "⚡",
};

const TodaySummary = () => {
  const { t } = useTranslation();
  const { currentLevel, entries } = useEnergy();
  const navigate = useNavigate();
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todayEntry = entries.find(e => e.date === todayStr);
  const level = currentLevel || todayEntry?.level || "okay";

  const labelMap: Record<EnergyLevel, string> = {
    "very-low": (typeof t !== "undefined" ? t : (k) => k)("very_low"),
    low: (typeof t !== "undefined" ? t : (k) => k)("low"),
    okay: (typeof t !== "undefined" ? t : (k) => k)("okay"),
    good: (typeof t !== "undefined" ? t : (k) => k)("good"),
    high: (typeof t !== "undefined" ? t : (k) => k)("high"),
  };

  const messages: Record<EnergyLevel, string> = {
    "very-low": (typeof t !== "undefined" ? t : (k) => k)("msg_very_low"),
    low: (typeof t !== "undefined" ? t : (k) => k)("msg_low"),
    okay: (typeof t !== "undefined" ? t : (k) => k)("msg_okay"),
    good: (typeof t !== "undefined" ? t : (k) => k)("msg_good"),
    high: (typeof t !== "undefined" ? t : (k) => k)("msg_high"),
  };

  const suggestions = [
    { icon: Coffee, text: (typeof t !== "undefined" ? t : (k) => k)("breaks") },
    { icon: Droplets, text: (typeof t !== "undefined" ? t : (k) => k)("hydrated") },
    { icon: Footprints, text: (typeof t !== "undefined" ? t : (k) => k)("movement") },
  ];

  return (
    <PremiumLayout 
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      icon={<Sparkles className="h-6 w-6" />}
      exitOnBack={true}
    >
      <PremiumComplete
        title={(typeof t !== "undefined" ? t : (k) => k)("today_energy", { label: labelMap[level] })}
        message={messages[level]}
        onRestart={() => navigate("/", { replace: true })}
        onHome={() => {
          if (window.parent !== window) {
            window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
          }
          window.location.href = 'https://web.mantracare.com';
        }}
        icon={<span className="text-6xl">{emojiMap[level]}</span>}
      >
        <div className="space-y-6 w-full max-w-md mx-auto mt-8">
          <div className="grid gap-4">
            {suggestions.map((s, i) => (
              <motion.div
                key={s.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-5 rounded-3xl bg-white border-2 border-slate-100 px-6 py-5 shadow-sm hover:border-primary/20 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-base font-bold text-slate-700">{s.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("../weekly")}
            className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center gap-3"
          >
            <History size={20} />
            {(typeof t !== "undefined" ? t : (k) => k)("view_weekly")}
          </motion.button>
        </div>
      </PremiumComplete>
    </PremiumLayout>
  );
};

export default TodaySummary;
