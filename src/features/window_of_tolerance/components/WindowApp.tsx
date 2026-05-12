import { useState, useCallback, useEffect } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import ExplainScreen from "./screens/ExplainScreen";
import CheckInScreen from "./screens/CheckInScreen";
import ZoneScreen from "./screens/ZoneScreen";
import ToolkitScreen from "./screens/ToolkitScreen";
import HistoryModal from "./HistoryModal";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { Activity, History, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export type ZoneType = "hyper" | "safe" | "hypo" | null;

export interface CheckInEntry {
  zone: ZoneType;
  timestamp: Date;
}

export default function WindowApp() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(0);
  const [selectedZone, setSelectedZone] = useState<ZoneType>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [journal, setJournal] = useState("");
  const [history, setHistory] = useState<CheckInEntry[]>([]);
  const [weekTracker, setWeekTracker] = useState<(ZoneType)[]>([null, null, null, null, null, null, null]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;
    try {
      const sql = neon(DATABASE_URL);
      const rows = await sql`SELECT check_in_data FROM window_of_tolerance_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      const fetchedHistory = rows.map(r => ({
        ...r.check_in_data,
        timestamp: new Date(r.check_in_data.timestamp)
      } as CheckInEntry));
      setHistory(fetchedHistory);
      
      // Update week tracker based on recent history
      const newWeek = [null, null, null, null, null, null, null] as (ZoneType)[];
      fetchedHistory.forEach(entry => {
        const day = new Date(entry.timestamp).getDay();
        const adjustedDay = day === 0 ? 6 : day - 1;
        if (newWeek[adjustedDay] === null) newWeek[adjustedDay] = entry.zone;
      });
      setWeekTracker(newWeek);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const navigate = useCallback((s: number) => {
    setScreen(s);
  }, []);

  const handleCheckIn = useCallback((zone: ZoneType) => {
    setSelectedZone(zone);
  }, []);

  const goToZoneScreen = useCallback(async () => {
    if (!selectedZone) return;
    setScreen(3);
  }, [selectedZone]);

  const handleSave = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error(t("toasts.auth_error"));
      return;
    }

    setIsSaving(true);
    const entry: CheckInEntry = { zone: selectedZone, timestamp: new Date() };
    const checkInData = { ...entry, journal };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO window_of_tolerance_entries (user_id, check_in_data) VALUES (${userId}, ${checkInData})`;
      toast.success(t("toasts.save_success"));
      setHistory(prev => [entry, ...prev]);
      setJournal("");
      setSelectedZone(null);
      setScreen(5); // Go to complete
    } catch (error) {
      console.error("Failed to save check-in:", error);
      toast.error(t("toasts.save_error"));
    } finally {
      setIsSaving(false);
    }
  }, [selectedZone, journal, t]);

  if (screen === 5) {
    return (
      <PremiumComplete
        title={t("app_title")}
        message={t("complete.message")}
        onRestart={() => setScreen(0)}
      />
    );
  }

  const titles = t("nav", { returnObjects: true }) as string[];

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={titles[screen]}
      icon={<Activity className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      exitOnBack={screen === 0}
      actions={screen === 0 ? (
        <button onClick={() => setShowHistory(true)} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
          <History size={20} />
        </button>
      ) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2, 3, 4].map((i) => (
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
            {screen === 0 && (
              <WelcomeScreen
                onBegin={() => navigate(1)}
                onHistory={() => setShowHistory(true)}
                onBack={() => {}} // Rely on PremiumLayout header back
              />
            )}
            {screen === 1 && (
              <ExplainScreen onBack={() => navigate(0)} onNext={() => navigate(2)} />
            )}
            {screen === 2 && (
              <CheckInScreen
                selected={selectedZone}
                onSelect={handleCheckIn}
                onBack={() => navigate(1)}
                onNext={goToZoneScreen}
              />
            )}
            {screen === 3 && (
              <ZoneScreen
                zone={selectedZone!}
                onContinue={() => navigate(4)}
                onBack={() => navigate(2)}
              />
            )}
            {screen === 4 && (
              <div className="flex-1 flex flex-col gap-8">
                <ToolkitScreen
                  journal={journal}
                  onJournalChange={setJournal}
                  weekTracker={weekTracker}
                  onSave={handleSave}
                  onBack={() => navigate(3)}
                />
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  <Save size={20} strokeWidth={3} />
                  {isSaving ? t("screens.toolkit.preserving") : t("screens.toolkit.preserve_button")}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {showHistory && (
        <HistoryModal entries={history} onClose={() => setShowHistory(false)} />
      )}
    </PremiumLayout>
  );
}
