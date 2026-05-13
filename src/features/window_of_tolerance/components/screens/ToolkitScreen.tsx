import { useTranslation } from "react-i18next";
import type { ZoneType } from "../WindowApp";

const ZONE_EMOJI: Record<string, string> = { hyper: "🔴", safe: "🟢", hypo: "🔵" };

interface Props {
  journal: string;
  onJournalChange: (v: string) => void;
  weekTracker: (ZoneType)[];
  onSave: () => void;
  onBack: () => void;
}

export default function ToolkitScreen({ journal, onJournalChange, weekTracker, onSave, onBack }: Props) {
  const DAYS = (typeof t !== "undefined" ? t : (k) => k)("days", { returnObjects: true }) as string[];
  const tools_list = (typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.tools_list", { returnObjects: true }) as string[];

  return (
    <section className="space-y-6" aria-label={(typeof t !== "undefined" ? t : (k) => k)("your_personal_toolkit")}>
      <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors" aria-label={(typeof t !== "undefined" ? t : (k) => k)("common.back")}>
        ← Back
      </button>

      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">{(typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.title")}</h2>
        <p className="text-sm text-muted-foreground">{(typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.subtitle")}</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {tools_list && tools_list.map((t) => (
          <span key={t} className="pill-tag text-xs font-medium">{t}</span>
        ))}
      </div>

      {/* Journal */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">{(typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.journal_label")}</label>
        <p className="text-xs text-muted-foreground">
          {(typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.journal_desc")}
        </p>
        <textarea
          value={journal}
          onChange={(e) => onJournalChange(e.target.value)}
          placeholder={(typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.journal_placeholder")}
          className="w-full min-h-[80px] p-4 rounded-xl border border-border bg-card text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
        />
      </div>

      {/* Weekly Tracker */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">{(typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.history_label")}</label>
        <div className="flex justify-between px-2">
          {DAYS.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1.5" title={day}>
              <span className="text-lg">{weekTracker[i] ? ZONE_EMOJI[weekTracker[i]!] : "⚪"}</span>
              <span className="text-[10px] text-muted-foreground font-medium">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onSave}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
      >
        {(typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.save_button")}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        {(typeof t !== "undefined" ? t : (k) => k)("screens.toolkit.footer")}
      </p>
    </section>
  );
}
