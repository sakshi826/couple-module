import { PremiumComplete } from "../../../../components/shared/PremiumComplete";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

interface FinalScreenProps {
  onRestart: () => void;
}

const FinalScreen = ({ onRestart }: FinalScreenProps) => {
  const { t } = useTranslation();

  return (
    <PremiumComplete
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      message={(typeof t !== "undefined" ? t : (k) => k)('final_text')}
      onRestart={onRestart}
      icon={<CheckCircle2 size={48} />}
    />
  );
};

export default FinalScreen;
