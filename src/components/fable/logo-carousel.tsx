"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cycling logo columns (cult-ui pattern): each column holds one logo at
 * a time and swaps it on a staggered timer with a blur + rise transition.
 * Far calmer than a marquee, far livelier than a static strip.
 */

const GRAY = "3d372e"; // warm ink-tinted gray for the paper surface

const LOGOS = [
  { alt: "Meta", src: `https://cdn.simpleicons.org/meta/${GRAY}` },
  { alt: "Google Ads", src: `https://cdn.simpleicons.org/googleads/${GRAY}` },
  { alt: "HubSpot", src: `https://cdn.simpleicons.org/hubspot/${GRAY}` },
  { alt: "Semrush", src: `https://cdn.simpleicons.org/semrush/${GRAY}` },
  { alt: "Mailchimp", src: `https://cdn.simpleicons.org/mailchimp/${GRAY}` },
  { alt: "Hootsuite", src: `https://cdn.simpleicons.org/hootsuite/${GRAY}` },
  { alt: "Figma", src: `https://cdn.simpleicons.org/figma/${GRAY}` },
  { alt: "Behance", src: `https://cdn.simpleicons.org/behance/${GRAY}` },
];

const COLUMNS = 4;
const CYCLE_MS = 2600;

export function LogoCarousel() {
  // Column c shows LOGOS[(step + c * offset) % len] — staggered start so
  // columns never swap in unison.
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      data-fable-tone="ink"
      className="bg-[color:var(--f-paper)] px-[6vw] pb-[14vh]"
    >
      <div className="mx-auto max-w-5xl">
        <span className="block text-center text-[11px] font-bold uppercase tracking-[3px] text-[color:var(--f-red)] mb-10">
          (02) Inspirují nás nejlepší
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10">
          {Array.from({ length: COLUMNS }).map((_, col) => {
            const logo = LOGOS[(step + col * 2) % LOGOS.length];
            return (
              <div
                key={col}
                className="relative flex h-14 items-center justify-center overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    draggable={false}
                    className="h-8 sm:h-9 w-auto select-none opacity-75"
                    initial={{ y: 26, opacity: 0, filter: "blur(6px)" }}
                    animate={{
                      y: 0,
                      opacity: 0.75,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                        delay: col * 0.09,
                      },
                    }}
                    exit={{
                      y: -26,
                      opacity: 0,
                      filter: "blur(6px)",
                      transition: {
                        duration: 0.35,
                        ease: [0.55, 0, 1, 0.45],
                        delay: col * 0.09,
                      },
                    }}
                  />
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
