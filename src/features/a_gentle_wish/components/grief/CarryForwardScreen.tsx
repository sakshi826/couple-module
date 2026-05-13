import { Button } from "@/features/a_gentle_wish/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  smallStep: string;
  setSmallStep: (v: string) => void;
  onBack: () => void;
  onSave: () => void;
  onSkip: () => void;
}

export const CarryForwardScreen = ({ name, smallStep, setSmallStep, onBack, onSave, onSkip }: Props) => {
  return (
    <div className="flex-1 flex flex-col">
      <button onClick={onBack} className="self-start text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ChevronLeft size={24} />
      </button>

      <h2 className="font-display text-xl font-semibold text-foreground text-center mb-4">
        {(typeof t !== "undefined" ? t : (k) => k)("carry_title")}
      </h2>

      <p className="text-center text-muted-foreground leading-relaxed mb-8">
        {(typeof t !== "undefined" ? t : (k) => k)("carry_description", { name: name.trim() })}
      </p>

      <div className="space-y-3">
        <p className="font-display text-base text-foreground text-center">
          {(typeof t !== "undefined" ? t : (k) => k)("carry_question")}
        </p>
        <textarea
          value={smallStep}
          onChange={(e) => setSmallStep(e.target.value)}
          placeholder={(typeof t !== "undefined" ? t : (k) => k)("placeholder_step")}
          rows={3}
          className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/60 font-body text-base focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
        />
        <p className="text-xs text-muted-foreground text-center">
          {(typeof t !== "undefined" ? t : (k) => k)("carry_footer")}
        </p>
      </div>

      <div className="mt-auto pt-8 space-y-3">
        <Button variant="grief" size="lg" className="w-full text-base py-6" onClick={onSave}>
          {(typeof t !== "undefined" ? t : (k) => k)("save_button")}
        </Button>
        <Button variant="griefSecondary" size="default" className="w-full" onClick={onSkip}>
          {(typeof t !== "undefined" ? t : (k) => k)("skip_button")}
        </Button>
      </div>
    </div>
  );
};
