import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, RotateCcw, Home, HelpCircle, Check, X as XIcon, Sparkles } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";

/* ─── Confetti ─── */
const ConfettiPiece = ({ delay, x }: { delay: number; x: number }) => {
  const { t } = useTranslation();
  const colors = ["#4F46E5", "#10B981", "#EF4444", "#F59E0B", "#3B82F6"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      className="fixed w-2 h-2 rounded-sm pointer-events-none z-50"
      style={{
        left: `${x}%`,
        top: -10,
        backgroundColor: color,
        animation: `confetti-fall ${2 + Math.random()}s ease-in ${delay}s forwards`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
};

const Confetti = () => {
  const { t } = useTranslation();
  const { t } = useTranslation();
  return (
(
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    {Array.from({ length: 30 }).map((_, i) => (
      <ConfettiPiece key={i} delay={Math.random() * 0.5} x={Math.random() * 100} />
    ))}
  </div>
)
  );
};

/* ─── Main Game ─── */
const AngerQuiz = () => {
  const { t } = useTranslation();
  
  // Get questions from translation
  const quizQuestions = t("questions", { returnObjects: true }) as any[];
  const TOTAL = Array.isArray(quizQuestions) ? quizQuestions.length : 0;

  type Screen = "welcome" | "game" | "final" | "complete";
  const [screen, setScreen] = useState<Screen>("welcome");
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState<null | "myth" | "fact">(null);
  const [score, setScore] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showCorrectConfetti, setShowCorrectConfetti] = useState(false);

  const current = Array.isArray(quizQuestions) ? quizQuestions[step] : null;
  const isCorrect = answered === current?.answer;

  const handleAnswer = (choice: "myth" | "fact") => {
    if (!current) return;
    setAnswered(choice);
    const correct = choice === current.answer;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      setShowReveal(true);
      if (correct) setShowCorrectConfetti(true);
    }, 500);
    setTimeout(() => setShowExplanation(true), 1000);
    setTimeout(() => setShowNext(true), 2000);
    if (correct) setTimeout(() => setShowCorrectConfetti(false), 3000);
  };

  const handleNext = () => {
    if (step + 1 >= TOTAL) {
      setScreen("final");
    } else {
      setStep((s) => s + 1);
      resetQuestion();
    }
  };

  const resetQuestion = () => {
    setAnswered(null);
    setShowReveal(false);
    setShowExplanation(false);
    setShowNext(false);
    setShowCorrectConfetti(false);
  };

  const handleRetry = () => {
    setScreen("welcome");
    setStep(0);
    setScore(0);
    resetQuestion();
  };

  if (screen === "complete") {
    return (
      <PremiumComplete
        title={t("app_title")}
        message={t("complete_message", { score, total: TOTAL })}
        onRestart={handleRetry}
      />
    );
  }

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={screen === "game" ? t("question_nav", { current: step + 1, total: TOTAL }) : t("knowledge_quiz")}
      icon={<HelpCircle className="w-6 h-6 text-primary" />}
      onBack={screen !== "welcome" && screen !== "complete" ? handleRetry : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        {showCorrectConfetti && <Confetti />}
        
        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center text-center gap-8 py-10"
            >
              <div className="w-32 h-32 rounded-[3rem] bg-primary/10 flex items-center justify-center text-6xl shadow-2xl">
                ❓
              </div>
              <div className="space-y-6">
                <h1 className="text-3xl font-black text-slate-800 leading-tight">
                  {t("welcome_title")}
                </h1>
                <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto text-base">
                  {t("welcome_subtitle")}
                </p>
              </div>
              <button
                onClick={() => setScreen("game")}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                {t("start_quiz")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                {t("questions_count", { count: TOTAL })}
              </p>
            </motion.div>
          )}

          {screen === "game" && current && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="bg-primary h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                />
              </div>

              <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-black text-slate-800 leading-snug text-center italic">
                  "{current.statement}"
                </h2>
              </div>

              <div className="space-y-6">
                {!answered ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleAnswer("myth")}
                      className="py-8 rounded-3xl bg-white border-2 border-red-50 text-red-500 font-black text-xl shadow-xl shadow-red-500/5 hover:bg-red-50 transition-all"
                    >
                      {t("myth_button")}
                    </button>
                    <button
                      onClick={() => handleAnswer("fact")}
                      className="py-8 rounded-3xl bg-white border-2 border-emerald-50 text-emerald-500 font-black text-xl shadow-xl shadow-emerald-500/5 hover:bg-emerald-50 transition-all"
                    >
                      {t("fact_button")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isCorrect ? "bg-emerald-500" : "bg-red-500"} text-white shadow-lg`}
                      >
                        {isCorrect ? <Check size={28} strokeWidth={4} /> : <XIcon size={28} strokeWidth={4} />}
                      </motion.div>
                      <p className={`text-2xl font-black ${isCorrect ? "text-emerald-600" : "text-red-600"}`}>
                        {isCorrect ? t("correct") : t("incorrect")}
                      </p>
                    </div>

                    <AnimatePresence>
                      {showReveal && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-4 shadow-2xl shadow-slate-200/50"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${current.answer === "myth" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
                              {current.answer === "myth" ? t("its_a_myth") : t("its_a_fact")}
                            </span>
                          </div>
                          <p className="text-slate-700 font-bold text-base leading-relaxed">
                            {current.realFact}
                          </p>
                          {current.example && (
                            <div className="pt-4 border-t border-slate-50">
                              <p className="text-slate-400 text-xs font-bold italic">
                                {t("example_label", { example: current.example })}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {showNext && (
                      <button
                        onClick={handleNext}
                        className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        {step + 1 === TOTAL ? t("see_results") : t("next_question")}
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {screen === "final" && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center text-center gap-8 py-6"
            >
              <div className="w-full bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200/50">
                <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-5xl">
                  🏆
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">{t("results_title")}</h2>
                <div className="text-7xl font-black text-slate-900 my-8 tabular-nums">{score}<span className="text-slate-300 text-4xl">/{TOTAL}</span></div>
                <p className="text-slate-500 font-black text-sm leading-relaxed uppercase tracking-widest">
                  {score === TOTAL ? t("expert_level") : 
                   score >= 3 ? t("great_progress") : 
                   t("learning_journey")}
                </p>
              </div>

              <div className="w-full space-y-4">
                <button
                  onClick={() => setScreen("complete")}
                  className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  <Sparkles size={20} strokeWidth={3} />
                  {t("finish_activity")}
                </button>
                <button
                  onClick={handleRetry}
                  className="w-full py-5 rounded-2xl bg-white text-slate-600 font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                  <RotateCcw size={20} strokeWidth={3} />
                  {t("try_again")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default AngerQuiz;
