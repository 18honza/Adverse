"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Magnetic } from "./magnetic";
import { StaggerLine } from "./split-text";

/**
 * The red closing scene — bookends the red opening so the page starts
 * and ends in brand. Giant type, one magnetic CTA, both founders'
 * direct lines. Nothing else.
 */
export function CtaFinal() {
  return (
    <section
      data-fable-tone="paper"
      className="flex min-h-[92svh] flex-col justify-center bg-[color:var(--f-red)] px-[6vw] py-[14vh] text-[color:var(--f-white)]"
    >
      <span className="block text-[11px] font-bold uppercase tracking-[3px] text-[color:var(--f-white)]/70 mb-6">
        (05) Další krok
      </span>

      <h2
        aria-label="Pojďme si promluvit."
        className="font-display font-bold uppercase leading-[0.92] tracking-[-0.02em] text-[clamp(2.8rem,10.5vw,9rem)]"
      >
        <StaggerLine text="Pojďme si" className="block" />
        <StaggerLine
          text="promluvit."
          charClassName="fable-stroke-white"
          delay={0.18}
        />
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="mt-7 max-w-lg text-base sm:text-lg leading-relaxed text-[color:var(--f-white)]/85"
      >
        Zjistíme, kde vám utíkají peníze, a navrhneme strategii. Nejdřív
        posloucháme, pak jednáme.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
        className="mt-10"
      >
        <Magnetic>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-3 bg-[color:var(--f-white)] px-8 sm:px-10 py-4 sm:py-5 text-[12px] font-bold uppercase tracking-[2.5px] text-[color:var(--f-ink)] transition-colors duration-300 hover:bg-[color:var(--f-ink)] hover:text-[color:var(--f-white)]"
          >
            Domluvit schůzku
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Magnetic>
      </motion.div>

      {/* Direct lines to both founders */}
      <div className="mt-16 flex flex-col sm:flex-row gap-6 sm:gap-16 border-t border-[color:var(--f-white)]/25 pt-8">
        {site.team.map((p) => (
          <div key={p.email}>
            <span className="block text-[10px] font-bold uppercase tracking-[2.5px] text-[color:var(--f-white)]/60 mb-2">
              {p.name}
            </span>
            <a
              href={`tel:${p.phone}`}
              className="block text-sm sm:text-base font-medium hover:underline underline-offset-4 py-0.5"
            >
              {p.phoneDisplay}
            </a>
            <a
              href={`mailto:${p.email}`}
              className="block text-sm sm:text-base font-medium hover:underline underline-offset-4 py-0.5"
            >
              {p.email}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
