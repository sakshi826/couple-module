import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Calendar, ChevronRight, Save, Brain, Activity } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";

interface Entry {
  id: string;
  date: string;
  situation: string;
  prediction: string;
  emotions: string[];
  intensity: number;
  reality: string;
  comparison: string;
  reflection: string;
  reframe: string;
}

const STORAGE_KEY = "prediction-vs-reality-entries";

function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntry(entry: Entry) {
  const entries = loadEntries();
  entries.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function PredictionVsReality() {
  const [screen, setScreen] = useState<number | "intro" | "history" | "complete">("intro");
  const [situation, setSituation] = useState("");
  const [prediction, setPrediction] = useState("");
  const [emotions, setEmotions] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [reality, setReality] = useState("");
  const [comparison, setComparison] = useState("");
  const [reflection, setReflection] = useState("");
  const [reframe, setReframe] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const reset = () => {
    setScreen("intro");
    setSituation("");
    setPrediction("");
    setEmotions([]);
    setIntensity(5);
    setReality("");
    setComparison("");
    setReflection("");
    setReframe("");
  };

  const handleSave = () => {
    const entry: Entry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      situation,
      prediction,
      emotions,
      intensity,
      reality,
      comparison,
      reflection,
      reframe,
    };
    saveEntry(entry);
    setEntries(loadEntries());
    toast.success((typeof t !== "undefined" ? t : (k) => k)("toasts.saved"));
    setScreen("complete");
  };

  const toggleEmotion = (e: string) => {
    setEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  };

  const EMOTIONS = (typeof t !== "undefined" ? t : (k) => k)("emotions", { returnObjects: true }) as string[];
  const COMPARISON_OPTIONS = (typeof t !== "undefined" ? t : (k) => k)("comparison_options", { returnObjects: true }) as string[];

  if (screen === "intro") {
    return (
      <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}>
        <PremiumIntro
          title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
          description={(typeof t !== "undefined" ? t : (k) => k)("app_description")}
          onStart={() => setScreen(1)}
          icon={<Activity size={32} />}
          benefits={(typeof t !== "undefined" ? t : (k) => k)("intro.benefits", { returnObjects: true }) as string[]}
          duration={(typeof t !== "undefined" ? t : (k) => k)("intro.duration")}
        />
        <div className="mt-8 flex justify-center pb-20">
          <button 
            onClick={() => setScreen("history")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <History size={16} />
            {(typeof t !== "undefined" ? t : (k) => k)("intro.view_past")}
          </button>
        </div>
      </PremiumLayout>
    );
  }

  if (screen === "history") {
    return (
      <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")} onBack={() => setScreen("intro")}>
        <div className="space-y-4 max-w-2xl mx-auto">
          {entries.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <p className="text-slate-400 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("history.no_reflections")}</p>
            </div>
          ) : (
            entries.map((entry, i) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                    <Calendar size={12} />
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  <div className="flex gap-1">
                    {entry.emotions.map(em => (
                      <span key={em} className="px-2 py-1 rounded-lg bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">{em}</span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{(typeof t !== "undefined" ? t : (k) => k)("history.prediction_label")}</p>
                    <p className="text-sm text-slate-600 italic">"{entry.prediction}"</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/5 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">{(typeof t !== "undefined" ? t : (k) => k)("history.reality_label")}</p>
                    <p className="text-sm text-slate-900 font-bold">"{entry.reality}"</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    <span className="text-slate-900 font-bold">{(typeof t !== "undefined" ? t : (k) => k)("history.reflection_label")}</span> {entry.reflection}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </PremiumLayout>
    );
  }

  if (screen === "complete") {
    return (
      <PremiumLayout title={(typeof t !== "undefined" ? t : (k) => k)("app_title")} showBack={false}>
        <PremiumComplete
          title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
          message={(typeof t !== "undefined" ? t : (k) => k)("complete.message")}
          onRestart={reset}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")} 
      subtitle={(typeof t !== "undefined" ? t : (k) => k)("step_label", { current: screen })}
      onBack={() => setScreen("intro")}
      onReset={reset}
    >
      <div className="max-w-2xl mx-auto py-8">
        <AnimatePresence mode="wait">
          {screen === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("screens.s1.title")}</h2>
                <p className="text-slate-500 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("screens.s1.desc")}</p>
              </div>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder={(typeof t !== "undefined" ? t : (k) => k)("screens.s1.placeholder")}
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all resize-none"
              />
              <button onClick={() => setScreen(2)} disabled={!situation.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.continue")} <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("screens.s2.title")}</h2>
                <p className="text-slate-500 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("screens.s2.desc")}</p>
              </div>
              <textarea
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                placeholder={(typeof t !== "undefined" ? t : (k) => k)("screens.s2.placeholder")}
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={() => setScreen(3)} disabled={!prediction.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.continue")} <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("screens.s3.title")}</h2>
                <p className="text-slate-500 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("screens.s3.desc")}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {EMOTIONS.map(e => (
                  <button
                    key={e}
                    onClick={() => toggleEmotion(e)}
                    className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                      emotions.includes(e) ? "bg-primary text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  <span>{(typeof t !== "undefined" ? t : (k) => k)("intensity_labels.not_intense")}</span>
                  <span className="text-slate-900 text-lg">{intensity}</span>
                  <span>{(typeof t !== "undefined" ? t : (k) => k)("intensity_labels.very_intense")}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-slate-100 accent-primary cursor-pointer"
                />
              </div>
              <button onClick={() => setScreen(4)} disabled={emotions.length === 0} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.continue")} <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("screens.s4.title")}</h2>
                <p className="text-slate-500 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("screens.s4.desc")}</p>
              </div>
              <textarea
                value={reality}
                onChange={(e) => setReality(e.target.value)}
                placeholder={(typeof t !== "undefined" ? t : (k) => k)("screens.s4.placeholder")}
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={() => setScreen(5)} disabled={!reality.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.continue")} <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8 text-center">
              <h2 className="text-3xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("screens.s5.title")}</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-slate-50 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{(typeof t !== "undefined" ? t : (k) => k)("screens.s5.expectation")}</p>
                  <p className="text-slate-400 italic">"{prediction}"</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-primary/5 border-2 border-primary/20 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{(typeof t !== "undefined" ? t : (k) => k)("screens.s5.reality")}</p>
                  <p className="text-slate-900 font-bold">"{reality}"</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-slate-500 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("screens.s5.question")}</p>
                <div className="space-y-2">
                  {COMPARISON_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setComparison(opt)}
                      className={`w-full text-left p-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                        comparison === opt ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-100 text-slate-600 hover:border-primary/30"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setScreen(6)} disabled={!comparison} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.continue")} <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("screens.s6.title")}</h2>
                <p className="text-slate-500 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("screens.s6.desc")}</p>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder={(typeof t !== "undefined" ? t : (k) => k)("screens.s6.placeholder")}
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={() => setScreen(7)} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.continue")} <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("screens.s7.title")}</h2>
                <p className="text-slate-500 font-medium">{(typeof t !== "undefined" ? t : (k) => k)("screens.s7.desc")}</p>
              </div>
              <textarea
                value={reframe}
                onChange={(e) => setReframe(e.target.value)}
                placeholder={(typeof t !== "undefined" ? t : (k) => k)("screens.s7.placeholder")}
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={() => setScreen(8)} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                {(typeof t !== "undefined" ? t : (k) => k)("buttons.continue")} <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-10 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto">
                <Brain size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900">{(typeof t !== "undefined" ? t : (k) => k)("screens.s8.title")}</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">{(typeof t !== "undefined" ? t : (k) => k)("screens.s8.desc")}</p>
              </div>
              <button onClick={handleSave} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20">
                {(typeof t !== "undefined" ? t : (k) => k)("screens.s8.button")} <Save size={20} />
              </button>
              <button onClick={reset} className="text-slate-400 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors">{(typeof t !== "undefined" ? t : (k) => k)("screens.s8.discard")}</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}
