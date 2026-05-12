import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { Brain } from "lucide-react";

interface Props {
  onStart: () => void;
}

export const Welcome = ({ onStart }: Props) => {
  const { t } = useTranslation();
  
  return (
    <PremiumIntro
      title={t("app_title")}
      description={t("welcome_subtitle") + " " + t("welcome_desc")}
      onStart={onStart}
      icon={<Brain size={32} />}
      benefits={[t('intro_p1'), t('intro_p2'), t('intro_p3')]}
      duration={t('app_duration', "5-10 minutes")}
    />
  );
};
