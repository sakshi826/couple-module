import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { Home } from "lucide-react";


interface ChooseAreaScreenProps {
  onStart: () => void;
}

const ChooseAreaScreen = ({ onStart }: ChooseAreaScreenProps) => {
  const { t } = useTranslation();

  const areas = [
    `🖥️ ${(typeof t !== "undefined" ? t : (k) => k)("one_corner_desk")}`,
    `🛏️ ${(typeof t !== "undefined" ? t : (k) => k)("bedside_table")}`,
    `🪑 ${(typeof t !== "undefined" ? t : (k) => k)("one_chair")}`,
    `🧹 ${(typeof t !== "undefined" ? t : (k) => k)("small_section_floor")}`,
  ];

  return (
    <PremiumIntro
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      description={`${(typeof t !== "undefined" ? t : (k) => k)("choose_space")} ${(typeof t !== "undefined" ? t : (k) => k)("not_whole_room")}`}
      onStart={onStart}
      icon={<Home size={32} />}
      benefits={areas}
      duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration')}
    />
  );
};

export default ChooseAreaScreen;


