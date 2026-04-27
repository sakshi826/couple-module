import { useState } from "react";

interface Props { onNext: () => void }

const stages = [
  {
    emoji: "🌊", title: "Light sleep", tag: "1–5 mins · easily woken",
    body: "You're drifting off. Body starts to let go, muscles may twitch. Very easy to wake up from here.",
    bg: "#ddeeff",
  },
  {
    emoji: "💤", title: "Settling in", tag: "10–25 mins · truly asleep",
    body: "Heart rate slows, body temperature drops. You're properly asleep — brain activity begins to slow down.",
    bg: "#dde8ff",
  },
  {
    emoji: "🔵", title: "Deep sleep ⭐", tag: "20–40 mins · the gold",
    body: "Body repairs tissue, builds immunity. The most physically restorative stage — hard to wake from.",
    bg: "#d8d0ff",
  },
  {
    emoji: "🌙", title: "REM sleep", tag: "10–60 mins · dream mode",
    body: "Brain buzzes with activity. Emotions get processed, memories lock in. Skipping this leaves you foggy.",
    bg: "#ead8ff",
  },
];

const Screen2Stages = ({ onNext }: Props) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full px-5 py-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <h1 className="text-lg font-semibold mb-1" style={{ color: "#1a2a4a" }}>
        Your brain does THIS every night 🌀
      </h1>
      <p className="text-xs mb-3" style={{ color: "#3a5070" }}>
        Every 90 minutes, your brain cycles through 4 stages — like a playlist on repeat. Tap each to explore 👇
      </p>

      <div className="flex flex-col gap-2 mb-3">
        {stages.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="sleep-card overflow-hidden">
              <button
                className="w-full flex items-center gap-3 p-3 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 34, height: 34, borderRadius: 10, background: s.bg }}
                >
                  <span className="text-sm">{s.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium" style={{ color: "#1a2a4a" }}>{s.title}</div>
                  <div className="text-[10px]" style={{ color: "#8a9cbc" }}>{s.tag}</div>
                </div>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                >
                  <path d="M5 3L9 7L5 11" stroke="#8a9cbc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div
                style={{
                  maxHeight: isOpen ? 100 : 0,
                  opacity: isOpen ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                }}
              >
                <p className="px-3 pb-3 text-xs leading-relaxed" style={{ color: "#3a5070" }}>
                  {s.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs italic text-center mb-3" style={{ color: "#8a9cbc" }}>
        Deep sleep fixes your body. REM fixes your mind.
      </p>

      <button className="sleep-cta mt-auto shrink-0" onClick={onNext}>
        So why do I still feel groggy? →
      </button>
    </div>
  );
};

export default Screen2Stages;
