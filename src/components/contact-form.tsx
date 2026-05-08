"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/kontakt/actions";
import { cn } from "@/lib/cn";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContact,
    initialState,
  );

  const fieldHasError = (name: string) =>
    state.status === "error" && state.fields?.includes(name);

  return (
    <form action={formAction} className="grid gap-4 max-w-2xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Jméno *"
          name="name"
          autoComplete="name"
          required
          error={fieldHasError("name")}
          disabled={pending}
        />
        <Field
          label="E-mail *"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={fieldHasError("email")}
          disabled={pending}
        />
      </div>
      <Field
        label="Telefon"
        name="phone"
        type="tel"
        autoComplete="tel"
        error={fieldHasError("phone")}
        disabled={pending}
      />
      <Field
        label="Zpráva *"
        name="message"
        textarea
        required
        error={fieldHasError("message")}
        disabled={pending}
      />

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="text-center mt-2">
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex items-center justify-center font-sans text-xs font-bold uppercase tracking-[2px] rounded-sm transition-all duration-150 px-6 py-3 cursor-pointer",
            "bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover",
            "disabled:opacity-60 disabled:cursor-not-allowed",
          )}
        >
          {pending ? "Odesílám…" : "Odeslat zprávu"}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-center text-sm min-h-6 mt-2",
          state.status === "success" && "text-emerald-600",
          state.status === "error" && "text-accent",
        )}
      >
        {state.status === "success" &&
          "Děkujeme — zpráva odeslána. Ozveme se brzy."}
        {state.status === "error" && state.error}
      </p>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  textarea?: boolean;
  error?: boolean;
  disabled?: boolean;
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  textarea,
  error,
  disabled,
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
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          className={cn(baseClasses, "min-h-36 resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          className={baseClasses}
        />
      )}
    </div>
  );
}
