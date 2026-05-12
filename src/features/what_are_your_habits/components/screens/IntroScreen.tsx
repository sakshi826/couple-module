import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { ListChecks } from "lucide-react";

const IntroScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={t("app_title")}
      description={t("app_description")}
      onStart={onNext}
      icon={<ListChecks size={32} />}
      benefits={[t('intro_p1'), t('intro_p2'), t('intro_p3')]}
      duration={t('app_duration', "5 minutes")}
    />
  );
};

export default IntroScreen;
