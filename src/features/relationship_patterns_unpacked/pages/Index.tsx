import { useState } from "react";
import { Heart, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

const HEARTS_SCREEN1 = [
  { color: "#F4C0D1", size: 12, left: "12%", delay: "0s", duration: "7s" },
  { color: "#D4537E", size: 9, left: "30%", delay: "1.5s", duration: "8s" },
  { color: "#ED93B1", size: 15, left: "50%", delay: "0.8s", duration: "6s" },
  { color: "#F4C0D1", size: 10, left: "70%", delay: "3s", duration: "9s" },
  { color: "#ED93B1", size: 8, left: "85%", delay: "2s", duration: "7.5s" },
];

const HEARTS_SCREEN2 = [
  { color: "#CEC9F6", size: 11, left: "15%", delay: "0.5s", duration: "8s" },
  { color: "#AFA9EC", size: 14, left: "35%", delay: "2s", duration: "6.5s" },
  { color: "#CEC9F6", size: 9, left: "55%", delay: "1s", duration: "9s" },
  { color: "#AFA9EC", size: 16, left: "72%", delay: "3.5s", duration: "7s" },
  { color: "#CEC9F6", size: 8, left: "88%", delay: "0s", duration: "8.5s" },
];

const FloatingHearts = ({ hearts }: { hearts: typeof HEARTS_SCREEN1 }) => {
  return (
(
  <div className="absolute inset-0 pointer-events-none z-0">
    {hearts.map((h, i) => (
      <motion.span
        key={i}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "-10%", opacity: [0, 1, 1, 0] }}
        transition={{
          duration: parseFloat(h.duration),
          repeat: Infinity,
          delay: parseFloat(h.delay),
          ease: "linear"
        }}
        className="absolute bottom-0"
        style={{
          color: h.color,
          fontSize: `${h.size}px`,
          left: h.left,
        }}
      >
        ♥
      </motion.span>
    ))}
  </div>
)
  );
};

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(0);

  const resetFlow = () => {
  const { t } = useTranslation();
    setScreen(0);
  };

  if (screen === 2) {
    return (
      <PremiumComplete
        title={t("app_title")}
        message={t("complete_message")}
        onRestart={resetFlow}
      />
    );
  }

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={t("app_title")}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 0 ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {screen === 0 ? (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-amber-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 rounded-full bg-pink-100/30 blur-3xl" />
                <FloatingHearts hearts={HEARTS_SCREEN1} />
                
                <div className="relative z-10 space-y-8">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    {t("screen1.tag")}
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{t("screen1.intro")}</p>
                    <h1 className="text-3xl font-black text-slate-800 leading-tight">
                      {t("screen1.title")}
                    </h1>
                    <p className="text-slate-600 font-medium leading-relaxed text-base">
                      {t("screen1.desc")}
                    </p>
                  </div>

                  <div className="bg-pink-50/50 border-l-8 border-pink-400 rounded-2xl p-8 italic text-pink-900 text-base font-bold leading-relaxed shadow-sm">
                    {t("screen1.quote")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen(1)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                {t("screen1.button")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
                <div className="absolute top-[-20px] left-[-20px] w-32 h-32 rounded-full bg-indigo-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 rounded-full bg-teal-100/30 blur-3xl" />
                <FloatingHearts hearts={HEARTS_SCREEN2} />

                <div className="relative z-10 space-y-8">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    {t("screen2.tag")}
                  </div>

                  <div className="space-y-6">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{t("screen2.intro")}</p>
                    <h1 className="text-3xl font-black text-slate-800 leading-tight">
                      {t("screen2.title")}
                    </h1>
                    <p className="text-slate-600 font-medium leading-relaxed text-base">
                      {t("screen2.desc")}
                    </p>
                  </div>

                  <div className="bg-indigo-50/50 border-l-8 border-indigo-400 rounded-2xl p-8 italic text-indigo-900 text-base font-bold leading-relaxed shadow-sm">
                    {t("screen2.quote")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen(2)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                {t("screen2.button")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
