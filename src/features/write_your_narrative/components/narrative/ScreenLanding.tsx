import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  reflection: string;
  setReflection: (v: string) => void;
  onSave: () => void;
  onFinish: () => void;
}

const ScreenLanding = ({ reflection, setReflection }: Props) => {
  const { t } = useTranslation();
  const steps = t("landing.steps", { returnObjects: true }) as string[];

  return (
    <div className="flex-1 flex flex-col gap-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
          🌿
        </div>
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          {t("landing.title")}
        </h1>
        <p className="text-slate-500 font-medium text-base italic">{t("landing.subtitle")}</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 space-y-6">
        <div className="flex items-center gap-4 text-slate-800 font-black text-lg">
          <CheckCircle2 className="text-emerald-500" size={24} />
          {t("landing.settle_title")}
        </div>
        
        <div className="space-y-4">
          {steps && steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-black text-slate-400 text-xs shadow-sm">{idx + 1}</div>
              <p className="text-slate-600 text-sm font-medium leading-relaxed pt-1">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] pl-4">
          {t("landing.feeling_label")}
        </label>
        <input
          type="text"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={t("landing.feeling_placeholder")}
          className="w-full bg-white border border-slate-100 rounded-3xl px-8 py-5 text-slate-800 text-lg font-black placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-xl shadow-slate-200/50 text-center"
        />
      </div>

      <p className="text-center text-slate-400 text-[13px] leading-relaxed font-medium italic">
        {t("landing.quote")}
      </p>
    </div>
  );
};

export default ScreenLanding;
