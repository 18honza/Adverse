"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StaggerLine } from "./split-text";

/**
 * The red drench opening. A 240vh scroll scene: the viewport pins, the
 * whole screen is poster red with massive white type ("VIDÍTE." runs as
 * an outline stroke). As you scroll, the red surface lifts like a
 * curtain (scroll-driven clip-path) and reveals the paper claim
 * underneath, which then continues as the normal page flow.
 *
 * Initial state is fully designed (type visible after its entrance), so
 * a visitor who never scrolls still sees a complete poster.
 */
export function HeroDrench() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Curtain lift: idle through the first half (let people read), then
  // clip from the bottom edge up until the red is gone.
  const clip = useTransform(
    scrollYProgress,
    [0.42, 0.94],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
  );
  // The red content drifts up slightly faster than the curtain for depth.
  const redY = useTransform(scrollYProgress, [0.42, 0.94], ["0%", "-14%"]);
  // The paper layer underneath settles into place as it is revealed.
  const underScale = useTransform(scrollYProgress, [0.42, 0.94], [1.06, 1]);
  const underOpacity = useTransform(scrollYProgress, [0.42, 0.7], [0.35, 1]);

  return (
    <section
      ref={ref}
      data-fable-tone="paper"
      className="relative h-[240vh]"
      aria-label="Výsledky, které vidíte. Přivádíme klienty realitkám a cestovkám, měřitelně."
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ---------- Paper layer, revealed by the lifting curtain ---------- */}
        <motion.div
          aria-hidden="true"
          style={{ scale: underScale, opacity: underOpacity }}
          className="absolute inset-0 flex flex-col items-start justify-center bg-[color:var(--f-paper)] px-[6vw]"
        >
          <span className="mb-6 text-[11px] font-bold uppercase tracking-[3px] text-[color:var(--f-red)]">
            (01) Přístup
          </span>
          <p className="font-display font-bold uppercase leading-[0.98] tracking-tight text-[clamp(2.2rem,7.5vw,6.5rem)] text-[color:var(--f-ink)]">
            Neděláme
            <br />
            šablony<span className="text-[color:var(--f-red)]">.</span>
          </p>
          <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-[color:var(--f-ink)]/70">
            Tvoříme kampaně, které reálně prodávají. Realitkám a cestovkám,
            v Česku, na datech.
          </p>
        </motion.div>

        {/* ---------- Red curtain ---------- */}
        <motion.div
          style={{ clipPath: clip }}
          className="absolute inset-0 z-10 bg-[color:var(--f-red)] text-[color:var(--f-white)]"
        >
          <motion.div
            style={{ y: redY }}
            className="flex h-full flex-col justify-between px-[6vw] pt-24 pb-0"
          >
            {/* Top block: eyebrow + massive poster type */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="mb-5 block text-[11px] font-bold uppercase tracking-[3px] text-[color:var(--f-white)]/75"
              >
                Adverse — digitální marketing pro realitky a cestovky
              </motion.span>

              <h1
                aria-label="Výsledky, které vidíte."
                className="font-display font-bold uppercase leading-[0.92] tracking-[-0.02em] text-[clamp(3.2rem,12.5vw,11rem)]"
              >
                <StaggerLine text="Výsledky," className="block" delay={0.25} />
                <StaggerLine
                  text="které"
                  className="mr-[0.22em]"
                  delay={0.5}
                />
                <StaggerLine
                  text="vidíte."
                  charClassName="fable-stroke-white"
                  delay={0.62}
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
                className="mt-7 max-w-lg text-base sm:text-xl leading-snug font-medium text-[color:var(--f-white)]/90"
              >
                Přivádíme klienty realitkám a cestovkám.{" "}
                <strong className="font-extrabold text-[color:var(--f-white)]">
                  Měřitelně.
                </strong>
              </motion.p>
            </div>

            {/* Bottom: stats row + scroll hint, then the marquee strip */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.35 }}
                className="flex items-end justify-between gap-6 border-t border-[color:var(--f-white)]/25 py-5"
              >
                <dl className="flex gap-8 sm:gap-14">
                  {[
                    ["12+", "růstových projektů"],
                    ["2", "obory: reality a travel"],
                    ["100 %", "osobní nasazení"],
                  ].map(([num, label]) => (
                    <div key={label}>
                      <dt className="sr-only">{label}</dt>
                      <dd className="font-display text-xl sm:text-3xl font-bold leading-none">
                        {num}
                      </dd>
                      <dd className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[2px] text-[color:var(--f-white)]/65">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div
                  aria-hidden="true"
                  className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[3px] text-[color:var(--f-white)]/65"
                >
                  Scrolluj
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ↓
                  </motion.span>
                </div>
              </motion.div>

              {/* Marquee strip along the bottom edge of the poster */}
              <div
                aria-hidden="true"
                className="overflow-hidden border-t border-[color:var(--f-white)]/25 py-3 -mx-[6vw]"
              >
                <div className="fable-marquee flex whitespace-nowrap font-display font-bold uppercase text-[clamp(1.4rem,3.2vw,2.6rem)] leading-none text-[color:var(--f-white)]/30">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <span key={i} className="shrink-0">
                      Meta Ads ✺ Google Ads ✺ Weby ✺ Video ✺ Sociální sítě ✺
                      Grafika ✺
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
