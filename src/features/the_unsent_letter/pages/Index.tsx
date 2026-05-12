import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import IntroScreen from "@/features/the_unsent_letter/components/unsent-letter/IntroScreen";
import WritingScreen from "@/features/the_unsent_letter/components/unsent-letter/WritingScreen";
import ReflectionScreen from "@/features/the_unsent_letter/components/unsent-letter/ReflectionScreen";
import FloatingHearts from "@/features/the_unsent_letter/components/FloatingHearts";
import HistoryScreen from "@/features/the_unsent_letter/components/unsent-letter/HistoryScreen";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { Mail } from "lucide-react";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

export interface Letter {
  id: string;
  content: string;
  date: Date;
  recipient?: string;
}

const pageVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<"intro" | "writing" | "reflection" | "history">("intro");
  const [letterContent, setLetterContent] = useState("");
  const [savedLetters, setSavedLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLetters = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;

    try {
      setIsLoading(true);
      const sql = neon(DATABASE_URL);
      const results = await sql`SELECT id, content, recipient, created_at FROM unsent_letters WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setSavedLetters(results.map(r => ({
        id: r.id,
        content: r.content,
        recipient: r.recipient,
        date: new Date(r.created_at)
      })));
    } catch (error) {
      console.error("Failed to fetch letters:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  const saveLetter = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error(t("toasts.auth_error"));
      return;
    }

    if (letterContent.trim()) {
      try {
        const sql = neon(DATABASE_URL);
        await sql`INSERT INTO unsent_letters (user_id, content) VALUES (${userId}, ${letterContent})`;
        toast.success(t("toasts.save_success"));
        fetchLetters();
        setLetterContent("");
      } catch (error) {
        console.error("Failed to save letter:", error);
        toast.error(t("toasts.save_error"));
      }
    }
    setScreen("history");
  }, [letterContent, fetchLetters, t]);

  const currentStep =
    screen === "intro" ? 1 : screen === "writing" ? 2 : screen === "reflection" ? 3 : 1;

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={t("app_title")}
      icon={<Mail className="w-6 h-6 text-primary" />}
    >
      <div className="w-full max-w-md mx-auto min-h-[60vh] flex flex-col relative z-10">
        <FloatingHearts />
        <AnimatePresence mode="wait">
          {screen === "history" ? (
            <motion.div
              key="history"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 flex flex-col"
            >
              <HistoryScreen
                letters={savedLetters}
                onBack={() => setScreen("intro")}
              />
            </motion.div>
          ) : (
            <motion.div
              key={screen}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 flex flex-col"
            >
              {screen === "intro" && (
                <IntroScreen
                  step={currentStep}
                  onStart={() => setScreen("writing")}
                  onHistory={() => setScreen("history")}
                />
              )}
              {screen === "writing" && (
                <WritingScreen
                  step={currentStep}
                  content={letterContent}
                  onContentChange={setLetterContent}
                  onBack={() => setScreen("intro")}
                  onContinue={() => setScreen("reflection")}
                />
              )}
              {screen === "reflection" && (
                <ReflectionScreen
                  step={currentStep}
                  onSave={saveLetter}
                  onFinish={() => {
                    setLetterContent("");
                    setScreen("intro");
                  }}
                  onBack={() => setScreen("writing")}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
