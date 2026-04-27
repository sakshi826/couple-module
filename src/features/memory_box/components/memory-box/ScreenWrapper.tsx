import { motion } from "framer-motion";
import { ReactNode, useMemo, forwardRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const PARTICLES = [
  { emoji: "🤍", size: 18 },
  { emoji: "🤍", size: 14 },
  { emoji: "🤍", size: 20 },
  { emoji: "🤍", size: 16 },
];

const ScreenWrapper = forwardRef<HTMLDivElement, Props>(({ children, className = "" }, ref) => {
  const floatingItems = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const p = PARTICLES[i % PARTICLES.length];
        return {
          ...p,
          id: i,
          left: `${5 + Math.random() * 85}%`,
          delay: Math.random() * 8,
          duration: 12 + Math.random() * 10,
          startY: 110 + Math.random() * 20,
          xDrift: -30 + Math.random() * 60,
          opacity: 0.18 + Math.random() * 0.22,
        };
      }),
    []
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`relative flex-1 flex flex-col items-center justify-center px-8 py-12 text-center overflow-hidden ${className}`}
    >
      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-secondary/15 blur-[100px]" />
      </div>

      {/* Floating emoji particles */}
      <div className="pointer-events-none absolute inset-0">
        {floatingItems.map((item) => (
          <motion.span
            key={item.id}
            className="absolute select-none"
            style={{
              left: item.left,
              fontSize: item.size,
              opacity: 0,
            }}
            animate={{
              y: [`${item.startY}vh`, "-10vh"],
              x: [0, item.xDrift],
              opacity: [0, item.opacity, item.opacity, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </motion.div>
  );
});

ScreenWrapper.displayName = "ScreenWrapper";

export default ScreenWrapper;
