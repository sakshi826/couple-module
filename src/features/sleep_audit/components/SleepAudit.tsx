import { useState, useEffect, useCallback } from "react";
import { Moon, History, Check, X, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { toast } from "sonner";
import StarsCanvas from "./StarsCanvas";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSleepHistory, saveSleepAudit, initializeSleepTable } from "../lib/db";

type HistoryEntry = { id: string; date: string; score: number; rating: number };

export default function SleepAudit() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const OPTIONS = (typeof t !== "undefined" ? t : (k) => k)("options", { returnObjects: true }) as { emoji: string; text: string }[];
  const RATING_LABELS = (typeof t !== "undefined" ? t : (k) => k)("rating_labels", { returnObjects: true }) as string[];

  const getScoreInfo = (score: number) => {
    if (score >= 6) return { color: "#1D9E75", status: (typeof t !== "undefined" ? t : (k) => k)("status_labels.track") };
    if (score >= 4) return { color: "#EF9F27", status: (typeof t !== "undefined" ? t : (k) => k)("status_labels.disruptions") };
    return { color: "#E24B4A", status: (typeof t !== "undefined" ? t : (k) => k)("status_labels.attention") };
  };

  const fetchHistory = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) return;

    setIsLoadingHistory(true);
    try {
      const results = await fetchSleepHistory(userId);
      setHistory(results.map((r: any) => ({
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
    const init = async () => {
      await initializeSleepTable();
      fetchHistory();
    };
    init();
  }, [fetchHistory]);

  const handleSave = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      toast.error((typeof t !== "undefined" ? t : (k) => k)("toasts.auth_error"));
      return;
    }

    setIsSaving(true);
    const score = Math.max(0, Math.min(7, 7 - selected.size));
    const auditData = { score, rating, note, selectedIndices: Array.from(selected) };

    try {
      await saveSleepAudit(userId, auditData);
      toast.success((typeof t !== "undefined" ? t : (k) => k)("toasts.save_success"));
      fetchHistory();
      setScreen(4); // Go to PremiumComplete
    } catch (error) {
      console.error("Failed to save audit:", error);
      toast.error((typeof t !== "undefined" ? t : (k) => k)("toasts.save_error"));
    } finally {
      setIsSaving(false);
    }
  };

  const scoreValue = 7 - selected.size;
  const scoreInfo = getScoreInfo(scoreValue);

  if (screen === 4) {
    return (
      <PremiumComplete
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        message={(typeof t !== "undefined" ? t : (k) => k)("complete.message", { score: scoreValue })}
        onRestart={() => {
          setScreen(0);
          setSelected(new Set());
          setRating(5);
          setNote("");
        }}
      >
        <div className="w-full max-w-md mx-auto mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = "https://web.mantracare.com/app/sleep"}
            className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center gap-3"
          >
            <Moon size={20} />
            {(typeof t !== "undefined" ? t : (k) => k)("intro.more_insights", "More Sleep Insights")}
          </motion.button>
        </div>
      </PremiumComplete>
    );
  }

  return (
    <PremiumLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      subtitle={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      icon={<Moon className="w-6 h-6 text-primary" />}
      onBack={screen === 0 ? undefined : () => setScreen(prev => prev - 1)}
    >
      <div className="relative w-full max-w-md mx-auto min-h-[70vh] flex flex-col px-6 pb-12" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
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
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex items-center justify-center text-6xl shadow-2xl">
                🌙
              </div>
              <h1 className="text-3xl font-black text-white">{(typeof t !== "undefined" ? t : (k) => k)("intro.title")}</h1>
              <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-[280px]">
                {(typeof t !== "undefined" ? t : (k) => k)("intro.description")}
              </p>
              
              <div className="w-full space-y-4 mt-8">
                <button
                  onClick={() => setScreen(1)}
                  className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all"
                >
                  {(typeof t !== "undefined" ? t : (k) => k)("intro.start_button")}
                </button>
                <button
                  onClick={() => window.location.href = "https://web.mantracare.com/app/sleep"}
                  className="w-full bg-white/10 backdrop-blur-md text-white py-5 rounded-2xl font-black text-lg border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <Moon size={20} strokeWidth={2.5} />
                  {(typeof t !== "undefined" ? t : (k) => k)("intro.more_insights", "More Sleep Insights")}
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  className="w-full bg-white/10 backdrop-blur-md text-white py-5 rounded-2xl font-black text-lg border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <History size={20} strokeWidth={2.5} />
                  {(typeof t !== "undefined" ? t : (k) => k)("intro.history_button")}
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
              <div className="space-y-3">
                <div className="inline-flex px-4 py-1.5 rounded-full bg-primary/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  {(typeof t !== "undefined" ? t : (k) => k)("screens.s1.phase")}
                </div>
                <h2 className="text-2xl font-black text-white">{(typeof t !== "undefined" ? t : (k) => k)("screens.s1.title")}</h2>
                <p className="text-slate-400 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("screens.s1.desc")}</p>
              </div>

              <div className="flex flex-col gap-3">
                {OPTIONS.map((o, i) => {
                  const active = selected.has(i);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        const next = new Set(selected);
                        active ? next.delete(i) : next.add(i);
                        setSelected(next);
                      }}
                      className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all border ${
                        active ? "bg-white text-slate-900 border-white" : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="text-2xl">{o.emoji}</span>
                      <span className="flex-1 text-sm font-bold leading-tight">
                        {o.text}
                      </span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                        active ? "bg-slate-900 border-slate-900" : "border-white/20"
                      }`}>
                        {active && <Check size={14} className="text-white" strokeWidth={4} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setScreen(2)}
                className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-lg shadow-2xl mt-4 hover:bg-slate-50 transition-all"
              >
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.continue")}
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
              <div className="space-y-3">
                <div className="inline-flex px-4 py-1.5 rounded-full bg-primary/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  {(typeof t !== "undefined" ? t : (k) => k)("screens.s2.phase")}
                </div>
                <h2 className="text-2xl font-black text-white">{(typeof t !== "undefined" ? t : (k) => k)("screens.s2.title")}</h2>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map(n => {
                  const active = rating === n;
                  return (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className={`flex flex-col items-center py-5 rounded-2xl transition-all border-2 ${
                        active ? "bg-white border-white scale-105" : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <span className={`text-2xl font-black ${active ? "text-slate-900" : "text-white/40"}`}>{n}</span>
                      <span className={`text-[8px] font-black uppercase mt-1 tracking-tighter ${active ? "text-slate-600" : "text-white/20"}`}>
                        {RATING_LABELS[n - 1]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{(typeof t !== "undefined" ? t : (k) => k)("screens.s2.label")}</label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder={(typeof t !== "undefined" ? t : (k) => k)("screens.s2.placeholder")}
                  className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-white font-medium outline-none focus:border-white/30 transition-all resize-none shadow-sm placeholder:text-white/20"
                  rows={4}
                />
              </div>

              <button
                onClick={() => setScreen(3)}
                className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all"
              >
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.see_results")}
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
              <div className="p-10 rounded-[3.5rem] bg-white border border-slate-100 shadow-2xl w-full flex flex-col items-center text-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="10"
                    />
                    <motion.circle
                      cx="72"
                      cy="72"
                      r="64"
                      fill="none"
                      stroke={scoreInfo.color}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 64}
                      initial={{ strokeDashoffset: 2 * Math.PI * 64 }}
                      animate={{ strokeDashoffset: (2 * Math.PI * 64) * (1 - scoreValue / 7) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-black" style={{ color: scoreInfo.color }}>{scoreValue}</span>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{(typeof t !== "undefined" ? t : (k) => k)("screens.s3.score_label")}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black mt-8" style={{ color: scoreInfo.color }}>{scoreInfo.status}</h3>
                <p className="text-base text-slate-500 mt-4 leading-relaxed font-medium italic">
                  {scoreValue >= 6 ? (typeof t !== "undefined" ? t : (k) => k)("screens.s3.recommendations.solid") : 
                   scoreValue >= 4 ? (typeof t !== "undefined" ? t : (k) => k)("screens.s3.recommendations.some") : 
                   (typeof t !== "undefined" ? t : (k) => k)("screens.s3.recommendations.many")}
                </p>
              </div>

              <div className="w-full space-y-4 mt-8">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  <Save size={20} strokeWidth={3} />
                  {isSaving ? (typeof t !== "undefined" ? t : (k) => k)("buttons.preserving") : (typeof t !== "undefined" ? t : (k) => k)("buttons.preserve")}
                </button>
                <button
                  onClick={() => setScreen(0)}
                  className="w-full py-5 rounded-2xl font-bold text-white/60 hover:text-white transition-all"
                >
                  {(typeof t !== "undefined" ? t : (k) => k)("buttons.back_to_intro")}
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
              className="fixed inset-0 z-[60] flex items-end justify-center px-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowHistory(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="bg-white w-full max-w-md rounded-t-[3rem] p-10 pb-16 shadow-2xl max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("history.title")}</h3>
                  <button onClick={() => setShowHistory(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <X size={20} className="text-slate-400" strokeWidth={3} />
                  </button>
                </div>

                {isLoadingHistory ? (
                  <div className="py-20 flex justify-center">
                    <div className="w-10 h-10 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin" />
                  </div>
                ) : history.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                      <History size={32} />
                    </div>
                    <p className="text-slate-400 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("history.no_entries")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((e, i) => {
                      const info = getScoreInfo(e.score);
                      return (
                        <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                          <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{e.date}</p>
                            <p className="text-sm font-bold mt-1" style={{ color: info.color }}>{info.status}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-3xl font-black" style={{ color: info.color }}>{e.score}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{(typeof t !== "undefined" ? t : (k) => k)("history.score_label")}</span>
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
}
