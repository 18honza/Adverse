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
import { cn } from "@/lib/cn";

interface BentoCard {
  slug: string;
  /** Tailwind grid placement classes for md+ breakpoint */
  span: string;
  /** Multi-layer background CSS — usually a gradient + soft red glow */
  background: string;
  /** Hero card gets larger title + a one-line description */
  hero?: boolean;
}

const layout: BentoCard[] = [
  {
    slug: "meta-ads",
    span: "md:col-span-3 md:row-span-1",
    background:
      "radial-gradient(circle at 85% 15%, rgba(230,48,48,0.18) 0%, transparent 55%), linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
  },
  {
    slug: "weby",
    span: "md:col-span-9 md:row-span-1",
    background:
      "radial-gradient(circle at 90% 50%, rgba(230,48,48,0.16) 0%, transparent 50%), linear-gradient(135deg, #1c0d0d 0%, #0d0d0d 50%, #1a1a1a 100%)",
    hero: true,
  },
  {
    slug: "social-media",
    span: "md:col-span-3 md:row-span-2",
    background:
      "radial-gradient(circle at 50% 90%, rgba(230,48,48,0.14) 0%, transparent 50%), linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 60%, #220d0d 100%)",
  },
  {
    slug: "google-ads",
    span: "md:col-span-5 md:row-span-1",
    background:
      "radial-gradient(circle at 15% 85%, rgba(230,48,48,0.12) 0%, transparent 55%), linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
  },
  {
    slug: "video",
    span: "md:col-span-4 md:row-span-1",
    background:
      "radial-gradient(circle at 75% 25%, rgba(230,48,48,0.14) 0%, transparent 55%), linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a0a0a 100%)",
  },
  {
    slug: "grafika",
    span: "md:col-span-9 md:row-span-1",
    background:
      "radial-gradient(circle at 25% 50%, rgba(230,48,48,0.14) 0%, transparent 50%), linear-gradient(90deg, #0d0d0d 0%, #1a0d0d 60%, #2a0d0d 100%)",
  },
];

export function ServicesBento() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  return (
    <section
      id="sluzby"
      ref={ref}
      className="bg-bg text-text py-24 md:py-32 px-6 overflow-hidden"
    >
      <header className="text-center mb-14 md:mb-20">
        <span className="inline-block text-xs font-bold uppercase tracking-[4px] text-accent mb-4">
          Co umíme
        </span>
        <h2 className="text-4xl md:text-5xl">Marketing, který se vyplatí</h2>
      </header>

      <div
        className={cn(
          "mx-auto max-w-(--container-default)",
          "grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4",
          "md:auto-rows-[220px]",
        )}
      >
        {layout.map((card, i) => {
          const service = services.find((s) => s.slug === card.slug);
          if (!service) return null;
          return (
            <BentoCardItem
              key={card.slug}
              card={card}
              service={service}
              index={i}
              scrollProgress={scrollYProgress}
            />
          );
        })}
      </div>
    </section>
  );
}

function BentoCardItem({
  card,
  service,
  index,
  scrollProgress,
}: {
  card: BentoCard;
  service: Service;
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  // Each card starts its grow-in noticeably later than the previous one —
  // gives a clear cascade ripple as the section enters the viewport.
  const stagger = 0.1;
  const duration = 0.4;
  const start = index * stagger;
  const end = Math.min(start + duration, 1);

  const scale = useTransform(scrollProgress, [start, end], [0.55, 1]);
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [60, 0]);

  const Icon = service.icon;

  return (
    <motion.article
      style={{ scale, opacity, y, background: card.background }}
      className={cn(
        "relative overflow-hidden rounded-xl md:rounded-2xl",
        "border border-white/10 hover:border-white/25",
        "p-6 md:p-8 group transition-colors duration-300",
        "min-h-[220px] md:min-h-0",
        "flex flex-col justify-between",
        card.span,
      )}
    >
      {/* Faint icon as ambient bg element */}
      <Icon
        aria-hidden="true"
        strokeWidth={1.25}
        className={cn(
          "absolute pointer-events-none text-white/[0.05] transition-all duration-500",
          "group-hover:text-white/[0.08] group-hover:scale-105",
          card.hero
            ? "right-6 md:right-12 -bottom-8 md:-bottom-16 w-56 h-56 md:w-72 md:h-72"
            : "-bottom-4 -right-4 w-28 h-28 md:w-36 md:h-36",
        )}
      />

      {/* Top row: numeric eyebrow + circular link */}
      <div className="relative flex items-start justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[3px] text-accent">
          {service.num}
        </span>
        <Link
          href={`/sluzby#${service.slug}`}
          aria-label={`Více o službě ${service.title}`}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
            "border border-white/20 text-white/70",
            "hover:bg-accent hover:border-accent hover:text-white",
            "transition-all duration-200",
          )}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Bottom: title + optional one-liner for hero */}
      <div className="relative">
        <h3
          className={cn(
            "text-white tracking-tight leading-[1.05]",
            card.hero
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-2xl md:text-3xl",
          )}
        >
          {service.title}
        </h3>
        {card.hero && (
          <p className="text-white/60 mt-4 max-w-md leading-relaxed text-sm md:text-base">
            {service.short}
          </p>
        )}
      </div>
    </motion.article>
  );
}
