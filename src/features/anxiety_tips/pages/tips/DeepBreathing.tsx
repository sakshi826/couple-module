import TipDetailLayout from "../../components/TipDetailLayout";
import BreathingCircle from "../../components/BreathingCircle";
import { useTranslation } from "react-i18next";

const DeepBreathing = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      whyItHelps={(typeof t !== "undefined" ? t : (k) => k)("breathing_why")}
      whatYouCanDo={[
        (typeof t !== "undefined" ? t : (k) => k)("breathing_step1"),
        (typeof t !== "undefined" ? t : (k) => k)("breathing_step2"),
        (typeof t !== "undefined" ? t : (k) => k)("breathing_step3"),
        (typeof t !== "undefined" ? t : (k) => k)("breathing_step4"),
      ]}
      extra={<BreathingCircle />}
    />
  );
};

export default DeepBreathing;
