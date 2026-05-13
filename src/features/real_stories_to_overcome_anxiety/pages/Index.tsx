import { useTranslation } from "react-i18next";
import { useState } from "react";
import IntroScreen from "../components/IntroScreen";
import StorySelectionScreen from "../components/StorySelectionScreen";
import StoryScreen from "../components/StoryScreen";
import { stories } from "../data/stories";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { AnimatePresence, motion } from "framer-motion";

type Screen = "intro" | "selection" | "story";

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("intro");
  const [storyIndex, setStoryIndex] = useState(0);

  const handleReadStories = () => setScreen("selection");
  const handleSelectStory = (index: number) => {
    setStoryIndex(index);
    setScreen("story");
  };
  const handleNextStory = () => {
    if (storyIndex < stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      setScreen("selection");
    }
  };
  const handleBackToStories = () => setScreen("selection");

  return (
    <PremiumLayout 
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      onBack={screen === "story" ? handleBackToStories : (screen === "selection" ? () => setScreen("intro") : undefined)}
      onReset={screen !== 'intro' ? () => setScreen('intro') : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="w-full"
          >
            {screen === "intro" && <IntroScreen onStart={handleReadStories} />}
            {screen === "selection" && <StorySelectionScreen onSelect={handleSelectStory} />}
            {screen === "story" && (
              <StoryScreen
                story={stories[storyIndex]}
                storyIndex={storyIndex}
                isLast={storyIndex === stories.length - 1}
                onNext={handleNextStory}
                onBack={handleBackToStories}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
