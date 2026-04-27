import { Button } from "@/features/a_gentle_wish/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface Props {
  name: string;
  smallStep: string;
  setSmallStep: (v: string) => void;
  onBack: () => void;
  onSave: () => void;
  onSkip: () => void;
}

export const CarryForwardScreen = ({ name, smallStep, setSmallStep, onBack, onSave, onSkip }: Props) => (
  <div className="flex-1 flex flex-col">
    <button onClick={onBack} className="self-start text-muted-foreground hover:text-foreground transition-colors mb-6">
      <ChevronLeft size={24} />
    </button>

    <h2 className="font-display text-xl font-semibold text-foreground text-center mb-4">
      Carrying this with you 🌿
    </h2>

    <p className="text-center text-muted-foreground leading-relaxed mb-8">
      If {name.trim()} were here with you,<br />
      how might they gently encourage you?
    </p>

    <div className="space-y-3">
      <p className="font-display text-base text-foreground text-center">
        What is one small way you could carry this with you today?
      </p>
      <textarea
        value={smallStep}
        onChange={(e) => setSmallStep(e.target.value)}
        placeholder="A small step…"
        rows={3}
        className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/60 font-body text-base focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
      />
      <p className="text-xs text-muted-foreground text-center">
        Keep it simple. Even something small is enough.
      </p>
    </div>

    <div className="mt-auto pt-8 space-y-3">
      <Button variant="grief" size="lg" className="w-full text-base py-6" onClick={onSave}>
        Save this
      </Button>
      <Button variant="griefSecondary" size="default" className="w-full" onClick={onSkip}>
        Skip for now
      </Button>
    </div>
  </div>
);
