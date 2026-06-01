"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Eyebrow } from "@/components/eyebrow";
import { cn } from "@/lib/cn";

/**
 * Scroll-reactive logo row. Each logo starts spread out (horizontally
 * offset by its distance from the centre, pushed down, scaled down) and
 * "assembles" into a neat centred row as the section scrolls through the
 * viewport — adapted from the Skiper-31 CharacterV2 pattern, but driven by
 * native scroll (no Lenis) so it plays nicely with the site's existing
 * scroll-theme system.
 *
 * Logos are monochrome placeholders pulled from the Simple Icons CDN.
 * Swap `defaultLogos` (or pass a `logos` prop) for real client logos later.
 */

export interface LogoItem {
  src: string;
  alt: string;
}

const GRAY = "525252"; // neutral-600 — tasteful on the cream surface

// World-class names of the marketing / creative / social field — the best
// in the craft, matching the "inspirují nás nejlepší" eyebrow. Monochrome
// marks from the Simple Icons CDN. Swap for real client logos later.
const defaultLogos: LogoItem[] = [
  { src: `https://cdn.simpleicons.org/meta/${GRAY}`, alt: "Meta" },
  { src: `https://cdn.simpleicons.org/googleads/${GRAY}`, alt: "Google Ads" },
  { src: `https://cdn.simpleicons.org/hubspot/${GRAY}`, alt: "HubSpot" },
  { src: `https://cdn.simpleicons.org/semrush/${GRAY}`, alt: "Semrush" },
  { src: `https://cdn.simpleicons.org/mailchimp/${GRAY}`, alt: "Mailchimp" },
  { src: `https://cdn.simpleicons.org/hootsuite/${GRAY}`, alt: "Hootsuite" },
  { src: `https://cdn.simpleicons.org/figma/${GRAY}`, alt: "Figma" },
  { src: `https://cdn.simpleicons.org/behance/${GRAY}`, alt: "Behance" },
];

function LogoCell({
  logo,
  index,
  centerIndex,
  progress,
  reduced,
}: {
  logo: LogoItem;
  index: number;
  centerIndex: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const distance = index - centerIndex;

  // Hooks must run unconditionally, so always create the transforms; we
  // simply ignore them (render static) when reduced motion is requested.
  const x = useTransform(progress, [0, 0.85], [distance * 64, 0]);
  const y = useTransform(progress, [0, 0.85], [Math.abs(distance) * 44, 0]);
  const scale = useTransform(progress, [0, 0.85], [0.7, 1]);
  const opacity = useTransform(progress, [0, 0.65], [0, 1]);

  return (
    <motion.img
      src={logo.src}
      alt={logo.alt}
      loading="lazy"
      draggable={false}
      className={cn(
        "inline-block h-7 md:h-9 w-auto select-none",
        "opacity-80 hover:opacity-100 transition-opacity duration-200",
      )}
      style={
        reduced
          ? undefined
          : { x, y, scale, opacity, transformOrigin: "center" }
      }
    />
  );
}

export function LogoScroll({
  logos = defaultLogos,
  eyebrow = "Inspirují nás nejlepší",
}: {
  logos?: LogoItem[];
  eyebrow?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion() ?? false;

  // Progress runs from 0 (section top reaches the viewport bottom) to 1
  // (section centre reaches the viewport centre) — the assemble window.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const centerIndex = (logos.length - 1) / 2;

  return (
    <section
      ref={ref}
      data-section-theme="cream"
      data-theme-id="clients"
      className="px-6 py-16 md:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-(--container-default) text-center">
        <Eyebrow>{eyebrow}</Eyebrow>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16"
          style={{ perspective: "600px" }}
        >
          {logos.map((logo, index) => (
            <LogoCell
              key={logo.alt}
              logo={logo}
              index={index}
              centerIndex={centerIndex}
              progress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
