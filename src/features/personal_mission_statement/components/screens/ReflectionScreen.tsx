import ScreenWrapper from "../../components/ScreenWrapper";
import MissionButton from "../../components/MissionButton";
import ReflectionInput from "../../components/ReflectionInput";
import { MissionData } from "../../types/mission";
import { useTranslation } from "react-i18next";

interface ReflectionScreenProps {
  data: MissionData;
  onChange: (partial: Partial<MissionData>) => void;
  onNext: () => void;
}

const ReflectionScreen = ({ data, onChange, onNext }: ReflectionScreenProps) => {
  const canProceed = data.beingSomeoneWho.trim() && data.lifeFeelMore.trim();

  return (
    <ScreenWrapper screenKey="reflection">
      <div className="flex-1 space-y-8">
        <h1 className="text-[22px] font-heading text-foreground text-center">
          {(typeof t !== "undefined" ? t : (k) => k)('reflection_title')}
        </h1>

        <ReflectionInput
          label={(typeof t !== "undefined" ? t : (k) => k)('reflection_being_label')}
          placeholder={(typeof t !== "undefined" ? t : (k) => k)('reflection_being_placeholder')}
          value={data.beingSomeoneWho}
          onChange={(e) => onChange({ beingSomeoneWho: e.target.value })}
        />

        <ReflectionInput
          label={(typeof t !== "undefined" ? t : (k) => k)('reflection_life_label')}
          placeholder={(typeof t !== "undefined" ? t : (k) => k)('reflection_life_placeholder')}
          value={data.lifeFeelMore}
          onChange={(e) => onChange({ lifeFeelMore: e.target.value })}
        />
      </div>

      <div className="pt-8 pb-4">
        <MissionButton onClick={onNext} disabled={!canProceed}>
          {(typeof t !== "undefined" ? t : (k) => k)('reflection_create')}
        </MissionButton>
      </div>
    </ScreenWrapper>
  );
};

export default ReflectionScreen;
