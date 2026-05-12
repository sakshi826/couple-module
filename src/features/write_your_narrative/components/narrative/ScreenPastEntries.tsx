import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Entry {
  writing: string;
  reflection: string;
  date: string;
}

interface Props {
  entries: Entry[];
  onBack: () => void;
}

const ScreenPastEntries = ({ entries, onBack }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col gap-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          {t("history.title")}
        </h1>
        <p className="text-slate-500 font-medium text-base">{t("history.subtitle")}</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {entries.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-12 text-center shadow-xl shadow-slate-200/50">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
              ⏳
            </div>
            <p className="text-slate-500 font-medium text-base leading-relaxed">
              {t("history.empty")}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 space-y-4 hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    {entry.date}
                  </span>
                  {entry.reflection && (
                    <span className="text-primary font-black text-xs italic">
                      {entry.reflection}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                  <p className="pl-6 text-slate-700 text-base leading-relaxed font-medium line-clamp-4">
                    {entry.writing || <span className="italic text-slate-300">{t("history.no_writing")}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
      >
        <ChevronLeft size={20} strokeWidth={3} />
        {t("history.button_back")}
      </button>
    </div>
  );
};

export default ScreenPastEntries;
