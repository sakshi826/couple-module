import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "../components/screens/IntroScreen";
import BodyHabitsScreen from "../components/screens/BodyHabitsScreen";
import MindHabitsScreen from "../components/screens/MindHabitsScreen";
import CopingHabitsScreen from "../components/screens/CopingHabitsScreen";
import ReflectionScreen from "../components/screens/ReflectionScreen";
import InsightScreen from "../components/screens/InsightScreen";
import FinalScreen from "../components/screens/FinalScreen";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { ListChecks, Sparkles } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" as const } },
};

const Index = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);

  const screens = [
    <IntroScreen key="intro" onNext={next} />,
    <BodyHabitsScreen key="body" onNext={next} />,
    <MindHabitsScreen key="mind" onNext={next} />,
    <CopingHabitsScreen key="coping" onNext={next} />,
    <ReflectionScreen key="reflect" onNext={next} />,
    <InsightScreen key="insight" onNext={next} />,
    <FinalScreen key="final" onRestart={() => setStep(0)} />,
  ];

  return (
    <PremiumLayout 
      title={t("app_title", "What are your habits?")}
      icon={<ListChecks className="w-6 h-6 text-primary" />}
      onBack={step > 0 && step < 6 ? () => setStep(prev => prev - 1) : undefined}
      onReset={step > 0 && step < 6 ? () => setStep(0) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        {step < 6 && (
          <div className="flex justify-center gap-2 mb-10">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex-1 flex flex-col"
            >
              {screens[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default Index;
