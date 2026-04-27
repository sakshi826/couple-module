import { useState } from "react";

interface Props {
  writing: string;
  setWriting: (v: string) => void;
  onContinue: () => void;
}

const prompts = [
  { text: "What I remember most is…", emoji: "💭" },
  { text: "At that time, I felt…", emoji: "🌊" },
  { text: "Since then, I've noticed…", emoji: "🌱" },
];

const ScreenWriting = ({ writing, setWriting, onContinue }: Props) => {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const handlePromptClick = (prompt: string) => {
    setActivePrompt(prompt);
    if (!writing) {
      setWriting(prompt + " ");
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl text-foreground">
          Write what feels okay ✨
        </h1>
        <p className="text-muted-foreground text-[13px]">Your words, your pace</p>
      </div>

      <div className="bg-accent/25 rounded-[20px] px-5 py-4 border border-accent/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
        <p className="text-foreground text-[15px] leading-[1.6] italic relative z-10">
          "A moment that stays with me is…"
        </p>
      </div>

      <div className="space-y-2.5">
        <p className="text-muted-foreground text-[11px] uppercase tracking-[0.15em] font-medium">
          Or try one of these
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {prompts.map((p) => (
            <button
              key={p.text}
              onClick={() => handlePromptClick(p.text)}
              className={`text-[13px] rounded-full px-3.5 py-1.5 transition-all duration-300 border ${
                activePrompt === p.text
                  ? "bg-primary/15 border-primary/40 text-foreground scale-[1.03]"
                  : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              {p.emoji} {p.text}
            </button>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground text-[14px] leading-[1.6]">
        There's no right way to do this. Even a few lines are enough.
      </p>

      {/* Notebook effect */}
      <div className="relative rounded-[16px] overflow-hidden shadow-[0_2px_20px_0_hsla(210,10%,25%,0.07)]">
        {/* Notebook spine */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent/60 z-10" />
        {/* Red margin line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-destructive/20 z-10" />
        {/* Lined background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 31px, hsl(var(--border)) 31px, hsl(var(--border)) 32px)",
            backgroundPosition: "0 16px",
          }}
        />
        <textarea
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          placeholder="Start writing here…"
          className="relative z-[1] w-full min-h-[220px] bg-card/80 pl-11 pr-5 py-4 text-foreground text-[15px] leading-[32px] text-left placeholder:text-muted-foreground/40 focus:outline-none resize-none font-body"
          style={{ background: "transparent" }}
        />
        {/* Soft paper background */}
        <div className="absolute inset-0 bg-card/90 -z-[1]" />
      </div>

      <p className="text-muted-foreground text-[13px] flex items-center justify-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/40" />
        You can stop anytime
      </p>

      <button
        onClick={onContinue}
        className="w-full py-4 rounded-[20px] bg-primary text-primary-foreground font-body font-medium text-base shadow-[var(--shadow-soft)] hover:opacity-90 active:scale-[0.98] transition-all duration-200"
      >
        I'm done for now
      </button>
    </div>
  );
};

export default ScreenWriting;
