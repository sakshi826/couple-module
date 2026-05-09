import SleepWindow from '@/features/sleep_window_planner/components/SleepWindow/SleepWindow';
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { Moon } from "lucide-react";

const Index = () => {
  return (
    <PremiumLayout 
      title="Sleep Window Planner" 
      icon={<Moon className="w-6 h-6 text-primary" />}
      exitOnBack={true}
    >
      <SleepWindow onExit={() => {}} />
    </PremiumLayout>
  );
};

export default Index;
