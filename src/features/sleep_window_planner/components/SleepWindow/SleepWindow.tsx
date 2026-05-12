import { useState } from 'react';
import { Save, Moon, ChevronRight } from 'lucide-react';
import { useTranslation } from "react-i18next";
import StarBackground from './StarBackground';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import { calcBedtime, formatTime } from './Screen2';
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

interface SleepWindowProps {
  onExit?: () => void;
}

const SleepWindow = ({ onExit }: SleepWindowProps) => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(1);
  const [wakeHour, setWakeHour] = useState(7);
  const [wakeMinute, setWakeMinute] = useState(0);
  const [wakeAmPm, setWakeAmPm] = useState<'AM' | 'PM'>('AM');
  const [sleepDuration, setSleepDuration] = useState(7.5);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = (to: number) => setScreen(to);

  const handleSave = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error(t("toasts.auth_error"));
      return;
    }

    setIsSaving(true);
    const bed = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
    const plannerData = {
      wake_time: formatTime(wakeHour, wakeMinute, wakeAmPm),
      bedtime: formatTime(bed.hour, bed.minute, bed.amPm),
      duration: sleepDuration,
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO sleep_window_planner_entries (user_id, planner_data) VALUES (${userId}, ${plannerData})`;
      toast.success(t("toasts.save_success"));
      navigate(4);
    } catch (error) {
      console.error("Failed to save sleep window:", error);
      toast.error(t("toasts.save_error"));
    } finally {
      setIsSaving(false);
    }
  };

  if (screen === 4) {
    return (
      <PremiumComplete
        title={t("complete.title")}
        message={t("complete.message")}
        onRestart={() => setScreen(1)}
      />
    );
  }

  const bed = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
  const bedStr = formatTime(bed.hour, bed.minute, bed.amPm);
  const wakeStr = formatTime(wakeHour, wakeMinute, wakeAmPm);

  const pillLabels = t("pill_labels", { returnObjects: true }) as string[];

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={pillLabels[screen - 1]}
      icon={<Moon className="w-6 h-6 text-primary" />}
      onBack={screen > 1 && screen < 4 ? () => navigate(screen - 1) : undefined}
    >
      <div className="relative w-full max-w-md mx-auto min-h-[70vh] flex flex-col px-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <StarBackground />
        
        <div className="flex justify-center gap-2 mb-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              {screen === 1 && (
                <div className="flex-1 flex flex-col gap-8 py-8">
                  <Screen1 onNext={() => navigate(2)} />
                  <button
                    onClick={() => navigate(2)}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                  >
                    {t("screen1.button")}
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </div>
              )}
              {screen === 2 && (
                <div className="flex-1 flex flex-col gap-8 py-8">
                  <Screen2
                    wakeHour={wakeHour} wakeMinute={wakeMinute} wakeAmPm={wakeAmPm}
                    sleepDuration={sleepDuration}
                    onWakeHourChange={setWakeHour} onWakeMinuteChange={setWakeMinute}
                    onWakeAmPmChange={setWakeAmPm} onSleepDurationChange={setSleepDuration}
                    onNext={() => navigate(3)}
                  />
                  <button
                    onClick={() => navigate(3)}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                  >
                    {t("screen2.button")}
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </div>
              )}
              {screen === 3 && (
                <div className="flex-1 flex flex-col py-8">
                  <Screen3 bedtime={bedStr} wakeTime={wakeStr} duration={sleepDuration} onReset={() => navigate(1)} />
                  <div className="mt-10 space-y-4">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                    >
                      <Save size={20} strokeWidth={3} />
                      {isSaving ? t("toasts.saving") : t("screen3.button")}
                    </button>
                    <button
                      onClick={() => navigate(2)}
                      className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                      {t("screen3.adjust_times", { defaultValue: "Adjust Times" })}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default SleepWindow;
