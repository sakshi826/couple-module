import TipDetailLayout from "../../components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const MuscleRelaxation = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      whyItHelps={(typeof t !== "undefined" ? t : (k) => k)("muscle_why")}
      whatYouCanDo={[
        (typeof t !== "undefined" ? t : (k) => k)("muscle_step1"),
        (typeof t !== "undefined" ? t : (k) => k)("muscle_step2"),
        (typeof t !== "undefined" ? t : (k) => k)("muscle_step3"),
        (typeof t !== "undefined" ? t : (k) => k)("muscle_step4"),
        (typeof t !== "undefined" ? t : (k) => k)("muscle_step5"),
      ]}
    />
  );
};

export default MuscleRelaxation;
