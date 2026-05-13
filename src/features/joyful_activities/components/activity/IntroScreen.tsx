import { useTranslation } from "react-i18next";
import { Heart } from "lucide-react";
import { PremiumIntro } from "../../../../components/shared/PremiumIntro";

interface Props {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: Props) => {
  
  return (
    <PremiumIntro
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      description={(typeof t !== "undefined" ? t : (k) => k)("app_description")}
      onStart={onNext}
      icon={<Heart size={32} />}
      benefits={[
        (typeof t !== "undefined" ? t : (k) => k)('intro.p1'),
        (typeof t !== "undefined" ? t : (k) => k)('intro.p2'),
        (typeof t !== "undefined" ? t : (k) => k)('intro.p3')
      ]}
      duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration', "5 minutes")}
    />
  );
};

export default IntroScreen;
