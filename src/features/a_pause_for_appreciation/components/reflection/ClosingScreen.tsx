import { useTranslation } from "react-i18next";
import { PremiumComplete } from "../../../../components/shared/PremiumComplete";
import { History, Home } from "lucide-react";
import { motion } from "framer-motion";

interface ClosingScreenProps {
  onExit: () => void;
}

const ClosingScreen = ({ onExit }: ClosingScreenProps) => {
  const { t } = useTranslation();

  return (
    <PremiumComplete
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      message={(typeof t !== "undefined" ? t : (k) => k)("closing.text1") + " " + (typeof t !== "undefined" ? t : (k) => k)("closing.text2")}
      onRestart={onExit}
    />
  );
};

export default ClosingScreen;
