import { useState } from "react";
import { useTranslation } from "react-i18next";

const Screen4Reflection = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);

  const options = t("s4.options", { returnObjects: true }) as any[];

  return (
    <div className="flex flex-col h-full px-5 py-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <h1 className="text-lg font-semibold mb-3" style={{ color: "#1a2a4a" }}>
        {t("s4.title")}
      </h1>

      <div className="flex flex-col gap-2 mb-3">
        {Array.isArray(options) && options.map((o, i) => (
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
          {t("s4.quote")}
        </p>
      </div>

      <button className="sleep-cta mt-auto shrink-0">
        {t("s4.button")}
      </button>
    </div>
  );
};

export default Screen4Reflection;
