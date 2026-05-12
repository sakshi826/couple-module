import BrainDumpApp from "../components/BrainDumpApp";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const Index = () => {
  return (
    <PremiumLayout title={t("app_title", " title=")}>
      <div className="w-full">
        <BrainDumpApp />
      </div>
    </PremiumLayout>
  );
};

export default Index;
