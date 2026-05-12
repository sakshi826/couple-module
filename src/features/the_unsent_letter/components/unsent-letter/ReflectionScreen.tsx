import { ArrowLeft, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProgressDots from "@/features/the_unsent_letter/components/ProgressDots";

interface ReflectionScreenProps {
  step: number;
  onSave: () => void;
  onFinish: () => void;
  onBack: () => void;
}

const ReflectionScreen = ({ step, onSave, onFinish, onBack }: ReflectionScreenProps) => {
  const { t } = useTranslation();
  const description = t("reflection.description", { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col flex-1 px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <ProgressDots current={step} total={3} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center -mt-12">
        <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center mb-8">
          <Leaf className="w-6 h-6 text-primary" />
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-6 leading-tight">
          {t("reflection.title")}
        </h1>

        <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px] max-w-sm">
          {Array.isArray(description) && description.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        <p className="text-micro mt-8 italic">
          {t("reflection.notice")}
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-3 mt-8">
        <button
          onClick={onSave}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
        >
          {t("reflection.save_button")}
        </button>
        <button
          onClick={onFinish}
          className="w-full py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
        >
          {t("reflection.finish_button")}
        </button>
      </div>
    </div>
  );
};

export default ReflectionScreen;
