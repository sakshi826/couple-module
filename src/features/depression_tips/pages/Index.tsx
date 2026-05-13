import { useTranslation } from "react-i18next";
import { tips } from "../data/tips";
import TipCard from "../components/TipCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

export default function Index() {
  const { t } = useTranslation();

  return (
    <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}>
      <div className="w-full space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            {(typeof t !== "undefined" ? t : (k) => k)("notAlone")}
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {(typeof t !== "undefined" ? t : (k) => k)("supportForLowMood")}
          </h1>
          <p className="text-slate-500 text-base font-bold leading-relaxed max-w-md">
            {(typeof t !== "undefined" ? t : (k) => k)("gentleSteps")}
          </p>
        </header>

        <div className="space-y-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">
            {(typeof t !== "undefined" ? t : (k) => k)("dailySupportTips")}
          </h2>
          
          <div className="grid gap-4">
            {tips.map((tip, i) => (
              <TipCard key={tip.id} tip={tip} index={i} />
            ))}
          </div>
        </div>

        <p className="text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mt-16 px-12 leading-relaxed opacity-60">
          {(typeof t !== "undefined" ? t : (k) => k)("strugglingMessage")}
        </p>
      </div>
    </PremiumLayout>
  );
}
