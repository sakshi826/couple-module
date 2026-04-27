import { useState, useCallback, useEffect } from "react";
import ScreenEntry from "@/features/write_your_narrative/components/narrative/ScreenEntry";
import ScreenWriting from "@/features/write_your_narrative/components/narrative/ScreenWriting";
import ScreenLanding from "@/features/write_your_narrative/components/narrative/ScreenLanding";
import ScreenPastEntries from "@/features/write_your_narrative/components/narrative/ScreenPastEntries";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { BookOpen, History, Save } from "lucide-react";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

type Screen = "entry" | "writing" | "landing" | "history";

interface SavedEntry {
  writing: string;
  reflection: string;
  date: string;
}

const WritingNarrative = () => {
  const [screen, setScreen] = useState<Screen>("entry");
  const [writing, setWriting] = useState("");
  const [reflection, setReflection] = useState("");
  const [entries, setEntries] = useState<SavedEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;
    try {
      const sql = neon(DATABASE_URL);
      const rows = await sql`SELECT narrative_data FROM write_your_narrative_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setEntries(rows.map(r => r.narrative_data as SavedEntry));
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    }
  };

  const goTo = useCallback((next: Screen) => {
    setScreen(next);
  }, []);

  const saveEntry = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error("Auth session missing or DB not configured");
      return;
    }

    setIsSaving(true);
    const entry: SavedEntry = {
      writing,
      reflection,
      date: new Date().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      }),
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO write_your_narrative_entries (user_id, narrative_data) VALUES (${userId}, ${entry})`;
      toast.success("Narrative preserved");
      setEntries(prev => [entry, ...prev]);
      setWriting("");
      setReflection("");
      goTo("history");
    } catch (error) {
      console.error("Failed to save narrative:", error);
      toast.error("Failed to preserve narrative");
    } finally {
      setIsSaving(false);
    }
  }, [writing, reflection, goTo]);

  const titles: Record<Screen, string> = {
    entry: "Welcome",
    writing: "Expressing",
    landing: "Reflecting",
    history: "Your Journey"
  };

  return (
    <PremiumLayout
      title="Your Narrative"
      subtitle={titles[screen]}
      icon={<BookOpen className="w-6 h-6 text-primary" />}
      onBack={screen !== "entry" ? () => setScreen("entry") : undefined}
      actions={screen === "entry" ? (
        <button onClick={() => setScreen("history")} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
          <History size={20} />
        </button>
      ) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col"
          >
            {screen === "entry" && (
              <ScreenEntry
                onContinue={() => goTo("writing")}
                onBack={() => window.history.back()}
                onHistory={() => goTo("history")}
              />
            )}
            {screen === "writing" && (
              <ScreenWriting
                writing={writing}
                setWriting={setWriting}
                onContinue={() => goTo("landing")}
              />
            )}
            {screen === "landing" && (
              <div className="flex-1 flex flex-col gap-6">
                <ScreenLanding
                  reflection={reflection}
                  setReflection={setReflection}
                  onSave={saveEntry}
                  onFinish={() => goTo("entry")}
                />
                <button
                  onClick={saveEntry}
                  disabled={isSaving}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  <Save size={20} />
                  {isSaving ? "Preserving..." : "Preserve Narrative"}
                </button>
              </div>
            )}
            {screen === "history" && (
              <ScreenPastEntries
                entries={entries}
                onBack={() => goTo("entry")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default WritingNarrative;
