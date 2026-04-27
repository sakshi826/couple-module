import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypingText from "./TypingText";
import ChipSelect from "./ChipSelect";
import { Utensils, ChevronRight, Save, History } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const EMOTIONS = ["😰 Stress", "😢 Sadness", "😶 Boredom", "😟 Anxiety", "🥺 Loneliness", "💭 Something else…"];
const FOOD_RESPONSES = ["🍽️ I eat more", "🚫 I eat less", "🍫 I crave specific foods", "😣 I avoid food", "😐 No real change"];
const BODY_SENSATIONS = ["💔 Tight chest", "🪨 Heavy feeling", "🦵 Restless / fidgety", "🔋 Low energy", "🌀 Knots in stomach", "❓ Something else…"];
const SUPPORT_OPTIONS = ["🗣️ Talk to someone", "☕ Take a break", "📝 Journal", "🌬️ Breathe", "🎧 Distract myself"];

const SUPPORT_RESPONSES: Record<string, { title: string; body: string }> = {
  "🗣️ Talk to someone": {
    title: "Reach out 💛",
    body: "Sometimes sharing lightens things a bit 💛\nMaybe a simple 'hey, can we talk?'",
  },
  "☕ Take a break": {
    title: "Pause 💛",
    body: "A small pause can help reset things…\nMaybe step away and take a few slow breaths",
  },
  "📝 Journal": {
    title: "Write it out 💛",
    body: "You could start with 'right now I feel…'\nand just let it flow",
  },
  "🌬️ Breathe": {
    title: "Breathe 💛",
    body: "Inhale 4… hold 2… exhale 6…\nlet's slow it down together",
  },
  "🎧 Distract myself": {
    title: "Gentle shift 💛",
    body: "A gentle distraction can shift the moment…\nmaybe something light or easy",
  },
};

