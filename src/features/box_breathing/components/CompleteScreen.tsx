import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onRestart: () => void;
  onBack: () => void;
}

const CompleteScreen = ({ onRestart, onBack }: Props) => {
  return (
    <div className=" gradient-calm flex flex-col items-center justify-center px-6 relative">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>

        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {(typeof t !== "undefined" ? t : (k) => k)("feeling_calmer")}
        </h2>
        <p className="text-muted-foreground text-center text-[15px] leading-relaxed max-w-xs mb-10">
          {(typeof t !== "undefined" ? t : (k) => k)("session_complete_msg")}
        </p>

        <button
          onClick={onRestart}
          className="w-full max-w-xs py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base  hover:brightness-105 active:scale-[0.98] transition-all duration-200 mb-3"
        >
          {(typeof t !== "undefined" ? t : (k) => k)("start_again")}
        </button>
        <button
          onClick={onBack}
          className="w-full max-w-xs py-4 rounded-lg bg-transparent text-slate-600 font-medium text-base  hover:bg-muted active:scale-[0.98] transition-all duration-200"
        >
          {(typeof t !== "undefined" ? t : (k) => k)("back")}
        </button>
      </div>
    </div>
  );
};


export default CompleteScreen;
