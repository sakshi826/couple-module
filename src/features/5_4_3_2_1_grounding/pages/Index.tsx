import GroundingExercise from "../components/GroundingExercise";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const Index = () => {
  return (
    <PremiumLayout title={t("app_title", " title=")}>
      <div className="w-full">
        <GroundingExercise />
      </div>
    </PremiumLayout>
  );
};

export default Index;
