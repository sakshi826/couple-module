import { motion } from "framer-motion";
import { Button } from "@/features/a_gentle_wish/components/ui/button";

interface Props {
  name: string;
  wish: string;
  smallStep?: string;
  onAddAnother: () => void;
  onFinish: () => void;
}

export const ReflectionScreen = ({ name, wish, smallStep, onAddAnother, onFinish }: Props) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center">
    <h2 className="font-display text-xl font-semibold text-foreground mb-8">
      This stays with you 🌸
    </h2>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-3xl p-6 w-full space-y-5 shadow-sm border border-border"
    >
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Thinking of</p>
        <p className="font-display text-lg text-foreground">{name}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">What they'd want for you</p>
        <p className="text-foreground leading-relaxed">{wish}</p>
      </div>
      {smallStep && (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Your small step</p>
          <p className="text-foreground leading-relaxed">{smallStep}</p>
        </div>
      )}
    </motion.div>

    <p className="text-sm text-muted-foreground mt-8 leading-relaxed max-w-xs">
      The care they had for you<br />
      can still live on in quiet ways.
    </p>

    <div className="mt-auto pt-8 space-y-3 w-full">
      <Button variant="grief" size="lg" className="w-full text-base py-6" onClick={onAddAnother}>
        Add another reflection
      </Button>
      <Button variant="griefSecondary" size="default" className="w-full" onClick={onFinish}>
        Finish for now
      </Button>
    </div>
  </div>
);
