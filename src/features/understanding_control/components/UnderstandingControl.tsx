import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronRight, History, Zap, Heart } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";

const screens = [
  {
    headline: "Why Control Can Feel So Powerful",
    paragraphs: [
      "For many people experiencing eating difficulties, control can feel like a way to create safety.",
      "When life feels unpredictable or emotionally intense, focusing on food, weight, or routines can bring a sense of structure and certainty.",
      "This isn't about willpower or discipline. It's about trying to steady yourself when things feel uncertain.",
      "In this way, control becomes a coping strategy — something that helps you feel grounded, even if only temporarily.",
    ],
    microcopy: "You're not alone in feeling this way.",
    cta: "Continue",
  },
  {
    headline: "Different Ways Control Appears",
    intro: "The need for control doesn't look the same for everyone, but it often shows up in patterns like:",
    bullets: [
      { icon: <Shield className="text-rose-500" size={16} />, text: "Strict or inflexible food rules", color: "bg-rose-50" },
      { icon: <Zap className="text-blue-500" size={16} />, text: "Need to follow routines exactly", color: "bg-blue-50" },
      { icon: <Shield className="text-amber-500" size={16} />, text: "Anxiety when plans change", color: "bg-amber-50" },
      { icon: <Heart className="text-emerald-500" size={16} />, text: "Linking self-worth to shape/weight", color: "bg-emerald-50" },
    ],
    outro: "Over time, these can become rigid, taking up mental space and making it harder to adapt.",
    microcopy: "What starts as control can slowly start to feel controlling.",
    cta: "Continue",
  },
  {
    headline: "Underneath the Control",
    intro: "The urge to control often has deeper roots. It can be connected to:",
    bullets: [
      { icon: <Zap className="text-indigo-500" size={16} />, text: "Feeling emotionally flooded", color: "bg-indigo-50" },
      { icon: <Shield className="text-violet-500" size={16} />, text: "Wanting predictability", color: "bg-violet-50" },
      { icon: <Heart className="text-pink-500" size={16} />, text: "A need for stability and safety", color: "bg-pink-50" },
    ],
    insight: "Control isn't the problem — it's the strategy your mind found to cope. With time and support, other ways to feel safe are possible.",
    microcopy: "Understanding is a powerful first step.",
  },
];

export default function UnderstandingControl() {
  const [current, setCurrent] = useState(0);

  const screen = screens[current];

  return (
    <PremiumLayout
      title="Understanding Control"
      subtitle={`Strategy of Survival • ${current + 1}/3`}
      icon={<Shield className="w-6 h-6 text-primary" />}
      onBack={current > 0 ? () => setCurrent(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
              <h1 className="text-2xl font-black text-slate-800 mb-6 leading-tight">{screen.headline}</h1>

              {screen.paragraphs && (
                <div className="space-y-4">
                  {screen.paragraphs.map((p, i) => (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed">{p}</p>
                  ))}
                </div>
              )}

              {screen.intro && (
                <div className="space-y-6">
                  <p className="text-slate-600 text-sm italic">{screen.intro}</p>
                  <div className="space-y-3">
                    {screen.bullets!.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className={`p-2 rounded-xl ${b.color}`}>
                          {b.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-700">{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {screen.insight && (
                <div className="mt-6 bg-amber-50 rounded-2xl p-6 italic text-amber-900 text-xs leading-relaxed border-l-4 border-amber-400">
                  "{screen.insight}"
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">{screen.microcopy}</p>
              {screen.cta ? (
                <button
                  onClick={() => setCurrent(prev => prev + 1)}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  {screen.cta}
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={() => window.history.back()}
                  className="w-full bg-slate-800 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:scale-[1.02] transition-all"
                >
                  Finish Reading
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

