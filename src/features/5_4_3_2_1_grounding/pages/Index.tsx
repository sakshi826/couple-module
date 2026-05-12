import GroundingExercise from "../components/GroundingExercise";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  return (
    <PremiumLayout title={t("app_title")} icon={<Sparkles className="w-6 h-6 text-primary" />}>
      <div className="w-full">
        <GroundingExercise />
      </div>
    </PremiumLayout>
  );
};

export default Index;
