import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { ListChecks } from "lucide-react";

const IntroScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      description={(typeof t !== "undefined" ? t : (k) => k)("app_description")}
      onStart={onNext}
      icon={<ListChecks size={32} />}
      benefits={[(typeof t !== "undefined" ? t : (k) => k)('intro_p1'), (typeof t !== "undefined" ? t : (k) => k)('intro_p2'), (typeof t !== "undefined" ? t : (k) => k)('intro_p3')]}
      duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration', "5 minutes")}
    />
  );
};

export default IntroScreen;
