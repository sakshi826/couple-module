import { ArrowLeft } from "lucide-react";
import { Letter } from "@/features/the_unsent_letter/pages/Index";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface HistoryScreenProps {
  letters: Letter[];
  onBack: () => void;
}

const HistoryScreen = ({ letters, onBack }: HistoryScreenProps) => {

  return (
    <div className="flex flex-col flex-1 px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground">{(typeof t !== "undefined" ? t : (k) => k)("history.title")}</h2>
      </div>

      {letters.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-muted-foreground text-sm">
            {(typeof t !== "undefined" ? t : (k) => k)("history.empty_title")}
          </p>
          <p className="text-micro mt-1">
            {(typeof t !== "undefined" ? t : (k) => k)("history.empty_desc")}
          </p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <p className="text-micro mb-2">
                {format(letter.date, "MMMM d, yyyy · h:mm a")}
              </p>
              <p className="text-foreground text-sm leading-relaxed line-clamp-4 whitespace-pre-wrap">
                {letter.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
