import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props { onNext: () => void }

const Screen2Stages = ({ onNext }: Props) => {
  const [open, setOpen] = useState<number | null>(null);

  const stages = (typeof t !== "undefined" ? t : (k) => k)("s2.stages", { returnObjects: true }) as any[];
  const bgs = ["#ddeeff", "#dde8ff", "#d8d0ff", "#ead8ff"];

  return (
    <div className="flex flex-col h-full px-5 py-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <h1 className="text-lg font-semibold mb-1" style={{ color: "#1a2a4a" }}>
        {(typeof t !== "undefined" ? t : (k) => k)("s2.title")}
      </h1>
      <p className="text-xs mb-3" style={{ color: "#3a5070" }}>
        {(typeof t !== "undefined" ? t : (k) => k)("s2.desc")}
      </p>

      <div className="flex flex-col gap-2 mb-3">
        {Array.isArray(stages) && stages.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="sleep-card overflow-hidden">
              <button
                className="w-full flex items-center gap-3 p-3 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 34, height: 34, borderRadius: 10, background: bgs[i] }}
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
        {(typeof t !== "undefined" ? t : (k) => k)("s2.italic")}
      </p>

      <button className="sleep-cta mt-auto shrink-0" onClick={onNext}>
        {(typeof t !== "undefined" ? t : (k) => k)("s2.button")}
      </button>
    </div>
  );
};

export default Screen2Stages;
