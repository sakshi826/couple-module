import { useState } from "react";

const options = [
  {
    emoji: "😩", text: "I wake up physically exhausted", sub: "probably missing deep sleep",
    tip: "Focus on a consistent sleep and wake time — your body needs a regular rhythm to reach deep sleep.",
  },
  {
    emoji: "🌫️", text: "I feel emotionally foggy or low", sub: "probably missing REM sleep",
    tip: "Try winding down 30 mins before bed — a calm pre-sleep routine protects your REM sleep.",
  },
  {
    emoji: "😤", text: "I wake up a lot during the night", sub: "cycles keep getting interrupted",
    tip: "A cool, dark and quiet room helps your brain stay in deeper stages without interruption.",
  },
  {
    emoji: "😐", text: "I feel okay but not great", sub: "cycles are partial but not complete",
    tip: "Try going to bed 20 mins earlier — you may just need one more complete sleep cycle.",
  },
];

const Screen4Reflection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full px-5 py-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <h1 className="text-lg font-semibold mb-3" style={{ color: "#1a2a4a" }}>
        Which one sounds like you? 👇
      </h1>

      <div className="flex flex-col gap-2 mb-3">
        {options.map((o, i) => (
          <button
            key={i}
            className={`option-card p-3 text-left ${selected === i ? "selected" : ""}`}
            onClick={() => setSelected(i)}
          >
            <div className="flex items-start gap-2">
              <span style={{ fontSize: 17 }}>{o.emoji}</span>
              <div>
                <p className="text-[13px]" style={{ color: "#1a2a4a" }}>{o.text}</p>
                <p className="text-[11px] italic mt-0.5" style={{ color: "#8a9cbc", paddingLeft: 2 }}>{o.sub}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="tip-card p-3 mb-3 tip-animate">
          <p className="text-xs leading-relaxed" style={{ color: "#3a5070", lineHeight: 1.6, fontSize: "12.5px" }}>
            💡 {options[selected].tip}
          </p>
        </div>
      )}

      <div className="takeaway-card p-4 mb-3">
        <span className="text-2xl leading-none" style={{ color: "#a0b0d8", fontFamily: "Georgia, serif" }}>"</span>
        <p className="text-xs italic leading-relaxed mt-1" style={{ color: "#3a4870" }}>
          Sleep isn't just rest — it's active recovery. Protect your cycles and your whole day changes.
        </p>
      </div>

      <button className="sleep-cta mt-auto shrink-0">
        Done ✓
      </button>
    </div>
  );
};

export default Screen4Reflection;
