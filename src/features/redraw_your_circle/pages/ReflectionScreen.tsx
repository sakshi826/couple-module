import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressDots from "@/features/redraw_your_circle/components/ProgressDots";
import BackgroundOrbs from "@/features/redraw_your_circle/components/BackgroundOrbs";
import { Users, Save } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

interface ReflectionScreenProps {
  names: Record<string, string>;
  onReset: () => void;
}

const ReflectionScreen = ({ names, onReset }: ReflectionScreenProps) => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error("Auth session missing or DB not configured");
      return;
    }

    setIsSaving(true);
    const circlesData = { names, reflection };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO redraw_your_circle_entries (user_id, circles) VALUES (${userId}, ${circlesData})`;
      toast.success("Circle saved");
      onReset();
      navigate("../history", { replace: true });
    } catch (error) {
      console.error("Failed to save circle:", error);
      toast.error("Failed to save circle");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFinish = () => {
    onReset();
    navigate("../intro", { replace: true });
  };

  return (
    <PremiumLayout
      title="Redraw Your Circle"
      subtitle="Final reflections"
      icon={<Users className="w-6 h-6 text-primary" />}
      onBack={() => navigate("../circle", { replace: true })}
    >
      <div className="flex-1 flex flex-col items-center px-6 pb-8 text-center relative z-10">
        <BackgroundOrbs />
        <ProgressDots current={3} />

        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-3xl mt-6 mb-2"
        >
          🪞
        </motion.span>

        <h2 className="text-xl font-bold text-slate-800 mt-2 mb-4">
          What Do You Notice?
        </h2>

        <div className="text-sm text-slate-600 leading-relaxed max-w-sm space-y-4 mb-8 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="font-medium">Take a moment to look at your circle. You might notice:</p>
          <ul className="text-left space-y-2.5 pl-2">
            <li className="flex gap-2"><span>🔹</span> Some people feel closer than others</li>
            <li className="flex gap-2"><span>💙</span> Some connections feel strong</li>
            <li className="flex gap-2"><span>🌫️</span> Some feel distant or unclear</li>
            <li className="flex gap-2"><span>🕊️</span> There may be gaps — or just a few meaningful people</li>
          </ul>
          <p className="italic pt-2">
            Awareness is the first step toward building the connections you value. 🧘
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <label className="text-sm font-bold text-slate-500 block text-left ml-2">
            💭 Is there anyone you'd like to feel more connected to?
          </label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={4}
            className="w-full bg-white border-2 border-slate-100 rounded-[2rem] px-6 py-5 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:border-primary/20 transition-all resize-none shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-3 mt-10 w-full max-w-sm">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-5 rounded-[2rem] bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Save size={20} />
            {isSaving ? "Saving..." : "Save Reflection"}
          </button>
          <button
            onClick={handleFinish}
            className="w-full py-5 rounded-[2rem] bg-slate-50 text-slate-600 font-bold text-lg hover:bg-slate-100 transition-all border border-slate-200"
          >
            Skip & Finish
          </button>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default ReflectionScreen;
