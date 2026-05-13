import { motion } from "framer-motion";
import ActivityInput from "./ActivityInput";
import { ActivityData } from "../../types/activity";
import { useTranslation } from "react-i18next";
import { Check, Sparkles } from "lucide-react";

interface Props {
  data: ActivityData;
  onChange: (fields: Partial<ActivityData>) => void;
  onGoHome: () => void;
  onSave: () => void;
}

const SmallStepScreen = ({ data, onChange, onGoHome, onSave }: Props) => {

  return (
    <div className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
          {(typeof t !== "undefined" ? t : (k) => k)('smallStep.title')}
        </h1>
        <div className="space-y-2 text-slate-500 text-base font-medium leading-relaxed">
            <p>{(typeof t !== "undefined" ? t : (k) => k)('smallStep.p1')}</p>
            <p>{(typeof t !== "undefined" ? t : (k) => k)('smallStep.p2')}</p>
        </div>
      </header>

      <div className="w-full">
        <ActivityInput
          label={(typeof t !== "undefined" ? t : (k) => k)('smallStep.input1_label')}
          value={data.smallStep}
          onChange={(v) => onChange({ smallStep: v })}
          placeholder={(typeof t !== "undefined" ? t : (k) => k)('smallStep.input1_placeholder')}
        />
      </div>

      <div className="flex flex-col gap-4">
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSave}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
        >{(typeof t !== "undefined" ? t : (k) => k)("complete_activity")}<Check size={20} />
        </motion.button>
        
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGoHome}
            className="w-full py-4 rounded-[2rem] bg-slate-50 text-slate-400 font-bold flex items-center justify-center gap-2"
        >
            {(typeof t !== "undefined" ? t : (k) => k)('smallStep.button_home')}
        </motion.button>
      </div>
    </div>
  );
};

export default SmallStepScreen;
