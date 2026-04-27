import { ChevronLeft, History } from "lucide-react";

interface Props {
  onContinue: () => void;
  onBack: () => void;
  onHistory: () => void;
}

const ScreenEntry = ({ onContinue, onBack, onHistory }: Props) => {
  return (
    <div className="relative text-center">
      <button
        onClick={onBack}
        className="absolute -top-2 -left-2 w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
        aria-label="Go back"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={onHistory}
        className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
        aria-label="Past entries"
      >
        <History className="w-5 h-5" />
      </button>

      <div className="pt-12 space-y-8">
        <h1 className="font-heading text-2xl leading-snug text-foreground">
          Let's take this one step at a time 💛
        </h1>

        <div className="space-y-5 text-muted-foreground text-[15px] leading-[1.7]">
          <p>
            You don't have to tell your whole story today. Just a small part is enough.
          </p>
          <p>
            You're safe right now. You're in control of what you write—and what you don't.
          </p>
          <p>Take a slow breath before we begin.</p>
        </div>

        <button
          onClick={onContinue}
          className="mt-4 w-full py-4 rounded-[20px] bg-primary text-primary-foreground font-body font-medium text-base shadow-[var(--shadow-soft)] hover:opacity-90 transition-opacity"
        >
          I'm ready
        </button>
      </div>
    </div>
  );
};

export default ScreenEntry;
