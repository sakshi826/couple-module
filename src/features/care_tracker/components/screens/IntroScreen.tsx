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
      description={t("screens.intro.description")}
      onStart={onStart}
      icon={<Activity size={32} />}
      benefits={t('screens.intro.benefits', { returnObjects: true }) as string[]}
      duration={t("screens.intro.duration")}
    />
  );
};

export default IntroScreen;
