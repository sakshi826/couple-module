import { useTranslation } from "react-i18next";
interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitDialog({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-3xl p-6 w-full max-w-[360px] text-center fade-in"
        style={{ boxShadow: "var(--shadow-lift)" }}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-label={(typeof t !== "undefined" ? t : (k) => k)("exit_confirmation")}
      >
        <h2 className="font-display text-lg font-semibold text-foreground mb-2">{(typeof t !== "undefined" ? t : (k) => k)("are_you_sure_you_want_to_exit")}</h2>
        <p className="text-sm text-muted-foreground mb-6">{(typeof t !== "undefined" ? t : (k) => k)("your_unsaved_data_will_be_lost")}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-all duration-300"
          >{(typeof t !== "undefined" ? t : (k) => k)("stay")}</button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium hover:opacity-90 transition-all duration-300"
          >{(typeof t !== "undefined" ? t : (k) => k)("exit")}</button>
        </div>
      </div>
    </div>
  );
}
