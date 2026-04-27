import { useState } from "react";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";

const screen1Hearts = ["#F4C0D1", "#D4537E", "#ED93B1", "#F4C0D1", "#D4537E"];
const screen2Hearts = ["#CEC9F6", "#AFA9EC", "#CEC9F6", "#AFA9EC", "#CEC9F6"];

const PsychoeducationActivity = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  return (
    <PremiumLayout
      title="Missing Someone"
      subtitle="Understanding your emotions"
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={currentScreen > 0 ? () => setCurrentScreen(0) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4">
        <AnimatePresence mode="wait">
          {currentScreen === 0 ? (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[450px]">
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-pink-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 rounded-full bg-amber-100/30 blur-3xl" />
                <FloatingHearts colors={screen1Hearts} />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-widest">
                    Psychoeducation
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold text-sm">It doesn't mean you're weak.</p>
                    <h1 className="text-2xl font-black text-slate-800 leading-tight">
                      Missing someone who hurt you is one of the most human things you can feel.
                    </h1>
                    <p className="text-slate-600 leading-relaxed text-base">
                      You left. Or they left. And yet — you still reach for your phone hoping it's them. You still replay the good moments more than the painful ones. This contradiction isn't a flaw in you. It's rooted in how your brain processes love and loss.
                    </p>
                  </div>

                  <div className="bg-pink-50/50 border-l-4 border-pink-400 rounded-2xl p-6 italic text-pink-900 text-sm leading-relaxed shadow-sm">
                    "You don't just miss the person. You miss the feeling of being bonded to them."
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen(1)}
                className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                Next Step
                <ChevronRight size={20} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50 min-h-[450px]">
                <div className="absolute top-[-20px] left-[-20px] w-32 h-32 rounded-full bg-indigo-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 rounded-full bg-pink-100/30 blur-3xl" />
                <FloatingHearts colors={screen2Hearts} />

                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                    Psychoeducation
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold text-sm">Here's what's happening inside you.</p>
                    <h1 className="text-2xl font-black text-slate-800 leading-tight">
                      Love creates a chemical bond — and losing it feels like withdrawal.
                    </h1>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      When you love someone, your brain releases dopamine, oxytocin, and serotonin. When the relationship ends, those chemicals drop. Your brain grieves — not just the person, but the feeling of being close to them.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      We also tend to remember love more than pain, unconsciously amplifying the warmth and softening the hurt.
                    </p>
                  </div>

                  <div className="bg-indigo-50/50 border-l-4 border-indigo-400 rounded-2xl p-6 italic text-indigo-900 text-sm leading-relaxed shadow-sm">
                    "Missing them doesn't mean you should go back. Your heart is grieving a bond — not necessarily the person as they truly were."
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen(0)}
                className="w-full bg-indigo-500 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-200/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <ChevronLeft size={20} />
                Previous Step
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-8">
          <div className={`h-2 rounded-full transition-all duration-300 ${currentScreen === 0 ? "w-8 bg-pink-400" : "w-2 bg-slate-200"}`} />
          <div className={`h-2 rounded-full transition-all duration-300 ${currentScreen === 1 ? "w-8 bg-indigo-400" : "w-2 bg-slate-200"}`} />
        </div>
      </div>
    </PremiumLayout>
  );
};

export default PsychoeducationActivity;
