import { useState } from "react";
import Icon from "@/components/ui/icon";

const STEPS = [
  { id: 1, label: "Организация" },
  { id: 2, label: "Параметры" },
  { id: 3, label: "Доступ" },
  { id: 4, label: "Подтверждение" },
];

type FormData = {
  companyName: string;
  inn: string;
  industry: string;
  contractType: string;
  budget: string;
  currency: string;
  deadline: string;
  priority: string;
  contactName: string;
  contactEmail: string;
  accessLevel: string;
  notifications: boolean;
  comment: string;
};

const INITIAL: FormData = {
  companyName: "",
  inn: "",
  industry: "",
  contractType: "",
  budget: "",
  currency: "RUB",
  deadline: "",
  priority: "medium",
  contactName: "",
  contactEmail: "",
  accessLevel: "standard",
  notifications: true,
  comment: "",
};

export default function Index() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL);

  const goTo = (next: number) => {
    if (animating) return;
    setDir(next > step ? "forward" : "back");
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 200);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setOpen(false);
      setSaved(false);
      setStep(1);
      setForm(INITIAL);
    }, 1600);
  };

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((p) => ({ ...p, [field]: value }));

  const stepAnim = animating
    ? dir === "forward"
      ? "opacity-0 translate-x-3"
      : "opacity-0 -translate-x-3"
    : "opacity-100 translate-x-0";

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans"
      style={{ background: "var(--bg-page)" }}
    >
      <style>{`
        :root {
          --bg-page: #EFEFEC;
          --bg-modal: #FFFFFF;
          --ink: #0D0D0D;
          --ink-mid: #5A5A5A;
          --ink-light: #9A9A9A;
          --line: #E2E0DB;
          --field-bg: #F7F6F3;
        }
        .f-input {
          background: var(--field-bg);
          border: 1.5px solid var(--line);
          border-radius: 3px;
          color: var(--ink);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          padding: 10px 14px;
          width: 100%;
          outline: none;
          transition: border-color 0.15s;
          display: block;
        }
        .f-input:focus { border-color: var(--ink); }
        .f-input::placeholder { color: var(--ink-light); }
        select.f-input { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A9A9A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }
        .step-trans { transition: opacity 0.2s ease, transform 0.2s ease; }
        .btn-primary { background: var(--ink); color: #fff; font-family: 'IBM Plex Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; border: none; border-radius: 3px; padding: 11px 22px; cursor: pointer; transition: opacity 0.15s; }
        .btn-primary:hover { opacity: 0.8; }
        .btn-ghost { background: transparent; color: var(--ink-mid); font-family: 'IBM Plex Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; border: 1.5px solid var(--line); border-radius: 3px; padding: 10px 20px; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
        .btn-ghost:hover { border-color: var(--ink); color: var(--ink); }
        .preview-row { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; border-bottom: 1px solid var(--line); gap: 16px; }
        .preview-row:last-child { border-bottom: none; }
        .radio-opt { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 3px 0; }
        .radio-opt input[type="radio"] { accent-color: var(--ink); width: 14px; height: 14px; cursor: pointer; flex-shrink: 0; }
        .toggle-track { width: 38px; height: 20px; border-radius: 10px; background: var(--line); position: relative; transition: background 0.2s; flex-shrink: 0; }
        .toggle-track.on { background: var(--ink); }
        .toggle-thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: #fff; border-radius: 50%; transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .toggle-track.on .toggle-thumb { left: 20px; }
        @keyframes checkPop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
        .check-pop { animation: checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .prio-btn { border: 1.5px solid var(--line); border-radius: 3px; background: transparent; color: var(--ink-mid); font-family: 'IBM Plex Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; padding: 7px 14px; cursor: pointer; transition: all 0.15s; }
        .prio-btn.active { border-color: var(--ink); background: var(--ink); color: #fff; }
      `}</style>

      {/* Page background trigger */}
      {!open && (
        <div className="flex flex-col items-center text-center animate-fade-in px-6">
          <div
            className="text-[10px] font-mono tracking-[0.18em] uppercase mb-5"
            style={{ color: "var(--ink-light)" }}
          >
            B2B Configuration Suite
          </div>
          <h1
            className="text-[42px] font-light leading-tight mb-3"
            style={{
              color: "var(--ink)",
              letterSpacing: "-0.03em",
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}
          >
            Параметры контракта
          </h1>
          <p
            className="text-[15px] mb-10 max-w-[340px] leading-relaxed"
            style={{ color: "var(--ink-mid)" }}
          >
            Последовательное заполнение параметров с итоговым превью перед сохранением
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              setOpen(true);
              setStep(1);
            }}
          >
            Начать настройку
          </button>
        </div>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in"
          style={{
            background: "rgba(13,13,13,0.5)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !saved) setOpen(false);
          }}
        >
          {/* Modal */}
          <div
            className="relative flex flex-col animate-scale-in"
            style={{
              background: "var(--bg-modal)",
              width: "min(580px, 100%)",
              maxHeight: "88vh",
              borderRadius: "6px",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
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

              {/* Step indicators */}
              <div className="flex items-center gap-[6px] flex-shrink-0">
                {STEPS.map((s, i) => {
                  const done = step > s.id;
                  const active = step === s.id;
                  return (
                    <div key={s.id} className="flex items-center gap-[6px]">
                      <button
                        onClick={() => done && goTo(s.id)}
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
                onClick={() => !saved && setOpen(false)}
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

            {/* Body */}
            <div style={{ padding: "26px 28px", overflowY: "auto", flex: 1 }}>
              <div className={`step-trans ${stepAnim}`}>
                {/* ── Step 1 ── */}
                {step === 1 && (
                  <div className="flex flex-col gap-[18px]">
                    <FG label="Название компании" required>
                      <input
                        className="f-input"
                        placeholder="ООО «Ромашка Технологии»"
                        value={form.companyName}
                        onChange={(e) => set("companyName", e.target.value)}
                      />
                    </FG>
                    <FG label="ИНН" required>
                      <input
                        className="f-input font-mono"
                        placeholder="7700000000"
                        maxLength={12}
                        value={form.inn}
                        onChange={(e) =>
                          set("inn", e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </FG>
                    <FG label="Отрасль">
                      <select
                        className="f-input"
                        value={form.industry}
                        onChange={(e) => set("industry", e.target.value)}
                      >
                        <option value="">— выберите отрасль —</option>
                        <option>Промышленность и производство</option>
                        <option>Финансы и страхование</option>
                        <option>Логистика и транспорт</option>
                        <option>IT и телекоммуникации</option>
                        <option>Торговля и ритейл</option>
                        <option>Строительство и девелопмент</option>
                      </select>
                    </FG>
                  </div>
                )}

                {/* ── Step 2 ── */}
                {step === 2 && (
                  <div className="flex flex-col gap-[18px]">
                    <FG label="Тип договора" required>
                      <div className="flex flex-col gap-[6px]">
                        {[
                          { val: "service", label: "Договор оказания услуг" },
                          { val: "supply", label: "Договор поставки" },
                          { val: "agency", label: "Агентский договор" },
                          { val: "license", label: "Лицензионное соглашение" },
                        ].map((opt) => (
                          <label key={opt.val} className="radio-opt">
                            <input
                              type="radio"
                              name="contractType"
                              value={opt.val}
                              checked={form.contractType === opt.val}
                              onChange={() => set("contractType", opt.val)}
                            />
                            <span
                              className="text-[14px]"
                              style={{ color: "var(--ink)" }}
                            >
                              {opt.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </FG>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <FG label="Бюджет">
                          <input
                            className="f-input"
                            placeholder="1 000 000"
                            value={form.budget}
                            onChange={(e) => set("budget", e.target.value)}
                          />
                        </FG>
                      </div>
                      <div style={{ width: 100 }}>
                        <FG label="Валюта">
                          <select
                            className="f-input"
                            value={form.currency}
                            onChange={(e) => set("currency", e.target.value)}
                          >
                            <option>RUB</option>
                            <option>USD</option>
                            <option>EUR</option>
                            <option>CNY</option>
                          </select>
                        </FG>
                      </div>
                    </div>

                    <FG label="Срок исполнения">
                      <input
                        type="date"
                        className="f-input"
                        value={form.deadline}
                        onChange={(e) => set("deadline", e.target.value)}
                      />
                    </FG>

                    <FG label="Приоритет">
                      <div className="flex gap-2">
                        {[
                          { val: "low", label: "Низкий" },
                          { val: "medium", label: "Средний" },
                          { val: "high", label: "Высокий" },
                        ].map((p) => (
                          <button
                            key={p.val}
                            className={`prio-btn ${form.priority === p.val ? "active" : ""}`}
                            onClick={() => set("priority", p.val)}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </FG>
                  </div>
                )}

                {/* ── Step 3 ── */}
                {step === 3 && (
                  <div className="flex flex-col gap-[18px]">
                    <FG label="Ответственный сотрудник" required>
                      <input
                        className="f-input"
                        placeholder="Иванов Иван Иванович"
                        value={form.contactName}
                        onChange={(e) => set("contactName", e.target.value)}
                      />
                    </FG>
                    <FG label="Корпоративный e-mail" required>
                      <input
                        type="email"
                        className="f-input"
                        placeholder="ivanov@company.ru"
                        value={form.contactEmail}
                        onChange={(e) => set("contactEmail", e.target.value)}
                      />
                    </FG>
                    <FG label="Уровень доступа">
                      <select
                        className="f-input"
                        value={form.accessLevel}
                        onChange={(e) => set("accessLevel", e.target.value)}
                      >
                        <option value="read">Только чтение</option>
                        <option value="standard">Стандартный</option>
                        <option value="extended">Расширенный</option>
                        <option value="admin">Администратор</option>
                      </select>
                    </FG>
                    <div>
                      <button
                        onClick={() => set("notifications", !form.notifications)}
                        className="flex items-center gap-3"
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        <div className={`toggle-track ${form.notifications ? "on" : ""}`}>
                          <div className="toggle-thumb" />
                        </div>
                        <span className="text-[14px]" style={{ color: "var(--ink)" }}>
                          Уведомления по e-mail
                        </span>
                      </button>
                    </div>
                    <FG label="Комментарий">
                      <textarea
                        className="f-input"
                        rows={3}
                        placeholder="Дополнительные требования или особые условия..."
                        style={{ resize: "vertical" }}
                        value={form.comment}
                        onChange={(e) => set("comment", e.target.value)}
                      />
                    </FG>
                  </div>
                )}

                {/* ── Step 4: Preview ── */}
                {step === 4 && !saved && (
                  <div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.14em] mb-5"
                      style={{ color: "var(--ink-light)" }}
                    >
                      Итоговые параметры — проверьте перед сохранением
                    </div>
                    <PSection title="Организация">
                      <PRow label="Компания" value={form.companyName || "—"} />
                      <PRow label="ИНН" value={form.inn || "—"} mono />
                      <PRow label="Отрасль" value={form.industry || "—"} />
                    </PSection>
                    <PSection title="Параметры">
                      <PRow
                        label="Тип договора"
                        value={
                          { service: "Договор оказания услуг", supply: "Договор поставки", agency: "Агентский договор", license: "Лицензионное соглашение" }[form.contractType] || "—"
                        }
                      />
                      <PRow label="Бюджет" value={form.budget ? `${form.budget} ${form.currency}` : "—"} />
                      <PRow label="Срок" value={form.deadline || "—"} />
                      <PRow
                        label="Приоритет"
                        value={{ low: "Низкий", medium: "Средний", high: "Высокий" }[form.priority] || "—"}
                      />
                    </PSection>
                    <PSection title="Доступ">
                      <PRow label="Сотрудник" value={form.contactName || "—"} />
                      <PRow label="E-mail" value={form.contactEmail || "—"} mono />
                      <PRow
                        label="Уровень"
                        value={{ read: "Только чтение", standard: "Стандартный", extended: "Расширенный", admin: "Администратор" }[form.accessLevel] || "—"}
                      />
                      <PRow label="Уведомления" value={form.notifications ? "Включены" : "Отключены"} />
                      {form.comment && <PRow label="Комментарий" value={form.comment} />}
                    </PSection>
                  </div>
                )}

                {/* ── Saved ── */}
                {step === 4 && saved && (
                  <div className="flex flex-col items-center justify-center py-12 gap-5 check-pop">
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "var(--ink)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      <Icon name="Check" size={26} />
                    </div>
                    <div className="text-center">
                      <div
                        className="text-[17px] font-semibold mb-1"
                        style={{ color: "var(--ink)", letterSpacing: "-0.01em" }}
                      >
                        Конфигурация сохранена
                      </div>
                      <div className="text-[13px]" style={{ color: "var(--ink-mid)" }}>
                        Параметры успешно применены к системе
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            {!saved && (
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
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "var(--ink-light)" }}
                >
                  {step} / {STEPS.length}
                </span>
                <div className="flex gap-2">
                  {step > 1 && (
                    <button className="btn-ghost" onClick={() => goTo(step - 1)}>
                      Назад
                    </button>
                  )}
                  {step < 4 ? (
                    <button className="btn-primary" onClick={() => goTo(step + 1)}>
                      Далее
                    </button>
                  ) : (
                    <button className="btn-primary" onClick={handleSave}>
                      Сохранить
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FG({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label
        className="text-[11px] font-semibold uppercase"
        style={{ color: "var(--ink-mid)", letterSpacing: "0.1em" }}
      >
        {label}
        {required && <span style={{ color: "var(--ink)", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function PSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div
        className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2"
        style={{ color: "var(--ink-light)" }}
      >
        {title}
      </div>
      <div
        style={{
          border: "1.5px solid var(--line)",
          borderRadius: 4,
          padding: "0 16px",
          background: "var(--field-bg)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="preview-row">
      <span className="text-[12px] font-medium" style={{ color: "var(--ink-mid)", minWidth: 110, flexShrink: 0 }}>
        {label}
      </span>
      <span
        className={`text-[13px] text-right ${mono ? "font-mono" : ""}`}
        style={{ color: "var(--ink)", wordBreak: "break-all" }}
      >
        {value}
      </span>
    </div>
  );
}
