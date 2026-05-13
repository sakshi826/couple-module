import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { Wind } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const IntroScreen = () => {
  const navigate = useNavigate();

  return (
    <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}>
      <PremiumIntro
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        description={(typeof t !== "undefined" ? t : (k) => k)("app_description")}
        onStart={() => navigate("./breathe", { replace: true })}
        icon={<Wind size={32} />}
        benefits={[(typeof t !== "undefined" ? t : (k) => k)('intro_p1'), (typeof t !== "undefined" ? t : (k) => k)('intro_p2'), (typeof t !== "undefined" ? t : (k) => k)('intro_p3')]}
        duration={(typeof t !== "undefined" ? t : (k) => k)('app_duration', "3-5 minutes")}
      />
    </PremiumLayout>
  );
};

export default IntroScreen;
