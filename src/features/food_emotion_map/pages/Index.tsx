import { useTranslation } from "react-i18next";
import EmotionFlow from "@/features/food_emotion_map/components/EmotionFlow";

const Index = () => {
  const { t } = useTranslation();
  return <EmotionFlow />;
};

export default Index;
