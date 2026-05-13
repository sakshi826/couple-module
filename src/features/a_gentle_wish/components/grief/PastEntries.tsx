import { motion } from "framer-motion";
import { ChevronLeft, History, Heart, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ReflectionEntry } from "./GriefActivity";

interface Props {
  entries: ReflectionEntry[];
  onBack: () => void;
}

export const PastEntries = ({ entries, onBack }: Props) => {
  return (
    <div className="flex-1 flex flex-col gap-8 py-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-800 leading-tight">
          {(typeof t !== "undefined" ? t : (k) => k)("past_entries_title")}
        </h2>
        <p className="text-slate-500 font-medium text-base">{(typeof t !== "undefined" ? t : (k) => k)("past_entries_subtitle")}</p>
      </header>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {entries.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-12 text-center shadow-xl shadow-slate-200/50 space-y-6">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-3xl">
              ⏳
            </div>
            <p className="text-slate-500 font-medium text-base leading-relaxed">
              {(typeof t !== "undefined" ? t : (k) => k)("no_past_entries")}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 space-y-4 hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-rose-50 text-rose-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    {entry.date}
                  </span>
                  <Heart size={16} className="text-rose-100" />
                </div>
                
                <div className="space-y-3">
                  <p className="text-slate-800 font-black text-xl leading-tight">
                    {entry.name}
                  </p>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-100 rounded-full" />
                    <p className="pl-6 text-slate-600 text-base leading-relaxed font-medium">
                      {entry.wish}
                    </p>
                  </div>
                </div>

                {entry.smallStep && (
                  <div className="pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">{(typeof t !== "undefined" ? t : (k) => k)("label_step_preserved")}</p>
                    <p className="text-slate-500 text-sm font-bold italic">
                      "{entry.smallStep}"
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
      >
        <ChevronLeft size={20} strokeWidth={3} />
        {(typeof t !== "undefined" ? t : (k) => k)("back_to_reflection_button")}
      </button>
    </div>
  );
};
