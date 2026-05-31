"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/eyebrow";
import { StatCounter } from "@/components/stat-counter";

/**
 * Hero in the aidigital.com layout, executed in Adverse brand. A single
 * organic squiggle weaves around (and through) the headline: most of it
 * sits behind the type, a couple of front-loops sit in front, creating
 * the woven illusion. Continuous slow drift animation. Headline is solid
 * black; the squiggle carries the brand red on a cream surface.
 *
 * No CTAs in this hero — primary action lives in the nav ("KONTAKT").
 */
export function HeroDisplay() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-section-theme="cream"
      data-theme-id="hero"
      className="relative isolate px-4 sm:px-8 pt-10 sm:pt-16 md:pt-24 pb-16 md:pb-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-(--container-default) text-center">
        <Eyebrow className="mb-6 sm:mb-8 text-[var(--color-accent)]">
          Digitální marketing
        </Eyebrow>

        {/* Headline area: squiggle BACK layer + type + squiggle FRONT-curls layer */}
        <div className="relative flex items-center justify-center min-h-[clamp(11rem,28vw,22rem)]">
          {/* Background squiggle — behind the text */}
          <SquiggleBack reduceMotion={Boolean(reduceMotion)} />

          {/* Headline */}
          <h1
            className={[
              "relative z-10",
              "font-display font-black uppercase",
              "text-[clamp(2.75rem,11vw,8.5rem)]",
              "leading-[0.95] tracking-[-0.02em]",
              "text-text",
              "whitespace-nowrap sm:whitespace-normal",
              "max-w-[16ch]",
              "mx-auto",
            ].join(" ")}
          >
            Výsledky,
            <br />
            které vidíte.
          </h1>

          {/* Foreground squiggle curls — sit IN FRONT of the text in spots */}
          <SquiggleFront reduceMotion={Boolean(reduceMotion)} />
        </div>

        {/* Subhead with bolded key phrases */}
        <p className="mt-10 sm:mt-12 text-lg sm:text-xl md:text-2xl text-text max-w-2xl mx-auto leading-snug font-medium">
          <strong className="font-extrabold">Měřitelný marketing</strong> pro
          realitní a cestovní agentury, postavený na{" "}
          <strong className="font-extrabold">datech</strong> a{" "}
          <strong className="font-extrabold">osobním přístupu</strong>.
        </p>

        {/* Short body line below */}
        <p className="mt-5 text-sm sm:text-base text-[var(--theme-muted,#666)] max-w-xl mx-auto leading-relaxed">
          Vedeme Meta a Google kampaně, sociální sítě, weby a produkci pro
          klienty, kteří chtějí vidět, kam jejich rozpočet jde a co vrací.
        </p>

        {/* Stats row */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-12 pt-6 border-t border-[var(--theme-divider,#ececec)] w-full max-w-3xl mx-auto">
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

/* ============================================================
   Squiggle — drawn as two layered SVGs sharing visual rhythm.
   BACK layer carries the bulk of the path and sits behind text.
   FRONT layer is a few short arc segments positioned to peek
   over the letters, creating the woven look from a distance.
   The whole thing drifts slowly on the X axis.
   ============================================================ */

const ACCENT = "#e63030";

function SquiggleBack({ reduceMotion }: { reduceMotion: boolean }) {
  // Long, flowing path with several loops across the hero width.
  // Designed to live in a wide viewBox so it scales crisply at any size.
  const d =
    "M -120 220 " +
    "C 60 80, 180 380, 360 180 " +
    "S 540 -10, 700 220 " +
    "S 880 420, 1040 200 " +
    "S 1220 -30, 1400 220 " +
    "S 1620 400, 1820 180";

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1700 440"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-[125%] sm:w-[115%] md:w-[110%] h-[120%] -left-[12%] sm:-left-[7%] md:-left-[5%] -top-[10%] z-0 pointer-events-none"
      initial={reduceMotion ? false : { x: -40 }}
      animate={reduceMotion ? undefined : { x: [40, -40, 40] }}
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <motion.path
        d={d}
        fill="none"
        stroke={ACCENT}
        strokeWidth={48}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.15,
        }}
      />
    </motion.svg>
  );
}

function SquiggleFront({ reduceMotion }: { reduceMotion: boolean }) {
  // Two short arc fragments that sit IN FRONT of the text. They share the
  // visual style of the back layer so they read as one woven path even
  // though they're rendered above. Positioned at letter-spaced spots that
  // match the back path's curl peaks.
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1700 440"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-[125%] sm:w-[115%] md:w-[110%] h-[120%] -left-[12%] sm:-left-[7%] md:-left-[5%] -top-[10%] z-20 pointer-events-none"
      initial={reduceMotion ? false : { x: -40 }}
      animate={reduceMotion ? undefined : { x: [40, -40, 40] }}
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {/* Front curl 1 — over the left third of the headline */}
      <motion.path
        d="M 240 80 C 320 30, 420 110, 360 200 S 250 240, 320 290"
        fill="none"
        stroke={ACCENT}
        strokeWidth={42}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.55,
        }}
      />
      {/* Front curl 2 — over the right third */}
      <motion.path
        d="M 1140 110 C 1210 60, 1300 150, 1240 240 S 1110 290, 1180 340"
        fill="none"
        stroke={ACCENT}
        strokeWidth={42}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.75,
        }}
      />
    </motion.svg>
  );
}
