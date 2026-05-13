import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import BingoGrid from "../components/BingoGrid";
import { Sparkles, Trophy } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

type Screen = "intro" | "game" | "complete";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");

  const handleWin = () => {
    setScreen("complete");
  };

  return (
    <PremiumLayout 
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")} 
      onReset={screen !== 'intro' ? () => setScreen('intro') : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          {screen === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
            >
              <PremiumIntro
                title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
                description={(typeof t !== "undefined" ? t : (k) => k)("app_description")}
                onStart={() => setScreen("game")}
                icon={<Sparkles size={32} />}
                benefits={[
                  (typeof t !== "undefined" ? t : (k) => k)('tip1_title'),
                  (typeof t !== "undefined" ? t : (k) => k)('tip2_title'),
                  (typeof t !== "undefined" ? t : (k) => k)('tip3_title'),
                  (typeof t !== "undefined" ? t : (k) => k)('tip4_title')
                ]}
                duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration', "Anytime")}
              />
            </motion.div>
          )}

          {screen === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-2xl mx-auto"
            >
              <BingoGrid onWin={handleWin} />
            </motion.div>
          )}

          {screen === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
            >
              <PremiumComplete
                title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
                message={(typeof t !== "undefined" ? t : (k) => k)("complete_message")}
                onRestart={() => setScreen("intro")}
                icon={<Trophy size={48} />}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
