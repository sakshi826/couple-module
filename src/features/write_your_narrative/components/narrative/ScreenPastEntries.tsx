import { ChevronLeft } from "lucide-react";

interface Entry {
  writing: string;
  reflection: string;
  date: string;
}

interface Props {
  entries: Entry[];
  onBack: () => void;
}

const ScreenPastEntries = ({ entries, onBack }: Props) => {
  return (
    <div className="relative text-center space-y-7">
      <button
        onClick={onBack}
        className="absolute -top-2 -left-2 w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
        aria-label="Go back"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="pt-12 space-y-6">
        <h1 className="font-heading text-2xl text-foreground">Past entries 📝</h1>

        {entries.length === 0 ? (
          <p className="text-muted-foreground text-[15px] leading-[1.7]">
            You haven't saved any entries yet. Take your time—there's no rush.
          </p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, i) => (
              <div
                key={i}
                className="text-left bg-card rounded-[20px] px-5 py-4 border border-border shadow-[var(--shadow-soft)] space-y-2"
              >
                <p className="text-muted-foreground text-[12px]">{entry.date}</p>
                <p className="text-foreground text-[14px] leading-[1.7] line-clamp-3">
                  {entry.writing || <span className="italic text-muted-foreground">No writing</span>}
                </p>
                {entry.reflection && (
                  <p className="text-muted-foreground text-[13px] italic">
                    Feeling: {entry.reflection}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenPastEntries;
