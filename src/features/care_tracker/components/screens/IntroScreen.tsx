import React from "react";
import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { Activity } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {

  return (
    <PremiumIntro
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      description={(typeof t !== "undefined" ? t : (k) => k)("screens.intro.description")}
      onStart={onStart}
      icon={<Activity size={32} />}
      benefits={(typeof t !== "undefined" ? t : (k) => k)('screens.intro.benefits', { returnObjects: true }) as string[]}
      duration={(typeof t !== "undefined" ? t : (k) => k)("screens.intro.duration")}
    />
  );
};

export default IntroScreen;
