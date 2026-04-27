import { useState, useCallback } from 'react';
import { Clock, Save, Moon } from 'lucide-react';
import StarBackground from './StarBackground';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import { calcBedtime, formatTime } from './Screen2';
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

interface SleepWindowProps {
  onExit?: () => void;
}

const SleepWindow = ({ onExit }: SleepWindowProps) => {
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
      toast.error("Auth session missing or DB not configured");
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
      toast.success("Sleep window saved");
      navigate(1);
    } catch (error) {
      console.error("Failed to save sleep window:", error);
      toast.error("Failed to save sleep window");
    } finally {
      setIsSaving(false);
    }
  };

  const bed = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
  const bedStr = formatTime(bed.hour, bed.minute, bed.amPm);
  const wakeStr = formatTime(wakeHour, wakeMinute, wakeAmPm);

  const pillLabels = ['Build your window', 'Set your times', 'Your sleep window'];

  return (
    <PremiumLayout
      title="Sleep Window"
      subtitle={pillLabels[screen - 1]}
      icon={<Moon className="w-6 h-6 text-primary" />}
      onBack={screen > 1 ? () => navigate(screen - 1) : undefined}
    >
      <div className="relative w-full max-w-md mx-auto min-h-[70vh] flex flex-col px-6">
        <StarBackground />
        
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === screen ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
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
              className="flex-1 flex flex-col"
            >
              {screen === 1 && <Screen1 onNext={() => navigate(2)} />}
              {screen === 2 && (
                <Screen2
                  wakeHour={wakeHour} wakeMinute={wakeMinute} wakeAmPm={wakeAmPm}
                  sleepDuration={sleepDuration}
                  onWakeHourChange={setWakeHour} onWakeMinuteChange={setWakeMinute}
                  onWakeAmPmChange={setWakeAmPm} onSleepDurationChange={setSleepDuration}
                  onNext={() => navigate(3)}
                />
              )}
              {screen === 3 && (
                <div className="flex-1 flex flex-col">
                  <Screen3 bedtime={bedStr} wakeTime={wakeStr} duration={sleepDuration} onReset={() => navigate(1)} />
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 mt-6 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                    <Save size={20} />
                    {isSaving ? "Saving..." : "Save Planner"}
                  </button>
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


export default SleepWindow;
