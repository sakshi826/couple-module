import { ArrowLeft, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProgressDots from "@/features/the_unsent_letter/components/ProgressDots";

interface IntroScreenProps {
  step: number;
  onStart: () => void;
  onHistory: () => void;
}

const IntroScreen = ({ step, onStart, onHistory }: IntroScreenProps) => {
  const { t } = useTranslation();
  const description = t("intro.description", { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col flex-1 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <button className="p-2 -ml-2 rounded-full hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <ProgressDots current={step} total={3} />
        <button
          onClick={onHistory}
          className="p-2 -mr-2 rounded-full hover:bg-card transition-colors"
        >
          <Clock className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center -mt-12">
        {/* Envelope icon */}
        <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center mb-8">
          <span className="text-2xl">✉️</span>
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-6 leading-tight">
          {t("intro.title")}
        </h1>

        <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px] max-w-sm">
          {Array.isArray(description) && description.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        <p className="text-micro mt-8 italic">
          {t("intro.notice")}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={onStart}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity mt-8"
      >
        {t("intro.button")}
      </button>
    </div>
  );
};

export default IntroScreen;
