import { motion } from "framer-motion";
import { Heart, Save } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CheckInData {
  beforeIntensity: number;
  afterIntensity: number;
  emotions: string[];
  kindSentence: string;
}

interface Props {
  data: CheckInData;
  onSave: () => void;
  onFinish: () => void;
}

const ScreenSaveClose = ({ data, onSave, onFinish }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <motion.h1
        className="font-heading text-3xl text-slate-800 mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {(typeof t !== "undefined" ? t : (k) => k)("save_title")}
      </motion.h1>

      <motion.p
        className="text-slate-500 text-base mb-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        {(typeof t !== "undefined" ? t : (k) => k)("save_subtitle")}
      </motion.p>

      <motion.div
        className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50 w-full mb-8 overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Heart size={80} fill="currentColor" className="text-primary" />
        </div>

        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 text-left">{(typeof t !== "undefined" ? t : (k) => k)("label_your_checkin")}</p>
        <div className="space-y-4 text-sm text-left relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-bold">{(typeof t !== "undefined" ? t : (k) => k)("label_intensity_shift")}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 line-through">{data.beforeIntensity}</span>
              <span className="text-primary font-black text-lg">→ {data.afterIntensity}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-bold">{(typeof t !== "undefined" ? t : (k) => k)("label_feelings")}</span>
            <span className="text-slate-700 font-black uppercase tracking-tight">{data.emotions.join(", ")}</span>
          </div>
          <div className="pt-6 border-t border-slate-50 mt-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">{(typeof t !== "undefined" ? t : (k) => k)("label_your_kind_words")}</p>
            <p className="text-slate-800 font-bold text-lg leading-relaxed italic">"{data.kindSentence}"</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <button
          className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          onClick={onSave}
        >
          <Save size={20} />
          {(typeof t !== "undefined" ? t : (k) => k)("save_finish_button")}
        </button>
        <button
          className="w-full py-5 rounded-[2rem] bg-slate-50 text-slate-400 font-black text-lg border border-slate-100 hover:bg-slate-100 transition-all"
          onClick={onFinish}
        >
          {(typeof t !== "undefined" ? t : (k) => k)("finish_no_save_button")}
        </button>
      </motion.div>
    </div>
  );
};

export default ScreenSaveClose;
