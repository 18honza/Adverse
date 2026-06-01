"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/eyebrow";
import { StatCounter } from "@/components/stat-counter";

/**
 * Hero in the aidigital.com layout, executed in Adverse brand.
 *
 * Trick: ONE squiggle path rendered in two SVG layers stacked around the
 * heading. The back layer (z-0) is unmasked; the front layer (z-20) is
 * masked to four vertical reveal bands. Both layers run the SAME stroke
 * animation in sync — pathLength + pathOffset keyframes make a "snake"
 * grow from the start, travel across the heading, and disappear off the
 * end, then loop. The mask on the front layer means the snake reads as
 * IN FRONT of letters inside the reveal bands and BEHIND letters in
 * between — that's the weave.
 *
 * Reduced-motion: full squiggle painted instantly, no snake motion.
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

        {/* Headline area: back layer + heading + front (masked) layer */}
        <div className="relative flex items-center justify-center min-h-[clamp(11rem,28vw,22rem)]">
          {/* BACK squiggle — sits behind the type */}
          <Squiggle masked={false} reduceMotion={Boolean(reduceMotion)} className="z-0" />

          <h1
            className={[
              "relative z-10",
              "font-display font-black uppercase",
              "text-[clamp(2.75rem,11vw,8.5rem)]",
              "leading-[0.95] tracking-[-0.02em]",
              "text-text",
              "max-w-[16ch]",
              "mx-auto",
            ].join(" ")}
          >
            Výsledky,
            <br />
            které vidíte.
          </h1>

          {/* FRONT squiggle — same path + animation, masked to alternating bands */}
          <Squiggle masked reduceMotion={Boolean(reduceMotion)} className="z-20" />
        </div>

        {/* Subhead with bolded key phrases */}
        <p className="mt-10 sm:mt-12 text-lg sm:text-xl md:text-2xl text-text max-w-2xl mx-auto leading-snug font-medium">
          <strong className="font-extrabold">Přivádíme klienty</strong>{" "}
          realitkám a cestovkám.{" "}
          <strong className="font-extrabold">Měřitelně.</strong>
        </p>

        {/* Short body line below */}
        <p className="mt-5 text-sm sm:text-base text-[var(--theme-muted,#666)] max-w-xl mx-auto leading-relaxed">
          Neděláme marketing pro všechny. Specializujeme se na výkonnostní
          kampaně, weby a sociální sítě pro realitní trh a cestovní agentury.
          Žádný korporátní šum, jen výsledky, které uvidíte v obratu.
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
            label="Růstových projektů a klientů"
          />
          <Stat
            value={
              <span className="font-display text-base sm:text-2xl md:text-4xl font-black whitespace-nowrap">
                META + GGL
              </span>
            }
            label="Certifikovaní partneři"
          />
          <Stat
            value={
              <StatCounter
                value={100}
                suffix="%"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-black"
              />
            }
            label="Osobní nasazení"
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
   Squiggle — one path, rendered twice in synchronised layers.
   ============================================================ */

const ACCENT = "#e63030";

// Single shared path. Five flowing humps span beyond the viewBox so the
// stroke enters from the left and exits to the right cleanly.
const PATH_D =
  "M -120 220 " +
  "C 80 60, 240 60, 420 220 " +
  "S 700 380, 880 220 " +
  "S 1160 60, 1340 220 " +
  "S 1620 380, 1800 220 " +
  "S 2080 60, 2200 220";

// Cycle: 1.4s "appear from left" → 3.4s "travel across" → 1.6s "exit on
// right" → 0.4s rest → repeat. Total = 6.8s.
const ENTRY_END = 0.21; // ≈ 1.4 / 6.8
const TRAVEL_END = 0.71; // ≈ (1.4 + 3.4) / 6.8
const EXIT_END = 0.94; // ≈ (1.4 + 3.4 + 1.6) / 6.8

const SNAKE_LENGTH = 0.4;

function Squiggle({
  masked,
  className,
  reduceMotion,
}: {
  masked: boolean;
  className?: string;
  reduceMotion: boolean;
}) {
  // Stable IDs — picked at module scope below so back + front don't collide
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 2080 440"
      preserveAspectRatio="xMidYMid meet"
      className={[
        "absolute inset-0",
        "w-[128%] sm:w-[118%] md:w-[112%]",
        "h-[120%] -left-[14%] sm:-left-[9%] md:-left-[6%] -top-[10%]",
        "pointer-events-none",
        className ?? "",
      ].join(" ")}
    >
      {masked && (
        <defs>
          {/* Four reveal bands across the SVG width — the bands where the
              squiggle reads as "in front" of the letters. Black = hide,
              white = reveal. */}
          <mask id="weave-mask">
            <rect width="100%" height="100%" fill="black" />
            <rect x="9%" width="10%" height="100%" fill="white" />
            <rect x="32%" width="10%" height="100%" fill="white" />
            <rect x="55%" width="10%" height="100%" fill="white" />
            <rect x="78%" width="10%" height="100%" fill="white" />
          </mask>
        </defs>
      )}
      <motion.path
        d={PATH_D}
        fill="none"
        stroke={ACCENT}
        strokeWidth={46}
        strokeLinecap="round"
        strokeLinejoin="round"
        mask={masked ? "url(#weave-mask)" : undefined}
        initial={
          reduceMotion
            ? { pathLength: 1, pathOffset: 0 }
            : { pathLength: 0, pathOffset: 0 }
        }
        animate={
          reduceMotion
            ? { pathLength: 1, pathOffset: 0 }
            : {
                pathLength: [0, SNAKE_LENGTH, SNAKE_LENGTH, SNAKE_LENGTH, 0],
                pathOffset: [0, 0, 1 - SNAKE_LENGTH, 1, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 6.8,
                ease: "linear",
                repeat: Infinity,
                times: [0, ENTRY_END, TRAVEL_END, EXIT_END, 1],
              }
        }
      />
    </svg>
  );
}
