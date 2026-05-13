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
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      description={(typeof t !== "undefined" ? t : (k) => k)("welcome_subtitle") + " " + (typeof t !== "undefined" ? t : (k) => k)("welcome_desc")}
      onStart={onStart}
      icon={<Brain size={32} />}
      benefits={[(typeof t !== "undefined" ? t : (k) => k)('intro_p1'), (typeof t !== "undefined" ? t : (k) => k)('intro_p2'), (typeof t !== "undefined" ? t : (k) => k)('intro_p3')]}
      duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration', "5-10 minutes")}
    />
  );
};
