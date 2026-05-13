import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { BookOpen } from "lucide-react";


interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: FC<IntroScreenProps> = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      description={(typeof t !== "undefined" ? t : (k) => k)("app_description")}
      onStart={onStart}
      icon={<BookOpen size={32} />}
      benefits={[(typeof t !== "undefined" ? t : (k) => k)('intro_p1'), (typeof t !== "undefined" ? t : (k) => k)('intro_p2')]}
      duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration', "5-10 minutes")}
    />
  );
};

export default IntroScreen;


