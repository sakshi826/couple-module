import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import IntroScreen from "@/features/repair_and_reconnect/components/repair/IntroScreen";
import ChoosePersonScreen from "@/features/repair_and_reconnect/components/repair/ChoosePersonScreen";
import ChooseApproachScreen from "@/features/repair_and_reconnect/components/repair/ChooseApproachScreen";
import GuidedActionScreen from "@/features/repair_and_reconnect/components/repair/GuidedActionScreen";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const Index = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [person, setPerson] = useState("");
  const [approach, setApproach] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const next = () => setStep((s) => s + 1);
  const reset = () => {
    setStep(0);
    setPerson("");
    setApproach("");
  };

  const done = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      setStep(0);
      setPerson("");
      setApproach("");
      return;
    }

    setIsSaving(true);
    const repairData = { person, approach, completedAt: new Date().toISOString() };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO repair_and_reconnect_entries (user_id, repair_data) VALUES (${userId}, ${repairData})`;
      toast.success((typeof t !== "undefined" ? t : (k) => k)("toasts.save_success"));
      setStep(4); // Go to complete
    } catch (error) {
      console.error("Failed to save repair entry:", error);
      toast.error((typeof t !== "undefined" ? t : (k) => k)("toasts.save_error"));
    } finally {
      setIsSaving(false);
    }
  };

  const personLabel = person ? ((typeof t !== "undefined" ? t : (k) => k)(`choose_person.options.${person}`) || person) : (typeof t !== "undefined" ? t : (k) => k)("complete.default_person");

  if (step === 4) {
    return (
      <PremiumComplete
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        message={(typeof t !== "undefined" ? t : (k) => k)("complete.message", { person: personLabel })}
        onRestart={reset}
      />
    );
  }

  const titles = [
    (typeof t !== "undefined" ? t : (k) => k)("steps.welcome"),
    (typeof t !== "undefined" ? t : (k) => k)("steps.choose_person"),
    (typeof t !== "undefined" ? t : (k) => k)("steps.choose_approach"),
    (typeof t !== "undefined" ? t : (k) => k)("steps.guided_action"),
    (typeof t !== "undefined" ? t : (k) => k)("steps.complete")
  ];

  return (
    <PremiumLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      subtitle={titles[step]} 
      exitOnBack={step === 0}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={step > 0 ? () => setStep(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[60vh]">
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {step === 0 && <IntroScreen onStart={next} />}
            {step === 1 && (
              <ChoosePersonScreen
                selected={person}
                onSelect={setPerson}
                onContinue={next}
              />
            )}
            {step === 2 && (
              <ChooseApproachScreen
                person={person}
                selected={approach}
                onSelect={setApproach}
                onContinue={next}
              />
            )}
            {step === 3 && (
              <div className="flex-1 flex flex-col gap-8">
                <GuidedActionScreen approach={approach} person={person} onComplete={done} />
                <button
                  onClick={done}
                  disabled={isSaving}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  <Save size={20} strokeWidth={3} />
                  {isSaving ? (typeof t !== "undefined" ? t : (k) => k)("toasts.preserving") : (typeof t !== "undefined" ? t : (k) => k)("toasts.complete_button")}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
