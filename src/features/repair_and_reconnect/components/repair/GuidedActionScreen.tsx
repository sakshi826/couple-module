import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface Props {
  approach: string;
  person: string;
  onComplete: () => void;
}

const GuidedActionScreen = ({ approach, onComplete }: Props) => {
  const [revealed, setRevealed] = useState(false);

  const data = (typeof t !== "undefined" ? t : (k) => k)(`guided_action.actions.${approach}`, { returnObjects: true }) as any;
  const emojiMap: Record<string, string> = {
    message: "💬",
    acknowledge: "🫶",
    pause: "⏸️",
    letgo: "🍃",
    reflect: "💭"
  };

  const [selectedMsg, setSelectedMsg] = useState(0);
  const [editedMsg, setEditedMsg] = useState(data?.prompts?.[0] || "");

  if (!data) return null;

  const handleSelectMsg = (i: number) => {
    setSelectedMsg(i);
    setEditedMsg(data.prompts[i]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedMsg);
    toast.success((typeof t !== "undefined" ? t : (k) => k)("toasts.copy_success"));
  };

  const safetyLine = approach === "pause" ? (typeof t !== "undefined" ? t : (k) => k)("guided_action.safety_line_pause") : 
                    approach === "reflect" ? (typeof t !== "undefined" ? t : (k) => k)("guided_action.safety_line_reflect") : 
                    (typeof t !== "undefined" ? t : (k) => k)("guided_action.safety_line_default");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="glass-card p-6 text-center space-y-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-4xl"
        >
          {emojiMap[approach] || "✨"}
        </motion.div>
        <h2 className="font-heading text-lg font-semibold text-foreground">{data.title}</h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{data.why}</p>
        <div className="glass-card p-3">
          <p className="font-body text-xs text-muted-foreground italic">💡 {data.insight}</p>
        </div>
      </div>

      {/* Tap to reveal */}
      <motion.button
        onClick={() => setRevealed(true)}
        className="w-full glass-card p-5 text-left space-y-1 transition-all hover:scale-[1.01]"
        whileTap={{ scale: 0.98 }}
      >
        <p className="font-heading text-base font-semibold text-foreground">{data.howTitle}</p>
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.p
              key="tap"
              exit={{ opacity: 0 }}
              className="font-body text-xs text-primary"
            >
              {(typeof t !== "undefined" ? t : (k) => k)("guided_action.tap_reveal")}
            </motion.p>
          ) : (
            <motion.p
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="font-body text-sm text-muted-foreground leading-relaxed"
            >
              {data.howBody}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Prompt options */}
      <div className="space-y-2">
        <p className="font-heading text-sm font-medium text-foreground">{data.promptLabel}</p>
        <div className="space-y-2">
          {data.prompts.map((msg: string, i: number) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelectMsg(i)}
              className={`w-full glass-card p-3.5 text-left transition-all hover:scale-[1.01] ${
                selectedMsg === i ? "ring-2 ring-primary shadow-md" : ""
              }`}
            >
              <p className="font-body text-sm text-foreground">{msg}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Editable input */}
      <div className="space-y-2">
        <p className="font-heading text-sm font-medium text-foreground">{data.editLabel}</p>
        <textarea
          value={editedMsg}
          onChange={(e) => setEditedMsg(e.target.value)}
          rows={3}
          className="w-full glass-card p-4 font-body text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {(approach === "message" || approach === "acknowledge") && (
          <button
            onClick={handleCopy}
            className="flex-1 glass-card py-3 font-heading text-sm font-medium text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {(typeof t !== "undefined" ? t : (k) => k)("guided_action.copy_button")}
          </button>
        )}
        <button
          onClick={onComplete}
          className="flex-1 btn-gradient py-3 font-heading text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {(typeof t !== "undefined" ? t : (k) => k)("guided_action.done_button")}
        </button>
      </div>

      {/* Safety line */}
      <p className="font-body text-xs text-muted-foreground text-center italic">
        {safetyLine}
      </p>
    </div>
  );
};

export default GuidedActionScreen;
