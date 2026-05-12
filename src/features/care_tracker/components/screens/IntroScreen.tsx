import React from "react";
import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { Activity } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={t("app_title")}
      description={t("app_description")}
      onStart={onStart}
      icon={<Activity size={32} />}
      benefits={[t('intro_p1'), t('intro_p2'), t('intro_p3'), t('intro_p4')]}
      duration={t("screens.intro.duration")}
    />
  );
};

export default IntroScreen;
