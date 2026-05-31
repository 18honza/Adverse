"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { fillFor } from "@/lib/service-fills";
import { cn } from "@/lib/cn";

interface Props {
  /** Service slug — full data is looked up inside (icon functions can't
   *  cross the RSC → Client boundary as props). */
  slug: string;
  index: number;
}

/**
 * Per-service detail panel for the /sluzby page. Alternating layout
 * (text left vs. visual left depending on index parity). The visual panel
 * is permanently filled in this service's variant colour (matching the
 * homepage bento card's hover state), so visiting /sluzby feels like an
 * "expanded" view of the bento — same vocabulary, more space.
 */

const VIEWPORT_TRIGGER = { once: true, amount: 0.2 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceSection({ slug, index }: Props) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  const Icon = service.icon;
  const fill = fillFor(slug);
  const isOdd = index % 2 === 1;
  const isLightFill = fill.bg === "#ffffff";

  return (
    <section
      id={service.slug}
      className="py-14 md:py-24 lg:py-28 border-b border-divider scroll-mt-24"
    >
      <div className="mx-auto max-w-(--container-default) px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
          {/* Visual panel — permanently filled in the variant colour,
              same vocabulary as the bento card's hover state (sonar arcs
              in the top-right corner). */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_TRIGGER}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ background: fill.bg, color: fill.fg }}
            className={cn(
              "relative aspect-[5/4] md:aspect-[4/3] overflow-hidden w-full",
              "border",
              // White cards need a visible border; dark/red cards don't.
              isLightFill ? "border-divider" : "border-transparent",
              isOdd && "md:order-2",
            )}
          >
            {/* Concentric arcs in the top-right corner — matches the
                bento hover state visually. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 260 260"
              className="absolute top-0 right-0 w-2/5 h-2/5"
              style={{ color: fill.fg }}
            >
              <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9">
                <circle cx="260" cy="0" r="90" />
                <circle cx="260" cy="0" r="140" />
                <circle cx="260" cy="0" r="195" />
                <circle cx="260" cy="0" r="250" />
              </g>
            </svg>

            {/* Large faint icon watermark, bottom-left */}
            <Icon
              aria-hidden="true"
              strokeWidth={1.25}
              className="absolute -bottom-6 -left-6 w-[45%] h-[45%]"
              style={{ color: fill.fg, opacity: isLightFill ? 0.08 : 0.14 }}
            />

            {/* Service number + eyebrow, top-left */}
            <div className="absolute top-5 left-5 md:top-8 md:left-8 z-10">
              <span
                className="font-display font-black text-3xl md:text-4xl leading-none"
                style={{ color: fill.fg }}
              >
                {service.num}
              </span>
              <span
                className="block text-[10px] tracking-[3px] uppercase font-bold mt-2"
                style={{ color: fill.fgMuted }}
              >
                Služba
              </span>
            </div>

            {/* Title at bottom-left, matching the bento card layout */}
            <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 z-10 max-w-[80%]">
              <h3
                className="font-display font-black uppercase text-xl md:text-2xl lg:text-3xl leading-[1.05] tracking-tight"
                style={{ color: fill.fg }}
              >
                {service.title}
              </h3>
            </div>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_TRIGGER}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className={cn("min-w-0", isOdd && "md:order-1")}
          >
            <div className="font-display text-4xl md:text-5xl lg:text-6xl text-accent leading-none mb-3 opacity-90">
              {service.num}
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-5">
              {service.title}
            </h2>
            <p className="text-base md:text-lg text-text-muted mb-7 leading-relaxed">
              {service.lead}
            </p>
            <ul className="grid gap-3 mb-8">
              {service.bullets.map((b) => (
                <li key={b} className="relative pl-7 text-text">
                  <span className="absolute left-0 top-3 w-3 h-[2px] bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-accent hover:text-accent-hover transition-colors group"
            >
              Domluvit konzultaci
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
