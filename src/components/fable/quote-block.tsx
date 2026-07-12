"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/testimonials";

/**
 * One voice, given room. A single featured testimonial set in the serif
 * italic (the only serif moment on the page), between the ink portfolio
 * block and the red closing scene.
 */
export function QuoteBlock() {
  const t = testimonials[0];

  return (
    <section
      data-fable-tone="ink"
      className="bg-[color:var(--f-paper)] px-[6vw] py-[16vh]"
    >
      <motion.figure
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <span
          aria-hidden="true"
          className="block font-serif text-[5rem] leading-none text-[color:var(--f-red)] select-none"
        >
          „
        </span>
        <blockquote className="font-serif italic text-[clamp(1.35rem,2.6vw,2rem)] leading-snug text-[color:var(--f-ink)]">
          {t.quote}
        </blockquote>
        <figcaption className="mt-8">
          <span className="block text-xs font-bold uppercase tracking-[2.5px] text-[color:var(--f-ink)]">
            {t.name}
          </span>
          <span className="mt-1 block text-[11px] uppercase tracking-[2px] text-[color:var(--f-ink)]/50">
            {t.context}
          </span>
        </figcaption>
      </motion.figure>
    </section>
  );
}
