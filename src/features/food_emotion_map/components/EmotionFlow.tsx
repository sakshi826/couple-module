import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import TypingText from "./TypingText";
import ChipSelect from "./ChipSelect";
import { Utensils, ChevronRight, Save, History, Sparkles } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const EmotionFlow = () => {
  const { t } = useTranslation();
  const EMOTIONS = (typeof t !== "undefined" ? t : (k) => k)("emotions_list", { returnObjects: true }) as string[];
  const FOOD_RESPONSES = (typeof t !== "undefined" ? t : (k) => k)("food_responses", { returnObjects: true }) as string[];
  const BODY_SENSATIONS = (typeof t !== "undefined" ? t : (k) => k)("body_sensations", { returnObjects: true }) as string[];
  const SUPPORT_OPTIONS = (typeof t !== "undefined" ? t : (k) => k)("support_options", { returnObjects: true }) as string[];
  const SUPPORT_RESPONSES: Record<string, { title: string; body: string }> = (typeof t !== "undefined" ? t : (k) => k)("support_responses", { returnObjects: true }) as any;

  const [step, setStep] = useState(0);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [foodResponse, setFoodResponse] = useState<string | null>(null);
  const [thought, setThought] = useState("");
  const [bodySensation, setBodySensation] = useState<string | null>(null);
  const [supportChoice, setSupportChoice] = useState<string | null>(null);
  const [closingFeeling, setClosingFeeling] = useState<string | null>(null);
  const [textReady, setTextReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;
    try {
      const sql = neon(DATABASE_URL);
      const rows = await sql`SELECT map_data FROM food_emotion_map_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setHistory(rows.map(r => r.map_data));
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const next = () => {
    setTextReady(false);
    setStep(s => s + 1);
  };

  const saveMap = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error((typeof t !== "undefined" ? t : (k) => k)("auth_error"));
      return;
    }

    setIsSaving(true);
    const mapData = {
      emotion,
      foodResponse,
      thought,
      bodySensation,
      supportChoice,
      closingFeeling,
      createdAt: new Date().toISOString(),
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO food_emotion_map_entries (user_id, map_data) VALUES (${userId}, ${mapData})`;
      toast.success((typeof t !== "undefined" ? t : (k) => k)("save_success"));
      setHistory(prev => [mapData, ...prev]);
      setStep(7); // Go to complete
    } catch (error) {
      console.error("Failed to save map:", error);
      toast.error((typeof t !== "undefined" ? t : (k) => k)("save_error"));
    } finally {
      setIsSaving(false);
    }
  };

  if (step === 7) {
    return (
      <PremiumComplete
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        message={(typeof t !== "undefined" ? t : (k) => k)("complete_message")}
        onRestart={() => {
          setStep(0);
          setEmotion(null);
          setFoodResponse(null);
          setThought("");
          setBodySensation(null);
          setSupportChoice(null);
          setClosingFeeling(null);
        }}
      />
    );
  }

  const titles = (typeof t !== "undefined" ? t : (k) => k)("screen_titles", { returnObjects: true }) as string[];

  return (
    <PremiumLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      subtitle={titles[step]}
      icon={<Utensils className="w-6 h-6 text-primary" />}
      onBack={step > 0 ? () => setStep(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: 7 }).map((_, i) => (
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
            className="flex-1 flex flex-col gap-6"
          >
            {step === 0 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <TypingText
                  text={(typeof t !== "undefined" ? t : (k) => k)("welcome_text")}
                  className="text-2xl font-black text-slate-800 leading-tight"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <div className="space-y-4">
                      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{(typeof t !== "undefined" ? t : (k) => k)("coming_up_label")}</p>
                      <ChipSelect options={EMOTIONS} selected={emotion} onSelect={setEmotion} />
                    </div>
                    {emotion && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        {(typeof t !== "undefined" ? t : (k) => k)("begin_mapping")}
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text={(typeof t !== "undefined" ? t : (k) => k)("food_patterns_q", { emotion: emotion?.toLowerCase() })}
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <ChipSelect options={FOOD_RESPONSES} selected={foodResponse} onSelect={setFoodResponse} />
                    {foodResponse && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        {(typeof t !== "undefined" ? t : (k) => k)("continue_button")}
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text={(typeof t !== "undefined" ? t : (k) => k)("internal_dialogue_q")}
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <textarea
                      value={thought}
                      onChange={(e) => setThought(e.target.value)}
                      placeholder={(typeof t !== "undefined" ? t : (k) => k)("write_placeholder")}
                      className="w-full bg-white border border-slate-100 rounded-3xl p-6 text-base font-medium min-h-[150px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm"
                    />
                    {thought.trim() && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        {(typeof t !== "undefined" ? t : (k) => k)("continue_button")}
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text={(typeof t !== "undefined" ? t : (k) => k)("physical_sensing_q")}
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <ChipSelect options={BODY_SENSATIONS} selected={bodySensation} onSelect={setBodySensation} />
                    {bodySensation && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        {(typeof t !== "undefined" ? t : (k) => k)("continue_button")}
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col gap-8 py-8">
                <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 space-y-8">
                  <div className="inline-flex px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                    {(typeof t !== "undefined" ? t : (k) => k)("the_pattern_label")}
                  </div>
                  <div className="space-y-6">
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {(typeof t !== "undefined" ? t : (k) => k)("pattern_desc_1", { emotion: emotion?.toLowerCase(), sensation: bodySensation?.toLowerCase() })}
                    </p>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {(typeof t !== "undefined" ? t : (k) => k)("pattern_desc_2", { response: foodResponse?.toLowerCase(), thought: thought })}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-50 italic text-slate-400 text-xs font-bold uppercase tracking-widest text-center">
                    {(typeof t !== "undefined" ? t : (k) => k)("pattern_footer")}
                  </div>
                </div>
                <button
                  onClick={next}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  {(typeof t !== "undefined" ? t : (k) => k)("continue_button")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text={(typeof t !== "undefined" ? t : (k) => k)("support_q")}
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <ChipSelect options={SUPPORT_OPTIONS} selected={supportChoice} onSelect={setSupportChoice} />
                    {supportChoice && SUPPORT_RESPONSES[supportChoice] && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-primary/5 rounded-[2rem] p-8 text-left border border-primary/10">
                        <p className="font-black text-primary text-sm mb-3 uppercase tracking-widest">{SUPPORT_RESPONSES[supportChoice].title}</p>
                        <p className="text-slate-600 font-medium leading-relaxed">{SUPPORT_RESPONSES[supportChoice].body}</p>
                      </motion.div>
                    )}
                    {supportChoice && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        {(typeof t !== "undefined" ? t : (k) => k)("continue_button")}
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 6 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text={(typeof t !== "undefined" ? t : (k) => k)("understanding_text")}
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <div className="space-y-4">
                      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{(typeof t !== "undefined" ? t : (k) => k)("how_feeling_now")}</p>
                      <textarea
                        value={closingFeeling || ""}
                        onChange={(e) => setClosingFeeling(e.target.value)}
                        placeholder={(typeof t !== "undefined" ? t : (k) => k)("write_placeholder")}
                        className="w-full bg-white border border-slate-100 rounded-3xl p-6 text-base font-medium min-h-[150px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm"
                      />
                    </div>
                    <button
                      onClick={saveMap}
                      disabled={isSaving || !closingFeeling?.trim()}
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                    >
                      <Save size={20} strokeWidth={3} />
                      {isSaving ? (typeof t !== "undefined" ? t : (k) => k)("preserving") : (typeof t !== "undefined" ? t : (k) => k)("preserve_button")}
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default EmotionFlow;
