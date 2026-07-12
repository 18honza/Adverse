"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Scroll-driven word reveal: the paragraph sits at 12% opacity and each
 * word inks in as it crosses the reading zone, so scrolling literally
 * "prints" the manifesto. Words marked with * render in red.
 */
const TEXT =
  "Žádný korporátní šum. Děláme *výkonnostní* *kampaně,* *weby* *a* *sítě,* které plní prohlídky a vyprodávají zájezdy. Co se dá změřit, to se dá zlepšit.";

export function IntroClaim() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.42"],
  });

  const words = TEXT.split(" ");

  return (
    <section
      data-fable-tone="ink"
      className="bg-[color:var(--f-paper)] px-[6vw] py-[16vh]"
    >
      <p
        ref={ref}
        className="mx-auto max-w-4xl font-display font-semibold uppercase leading-[1.14] tracking-tight text-[clamp(1.5rem,3.6vw,3rem)] text-[color:var(--f-ink)]"
      >
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            accent={word.startsWith("*")}
          >
            {word.replaceAll("*", "")}
          </Word>
        ))}
      </p>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn(
        "inline-block mr-[0.32em]",
        accent && "text-[color:var(--f-red)]",
      )}
    >
      {children}
    </motion.span>
  );
}
