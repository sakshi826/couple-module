import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { Wind } from "lucide-react";

const CompletionScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState("");

  return (
    <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}>
      <PremiumComplete
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        message={`${(typeof t !== "undefined" ? t : (k) => k)('notice_body')} ${(typeof t !== "undefined" ? t : (k) => k)('breath_slower')} ${(typeof t !== "undefined" ? t : (k) => k)('chest_softer')}`}
        onRestart={() => navigate("../breathe")}
        icon={<Wind size={48} />}
      >
        <div className="w-full flex flex-col gap-4 text-left mt-8">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
            {(typeof t !== "undefined" ? t : (k) => k)('what_feels_different')}
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={(typeof t !== "undefined" ? t : (k) => k)('reflection_placeholder')}
            rows={4}
            className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 text-lg font-bold resize-none outline-none focus:border-primary/50 transition-all placeholder:text-slate-200 shadow-inner"
          />
        </div>
      </PremiumComplete>
    </PremiumLayout>
  );
};

export default CompletionScreen;
