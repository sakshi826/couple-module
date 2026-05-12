import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Utensils, History, Save, ChevronRight, Heart, Sparkles } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

type Screen =
  | "intro"
  | "identify"
  | "feeling"
  | "impact"
  | "challenge"
  | "permission"
  | "step"
  | "takeaway"
  | "close";

const SCREENS: Screen[] = [
  "intro",
  "identify",
  "feeling",
  "challenge",
  "takeaway",
  "close",
];

export default function ChallengingFoodRules() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("intro");
  const [rule, setRule] = useState("");
  const [customRule, setCustomRule] = useState("");
  const [feeling, setFeeling] = useState("");
  const [customFeeling, setCustomFeeling] = useState("");
  const [impact, setImpact] = useState("");
  const [customImpact, setCustomImpact] = useState("");
  const [challengeChoice, setChallengeChoice] = useState("");
  const [stepChoice, setStepChoice] = useState("");
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
      const rows = await sql`SELECT rule_data FROM food_rules_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setHistory(rows.map(r => r.rule_data));
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const goNext = () => {
    const idx = SCREENS.indexOf(screen);
    if (idx < SCREENS.length - 1) setScreen(SCREENS[idx + 1]);
  };

  const saveRule = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error(t("auth_error"));
      return;
    }

    setIsSaving(true);
    const ruleData = {
      rule: rule === "__custom" ? customRule : rule,
      feeling: feeling === "__custom" ? customFeeling : feeling,
      impact: impact === "__custom" ? customImpact : impact,
      challengeChoice,
      stepChoice,
      createdAt: new Date().toISOString(),
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO food_rules_entries (user_id, rule_data) VALUES (${userId}, ${ruleData})`;
      toast.success(t("save_success"));
      setHistory(prev => [ruleData, ...prev]);
      setScreen("close");
    } catch (error) {
      console.error("Failed to save rule:", error);
      toast.error(t("save_error"));
    } finally {
      setIsSaving(false);
    }
  };

  const resetFlow = () => {
    setScreen("intro");
    setRule("");
    setCustomRule("");
    setFeeling("");
    setCustomFeeling("");
    setChallengeChoice("");
    setStepChoice("");
  };

  if (screen === "close") {
    return (
      <PremiumComplete
        title={t("app_title")}
        message={t("complete_message")}
        onRestart={resetFlow}
      />
    );
  }

  const selectedRule = rule === "__custom" ? customRule : rule;
  const selectedFeeling = feeling === "__custom" ? customFeeling : feeling;
  const selectedImpact = impact === "__custom" ? customImpact : impact;

  const reflections: Record<string, string> = t("reflections", { returnObjects: true }) as any;
  const titles: Record<string, string> = t("screen_titles", { returnObjects: true }) as any;

  const currentIdx = SCREENS.indexOf(screen);

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={titles[screen]}
      icon={<Utensils className="w-6 h-6 text-primary" />}
      onBack={currentIdx > 0 ? () => setScreen(SCREENS[currentIdx - 1]) : undefined}
      onReset={currentIdx > 0 ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {SCREENS.slice(0, 5).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentIdx ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col gap-8"
          >
            {screen === "intro" && (
              <div className="flex-1 flex flex-col gap-10 text-center justify-center">
                <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50">
                  <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-4xl">
                    🌿
                  </div>
                  <h1 className="text-3xl font-black text-slate-800 mb-4 leading-tight">
                    {t("welcome_title")}
                  </h1>
                  <p className="text-slate-600 font-medium leading-relaxed text-base">
                    {t("welcome_subtitle")}
                  </p>
                </div>
                <button
                  onClick={goNext}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  {t("begin_button")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {screen === "identify" && (
              <div className="space-y-8">
                <header className="text-center space-y-2">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{t("rule_label")}</span>
                  <h2 className="text-2xl font-black text-slate-800">{t("rule_question")}</h2>
                </header>
                <div className="space-y-4">
                  {(t("rule_options", { returnObjects: true }) as string[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setRule(opt)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${rule === opt ? "bg-primary/5 border-primary text-primary" : "bg-white border-slate-50 text-slate-600 hover:border-slate-200"}`}
                    >
                      <span className="font-black text-base">{opt}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setRule("__custom")}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${rule === "__custom" ? "bg-primary/5 border-primary text-primary" : "bg-white border-slate-50 text-slate-600 hover:border-slate-200"}`}
                  >
                    <span className="font-black text-base">{t("rule_something_else")}</span>
                  </button>
                </div>
                {rule === "__custom" && (
                  <textarea
                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-6 text-base font-bold min-h-[120px] focus:border-primary/30 outline-none transition-all"
                    placeholder={t("rule_placeholder")}
                    value={customRule}
                    onChange={(e) => setCustomRule(e.target.value)}
                  />
                )}
                <button
                  onClick={goNext}
                  disabled={!selectedRule}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  {t("continue_button")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {screen === "feeling" && (
              <div className="space-y-8">
                <header className="text-center space-y-2">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{t("feeling_label")}</span>
                  <h2 className="text-2xl font-black text-slate-800">{t("feeling_question")}</h2>
                </header>
                <div className="grid grid-cols-2 gap-4">
                  {(t("feeling_options", { returnObjects: true }) as string[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFeeling(opt)}
                      className={`p-6 rounded-3xl border-2 text-center transition-all ${feeling === opt ? "bg-primary/5 border-primary text-primary shadow-lg shadow-primary/5" : "bg-white border-slate-50 text-slate-600 hover:border-slate-200"}`}
                    >
                      <span className="font-black text-sm">{opt}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={goNext}
                  disabled={!selectedFeeling}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  {t("next_button")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {screen === "challenge" && (
              <div className="space-y-8">
                <header className="text-center space-y-2">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{t("challenge_label")}</span>
                  <h2 className="text-2xl font-black text-slate-800">{t("challenge_question")}</h2>
                </header>
                <div className="space-y-4">
                  {Object.keys(reflections).map((opt) => (
                    <div key={opt} className="space-y-3">
                      <button
                        onClick={() => setChallengeChoice(opt)}
                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${challengeChoice === opt ? "bg-slate-800 text-white border-slate-800 shadow-xl" : "bg-white border-slate-50 text-slate-600 hover:border-slate-200"}`}
                      >
                        <span className="font-black text-base">{opt}</span>
                      </button>
                      <AnimatePresence>
                        {challengeChoice === opt && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                              <p className="text-amber-900 text-sm font-bold italic leading-relaxed">{reflections[opt]}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
                <button
                  onClick={goNext}
                  disabled={!challengeChoice}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  {t("continue_button")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {screen === "takeaway" && (
              <div className="flex-1 flex flex-col gap-10 text-center justify-center">
                <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 space-y-8 text-left relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 text-primary/10">
                    <Sparkles size={64} />
                  </div>
                  <header className="space-y-2">
                    <span className="inline-block rounded-full bg-primary/5 text-primary px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                      {t("your_reflection")}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800">{t("reflection_saved")}</h3>
                  </header>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("label_rule")}</p>
                      <p className="text-slate-700 font-bold text-lg">{selectedRule}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("label_feeling")}</p>
                      <p className="text-slate-700 font-bold text-lg">{selectedFeeling}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={saveRule}
                  disabled={isSaving}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  <Save size={20} strokeWidth={3} />
                  {isSaving ? t("preserving") : t("preserve_button")}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}
