import Icon from "@/components/ui/icon";

const STEPS = [
  { id: 1, label: "Организация" },
  { id: 2, label: "Параметры" },
  { id: 3, label: "Доступ" },
  { id: 4, label: "Подтверждение" },
];

type Props = {
  step: number;
  onClose: () => void;
  onGoTo: (id: number) => void;
};

export default function ModalHeader({ step, onClose, onGoTo }: Props) {
  return (
    <div
      style={{
        borderBottom: "1.5px solid var(--line)",
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1"
          style={{ color: "var(--ink-light)" }}
        >
          Новая конфигурация
        </div>
        <div
          className="text-[17px] font-semibold"
          style={{ color: "var(--ink)", letterSpacing: "-0.01em" }}
        >
          {STEPS[step - 1].label}
        </div>
      </div>

      <div className="flex items-center gap-[6px] flex-shrink-0">
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex items-center gap-[6px]">
              <button
                onClick={() => done && onGoTo(s.id)}
                title={s.label}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: done || active ? "var(--ink)" : "var(--field-bg)",
                  border: done || active ? "none" : "1.5px solid var(--line)",
                  color: done || active ? "#fff" : "var(--ink-light)",
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "IBM Plex Mono, monospace",
                  cursor: done ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.25s",
                  flexShrink: 0,
                }}
              >
                {done ? <Icon name="Check" size={11} /> : s.id}
              </button>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: 16,
                    height: 1.5,
                    background: done ? "var(--ink)" : "var(--line)",
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--ink-light)",
          padding: 4,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Icon name="X" size={17} />
      </button>
    </div>
  );
}
