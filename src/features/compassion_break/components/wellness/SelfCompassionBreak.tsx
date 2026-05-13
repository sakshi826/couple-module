import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScreenPauseCheckIn from "./ScreenPauseCheckIn";
import ScreenNameIt from "./ScreenNameIt";
import ScreenBreathe from "./ScreenBreathe";
import ScreenKindResponse from "./ScreenKindResponse";
import ScreenNoticeShift from "./ScreenNoticeShift";
import ScreenSaveClose from "./ScreenSaveClose";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { Heart, Save, Sparkles } from "lucide-react";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const SelfCompassionBreak = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(0);
  const [beforeIntensity, setBeforeIntensity] = useState(5);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [kindSentence, setKindSentence] = useState("");
  const [afterIntensity, setAfterIntensity] = useState(5);
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
      const rows = await sql`SELECT break_data FROM compassion_break_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setHistory(rows.map(r => r.break_data));
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const next = useCallback(() => setScreen((s) => s + 1), []);
  const reset = useCallback(() => {
    setScreen(0);
    setBeforeIntensity(5);
    setEmotions([]);
    setKindSentence("");
    setAfterIntensity(5);
  }, []);

  const handleSave = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error((typeof t !== "undefined" ? t : (k) => k)("auth_error"));
      return;
    }

    setIsSaving(true);
    const breakData = {
      beforeIntensity,
      afterIntensity,
      emotions,
      kindSentence,
      createdAt: new Date().toISOString()
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO compassion_break_entries (user_id, break_data) VALUES (${userId}, ${breakData})`;
      toast.success((typeof t !== "undefined" ? t : (k) => k)("save_success"));
      setHistory(prev => [breakData, ...prev]);
      setScreen(6); // Go to completion screen
    } catch (error) {
      console.error("Failed to save break:", error);
      toast.error((typeof t !== "undefined" ? t : (k) => k)("save_error"));
    } finally {
      setIsSaving(false);
    }
  };

  const titles = (typeof t !== "undefined" ? t : (k) => k)("screen_titles", { returnObjects: true }) as string[];

  if (screen === 6) {
    return (
      <PremiumComplete
        title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
        message={(typeof t !== "undefined" ? t : (k) => k)("complete_message")}
        onRestart={reset}
      />
    );
  }

  const screens = [
    <ScreenPauseCheckIn
      key="s1"
      onContinue={(val) => { setBeforeIntensity(val); next(); }}
      onExit={reset}
    />,
    <ScreenNameIt
      key="s2"
      onContinue={(e) => { setEmotions(e); next(); }}
    />,
    <ScreenBreathe key="s3" onContinue={next} />,
    <ScreenKindResponse
      key="s4"
      onContinue={(s) => { setKindSentence(s); next(); }}
    />,
    <ScreenNoticeShift
      key="s5"
      onContinue={(val) => { setAfterIntensity(val); next(); }}
    />,
    <div key="s6" className="flex-1 flex flex-col gap-6">
      <ScreenSaveClose
        data={{ beforeIntensity, afterIntensity, emotions, kindSentence }}
        onSave={handleSave}
        onFinish={() => setScreen(6)}
      />
    </div>
  ];

  return (
    <PremiumLayout
      title={(typeof t !== "undefined" ? t : (k) => k)("app_title")}
      subtitle={titles[screen]}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 0 ? reset : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
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
            className="flex-1 flex flex-col"
          >
            {screens[screen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default SelfCompassionBreak;
