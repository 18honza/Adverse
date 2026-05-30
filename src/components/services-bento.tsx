"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/lib/services";
import { ServiceGraphic } from "@/components/service-graphic";
import { fillFor } from "@/lib/service-fills";
import { cn } from "@/lib/cn";

interface BentoCard {
  slug: string;
  /** Tailwind grid placement classes for md+ breakpoint */
  span: string;
  /** Default dark surface (visible until hover); same layered gradient
   *  + red glow we've been using on bento cards. */
  background: string;
  /** Hero card gets a larger title and one-line description */
  hero?: boolean;
}

const layout: BentoCard[] = [
  {
    slug: "meta-ads",
    span: "md:col-span-3 md:row-span-1",
    background:
      "radial-gradient(circle at 85% 20%, rgba(230,48,48,0.18) 0%, transparent 55%), linear-gradient(135deg, #1f1f1f 0%, #0d0d0d 100%)",
  },
  {
    slug: "weby",
    span: "md:col-span-9 md:row-span-1",
    background:
      "radial-gradient(circle at 80% 50%, rgba(230,48,48,0.18) 0%, transparent 50%), linear-gradient(120deg, #1a1a1a 0%, #0d0d0d 50%, #1f1f1f 100%)",
    hero: true,
  },
  {
    slug: "social-media",
    span: "md:col-span-3 md:row-span-2",
    background:
      "radial-gradient(circle at 50% 90%, rgba(230,48,48,0.15) 0%, transparent 50%), linear-gradient(180deg, #1f1f1f 0%, #0d0d0d 100%)",
  },
  {
    slug: "google-ads",
    span: "md:col-span-5 md:row-span-1",
    background:
      "radial-gradient(circle at 15% 80%, rgba(230,48,48,0.16) 0%, transparent 55%), linear-gradient(135deg, #0d0d0d 0%, #1f1f1f 100%)",
  },
  {
    slug: "video",
    span: "md:col-span-4 md:row-span-1",
    background:
      "radial-gradient(circle at 75% 25%, rgba(230,48,48,0.16) 0%, transparent 55%), linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
  },
  {
    slug: "grafika",
    span: "md:col-span-9 md:row-span-1",
    background:
      "radial-gradient(circle at 25% 50%, rgba(230,48,48,0.15) 0%, transparent 50%), linear-gradient(90deg, #1a1a1a 0%, #1f0d0d 50%, #0d0d0d 100%)",
  },
];

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
        <h2 className="text-4xl md:text-5xl text-white">
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

const VIEWPORT_TRIGGER = { once: true, amount: 0.2 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

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

  return (
    <motion.article
      // Card is visible from first paint (opacity stays 1); the entry just
      // nudges scale + y when it enters viewport. This stays robust even if
      // the viewport-trigger fires after the user has already scrolled
      // past — the card is readable either way.
      initial={{ scale: 0.96, y: 16 }}
      whileInView={{ scale: 1, y: 0 }}
      viewport={VIEWPORT_TRIGGER}
      transition={{
        duration: 0.5,
        ease: EASE,
        delay: Math.min(index * 0.06, 0.3),
      }}
      style={
        {
          background: card.background,
          "--fill-bg": fill.bg,
          "--fill-text": fill.text,
          "--fill-num": fill.num,
          "--fill-accent": fill.accent,
          "--fill-arrow-bg": fill.arrowBg,
          "--fill-arrow-border": fill.arrowBorder,
          "--fill-arrow-text": fill.arrowText,
        } as unknown as React.CSSProperties
      }
      className={cn(
        "relative overflow-hidden",
        "border border-white/10",
        "min-h-[220px] md:min-h-0",
        "flex flex-col justify-end group",
        // Hover lifts the card's border a hair; the colour fill does the rest.
        "transition-colors duration-300 hover:border-white/30",
        card.span,
      )}
    >
      {/* Default surface — ambient decoration (dot grid + ServiceGraphic).
          Fades out on hover so the fill colour reads clean. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
      >
        <ServiceGraphic slug={service.slug} />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      </div>

      {/* Fill overlay — variant colour, fades in on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "var(--fill-bg)" }}
      />

      {/* Top-right arrow link */}
      <Link
        href={`/sluzby#${service.slug}`}
        aria-label={`Více o službě ${service.title}`}
        className={cn(
          "absolute top-4 right-4 md:top-5 md:right-5 z-10",
          "w-10 h-10 rounded-full",
          "flex items-center justify-center",
          "border transition-colors duration-300",
          // Default: glass on dark
          "bg-white/10 backdrop-blur-md border-white/20 text-white",
          // Hover: variant
          "group-hover:bg-[color:var(--fill-arrow-bg)]",
          "group-hover:border-[color:var(--fill-arrow-border)]",
          "group-hover:text-[color:var(--fill-arrow-text)]",
          "group-hover:backdrop-blur-0",
        )}
      >
        <ArrowUpRight className="w-4 h-4" />
      </Link>

      {/* Bottom content */}
      <div className="relative z-10 p-6 md:p-8">
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-[2px]",
            "text-accent transition-colors duration-300",
            "group-hover:text-[color:var(--fill-num)]",
          )}
        >
          {service.num}
        </span>
        <h3
          className={cn(
            "mt-2 leading-[1.05] tracking-tight",
            "text-white transition-colors duration-300",
            "group-hover:text-[color:var(--fill-text)]",
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
              "text-white/70 transition-colors duration-300",
              "group-hover:text-[color:var(--fill-text)]/85",
            )}
          >
            {service.short}
          </p>
        )}
      </div>
    </motion.article>
  );
}
