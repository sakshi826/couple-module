import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Save } from "lucide-react";
import IntroScreen from "@/features/repair_and_reconnect/components/repair/IntroScreen";
import ChoosePersonScreen from "@/features/repair_and_reconnect/components/repair/ChoosePersonScreen";
import ChooseApproachScreen from "@/features/repair_and_reconnect/components/repair/ChooseApproachScreen";
import GuidedActionScreen from "@/features/repair_and_reconnect/components/repair/GuidedActionScreen";
import CompletionScreen from "@/features/repair_and_reconnect/components/repair/CompletionScreen";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const Index = () => {
  const [step, setStep] = useState(0);
  const [person, setPerson] = useState("");
  const [approach, setApproach] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const next = () => setStep((s) => s + 1);
  const reset = () => {
    setStep(1);
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
    const repairData = { person, approach };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO repair_and_reconnect_entries (user_id, repair_data) VALUES (${userId}, ${repairData})`;
      toast.success("Repair progress saved");
    } catch (error) {
      console.error("Failed to save repair entry:", error);
      toast.error("Failed to save repair entry");
    } finally {
      setIsSaving(false);
      setStep(0);
      setPerson("");
      setApproach("");
    }
  };

  const titles = ["Welcome", "Choose Person", "Choose Approach", "Guided Action", "Completion"];

  return (
    <PremiumLayout
      title="Repair & Reconnect"
      subtitle={titles[step]}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={step > 0 ? () => setStep(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4">
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {step === 0 && <IntroScreen onStart={next} onBack={() => window.history.back()} />}
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
              <GuidedActionScreen approach={approach} person={person} onComplete={next} />
            )}
            {step === 4 && (
              <div className="space-y-6">
                <CompletionScreen onTryAnother={reset} onDone={done} />
                <button
                  onClick={done}
                  disabled={isSaving}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  <Save size={20} />
                  {isSaving ? "Saving..." : "Save Progress"}
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
