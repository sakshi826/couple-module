import { useState, useMemo, useEffect } from "react";
import { Heart, History, Save, ChevronRight, Sparkles } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";
import { CONNECTION_OPTIONS, BOND_PROMPTS } from "@/features/continuing_bonds/data/bondPrompts";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
type Screen = "welcome" | "choose" | "bond" | "review" | "closing" | "complete";
const OPTION_EMOJIS = ["🕊️", "🤲", "🌿", "💌", "✨"];

const ContinuingBonds = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [primaryText, setPrimaryText] = useState("");
  const [deeperText, setDeeperText] = useState("");
  const [bondText, setBondText] = useState("");
  const [showDeeper, setShowDeeper] = useState(false);
  const [reflections, setReflections] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const bondPrompt = useMemo(() => BOND_PROMPTS[Math.floor(Math.random() * BOND_PROMPTS.length)], [screen]);

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;
    try {
      const sql = neon(DATABASE_URL);
      const rows = await sql`SELECT bond_data FROM continuing_bonds_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setReflections(rows.map(r => r.bond_data));
    } catch (error) {
      console.error("Failed to fetch reflections:", error);
    }
  };

  const handleSaveReflection = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error("Auth session missing or DB not configured");
      return;
    }

    setIsSaving(true);
    const bondData = {
      connectionType: selectedOption !== null ? CONNECTION_OPTIONS[selectedOption].label : "General",
      primaryResponse: primaryText,
      deeperResponse: deeperText || undefined,
      bondAction: bondText || undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO continuing_bonds_entries (user_id, bond_data) VALUES (${userId}, ${bondData})`;
      toast.success("Bond reflection preserved");
      setReflections(prev => [bondData, ...prev]);
      setScreen("review");
    } catch (error) {
      console.error("Failed to save bond:", error);
      toast.error("Failed to preserve reflection");
    } finally {
      setIsSaving(false);
    }
  };

  const reset = () => {
    setSelectedOption(null);
    setPrimaryText("");
    setDeeperText("");
    setBondText("");
    setShowDeeper(false);
    setScreen("welcome");
  };

  if (screen === "complete") {
    return (
      <PremiumComplete
        title="Bond Preserved"
        message="The people we love become a part of who we are. Your connection continues in the ways you honor them."
        onRestart={reset}
      />
    );
  }

  const titles: Record<Screen, string> = {
    welcome: "Welcome",
    choose: "Connection",
    bond: "Action",
    review: "Reflection",
    closing: "Final Care",
    complete: "Bond Preserved"
  };

  return (
    <PremiumLayout
      title="Continuing Bonds"
      subtitle={titles[screen]}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen !== "welcome" ? () => setScreen("welcome") : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center text-center gap-8 py-10"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl animate-bounce-slow">
                🤍
              </div>
              <div className="space-y-6">
                <h1 className="text-3xl font-black text-slate-800 leading-tight">
                  Love doesn't end when someone is gone.
                </h1>
                <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto text-base">
                  The connection you shared continues in many ways. Take a slow breath, and go at your own pace.
                </p>
              </div>
              <button
                onClick={() => setScreen("choose")}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                Begin Reflection
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}

          {screen === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col gap-8"
            >
              <h2 className="text-2xl font-black text-slate-800 text-center">
                How do you still feel connected?
              </h2>

              {selectedOption === null ? (
                <div className="space-y-4">
                  {CONNECTION_OPTIONS.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className="w-full bg-white border border-slate-100 rounded-3xl p-6 text-left shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all flex items-center gap-5 group"
                    >
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        {OPTION_EMOJIS[i]}
                      </div>
                      <span className="font-black text-slate-700 text-lg">{opt.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-10 space-y-6 border border-slate-100 shadow-2xl">
                    <p className="text-slate-800 font-black text-lg leading-relaxed italic text-center">
                      "{CONNECTION_OPTIONS[selectedOption].prompt}"
                    </p>
                    <textarea
                      value={primaryText}
                      onChange={(e) => setPrimaryText(e.target.value)}
                      placeholder="Write from the heart..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-base font-medium min-h-[150px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-inner"
                    />
                  </div>

                  <button
                    onClick={() => setScreen("bond")}
                    disabled={!primaryText.trim()}
                    className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                  >
                    Continue
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {screen === "bond" && (
            <motion.div
              key="bond"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center">
                <div className="text-6xl mb-8">🔗</div>
                <h2 className="text-2xl font-black text-slate-800 mb-4">Connecting in action</h2>
                <p className="text-slate-500 font-medium text-base mb-8 leading-relaxed italic">
                  "{bondPrompt}"
                </p>
                <textarea
                  value={bondText}
                  onChange={(e) => setBondText(e.target.value)}
                  placeholder="Sharing is optional..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-base font-medium min-h-[150px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-inner"
                />
              </div>

              <button
                onClick={handleSaveReflection}
                disabled={isSaving}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                <Save size={20} strokeWidth={3} />
                {isSaving ? "Preserving..." : "Preserve Reflection"}
              </button>
            </motion.div>
          )}

          {screen === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col gap-8 py-6"
            >
              <div className="w-full bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200/50 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-4xl">
                  📖
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Preserved</h2>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 italic">
                  "This connection is part of you. You can return to it anytime."
                </p>
                <div className="bg-slate-50 rounded-3xl p-8 text-left border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
                    {reflections[0]?.connectionType}
                  </p>
                  <p className="text-slate-800 text-base leading-relaxed font-medium line-clamp-6">
                    {reflections[0]?.primaryResponse}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setScreen("closing")}
                  className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  Finish for now
                </button>
                <button
                  onClick={reset}
                  className="w-full py-5 rounded-2xl bg-white text-slate-600 font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                >
                  Add Another
                </button>
              </div>
            </motion.div>
          )}

          {screen === "closing" && (
            <motion.div
              key="closing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center text-center gap-8 py-10"
            >
              <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl">
                🕊️
              </div>
              <div className="space-y-8 text-slate-600 font-medium text-base leading-relaxed max-w-xs mx-auto">
                <p>The people we love become a part of who we are. 🤍</p>
                <p>They live on in the way you laugh, the stories you tell, and the quiet moments when you feel them near.</p>
                <p>However your bond shows up — it is real, and it matters.</p>
              </div>
              <button
                onClick={() => setScreen("complete")}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
              >
                Save & Exit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default ContinuingBonds;
