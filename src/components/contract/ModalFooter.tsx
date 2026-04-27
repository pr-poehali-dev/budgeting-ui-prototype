type Props = {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
};

export default function ModalFooter({ step, totalSteps, onBack, onNext, onSave }: Props) {
  return (
    <div
      style={{
        borderTop: "1.5px solid var(--line)",
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        background: "#FAFAF8",
      }}
    >
      <span className="font-mono text-[11px]" style={{ color: "var(--ink-light)" }}>
        {step} / {totalSteps}
      </span>
      <div className="flex gap-2">
        {step > 1 && (
          <button className="btn-ghost" onClick={onBack}>
            Назад
          </button>
        )}
        {step < totalSteps ? (
          <button className="btn-primary" onClick={onNext}>
            Далее
          </button>
        ) : (
          <button className="btn-primary" onClick={onSave}>
            Сохранить
          </button>
        )}
      </div>
    </div>
  );
}
