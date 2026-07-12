"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One line of display type whose characters rise out of an overflow mask
 * with a slight rotation — the entrance used for every big headline in
 * the Fable variant. Wrap each visual line in its own <StaggerLine>.
 *
 * The in-view trigger sits on the line wrapper (always visible), NOT on
 * the characters: chars start fully below the overflow mask, so an
 * observer on them would report zero intersection and never fire.
 *
 * Marked aria-hidden: the parent heading must carry an aria-label (or an
 * sr-only twin) with the full text.
 */
export function StaggerLine({
  text,
  className,
  charClassName,
  delay = 0,
  step = 0.026,
  once = true,
}: {
  text: string;
  className?: string;
  /** Applied to every character span (e.g. the outline-stroke class) */
  charClassName?: string;
  delay?: number;
  step?: number;
  once?: boolean;
}) {
  const chars = Array.from(text);

  const line: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };
  const char: Variants = {
    hidden: { y: "118%", rotate: 7 },
    show: {
      y: "0%",
      rotate: 0,
      transition: { duration: 0.72, ease: EASE },
    },
  };

  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em]",
        className,
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3 }}
      variants={line}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          variants={char}
          className={cn("inline-block will-change-transform", charClassName)}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
