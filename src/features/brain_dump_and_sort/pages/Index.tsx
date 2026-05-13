import BrainDumpApp from "../components/BrainDumpApp";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

import { useTranslation } from "react-i18next";
import { Brain } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  return (
    <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")} icon={<Brain className="w-6 h-6 text-primary" />
}>
      <div className="w-full">
        <BrainDumpApp />
      </div>
    </PremiumLayout>
  );
};

export default Index;
