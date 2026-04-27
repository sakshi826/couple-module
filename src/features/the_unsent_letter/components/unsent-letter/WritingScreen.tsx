import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import ProgressDots from "@/features/the_unsent_letter/components/ProgressDots";

interface WritingScreenProps {
  step: number;
  content: string;
  onContentChange: (val: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const prompts = [
  "I feel…",
  "I wish…",
  "I never said…",
  "What hurt me…",
  "What I needed…",
];

const WritingScreen = ({
  step,
  content,
  onContentChange,
  onBack,
  onContinue,
}: WritingScreenProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertPrompt = (prompt: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const before = content.slice(0, start);
    const after = content.slice(textarea.selectionEnd);
    const newContent = before + prompt + " " + after;
    onContentChange(newContent);
    setTimeout(() => {
      textarea.focus();
      const pos = start + prompt.length + 1;
      textarea.setSelectionRange(pos, pos);
    }, 0);
  };

  return (
    <div className="flex flex-col flex-1 px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <ProgressDots current={step} total={3} />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold text-foreground mb-2 leading-tight">
        Write What You've Been Holding In
      </h1>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        You can write to your partner, ex-partner, or even to the relationship itself.
        There's no right or wrong way to do this.
      </p>

      {/* Prompt chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide mb-2">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => insertPrompt(p)}
            className="flex-shrink-0 px-4 py-2 rounded-full bg-card text-muted-foreground text-sm font-medium hover:bg-primary/20 hover:text-foreground transition-colors border border-border"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <div className="flex-1 flex flex-col min-h-0">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={`Dear ____,\nI've been wanting to say…`}
          className="flex-1 w-full resize-none bg-card rounded-2xl p-5 text-foreground text-[15px] leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow min-h-[280px]"
        />
        <p className="text-micro mt-3 text-center italic">
          You can pause and come back anytime.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={onContinue}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity mt-6"
      >
        Continue →
      </button>
    </div>
  );
};

export default WritingScreen;
