import TipDetailLayout from "../../components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const SeekSupport = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      whyItHelps={(typeof t !== "undefined" ? t : (k) => k)("support_why")}
      whatYouCanDo={[
        (typeof t !== "undefined" ? t : (k) => k)("support_step1"),
        (typeof t !== "undefined" ? t : (k) => k)("support_step2"),
        (typeof t !== "undefined" ? t : (k) => k)("support_step3"),
        (typeof t !== "undefined" ? t : (k) => k)("support_step4"),
      ]}
    />
  );
};

export default SeekSupport;
