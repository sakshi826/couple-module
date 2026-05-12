import { useTranslation } from "react-i18next";
import PredictionVsReality from "@/features/prediction_vs_reality/components/PredictionVsReality";

const Index = () => {
  const { t } = useTranslation();
  return <PredictionVsReality />;
};

export default Index;
