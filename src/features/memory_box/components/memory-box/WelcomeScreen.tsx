import { ChevronLeft, Archive } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScreenWrapper from "./ScreenWrapper";

interface Props {
  onBegin: () => void;
  onHistory: () => void;
}

const WelcomeScreen = ({ onBegin, onHistory }: Props) => {
  const { t } = useTranslation();
  return (
    <ScreenWrapper>
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 py-4 z-20">
        <button className="p-2 rounded-full text-muted-foreground hover:bg-card transition-colors">
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={onHistory}
          className="p-2 rounded-full text-muted-foreground hover:bg-card transition-colors"
        >
          <Archive size={20} />
        </button>
      </div>

      <div className="space-y-8 max-w-xs">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl"
        >
          🕊️
        </motion.div>

        <h1 className="text-3xl font-heading font-semibold text-foreground">
          {(typeof t !== "undefined" ? t : (k) => k)("welcome.title")}
        </h1>

        <div className="space-y-4 text-muted-foreground font-body text-base leading-relaxed text-center">
          <p>{(typeof t !== "undefined" ? t : (k) => k)("welcome.subtitle1")}</p>
          <p>
            {(typeof t !== "undefined" ? t : (k) => k)("welcome.subtitle2")}
            <br />
            {(typeof t !== "undefined" ? t : (k) => k)("welcome.subtitle3")}
          </p>
          <p>{(typeof t !== "undefined" ? t : (k) => k)("welcome.subtitle4")}</p>
          <p>{(typeof t !== "undefined" ? t : (k) => k)("welcome.subtitle5")}</p>
        </div>

        {/* Breathing indicator */}
        <motion.div
          className="w-16 h-16 mx-auto rounded-full bg-primary/20 border-2 border-primary/30"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="space-y-3 pt-4 w-full">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onBegin}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300"
          >
            {(typeof t !== "undefined" ? t : (k) => k)("welcome.begin")}
          </motion.button>
          <button className="w-full py-3 text-muted-foreground font-body text-sm hover:text-foreground transition-colors duration-300">
            {(typeof t !== "undefined" ? t : (k) => k)("welcome.later")}
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
