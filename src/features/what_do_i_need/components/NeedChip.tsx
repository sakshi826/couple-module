import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface NeedChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  icon?: LucideIcon;
}

const NeedChip = ({ label, selected, onToggle, icon: Icon }: NeedChipProps) => (
  <motion.button
    onClick={onToggle}
    className={`chip-base ${selected ? "chip-selected" : ""}`}
    whileTap={{ scale: 0.95 }}
    layout
  >
    {Icon && <Icon size={16} className={selected ? "text-white" : "text-primary"} />}
    <span>{label}</span>
  </motion.button>
);

export default NeedChip;
