import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { Heart, History } from "lucide-react";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onBegin: () => void;
}

const IntroScreen = ({ onBegin }: IntroScreenProps) => {

  return (
    <div className="w-full">
      <PremiumIntro
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        description={(typeof t !== "undefined" ? t : (k) => k)("subtitle") + " " + (typeof t !== "undefined" ? t : (k) => k)("intro.text1") + " " + (typeof t !== "undefined" ? t : (k) => k)("intro.text2")}
        onStart={onBegin}
        icon={<Heart size={32} />}
        benefits={[(typeof t !== "undefined" ? t : (k) => k)('intro_p1'), (typeof t !== "undefined" ? t : (k) => k)('intro_p2'), (typeof t !== "undefined" ? t : (k) => k)('intro_p3')]}
        duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration', "3-5 minutes")}
      />
    </div>
  );
};

export default IntroScreen;
