"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/lib/services";
import { fillFor } from "@/lib/service-fills";
import { cn } from "@/lib/cn";

interface BentoCard {
  slug: string;
  /** Tailwind grid placement classes for md+ breakpoint */
  span: string;
  /** Hero card gets a larger title and a one-line description */
  hero?: boolean;
}

const layout: BentoCard[] = [
  { slug: "meta-ads", span: "md:col-span-3 md:row-span-1" },
  { slug: "weby", span: "md:col-span-9 md:row-span-1", hero: true },
  { slug: "social-media", span: "md:col-span-3 md:row-span-2" },
  { slug: "google-ads", span: "md:col-span-5 md:row-span-1" },
  { slug: "video", span: "md:col-span-4 md:row-span-1" },
  { slug: "grafika", span: "md:col-span-9 md:row-span-1" },
];

const VIEWPORT_TRIGGER = { once: true, amount: 0.2 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesBento() {
  return (
    <section
      id="sluzby"
      data-section-theme="dark"
      data-theme-id="services-bento"
      className="py-24 md:py-32 px-6 overflow-hidden"
    >
      <header className="text-center mb-14 md:mb-20">
        <span className="inline-block text-xs font-bold uppercase tracking-[4px] text-accent mb-4">
          Co umíme
        </span>
        {/* Inherit the body's active theme colour so the heading stays
            readable while the scroll-theme transitions the page from a
            light surface to this section's dark surface. Transition timing
            matches the body's 480ms easing in globals.css so they move
            together as one. */}
        <h2
          className="text-4xl md:text-5xl"
          style={{
            color: "var(--theme-fg, #111)",
            transition: "color 480ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          Marketing, který se vyplatí
        </h2>
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
}: {
  card: BentoCard;
  service: Service;
  index: number;
}) {
  const fill = fillFor(card.slug);
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={VIEWPORT_TRIGGER}
      transition={{
        duration: 0.5,
        ease: EASE,
        delay: Math.min(index * 0.06, 0.3),
      }}
      // CSS variables hold the per-card hover palette so `group-hover`
      // utilities below can read them. Default colours (white text +
      // gray background) live in the Tailwind classes themselves.
      style={
        {
          "--c-fill": fill.bg,
          "--c-fg": fill.fg,
          "--c-muted": fill.fgMuted,
          "--c-arrow-bg": fill.arrowBg,
          "--c-arrow-text": fill.arrowText,
        } as React.CSSProperties
      }
      className={cn(
        "relative overflow-hidden",
        "min-h-[220px] md:min-h-0",
        "group cursor-default",
        // Default: warm dark-gray. On hover the background swaps to
        // var(--c-fill) over 300ms — smooth fade between the two states.
        "bg-[#262626] hover:bg-[color:var(--c-fill)]",
        "transition-colors duration-300",
        card.span,
      )}
    >
      {/* Sonar arcs in the top-right corner — hidden by default,
          revealed on hover in the variant's foreground colour. */}
      <HoverArcs />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6 md:p-7">
        {/* Top row: icon + number on left, arrow on right */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Icon
              aria-hidden="true"
              strokeWidth={1.75}
              className={cn(
                "w-7 h-7 transition-colors duration-300",
                "text-white group-hover:text-[color:var(--c-fg)]",
              )}
            />
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-[3px]",
                "transition-colors duration-300",
                "text-white/65 group-hover:text-[color:var(--c-muted)]",
              )}
            >
              {service.num}
            </span>
          </div>

          <Link
            href={`/sluzby#${service.slug}`}
            aria-label={`Více o službě ${service.title}`}
            className={cn(
              "shrink-0 w-9 h-9 rounded-full",
              "flex items-center justify-center",
              "border transition-all duration-300",
              "bg-transparent border-white/25 text-white",
              "group-hover:bg-[color:var(--c-arrow-bg)]",
              "group-hover:border-[color:var(--c-arrow-bg)]",
              "group-hover:text-[color:var(--c-arrow-text)]",
            )}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom row: title (+ optional hero one-liner) */}
        <div className="mt-auto">
          <h3
            className={cn(
              "font-display font-black uppercase",
              "leading-[1.05] tracking-tight",
              "transition-colors duration-300",
              "text-white group-hover:text-[color:var(--c-fg)]",
              card.hero
                ? "text-3xl md:text-4xl lg:text-5xl"
                : "text-2xl md:text-3xl",
            )}
          >
            {service.title}
          </h3>
          {card.hero && (
            <p
              className={cn(
                "mt-3 max-w-md leading-relaxed text-sm md:text-base",
                "transition-colors duration-300",
                "text-white/70 group-hover:text-[color:var(--c-muted)]",
              )}
            >
              {service.short}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Four concentric quarter-circle arcs anchored at the top-right corner
 * of the card — default invisible, fade in on hover. Colour follows the
 * card's --c-fg via currentColor so it always contrasts the variant bg.
 */
function HoverArcs() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 220"
      className={cn(
        "absolute top-0 right-0 w-36 h-36 md:w-44 md:h-44",
        "pointer-events-none",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-500",
        "text-[color:var(--c-fg)]",
      )}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="220" cy="0" r="70" />
        <circle cx="220" cy="0" r="115" />
        <circle cx="220" cy="0" r="160" />
        <circle cx="220" cy="0" r="205" />
      </g>
    </svg>
  );
}
