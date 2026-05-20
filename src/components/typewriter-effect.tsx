"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export interface TypewriterWord {
  text: string;
  /** Applied to each character span inside the word */
  className?: string;
  /** Applied to the wrapper around the whole word — perfect for mark-box style */
  wrapperClassName?: string;
}

/**
 * Smooth word-by-word reveal — each word fades in with slight blur + lift.
 * Replaces the previous char-by-char display:hidden snap which felt abrupt
 * on a brand-heavy heading. Wraps naturally on narrow screens because each
 * word is its own inline-block (no overflow-hidden / nowrap tricks).
 *
 * Adapted from aceternity/typewriter-effect (21st.dev), reworked for
 * smoother feel while keeping per-word wrapperClassName so the mark-box
 * around "spolu" stays intact and animates with the word.
 */
export function TypewriterEffect({
  words,
  className,
  cursorClassName,
  ariaLabel,
  delay = 0,
  wordDuration = 0.55,
  wordStagger = 0.18,
}: {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
  /** Override the auto-derived aria-label (default: words joined with spaces) */
  ariaLabel?: string;
  /** Milliseconds to wait after the section enters viewport before revealing */
  delay?: number;
  /** Seconds per word fade-in */
  wordDuration?: number;
  /** Seconds between consecutive word starts */
  wordStagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const fullText = words.map((w) => w.text).join(" ");
  const baseDelay = delay / 1000;

  return (
    <div
      ref={ref}
      role="heading"
      aria-level={2}
      aria-label={ariaLabel ?? fullText}
      className={className}
    >
      <span aria-hidden="true" className="inline">
        {words.map((word, wi) => (
          <React.Fragment key={`word-${wi}`}>
            {wi > 0 && " "}
            <motion.span
              className={cn("inline-block align-baseline", word.wrapperClassName)}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 14, filter: "blur(8px)" }
              }
              transition={{
                duration: wordDuration,
                ease: [0.22, 1, 0.36, 1],
                delay: baseDelay + wi * wordStagger,
              }}
            >
              <span className={word.className}>{word.text}</span>
            </motion.span>
          </React.Fragment>
        ))}
      </span>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block w-[3px] h-[0.85em] bg-accent ml-2 align-[-0.05em]",
          cursorClassName,
        )}
      />
    </div>
  );
}
