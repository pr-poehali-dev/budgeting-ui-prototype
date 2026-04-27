import { useState } from "react";
import GlobalStyles from "@/components/contract/GlobalStyles";
import ModalHeader from "@/components/contract/ModalHeader";
import StepContent, { FormData } from "@/components/contract/StepContent";
import ModalFooter from "@/components/contract/ModalFooter";

const TOTAL_STEPS = 4;

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
      <GlobalStyles />

      {/* Page trigger */}
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
              boxShadow: "0 32px 80px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <ModalHeader
              step={step}
              onClose={() => !saved && setOpen(false)}
              onGoTo={goTo}
            />

            <StepContent
              step={step}
              saved={saved}
              form={form}
              stepAnim={stepAnim}
              set={set}
            />

            {!saved && (
              <ModalFooter
                step={step}
                totalSteps={TOTAL_STEPS}
                onBack={() => goTo(step - 1)}
                onNext={() => goTo(step + 1)}
                onSave={handleSave}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
