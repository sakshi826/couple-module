import { useState, useMemo, useEffect } from "react";
import { Heart, History, Save, ChevronRight } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";
import { CONNECTION_OPTIONS, BOND_PROMPTS } from "@/features/continuing_bonds/data/bondPrompts";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
type Screen = "welcome" | "choose" | "bond" | "review" | "closing";
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

  const titles: Record<Screen, string> = {
    welcome: "Welcome",
    choose: "Connection",
    bond: "Action",
    review: "Reflection",
    closing: "Final Care"
  };

  return (
    <PremiumLayout
      title="Continuing Bonds"
      subtitle={titles[screen]}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen !== "welcome" ? () => setScreen("welcome") : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center text-center gap-8 py-10"
            >
              <div className="text-6xl animate-bounce-slow">🤍</div>
              <div className="space-y-4">
                <h1 className="text-3xl font-black text-slate-800 leading-tight">
                  Love doesn't end when someone is gone.
                </h1>
                <p className="text-slate-600 leading-relaxed max-w-xs mx-auto text-sm">
                  The connection you shared continues in many ways. Take a slow breath, and go at your own pace.
                </p>
              </div>
              <button
                onClick={() => setScreen("choose")}
                className="w-full py-5 rounded-[2rem] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                Begin Reflection
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col gap-6"
            >
              <h2 className="text-xl font-black text-slate-800 text-center">
                How do you still feel connected?
              </h2>

              {selectedOption === null ? (
                <div className="space-y-3">
                  {CONNECTION_OPTIONS.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className="w-full bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-lg shadow-slate-200/50 hover:scale-[1.02] transition-all flex items-center gap-4 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{OPTION_EMOJIS[i]}</span>
                      <span className="font-bold text-slate-700">{opt.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100">
                    <p className="text-slate-800 font-bold text-sm leading-relaxed italic">
                      "{CONNECTION_OPTIONS[selectedOption].prompt}"
                    </p>
                    <textarea
                      value={primaryText}
                      onChange={(e) => setPrimaryText(e.target.value)}
                      placeholder="Write from the heart..."
                      className="w-full bg-white border-none rounded-2xl p-4 text-sm min-h-[120px] focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                    />
                  </div>

                  <button
                    onClick={() => setScreen("bond")}
                    disabled={!primaryText.trim()}
                    className="w-full py-5 rounded-[2rem] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                    Continue
                    <ChevronRight size={20} />
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
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
                <div className="text-5xl mb-6">🔗</div>
                <h2 className="text-xl font-black text-slate-800 mb-4">Connecting in action</h2>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed italic">
                  "{bondPrompt}"
                </p>
                <textarea
                  value={bondText}
                  onChange={(e) => setBondText(e.target.value)}
                  placeholder="Sharing is optional..."
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm min-h-[120px] focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                />
              </div>

              <button
                onClick={handleSaveReflection}
                disabled={isSaving}
                className="w-full py-5 rounded-[2rem] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <Save size={20} />
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
              <div className="w-full bg-white border border-slate-100 rounded-[3rem] p-8 shadow-2xl shadow-slate-200/50 text-center">
                <div className="text-5xl mb-4">📖</div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Preserved</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  "This connection is part of you. You can return to it anytime."
                </p>
                <div className="bg-slate-50 rounded-2xl p-6 text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                    {reflections[0]?.connectionType}
                  </p>
                  <p className="text-slate-800 text-sm leading-relaxed line-clamp-4">
                    {reflections[0]?.primaryResponse}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setScreen("closing")}
                  className="w-full py-5 rounded-[2rem] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  Finish for now
                </button>
                <button
                  onClick={reset}
                  className="w-full py-5 rounded-[2rem] bg-slate-50 text-slate-600 font-black text-lg border border-slate-200 hover:bg-slate-100 transition-all"
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
              <div className="text-6xl">🕊️</div>
              <div className="space-y-6 text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                <p>The people we love become a part of who we are. 🤍</p>
                <p>They live on in the way you laugh, the stories you tell, and the quiet moments when you feel them near.</p>
                <p>However your bond shows up — in big moments or small ones — it is real, and it matters.</p>
              </div>
              <button
                onClick={() => window.history.back()}
                className="w-full py-5 rounded-[2rem] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
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
