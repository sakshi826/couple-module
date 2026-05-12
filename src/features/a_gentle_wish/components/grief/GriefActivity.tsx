import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeScreen } from "./WelcomeScreen";
import { ConnectionScreen } from "./ConnectionScreen";
import { CarryForwardScreen } from "./CarryForwardScreen";
import { ReflectionScreen } from "./ReflectionScreen";
import { PastEntries } from "./PastEntries";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { Sparkles, History, Save } from "lucide-react";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export interface ReflectionEntry {
  id: string;
  name: string;
  relation?: string;
  wish: string;
  why?: string;
  smallStep?: string;
  date: string;
}

const GriefActivity = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<"welcome" | "connection" | "carry" | "reflection" | "complete" | "past">("welcome");
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [wish, setWish] = useState("");
  const [why, setWhy] = useState("");
  const [smallStep, setSmallStep] = useState("");
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;
    try {
      const sql = neon(DATABASE_URL);
      const rows = await sql`SELECT wish_data FROM gentle_wish_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setEntries(rows.map(r => r.wish_data as ReflectionEntry));
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    }
  };

  const saveEntry = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error("Auth session missing or DB not configured");
      return;
    }

    setIsSaving(true);
    const entry: ReflectionEntry = {
      id: Date.now().toString(),
      name,
      relation: relation || undefined,
      wish,
      why: why || undefined,
      smallStep: smallStep || undefined,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO gentle_wish_entries (user_id, wish_data) VALUES (${userId}, ${JSON.stringify(entry)})`;
      toast.success("Wish preserved");
      setEntries(prev => [entry, ...prev]);
      setScreen("complete");
    } catch (error) {
      console.error("Failed to save wish:", error);
      toast.error("Failed to preserve wish");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setName("");
    setRelation("");
    setWish("");
    setWhy("");
    setSmallStep("");
  };

  const addAnother = () => {
    resetForm();
    setScreen("connection");
  };

  if (screen === "complete") {
    return (
      <PremiumComplete
        title={t("app_title")}
        message={t("complete_message")}
        onRestart={() => {
          resetForm();
          setScreen("welcome");
        }}
      />
    );
  }

  const titles: Record<string, string> = {
    welcome: t("nav.welcome"),
    connection: t("nav.honoring"),
    carry: t("nav.carry_forward"),
    reflection: t("nav.reflecting"),
    complete: t("nav.complete"),
    past: t("nav.history")
  };

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={titles[screen]}
      icon={<Sparkles className="w-6 h-6 text-primary" />}
      onBack={screen !== "welcome" ? () => setScreen("welcome") : undefined}
      actions={screen === "welcome" ? (
        <button onClick={() => setScreen("past")} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
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
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {screen === "welcome" && (
              <WelcomeScreen
                onBegin={() => setScreen("connection")}
                onViewPast={() => setScreen("past")}
                hasPastEntries={entries.length > 0}
              />
            )}
            {screen === "connection" && (
              <ConnectionScreen
                name={name}
                setName={setName}
                relation={relation}
                setRelation={setRelation}
                wish={wish}
                setWish={setWish}
                why={why}
                setWhy={setWhy}
                onBack={() => setScreen("welcome")}
                onContinue={() => setScreen("carry")}
              />
            )}
            {screen === "carry" && (
              <div className="flex-1 flex flex-col gap-6">
                <CarryForwardScreen
                  name={name}
                  smallStep={smallStep}
                  setSmallStep={setSmallStep}
                  onBack={() => setScreen("connection")}
                  onSave={saveEntry}
                  onSkip={saveEntry}
                />
              </div>
            )}
            {screen === "reflection" && (
              <ReflectionScreen
                name={name}
                wish={wish}
                smallStep={smallStep}
                onAddAnother={addAnother}
                onFinish={() => setScreen("complete")}
              />
            )}
            {screen === "past" && (
              <PastEntries
                entries={entries}
                onBack={() => setScreen("welcome")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default GriefActivity;
