import TipDetailLayout from "../../components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const Mindfulness = () => {

  return (
    <TipDetailLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      whyItHelps={(typeof t !== "undefined" ? t : (k) => k)("mindfulness_why")}
      whatYouCanDo={[
        (typeof t !== "undefined" ? t : (k) => k)("mindfulness_step1"),
        (typeof t !== "undefined" ? t : (k) => k)("mindfulness_step2"),
        (typeof t !== "undefined" ? t : (k) => k)("mindfulness_step3"),
        (typeof t !== "undefined" ? t : (k) => k)("mindfulness_step4"),
      ]}
    />
  );
};

export default Mindfulness;
