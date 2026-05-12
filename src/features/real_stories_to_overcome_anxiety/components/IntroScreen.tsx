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
      title={t("app_title")}
      description={t("app_description")}
      onStart={onStart}
      icon={<BookOpen size={32} />}
      benefits={[t('intro_p1'), t('intro_p2')]}
      duration={t('app_duration', "5-10 minutes")}
    />
  );
};

export default IntroScreen;


