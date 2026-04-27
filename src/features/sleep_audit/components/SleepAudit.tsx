import { useState, useEffect, useCallback } from "react";
import { Moon, Clock, Save, History, Check } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";
import StarsCanvas from "./StarsCanvas";
import { motion, AnimatePresence } from "framer-motion";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const options = [
  { emoji: "🕐", text: "I go to bed at very different times each night" },
  { emoji: "💡", text: "My sleep environment isn't dark, quiet, or comfortable" },
  { emoji: "📱", text: "I scroll on my phone right before sleeping" },
  { emoji: "☕", text: "I have caffeine or alcohol close to bedtime" },
  { emoji: "😵", text: "I wake during the night and struggle to go back to sleep" },
  { emoji: "🧠", text: "My mind races with thoughts when I try to sleep" },
  { emoji: "😔", text: "I rarely feel refreshed after a night's sleep" },
];

const ratingLabels = ["Very poor", "Poor", "Okay", "Good", "Great"];

type HistoryEntry = { id: string; date: string; score: number; rating: number };

const getScoreInfo = (score: number) => {
  if (score >= 6) return { color: "#1D9E75", status: "Mostly on track" };
  if (score >= 4) return { color: "#EF9F27", status: "Some disruptions" };
  return { color: "#E24B4A", status: "Needs attention" };
};

const SleepAudit = () => {
  const [screen, setScreen] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const fetchHistory = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;

    setIsLoadingHistory(true);
    try {
      const sql = neon(DATABASE_URL);
      const results = await sql`SELECT id, audit_data, created_at FROM sleep_audit_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 20`;
      setHistory(results.map(r => ({
        id: r.id,
        date: new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        score: r.audit_data.score,
        rating: r.audit_data.rating,
      })));
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSave = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error("Auth session missing or DB not configured");
      return;
    }

    setIsSaving(true);
    const score = Math.max(0, Math.min(7, 7 - selected.size));
    const auditData = { score, rating, note, selectedIndices: Array.from(selected) };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO sleep_audit_entries (user_id, audit_data) VALUES (${userId}, ${auditData})`;
      toast.success("Audit saved");
      fetchHistory();
      setScreen(0);
      setSelected(new Set());
      setRating(5);
      setNote("");
    } catch (error) {
      console.error("Failed to save audit:", error);
      toast.error("Failed to save audit");
    } finally {
      setIsSaving(false);
    }
  };

  const scoreValue = 7 - selected.size;
  const scoreInfo = getScoreInfo(scoreValue);

  return (
    <PremiumLayout
      title="Sleep Audit"
      subtitle="Understand your rest"
      icon={<Moon className="w-6 h-6 text-primary" />}
      onBack={screen === 0 ? undefined : () => setScreen(prev => prev - 1)}
    >
      <div className="relative w-full max-w-md mx-auto min-h-[70vh] flex flex-col px-6">
        <StarsCanvas />

        <AnimatePresence mode="wait">
          {screen === 0 && (
            <motion.div
              key="screen0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-10"
            >
              <span className="text-6xl">🌙</span>
              <h1 className="text-2xl font-bold text-slate-800">Your Sleep Audit</h1>
              <p className="text-base text-slate-600 leading-relaxed">
                This short audit helps you understand what's affecting your sleep — and where small changes could make the biggest difference.
              </p>
              
              <div className="w-full space-y-3 mt-4">
                <button
                  onClick={() => setScreen(1)}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  Start Audit →
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  className="w-full bg-white text-slate-600 py-4 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <History size={20} />
                  Past Audits
                </button>
              </div>
            </motion.div>
          )}

          {screen === 1 && (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6 py-6"
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  Question 1 of 2
                </div>
                <h2 className="text-xl font-bold text-slate-800">How has your sleep been lately?</h2>
                <p className="text-sm text-slate-500">Select all that apply to you</p>
              </div>

              <div className="flex flex-col gap-3">
                {options.map((o, i) => {
                  const active = selected.has(i);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        const next = new Set(selected);
                        active ? next.delete(i) : next.add(i);
                        setSelected(next);
                      }}
                      className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 ${
                        active ? "bg-primary/5 border-primary" : "bg-white border-slate-50"
                      }`}
                    >
                      <span className="text-2xl">{o.emoji}</span>
                      <span className={`flex-1 text-sm font-medium ${active ? "text-primary" : "text-slate-700"}`}>
                        {o.text}
                      </span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                        active ? "bg-primary border-primary" : "border-slate-200"
                      }`}>
                        {active && <Check size={14} className="text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setScreen(2)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 mt-4 transition-all"
              >
                Next →
              </button>
            </motion.div>
          )}

          {screen === 2 && (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-8 py-6"
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  Question 2 of 2
                </div>
                <h2 className="text-xl font-bold text-slate-800">Rate your typical night's sleep</h2>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map(n => {
                  const active = rating === n;
                  return (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className={`flex flex-col items-center py-4 rounded-2xl transition-all border-2 ${
                        active ? "bg-amber-50 border-amber-400" : "bg-white border-slate-50"
                      }`}
                    >
                      <span className={`text-xl font-bold ${active ? "text-amber-600" : "text-slate-400"}`}>{n}</span>
                      <span className={`text-[10px] font-bold uppercase mt-1 ${active ? "text-amber-600" : "text-slate-300"}`}>
                        {ratingLabels[n - 1]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 ml-1">Any specific concerns? (Optional)</label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="e.g. stress, noise, late-night scrolling..."
                  className="w-full p-5 bg-white border-2 border-slate-50 rounded-3xl text-base outline-none focus:border-primary/20 transition-all resize-none shadow-sm"
                  rows={4}
                />
              </div>

              <button
                onClick={() => setScreen(3)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all"
              >
                See Results →
              </button>
            </motion.div>
          )}

          {screen === 3 && (
            <motion.div
              key="screen3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center gap-6 py-6"
            >
              <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl w-full flex flex-col items-center text-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="none"
                      stroke={scoreInfo.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 58}
                      initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                      animate={{ strokeDashoffset: (2 * Math.PI * 58) * (1 - scoreValue / 7) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-bold" style={{ color: scoreInfo.color }}>{scoreValue}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">of 7</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mt-6" style={{ color: scoreInfo.color }}>{scoreInfo.status}</h3>
                <p className="text-sm text-slate-600 mt-4 leading-relaxed italic">
                  {scoreValue >= 6 ? "Your habits are solid! Small tweaks can make it even better." : 
                   scoreValue >= 4 ? "Some disruptions detected. Habit changes can help quickly." : 
                   "Several factors are impacting your sleep. We can work through them together."}
                </p>
              </div>

              <div className="w-full space-y-3 mt-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {isSaving ? "Saving..." : "Save Result"}
                </button>
                <button
                  onClick={() => setScreen(0)}
                  className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-100 transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Modal */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center px-4 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setShowHistory(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="bg-white w-full max-w-md rounded-t-[3rem] p-8 pb-12 shadow-2xl max-h-[75vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-slate-800">Past Audits</h3>
                  <button onClick={() => setShowHistory(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                {isLoadingHistory ? (
                  <div className="py-20 flex justify-center">
                    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : history.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="text-slate-500">No audits found yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((e, i) => {
                      const info = getScoreInfo(e.score);
                      return (
                        <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-slate-100">
                          <div>
                            <p className="text-sm font-bold text-slate-800">{e.date}</p>
                            <p className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: info.color }}>{info.status}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold" style={{ color: info.color }}>{e.score}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">of 7</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default SleepAudit;

