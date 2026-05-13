import { motion } from "framer-motion";
import { Button } from "@/features/a_gentle_wish/components/ui/button";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  wish: string;
  smallStep?: string;
  onAddAnother: () => void;
  onFinish: () => void;
}

export const ReflectionScreen = ({ name, wish, smallStep, onAddAnother, onFinish }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h2 className="font-display text-xl font-semibold text-foreground mb-8">
        {(typeof t !== "undefined" ? t : (k) => k)("reflection_title")}
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-card rounded-3xl p-6 w-full space-y-5 shadow-sm border border-border"
      >
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{(typeof t !== "undefined" ? t : (k) => k)("label_thinking_of")}</p>
          <p className="font-display text-lg text-foreground">{name}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{(typeof t !== "undefined" ? t : (k) => k)("label_what_they_want")}</p>
          <p className="text-foreground leading-relaxed">{wish}</p>
        </div>
        {smallStep && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{(typeof t !== "undefined" ? t : (k) => k)("label_your_step")}</p>
            <p className="text-foreground leading-relaxed">{smallStep}</p>
          </div>
        )}
      </motion.div>

      <p className="text-sm text-muted-foreground mt-8 leading-relaxed max-w-xs">
        {(typeof t !== "undefined" ? t : (k) => k)("reflection_footer")}
      </p>

      <div className="mt-auto pt-8 space-y-3 w-full">
        <Button variant="grief" size="lg" className="w-full text-base py-6" onClick={onAddAnother}>
          {(typeof t !== "undefined" ? t : (k) => k)("add_another_button")}
        </Button>
        <Button variant="griefSecondary" size="default" className="w-full" onClick={onFinish}>
          {(typeof t !== "undefined" ? t : (k) => k)("finish_button")}
        </Button>
      </div>
    </div>
  );
};