const EmotionFlow = () => {
  const [step, setStep] = useState(0);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [foodResponse, setFoodResponse] = useState<string | null>(null);
  const [thought, setThought] = useState("");
  const [bodySensation, setBodySensation] = useState<string | null>(null);
  const [supportChoice, setSupportChoice] = useState<string | null>(null);
  const [closingFeeling, setClosingFeeling] = useState<string | null>(null);
  const [textReady, setTextReady] = useState(false);
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
      const rows = await sql`SELECT map_data FROM food_emotion_map_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setHistory(rows.map(r => r.map_data));
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const next = () => {
    setTextReady(false);
    setStep(s => s + 1);
  };

  const saveMap = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error("Auth session missing or DB not configured");
      return;
    }

    setIsSaving(true);
    const mapData = {
      emotion,
      foodResponse,
      thought,
      bodySensation,
      supportChoice,
      closingFeeling,
      createdAt: new Date().toISOString(),
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO food_emotion_map_entries (user_id, map_data) VALUES (${userId}, ${mapData})`;
      toast.success("Pattern preserved");
      setHistory(prev => [mapData, ...prev]);
      setStep(0);
      setEmotion(null);
      setFoodResponse(null);
      setThought("");
      setBodySensation(null);
      setSupportChoice(null);
      setClosingFeeling(null);
    } catch (error) {
      console.error("Failed to save map:", error);
      toast.error("Failed to preserve pattern");
    } finally {
      setIsSaving(false);
    }
  };

  const titles = ["Welcome", "Food Patterns", "Internal Dialogue", "Physical Sensing", "The Map", "Gentle Support", "Final Look", "Reflecting"];

  return (
    <PremiumLayout
      title="Food & Emotion Map"
      subtitle={titles[step]}
      icon={<Utensils className="w-6 h-6 text-primary" />}
      onBack={step > 0 ? () => setStep(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col gap-6"
          >
            {step === 0 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <TypingText
                  text="Hey… I'm really glad you're here 💛 Let's gently map out what's been going on."
                  className="text-2xl font-black text-slate-800 leading-tight"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">What's coming up lately?</p>
                    <ChipSelect options={EMOTIONS} selected={emotion} onSelect={setEmotion} />
                    {emotion && (
                      <button
                        onClick={next}
                        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        Begin Mapping
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <TypingText
                  text={`Hmm… I hear you. When you feel ${emotion?.toLowerCase()}… how does food usually show up?`}
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <ChipSelect options={FOOD_RESPONSES} selected={foodResponse} onSelect={setFoodResponse} />
                    {foodResponse && (
                      <button
                        onClick={next}
                        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        Continue
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <TypingText
                  text="In those moments… what kind of thoughts pop up?"
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <textarea
                      value={thought}
                      onChange={(e) => setThought(e.target.value)}
                      placeholder="Write whatever comes to mind…"
                      className="w-full bg-slate-50 border-none rounded-[2rem] p-6 text-sm min-h-[150px] focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                    />
                    {thought.trim() && (
                      <button
                        onClick={next}
                        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        Continue
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <TypingText
                  text="If you pause for a second… what do you notice in your body?"
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <ChipSelect options={BODY_SENSATIONS} selected={bodySensation} onSelect={setBodySensation} />
                    {bodySensation && (
                      <button
                        onClick={next}
                        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        Continue
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col gap-6 py-6">
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 space-y-6">
                  <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                    The Pattern
                  </span>
                  <div className="space-y-4">
                    <p className="text-slate-700 text-sm leading-relaxed">
                      When you feel <span className="font-bold text-slate-900">{emotion?.toLowerCase()}</span>, your body feels <span className="font-bold text-slate-900">{bodySensation?.toLowerCase()}</span>…
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      …and food becomes a way to <span className="font-bold text-slate-900">{foodResponse?.toLowerCase()}</span>, while thoughts like <span className="italic">"{thought}"</span> show up.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-50 italic text-slate-400 text-xs">
                    "This is not something to judge — it's a pattern to understand."
                  </div>
                </div>
                <button
                  onClick={next}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  Continue
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <TypingText
                  text="In moments like this… what might help you—even a little?"
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <ChipSelect options={SUPPORT_OPTIONS} selected={supportChoice} onSelect={setSupportChoice} />
                    {supportChoice && (
                      <div className="bg-amber-50 rounded-2xl p-6 text-left border border-amber-100 animate-fade-in">
                        <p className="font-bold text-amber-900 text-sm mb-2">{SUPPORT_RESPONSES[supportChoice].title}</p>
                        <p className="text-amber-800 text-xs leading-relaxed">{SUPPORT_RESPONSES[supportChoice].body}</p>
                      </div>
                    )}
                    {supportChoice && (
                      <button
                        onClick={next}
                        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        Continue
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 6 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center">
                <TypingText
                  text="You're understanding yourself a little better. That's more than enough 💛"
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">How are you feeling now?</p>
                    <textarea
                      value={closingFeeling || ""}
                      onChange={(e) => setClosingFeeling(e.target.value)}
                      placeholder="Write whatever comes to mind…"
                      className="w-full bg-slate-50 border-none rounded-[2rem] p-6 text-sm min-h-[150px] focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                    />
                    <button
                      onClick={saveMap}
                      disabled={isSaving || !closingFeeling?.trim()}
                      className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                      <Save size={20} />
                      {isSaving ? "Preserving..." : "Preserve Map"}
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

// Progressive insight reveal component
const InsightMessage = ({
  messages,
  onComplete,
}: {
  messages: string[];
  onComplete: () => void;
}) => {
  const [visibleCount, setVisibleCount] = useState(0);

  const handleMessageDone = () => {
    if (visibleCount < messages.length - 1) {
      setTimeout(() => setVisibleCount(v => v + 1), 400);
    } else {
      onComplete();
    }
  };

  // Show first message on mount
  useState(() => {
    setVisibleCount(0);
  });

  return (
    <div className="space-y-4">
      {messages.slice(0, visibleCount + 1).map((msg, i) => (
        <TypingText
          key={i}
          text={msg}
          speed={25}
          className={`text-lg font-display leading-relaxed ${
            i === messages.length - 1 ? "font-semibold" : ""
          }`}
          onComplete={i === visibleCount ? handleMessageDone : undefined}
        />
      ))}
    </div>
  );
};

export default EmotionFlow;
