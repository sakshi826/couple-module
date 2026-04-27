import { motion } from "framer-motion";

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
  return (
    <div className="flex flex-col items-center text-center px-6 py-8 min-h-screen justify-center">
      <motion.h1
        className="font-heading text-2xl text-foreground mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Keep this with you 💫
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-base mb-8 leading-relaxed max-w-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        You took a moment to respond to yourself differently.
        <br /><br />
        That matters more than it seems.
      </motion.p>

      <motion.div
        className="wellness-card w-full max-w-[320px] mb-6"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Your check-in</p>
        <div className="space-y-3 text-sm text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Before</span>
            <span className="text-foreground font-medium">{data.beforeIntensity}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">After</span>
            <span className="text-foreground font-medium">{data.afterIntensity}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Feeling</span>
            <span className="text-foreground font-medium">{data.emotions.join(", ")}</span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-muted-foreground text-xs mb-1">Your kind words</p>
            <p className="text-foreground italic">"{data.kindSentence}"</p>
          </div>
        </div>
      </motion.div>

      <motion.p
        className="text-xs text-muted-foreground mb-8 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
      >
        You can come back to this anytime.
      </motion.p>

      <motion.div
        className="w-full max-w-[320px] space-y-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <button className="wellness-btn" onClick={onSave}>
          Save & Finish
        </button>
        <button className="wellness-btn-secondary" onClick={onFinish}>
          Finish without saving
        </button>
      </motion.div>
    </div>
  );
};

export default ScreenSaveClose;
