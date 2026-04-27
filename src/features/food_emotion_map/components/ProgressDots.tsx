import { motion } from "framer-motion";

const ProgressDots = ({ current, total }: { current: number; total: number }) => (
  <div className="flex gap-2 justify-center">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        className={`h-2 rounded-full transition-all duration-300 ${
          i === current ? "w-6 bg-primary" : i < current ? "w-2 bg-primary/50" : "w-2 bg-border"
        }`}
        layout
      />
    ))}
  </div>
);

export default ProgressDots;
