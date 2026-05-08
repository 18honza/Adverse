"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Controlled progress indicator with Back / Continue (or Finish) buttons.
 * Adapted from anurag-mishra22/progress-indicator (21st.dev) — original
 * managed step state internally; this version is fully driven by props so
 * a parent form can own the data flow.
 *
 * Layout: an `inline-flex h-3` row holds three 8px dots with a red pill
 * positioned absolutely behind them. The pill animates its width to wrap
 * the completed dots; finished dots show as white circles on top of the
 * red pill (gray when not yet completed).
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

// Pill widths chosen so each dot is wrapped with ~8px padding on both
// sides. Dots are 8px wide, gap-6 = 24px, so the dot centers sit at
// 4 / 36 / 68 from the row's left edge. Pill starts at -8px (left:-2 in tw),
// width 24 / 60 / 96 covers up to 16 / 52 / 88 — wrapping each completed dot.
const PILL_WIDTH = ["24px", "60px", "96px"];

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
  const showBack = step > 1;
  const widthIndex = Math.min(Math.max(step - 1, 0), PILL_WIDTH.length - 1);

  return (
    <div className="flex flex-col items-center gap-7 w-full">
      {/* Dots row — h-3 so the pill (also h-3) spans the row vertically. */}
      <div className="relative inline-flex items-center gap-6 h-3">
        {/* Animated red pill, sits behind the dots */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ width: PILL_WIDTH[widthIndex] }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 22,
            mass: 0.8,
          }}
          className="absolute left-[-8px] top-0 bottom-0 bg-accent rounded-full z-0"
        />

        {Array.from({ length: total }).map((_, i) => {
          const dot = i + 1;
          const completed = dot <= step;
          return (
            <div
              key={dot}
              className={cn(
                "w-2 h-2 rounded-full relative z-10 transition-colors duration-200",
                completed ? "bg-bg" : "bg-divider",
              )}
            />
          );
        })}
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2">
          <AnimatePresence initial={false}>
            {showBack && (
              <motion.button
                key="back"
                type="button"
                initial={{ opacity: 0, width: 0, scale: 0.85 }}
                animate={{ opacity: 1, width: "auto", scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.85 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                  mass: 0.8,
                  opacity: { duration: 0.18 },
                }}
                onClick={onBack}
                disabled={pending}
                className={cn(
                  "px-6 py-3 rounded-full whitespace-nowrap shrink-0",
                  "bg-surface-alt border border-divider text-text",
                  "hover:border-text transition-colors",
                  "font-bold text-xs uppercase tracking-[2px]",
                  "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
                )}
              >
                {backLabel}
              </motion.button>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={onContinue}
            disabled={pending}
            className={cn(
              "px-6 py-3 rounded-full text-white bg-accent hover:bg-accent-hover",
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
                    damping: 18,
                    mass: 0.5,
                  }}
                  className="inline-flex"
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
          </button>
        </div>
      </div>
    </div>
  );
}
