"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { sendContact } from "@/app/kontakt/actions";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { cn } from "@/lib/cn";

type Values = { name: string; email: string; phone: string; message: string };
type Status = "idle" | "submitting" | "success" | "error";

const TOTAL_STEPS = 3;

const STEP_META = [
  {
    title: "Jak vám máme říkat?",
    subtitle: "Začněme tím nejjednodušším — vaším jménem.",
  },
  {
    title: "Kam vám máme odpovědět?",
    subtitle:
      "E-mail je povinný, telefon nepovinný — ale díky němu jsme rychlejší.",
  },
  {
    title: "Co vás přivádí?",
    subtitle:
      "Pár vět stačí. Co řešíte, jaký byznys máte, případně co jste už zkoušeli.",
  },
];

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Set<keyof Values>>(new Set());
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const firstFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );

  // Auto-focus the first field whenever the step changes
  useEffect(() => {
    if (status === "idle" || status === "error") firstFieldRef.current?.focus();
  }, [step, status]);

  function update<K extends keyof Values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors.has(key)) {
      const next = new Set(errors);
      next.delete(key);
      setErrors(next);
    }
  }

  function validateStep(): boolean {
    const errs = new Set<keyof Values>();
    if (step === 1) {
      if (!values.name.trim() || values.name.length > 100) errs.add("name");
    } else if (step === 2) {
      if (!isEmail(values.email.trim())) errs.add("email");
      if (values.phone.length > 50) errs.add("phone");
    } else if (step === 3) {
      if (!values.message.trim() || values.message.length > 5000)
        errs.add("message");
    }
    setErrors(errs);
    return errs.size === 0;
  }

  async function submit() {
    setStatus("submitting");
    setServerError("");
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, v));
    const res = await sendContact({ status: "idle" }, fd);
    if (res.status === "success") {
      setStatus("success");
    } else if (res.status === "error") {
      setStatus("error");
      setServerError(res.error);
      if (res.fields) setErrors(new Set(res.fields as (keyof Values)[]));
    }
  }

  function handleContinue() {
    if (status === "submitting") return;
    if (!validateStep()) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      submit();
    }
  }

  function handleBack() {
    if (status === "submitting") return;
    if (step > 1) setStep(step - 1);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleContinue();
  }

  function handleTextareaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Cmd/Ctrl+Enter inside textarea = submit
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleContinue();
    }
  }

  // ============ Success state ============
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <CheckCircle2
          className="w-12 h-12 text-accent mx-auto mb-5"
          strokeWidth={1.5}
        />
        <h3 className="text-2xl md:text-3xl mb-3">Zpráva odeslána</h3>
        <p className="text-text-muted max-w-md mx-auto">
          Děkujeme. Jan i Ondřej obdrželi vaši zprávu a ozvou se zpravidla do
          dvou hodin.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto"
      noValidate
      aria-label="Kontaktní formulář"
    >
      {/* Step heading */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-[3px] text-accent">
          Krok {step} ze {TOTAL_STEPS}
        </span>
        <h3 className="text-2xl md:text-3xl mt-3 mb-2">
          {STEP_META[step - 1].title}
        </h3>
        <p className="text-text-muted">{STEP_META[step - 1].subtitle}</p>
      </div>

      {/* Animated step content */}
      <div className="relative min-h-[180px] mb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid gap-4"
          >
            {step === 1 && (
              <Field
                ref={firstFieldRef as React.RefObject<HTMLInputElement>}
                label="Jméno *"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={(v) => update("name", v)}
                error={errors.has("name")}
                disabled={status === "submitting"}
              />
            )}
            {step === 2 && (
              <>
                <Field
                  ref={firstFieldRef as React.RefObject<HTMLInputElement>}
                  label="E-mail *"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(v) => update("email", v)}
                  error={errors.has("email")}
                  disabled={status === "submitting"}
                />
                <Field
                  label="Telefon"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(v) => update("phone", v)}
                  error={errors.has("phone")}
                  disabled={status === "submitting"}
                />
              </>
            )}
            {step === 3 && (
              <Field
                ref={firstFieldRef as React.RefObject<HTMLTextAreaElement>}
                label="Zpráva *"
                name="message"
                textarea
                value={values.message}
                onChange={(v) => update("message", v)}
                error={errors.has("message")}
                disabled={status === "submitting"}
                onKeyDown={handleTextareaKeyDown}
                hint="Tip: stiskem ⌘ Enter formulář odešlete."
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Server-side error message */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-center text-sm min-h-5 mb-4",
          status === "error" && "text-accent",
        )}
      >
        {status === "error" && serverError}
      </p>

      {/* Progress dots + buttons */}
      <ProgressIndicator
        step={step}
        total={TOTAL_STEPS}
        onBack={handleBack}
        onContinue={handleContinue}
        pending={status === "submitting"}
        isLast={step === TOTAL_STEPS}
      />

      {/* Honeypot — hidden from users + assistive tech */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value=""
          onChange={() => {}}
        />
      </div>
    </form>
  );
}

// ============ Field ============

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
  error?: boolean;
  disabled?: boolean;
  hint?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  ref?:
    | React.RefObject<HTMLInputElement | null>
    | React.RefObject<HTMLTextAreaElement | null>;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  textarea,
  error,
  disabled,
  hint,
  onKeyDown,
  ref,
}: FieldProps) {
  const id = `cf-${name}`;
  const baseClasses = cn(
    "w-full px-4 py-3 border rounded-sm bg-bg text-text font-sans",
    "transition-colors focus:outline-none focus:border-accent",
    error ? "border-accent" : "border-divider",
  );
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[2px] font-bold mb-2"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement | null>}
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className={cn(baseClasses, "min-h-36 resize-y")}
        />
      ) : (
        <input
          ref={ref as React.RefObject<HTMLInputElement | null>}
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={baseClasses}
        />
      )}
      {hint && <p className="text-xs text-text-faint mt-2">{hint}</p>}
    </div>
  );
}
