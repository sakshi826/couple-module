import TipDetailLayout from "../../components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const PositiveSelfTalk = () => {

  return (
    <TipDetailLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      whyItHelps={(typeof t !== "undefined" ? t : (k) => k)("selftalk_why")}
      whatYouCanDo={[
        (typeof t !== "undefined" ? t : (k) => k)("selftalk_step1"),
        (typeof t !== "undefined" ? t : (k) => k)("selftalk_step2"),
        (typeof t !== "undefined" ? t : (k) => k)("selftalk_step3"),
        (typeof t !== "undefined" ? t : (k) => k)("selftalk_step4"),
      ]}
      extra={
        <div className="bg-transparent rounded-lg p-4  animate-fade-in" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
          <p className="text-sm text-muted-foreground mb-1 font-semibold">{(typeof t !== "undefined" ? t : (k) => k)("example")}</p>
          <p className="text-foreground text-[15px] leading-relaxed">
            {(typeof t !== "undefined" ? t : (k) => k)("instead_of")}: <span className="italic text-destructive/70">"{(typeof t !== "undefined" ? t : (k) => k)("selftalk_instead")}"</span>
          </p>
          <p className="text-foreground text-[15px] leading-relaxed mt-1">
            {(typeof t !== "undefined" ? t : (k) => k)("try")}: <span className="font-bold text-primary">"{(typeof t !== "undefined" ? t : (k) => k)("selftalk_try")}"</span>
          </p>
        </div>
      }
    />
  );
};

export default PositiveSelfTalk;
