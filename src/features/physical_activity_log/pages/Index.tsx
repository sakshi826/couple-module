import TrackActivitySection from "../components/TrackActivitySection";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const Index = () => {
  return (
    <PremiumLayout title={t("app_title", " title=")}>
      <main className="bg-transparent relative w-full">
        <TrackActivitySection />
      </main>
    </PremiumLayout>
  );
};

export default Index;
