import Icon from "@/components/ui/icon";

export type FormData = {
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

type Props = {
  step: number;
  saved: boolean;
  form: FormData;
  stepAnim: string;
  set: (field: keyof FormData, value: string | boolean) => void;
};

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

export default function StepContent({ step, saved, form, stepAnim, set }: Props) {
  return (
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
                onChange={(e) => set("inn", e.target.value.replace(/\D/g, ""))}
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
                    <span className="text-[14px]" style={{ color: "var(--ink)" }}>
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
  );
}
