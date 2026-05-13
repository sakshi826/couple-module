import TrackActivitySection from "../components/TrackActivitySection";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

import { useTranslation } from "react-i18next";
import { Activity } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  return (
    <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")} icon={<Activity className="w-6 h-6 text-primary" />
}>
      <main className="bg-transparent relative w-full">
        <TrackActivitySection />
      </main>
    </PremiumLayout>
  );
};

export default Index;
