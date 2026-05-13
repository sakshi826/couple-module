import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  isLoading?: boolean;
}

const ContinueButton = ({ onClick, disabled, label, isLoading }: ContinueButtonProps) => {
  const { t } = useTranslation();
  return (
    <div className="mt-12 pb-4">
      <motion.button
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={onClick}
        disabled={disabled || isLoading}
        className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            {label || (typeof t !== "undefined" ? t : (k) => k)('common.continue')}
            <ArrowRight size={20} />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default ContinueButton;
