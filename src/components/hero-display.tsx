"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/stat-counter";

/**
 * Aidigital-inspired display hero. Massive uppercase tagline carries the
 * page weight; a hand-drawn red squiggle weaves behind / through the type
 * to give the surface a single signature decorative element instead of
 * a generic SaaS hero. Lives on a cream surface (set by the section's
 * data-section-theme), no separate background images.
 *
 * Layout, top → bottom: eyebrow → tagline → squiggle (overlaid) → lead
 * paragraph → two CTAs → stats row.
 */
export function HeroDisplay() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-section-theme="cream"
      data-theme-id="hero"
      className="relative isolate px-5 md:px-8 pt-12 sm:pt-20 md:pt-28 pb-16 md:pb-24"
    >
      {/* Decorative squiggle — anchored to the headline visually, sits in
          a separate layer so it can spill beyond the heading bounds */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[28%] md:top-[32%] z-0 h-[40%] flex items-center justify-center"
      >
        <Squiggle reduceMotion={Boolean(reduceMotion)} />
      </div>

      <div className="relative z-10 mx-auto max-w-(--container-default) text-center flex flex-col items-center">
        <Eyebrow className="mb-6 md:mb-8">Digitální marketing</Eyebrow>

        <h1
          className={[
            "font-display font-black uppercase",
            // Display scale tuned for impact + mobile fit
            "text-[clamp(2.75rem,11vw,9rem)]",
            "leading-[0.92] tracking-tight",
            // Keep the headline tight on its own band so squiggle wraps it
            "max-w-[18ch]",
          ].join(" ")}
        >
          Výsledky,
          <br />
          které <span className="inline-block bg-text text-white px-3 sm:px-4">vidíte.</span>
        </h1>

        <p className="mt-8 md:mt-10 text-base sm:text-lg text-[var(--theme-muted,#666)] max-w-xl mx-auto">
          Meta &amp; Google reklamy, social media, weby a produkce.
          <span className="block mt-2 font-serif italic text-[var(--theme-faint,#999)]">
            Každý klient je pro nás jedinečný.
          </span>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/kontakt" variant="primary">
            Domluvit schůzku
          </Button>
          <Link
            href="#sluzby"
            className="inline-flex items-center justify-center font-sans text-xs font-bold uppercase tracking-[2px] px-6 py-3 border-2 border-[var(--theme-fg,#111)] text-[var(--theme-fg,#111)] bg-transparent hover:bg-[var(--theme-fg,#111)] hover:text-[var(--theme-bg,#fff)] transition-colors"
          >
            Naše služby ↓
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-12 pt-6 border-t border-[var(--theme-divider,#ececec)] w-full max-w-3xl">
          <Stat
            value={
              <StatCounter
                value={12}
                suffix="+"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-black"
              />
            }
            label="Spokojených klientů"
          />
          <Stat
            value={
              <span className="font-display text-base sm:text-2xl md:text-4xl font-black whitespace-nowrap">
                META + GGL
              </span>
            }
            label="Certifikované reklamy"
          />
          <Stat
            value={
              <StatCounter
                value={100}
                suffix="%"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-black"
              />
            }
            label="Osobní přístup"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="text-center">
      <div>{value}</div>
      <span className="mt-2 block text-[10px] sm:text-xs uppercase tracking-[2px] text-[var(--theme-faint,#999)]">
        {label}
      </span>
    </div>
  );
}

/**
 * Single SVG path that loops left-to-right with three bezier swirls.
 * Animated by drawing the path (stroke-dasharray trick) on mount, then a
 * very gentle continuous drift — never aggressive. Respects reduced-motion.
 */
function Squiggle({ reduceMotion }: { reduceMotion: boolean }) {
  // Long horizontal path with three loops — fits a wide viewBox so it scales
  // crisply across breakpoints.
  const d =
    "M -40 120 C 60 -30, 200 260, 320 90 S 540 -10, 660 130 S 880 250, 1040 80 S 1240 200, 1440 120";

  return (
    <svg
      viewBox="0 0 1400 220"
      preserveAspectRatio="xMidYMid slice"
      className="w-[140%] sm:w-[120%] md:w-[105%] h-full text-accent"
      role="presentation"
    >
      <defs>
        <linearGradient id="squiggle-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="12%" stopColor="currentColor" stopOpacity="0.75" />
          <stop offset="88%" stopColor="currentColor" stopOpacity="0.75" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke="url(#squiggle-fade)"
        strokeWidth={26}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.15,
        }}
        style={{ mixBlendMode: "multiply" }}
      />
      {!reduceMotion && (
        <motion.path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.0}
          strokeWidth={28}
          strokeLinecap="round"
          aria-hidden="true"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}
