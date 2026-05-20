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
 * Character-by-character reveal with stable layout. Each character lives
 * in the DOM as `inline-block` from the start, so the heading occupies its
 * final width on first paint — no `display: hidden → inline-block` snap.
 * We then animate only opacity + a tiny Y offset + a soft blur, with the
 * per-character durations overlapping enough to feel like a continuous
 * wave (~3–4 chars in flight at any moment).
 *
 * The cursor blinks at the trailing edge of the (final) text. It does not
 * walk character-by-character — sliding it during the fade would either
 * require measuring the DOM each frame or use a width-clip technique that
 * breaks on multi-line wrapping. The stable-layout fade looks like text
 * materialising while the cursor signals "this is the typing line".
 */
export function TypewriterEffect({
  words,
  className,
  cursorClassName,
  ariaLabel,
  delay = 0,
  charDuration = 0.45,
  charStagger = 0.045,
}: {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
  /** Override the auto-derived aria-label (default: words joined with spaces) */
  ariaLabel?: string;
  /** Milliseconds to wait after the section enters viewport before typing */
  delay?: number;
  /** Seconds for each character's fade-in */
  charDuration?: number;
  /** Seconds between consecutive character starts */
  charStagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const fullText = words.map((w) => w.text).join(" ");
  const baseDelay = delay / 1000;

  // Global char counter so stagger continues across word boundaries
  let charIndex = -1;

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
            <span
              className={cn(
                "inline-block whitespace-nowrap align-baseline",
                word.wrapperClassName,
              )}
            >
              {Array.from(word.text).map((char, ci) => {
                charIndex += 1;
                const idx = charIndex;
                return (
                  <motion.span
                    key={ci}
                    className={cn("inline-block", word.className)}
                    initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 4, filter: "blur(4px)" }
                    }
                    transition={{
                      duration: charDuration,
                      delay: baseDelay + idx * charStagger,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
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
