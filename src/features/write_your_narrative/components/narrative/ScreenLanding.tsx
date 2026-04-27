interface Props {
  reflection: string;
  setReflection: (v: string) => void;
  onSave: () => void;
  onFinish: () => void;
}

const ScreenLanding = ({ reflection, setReflection, onSave, onFinish }: Props) => {
  return (
    <div className="text-center space-y-7">
      <h1 className="font-heading text-2xl text-foreground">
        You did something important 🌿
      </h1>

      <div className="space-y-5 text-muted-foreground text-[15px] leading-[1.7]">
        <p>Thank you for showing up for yourself.</p>
        <div className="text-left bg-card rounded-[20px] px-5 py-4 border border-border shadow-[var(--shadow-soft)]">
          <p className="text-foreground text-[14px] mb-3">
            Let's take a moment to settle:
          </p>
          <ul className="space-y-2 text-muted-foreground text-[14px]">
            <li>• Look around and name 3 things you can see</li>
            <li>• Take a slow breath in… and out</li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-foreground text-[14px] font-medium">
          Right now, I feel:
        </label>
        <input
          type="text"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="..."
          className="w-full bg-input rounded-[20px] px-5 py-3.5 text-foreground text-[15px] text-center placeholder:text-muted-foreground/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow font-body"
        />
      </div>

      <p className="text-muted-foreground text-[14px] leading-[1.7]">
        You don't have to carry everything at once. You can come back whenever you feel ready.
      </p>

      <div className="space-y-3">
        <button
          onClick={onSave}
          className="w-full py-4 rounded-[20px] bg-primary text-primary-foreground font-body font-medium text-base shadow-[var(--shadow-soft)] hover:opacity-90 transition-opacity"
        >
          Save this
        </button>
        <button
          onClick={onFinish}
          className="w-full py-4 rounded-[20px] bg-card text-foreground font-body font-medium text-base border border-border hover:bg-secondary/30 transition-colors"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default ScreenLanding;
