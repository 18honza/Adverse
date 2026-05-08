"use client";

import * as React from "react";
import {
  motion,
  stagger,
  useAnimate,
  useInView,
} from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

export interface TypewriterWord {
  text: string;
  /** Applied to each character span inside the word */
  className?: string;
  /** Applied to the wrapper around the whole word — perfect for mark-box style */
  wrapperClassName?: string;
}

/**
 * Character-by-character typewriter reveal. Adapted from
 * aceternity/typewriter-effect (21st.dev) — adds per-word wrapper className
 * support and removes hardcoded text colors so it can match any brand.
 */
export function TypewriterEffect({
  words,
  className,
  cursorClassName,
  ariaLabel,
}: {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
  /** Override the auto-derived aria-label (default: words joined with spaces) */
  ariaLabel?: string;
}) {
  const wordsArray = words.map((w) => ({
    ...w,
    chars: w.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      animate(
        "span[data-char]",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: stagger(0.08), ease: "easeInOut" },
      );
    }
  }, [isInView, animate]);

  const fullText = words.map((w) => w.text).join(" ");

  return (
    <div
      role="heading"
      aria-level={2}
      aria-label={ariaLabel ?? fullText}
      className={cn("inline-block", className)}
    >
      <motion.span ref={scope} aria-hidden="true" className="inline">
        {wordsArray.map((word, wi) => (
          <React.Fragment key={`word-${wi}`}>
            {wi > 0 && " "}
            <span
              className={cn("inline-block", word.wrapperClassName)}
            >
              {word.chars.map((char, ci) => (
                <motion.span
                  key={`char-${wi}-${ci}`}
                  data-char
                  initial={{}}
                  className={cn("opacity-0 hidden", word.className)}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </React.Fragment>
        ))}
      </motion.span>
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
