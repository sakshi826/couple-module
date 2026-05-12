import React from "react";
import { PremiumComplete } from "../../../../components/shared/PremiumComplete";

import { SelfCareEntry, formatDateShort } from "../../lib/selfcare-data";
import { Pencil, CalendarDays, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface Screen6Props {
  entry: SelfCareEntry;
  onEdit: () => void;
  onHistory: () => void;
  onHome: () => void;
}

const Screen6Review = ({ entry, onEdit, onHistory, onHome }: Screen6Props) => {
  const { t } = useTranslation();

  const rows: { label: string; value: string }[] = [
    { label: t('common.date'), value: formatDateShort(entry.date) },
    { label: t('screens.review.didSelfCare'), value: entry.didSelfCare ? `${t('common.yes')} ✅` : `${t('common.no')} ❌` },
  ];

  if (entry.didSelfCare) {
    if (entry.activities.length) {
      rows.push({
        label: t('screens.review.activities'),
        value: entry.activities.map(a => t(`data.activities.${a}`)).join(", ")
      });
    }
    if (entry.duration) {
      rows.push({
        label: t('screens.review.duration'),
        value: t(`data.durations.${entry.duration}`)
      });
    }
  } else {
    if (entry.preventionReasons.length) {
      rows.push({
        label: t('screens.review.challenges'),
        value: entry.preventionReasons.map(r => t(`data.reasons.${r}`)).join(", ")
      });
    }
    if (entry.helpfulType) {
      rows.push({
        label: t('screens.review.whatHelps'),
        value: t(`data.helpfulTypes.${entry.helpfulType}`)
      });
    }
  }

  if (entry.mood) {
    rows.push({
      label: t('screens.review.mood'),
      value: `${entry.moodEmoji} ${t(`data.moods.${entry.mood}`)}`
    });
  }

  return (
    <PremiumComplete
      title={t("app_title")}
      message={t('screens.review.subtitle')}
      onRestart={onHome}
    >
      <div className="grid gap-3 w-full max-w-md mx-auto mt-10">
        {rows.map((r, i) => (
          <motion.div 
            key={r.label} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-6 bg-white rounded-[2rem] border-2 border-slate-50 shadow-sm"
          >
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{r.label}</span>
            <span className="text-base font-bold text-slate-700">{r.value}</span>
          </motion.div>
        ))}

        <div className="flex flex-col gap-3 mt-8">
            <div className="grid grid-cols-2 gap-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onEdit}
                    className="py-5 rounded-2xl bg-white border-2 border-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:text-primary hover:border-primary/20 transition-all"
                >
                    <Pencil size={16} />
                    {t('screens.review.editToday')}
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onHistory}
                    className="py-5 rounded-2xl bg-white border-2 border-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:text-primary hover:border-primary/20 transition-all"
                >
                    <CalendarDays size={16} />
                    {t('screens.review.viewHistory')}
                </motion.button>
            </div>
        </div>
      </div>
    </PremiumComplete>
  );
};

export default Screen6Review;
