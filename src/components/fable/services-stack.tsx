"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/lib/services";
import { StaggerLine } from "./split-text";

/**
 * Sticky stacking deck: each service is a full-width plate that pins
 * under the previous one; as the next plate arrives, the pinned one
 * scales back and dims, building a physical stack of six. Fills rotate
 * warm-white / ink / red so neighbours never repeat. The sonar-arc motif
 * from the production site carries over as the identity thread.
 */

interface Fill {
  bg: string;
  fg: string;
  muted: string;
  border: string;
}

const FILLS: Fill[] = [
  {
    bg: "var(--f-white)",
    fg: "var(--f-ink)",
    muted: "rgba(25,21,18,0.62)",
    border: "var(--f-hairline)",
  },
  {
    bg: "var(--f-ink)",
    fg: "var(--f-white)",
    muted: "rgba(251,247,240,0.66)",
    border: "var(--f-hairline-light)",
  },
  {
    bg: "var(--f-red)",
    fg: "var(--f-white)",
    muted: "rgba(251,247,240,0.78)",
    border: "transparent",
  },
];

export function ServicesStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section data-fable-tone="ink" className="bg-[color:var(--f-paper)]">
      {/* Section intro */}
      <div className="px-[6vw] pt-[14vh] pb-[8vh]">
        <span className="block text-[11px] font-bold uppercase tracking-[3px] text-[color:var(--f-red)] mb-5">
          (03) Co umíme
        </span>
        <h2
          aria-label="Marketing, který se vyplatí"
          className="font-display font-bold uppercase leading-[0.96] tracking-tight text-[clamp(2.2rem,7vw,5.5rem)] text-[color:var(--f-ink)]"
        >
          <StaggerLine text="Marketing," className="block" />
          <StaggerLine text="který se vyplatí" delay={0.15} />
        </h2>
      </div>

      {/* The deck */}
      <div ref={ref} className="relative px-[4vw] sm:px-[6vw] pb-[12vh]">
        {services.map((service, i) => (
          <StackCard
            key={service.slug}
            service={service}
            index={i}
            total={services.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function StackCard({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const fill = FILLS[index % FILLS.length];
  const Icon = service.icon;

  // Once this card is pinned, scale it back as the rest of the deck
  // arrives on top of it.
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.028]);
  const dim = useTransform(progress, [start, 1], [0, (total - index) * 0.05]);
  const overlay = useTransform(dim, (v) => `rgba(15,12,9,${Math.max(0, v)})`);

  return (
    <div
      className="sticky"
      style={{ top: `calc(9vh + ${index * 16}px)`, marginBottom: "5vh" }}
    >
      <motion.article
        style={{
          scale,
          backgroundColor: fill.bg,
          color: fill.fg,
          borderColor: fill.border,
          transformOrigin: "center top",
        }}
        className="relative mx-auto flex h-[72vh] max-h-[680px] w-full max-w-[1200px] flex-col justify-between overflow-hidden border p-6 sm:p-10"
      >
        {/* Sonar arcs — the identity motif carried over from the live site */}
        <svg
          aria-hidden="true"
          viewBox="0 0 260 260"
          className="pointer-events-none absolute top-0 right-0 h-[46%] w-[46%]"
          style={{ color: fill.fg }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
            <circle cx="260" cy="0" r="70" />
            <circle cx="260" cy="0" r="120" />
            <circle cx="260" cy="0" r="175" />
            <circle cx="260" cy="0" r="235" />
          </g>
        </svg>

        {/* Top row: giant index + icon */}
        <div className="flex items-start justify-between">
          <span
            aria-hidden="true"
            className="font-display font-bold leading-none text-[clamp(3.5rem,9vw,7.5rem)] opacity-90"
          >
            {service.num}
          </span>
          <Icon
            aria-hidden="true"
            strokeWidth={1.5}
            className="mt-2 h-7 w-7 sm:h-9 sm:w-9"
          />
        </div>

        {/* Bottom: title + short + link */}
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-display font-bold uppercase leading-[0.98] tracking-tight text-[clamp(1.8rem,4.6vw,3.6rem)]">
              {service.title}
            </h3>
            <p
              className="mt-4 max-w-md text-sm sm:text-base leading-relaxed"
              style={{ color: fill.muted }}
            >
              {service.short}
            </p>
          </div>

          <Link
            href={`/sluzby#${service.slug}`}
            aria-label={`Více o službě ${service.title}`}
            className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[2.5px]"
          >
            Více
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-300 group-hover:rotate-45"
              style={{ borderColor: fill.fg }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Dimmer that deepens as the card sinks into the stack */}
        <motion.div
          aria-hidden="true"
          style={{ backgroundColor: overlay }}
          className="pointer-events-none absolute inset-0"
        />
      </motion.article>
    </div>
  );
}
