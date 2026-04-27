import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, History, Save, ChevronRight, Heart } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
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
  "impact",
  "challenge",
  "permission",
  "step",
  "takeaway",
  "close",
];

export default function ChallengingFoodRules() {
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
      toast.error("Auth session missing or DB not configured");
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
      toast.success("Reflection preserved");
      setHistory(prev => [ruleData, ...prev]);
      setScreen("close");
    } catch (error) {
      console.error("Failed to save rule:", error);
      toast.error("Failed to preserve reflection");
    } finally {
      setIsSaving(false);
    }
  };

  const selectedRule = rule === "__custom" ? customRule : rule;
  const selectedFeeling = feeling === "__custom" ? customFeeling : feeling;
  const selectedImpact = impact === "__custom" ? customImpact : impact;

  const reflections: Record<string, string> = {
    "Is this rule too strict?":
      "Does this feel flexible, or does it create pressure to follow it perfectly?",
    "Is this actually helping me?":
      "Does this rule support your well-being, or add stress or guilt?",
    "What happens when I can't follow it?":
      "What do you notice when this rule doesn't go as planned?",
  };

  const titles: Record<Screen, string> = {
    intro: "Gentle Awareness",
    identify: "Naming the Rule",
    feeling: "Emotional Impact",
    impact: "Physical Impact",
    challenge: "Soft Challenge",
    permission: "Giving Permission",
    step: "Gentle Steps",
    takeaway: "Summary",
    close: "Reflection"
  };

  return (
    <PremiumLayout
      title="Challenging Food Rules"
      subtitle={titles[screen]}
      icon={<Utensils className="w-6 h-6 text-primary" />}
      onBack={screen !== "intro" ? () => setScreen("intro") : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <div className="flex justify-center gap-2 mb-8">
          {SCREENS.map((s, i) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${i <= SCREENS.indexOf(screen) ? "bg-primary" : "bg-slate-200"} ${i === SCREENS.indexOf(screen) ? "w-8" : "w-2"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col gap-6"
          >
            {screen === "intro" && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
                  <div className="text-6xl mb-6 animate-bounce-slow">🌿</div>
                  <h1 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
                    Food rules aren't laws.
                  </h1>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    We all carry rules about food—some helpful, some not. This is a safe space to notice one rule and gently reflect on it.
                  </p>
                </div>
                <button
                  onClick={goNext}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  Let's Begin
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {screen === "identify" && (
              <div className="space-y-6">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] text-center">Naming the rule</p>
                <div className="space-y-3">
                  {[
                    "I shouldn't eat after a certain time",
                    "Some foods are off-limits",
                    "I need to control portions strictly",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setRule(opt)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all ${rule === opt ? "bg-primary text-white border-primary" : "bg-white border-slate-100 text-slate-700"}`}
                    >
                      <span className="font-bold text-sm">{opt}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setRule("__custom")}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${rule === "__custom" ? "bg-primary text-white border-primary" : "bg-white border-slate-100 text-slate-700"}`}
                  >
                    <span className="font-bold text-sm">Something else...</span>
                  </button>
                </div>
                {rule === "__custom" && (
                  <input
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"
                    placeholder="Type your food rule..."
                    value={customRule}
                    onChange={(e) => setCustomRule(e.target.value)}
                  />
                )}
                <button
                  onClick={goNext}
                  disabled={!selectedRule}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}

            {screen === "feeling" && (
              <div className="space-y-6">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] text-center">How it makes you feel</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "😟 Anxious",
                    "😌 In control",
                    "😕 Guilty",
                    "😣 Restricted",
                    "😴 Tired",
                    "😐 Mixed",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFeeling(opt)}
                      className={`p-4 rounded-2xl border text-center transition-all ${feeling === opt ? "bg-primary text-white border-primary" : "bg-white border-slate-100 text-slate-700"}`}
                    >
                      <span className="font-bold text-xs">{opt}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={goNext}
                  disabled={!selectedFeeling}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {screen === "challenge" && (
              <div className="space-y-6">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] text-center">Soft Challenge</p>
                <div className="space-y-4">
                  {Object.keys(reflections).map((opt) => (
                    <div key={opt} className="space-y-2">
                      <button
                        onClick={() => setChallengeChoice(opt)}
                        className={`w-full text-left p-5 rounded-2xl border transition-all ${challengeChoice === opt ? "bg-slate-800 text-white border-slate-800" : "bg-white border-slate-100 text-slate-700"}`}
                      >
                        <span className="font-bold text-sm">{opt}</span>
                      </button>
                      {challengeChoice === opt && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="bg-amber-50 rounded-2xl p-6 border border-amber-100"
                        >
                          <p className="text-amber-900 text-xs italic leading-relaxed">{reflections[opt]}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={goNext}
                  disabled={!challengeChoice}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}

            {screen === "takeaway" && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 space-y-6 text-left">
                  <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                    Summary
                  </span>
                  <div className="space-y-4">
                    <p className="text-sm"><span className="font-black text-slate-800">The Rule:</span> {selectedRule}</p>
                    <p className="text-sm"><span className="font-black text-slate-800">The Feeling:</span> {selectedFeeling}</p>
                    <p className="text-sm"><span className="font-black text-slate-800">The Impact:</span> {selectedImpact}</p>
                  </div>
                </div>
                <button
                  onClick={saveRule}
                  disabled={isSaving}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  <Save size={20} />
                  {isSaving ? "Preserving..." : "Preserve Reflection"}
                </button>
              </div>
            )}

            {screen === "close" && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 flex flex-col items-center gap-4">
                  <Heart className="text-emerald-500 w-12 h-12" />
                  <h2 className="text-xl font-black text-emerald-900">Take care.</h2>
                  <p className="text-emerald-800 text-sm leading-relaxed">
                    Awareness is the first step toward freedom. You can come back anytime to explore another rule.
                  </p>
                </div>
                <button
                  onClick={() => window.history.back()}
                  className="w-full bg-slate-800 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:scale-[1.02] transition-all"
                >
                  Finish Session
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}
