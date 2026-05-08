"use client";

import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Controlled progress indicator with Back / Continue (or Finish) buttons.
 * Adapted from anurag-mishra22/progress-indicator (21st.dev) — original
 * managed step state internally; this version is fully driven by props so
 * a parent form can own the data flow and call onContinue/onBack itself.
 *
 * Brand colors: progress overlay + primary button use --color-accent (red);
 * back button uses surface-alt + divider border to match the site.
 */
interface Props {
  step: number;
  total?: number;
  /** Called when the right button is clicked */
  onContinue: () => void;
  /** Called when the left button is clicked (only shown on step ≥ 2) */
  onBack: () => void;
  /** Disables both buttons (e.g. during async submit) */
  pending?: boolean;
  /** When true, the right button shows the Finish state (check + finishLabel) */
  isLast?: boolean;
  continueLabel?: string;
  finishLabel?: string;
  pendingLabel?: string;
  backLabel?: string;
}

export function ProgressIndicator({
  step,
  total = 3,
  onContinue,
  onBack,
  pending = false,
  isLast = false,
  continueLabel = "Pokračovat",
  finishLabel = "Odeslat",
  pendingLabel = "Odesílám…",
  backLabel = "Zpět",
}: Props) {
  // Width of the red overlay for each completed step. Tuned to span from
  // the leftmost dot to the n-th dot inside a `gap-6` flex (each gap = 24px,
  // each dot = 8px). Steps map to: 1 → first dot, 2 → covers 1-2, 3 → covers all.
  const widthByStep = ["24px", "60px", "96px"];
  const showBack = step > 1;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Dots + animated red overlay */}
      <div className="flex items-center gap-6 relative">
        {Array.from({ length: total }).map((_, i) => {
          const dot = i + 1;
          return (
            <div
              key={dot}
              className={cn(
                "w-2 h-2 rounded-full relative z-10 transition-colors duration-200",
                dot <= step ? "bg-text" : "bg-divider",
              )}
            />
          );
        })}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ width: widthByStep[Math.min(step - 1, 2)] }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.8,
          }}
          className="absolute -left-[8px] top-1/2 -translate-y-1/2 h-3 bg-accent rounded-full"
        />
      </div>

      {/* Buttons row */}
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2">
          {showBack && (
            <motion.button
              type="button"
              initial={{ opacity: 0, width: 0, scale: 0.8 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                mass: 0.8,
                opacity: { duration: 0.2 },
              }}
              onClick={onBack}
              disabled={pending}
              className={cn(
                "px-5 py-3 rounded-full whitespace-nowrap",
                "bg-surface-alt border border-divider text-text",
                "hover:border-text transition-colors",
                "font-bold text-xs uppercase tracking-[2px]",
                "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
              )}
            >
              {backLabel}
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={onContinue}
            disabled={pending}
            animate={{ flex: showBack ? "1 1 auto" : 1 }}
            className={cn(
              "px-5 py-3 rounded-full text-white bg-accent hover:bg-accent-hover",
              "font-bold text-xs uppercase tracking-[2px] flex-1",
              "transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
            )}
          >
            <span className="flex items-center justify-center gap-2">
              {isLast && !pending && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                    mass: 0.5,
                  }}
                >
                  <CircleCheck size={14} />
                </motion.span>
              )}
              {pending
                ? pendingLabel
                : isLast
                  ? finishLabel
                  : continueLabel}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
