import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EnergyCheckScreenProps {
  onFinish: () => void;
}

const EnergyCheckScreen = ({ onFinish }: EnergyCheckScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center  px-6 py-12 animate-fade-in">
      <div className="w-full w-full text-center space-y-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-3 h-3 rounded-full bg-primary " />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">{(typeof t !== "undefined" ? t : (k) => k)("step_3_of_3")}</p>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            {(typeof t !== "undefined" ? t : (k) => k)("pause_and_notice")}
          </h1>
        </div>

        <div className="space-y-6 text-left">
          <p className="text-lg text-foreground leading-relaxed">
            {(typeof t !== "undefined" ? t : (k) => k)("look_again")}
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {(typeof t !== "undefined" ? t : (k) => k)("feel_lighter")}
          </p>

          <p className="text-foreground leading-relaxed">
            {(typeof t !== "undefined" ? t : (k) => k)("draining_item")}
          </p>

          <p className="text-primary font-medium italic">
            {(typeof t !== "undefined" ? t : (k) => k)("slow_breath")}
          </p>

          <div className="bg-accent/50 rounded-xl p-5 border border-border">
            <p className="text-foreground font-medium leading-relaxed text-center">
              {(typeof t !== "undefined" ? t : (k) => k)("reduced_load")}<br />
              <span className="text-primary font-semibold">{(typeof t !== "undefined" ? t : (k) => k)("that_matters")}</span>
            </p>
          </div>
        </div>

        <Button
          onClick={onFinish}
          className="w-full py-6 text-lg font-heading font-semibold rounded-xl  hover: transition-all gap-2"
          size="lg"
        >
          <Heart className="w-5 h-5" />
          {(typeof t !== "undefined" ? t : (k) => k)("finish")}
        </Button>
      </div>
    </div>
  );
};

export default EnergyCheckScreen;

