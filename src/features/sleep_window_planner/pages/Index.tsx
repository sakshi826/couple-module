import { useTranslation } from "react-i18next";
import SleepWindow from '@/features/sleep_window_planner/components/SleepWindow/SleepWindow';
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { Moon } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  return (
    <PremiumLayout 
      title={t("app_title", "Sleep Window Planner")}
      icon={<Moon className="w-6 h-6 text-primary" />}
      exitOnBack={true}
    >
      <SleepWindow onExit={() => {}} />
    </PremiumLayout>
  );
};

export default Index;
