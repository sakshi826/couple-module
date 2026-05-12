import { useTranslation } from "react-i18next";
import AngerShameCycle from "@/features/the_anger_shame_cycle/components/AngerShameCycle";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { Flame } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  return (
    <PremiumLayout 
      title={t("app_title")}
      icon={<Flame className="w-6 h-6 text-primary" />}
      exitOnBack={true}
    >
      <AngerShameCycle onClose={() => {}} />
    </PremiumLayout>
  );
};

export default Index;
