import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Timer } from "lucide-react";
import { useTranslation } from "react-i18next";
import IntroScreen from "@/features/the_pause_practice/components/IntroScreen";
import ScenarioScreen from "@/features/the_pause_practice/components/ScenarioScreen";
import HoldScreen from "@/features/the_pause_practice/components/HoldScreen";
import ResultScreen from "@/features/the_pause_practice/components/ResultScreen";
import { PremiumLayout } from "@/components/shared/PremiumLayout";

type Screen = "intro" | "scenario" | "hold" | "result";

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("intro");
  const [scenario, setScenario] = useState("other");

  const handleScenarioSelect = (s: string) => {
  const { t } = useTranslation();
    setScenario(s);
    setScreen("hold");
  };

  const handleTryAgain = () => {
  const { t } = useTranslation();
    setScreen("scenario");
  };

  const handleDone = () => {
  const { t } = useTranslation();
    setScreen("intro");
    setScenario("other");
  };

  return (
    <PremiumLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      subtitle={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      icon={<Timer className="w-6 h-6 text-primary" />}
      onBack={screen !== "intro" ? () => setScreen("intro") : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4">
        <AnimatePresence mode="wait">
          {screen === "intro" && <IntroScreen key="intro" onNext={() => setScreen("scenario")} />}
          {screen === "scenario" && <ScenarioScreen key="scenario" onNext={handleScenarioSelect} />}
          {screen === "hold" && <HoldScreen key="hold" onComplete={() => setScreen("result")} />}
          {screen === "result" && (
            <ResultScreen key="result" scenario={scenario} onTryAgain={handleTryAgain} onDone={handleDone} />
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
