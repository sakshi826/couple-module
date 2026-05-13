import { useTranslation } from "react-i18next";

const TipsForSuccess = () => {

  const tips = [
    { emoji: "🌱", title: (typeof t !== "undefined" ? t : (k) => k)('tip1_title'), desc: (typeof t !== "undefined" ? t : (k) => k)('tip1_desc') },
    { emoji: "🔄", title: (typeof t !== "undefined" ? t : (k) => k)('tip2_title'), desc: (typeof t !== "undefined" ? t : (k) => k)('tip2_desc') },
    { emoji: "🎉", title: (typeof t !== "undefined" ? t : (k) => k)('tip3_title'), desc: (typeof t !== "undefined" ? t : (k) => k)('tip3_desc') },
    { emoji: "✨", title: (typeof t !== "undefined" ? t : (k) => k)('tip4_title'), desc: (typeof t !== "undefined" ? t : (k) => k)('tip4_desc') },
  ];

  return (
    <div className="bg-transparent rounded-2xl p-6  border border-border">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <span className="text-2xl">💡</span> {(typeof t !== "undefined" ? t : (k) => k)('tips_title')}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {tips.map((tip) => (
          <div key={tip.title} className="flex items-start gap-3">
            <span className="text-xl">{tip.emoji}</span>
            <div>
              <h3 className="font-bold text-foreground text-sm">{tip.title}</h3>
              <p className="text-muted-foreground text-xs">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsForSuccess;
