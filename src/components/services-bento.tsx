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
  /** Fallback gradient when the image is missing or fails to load */
  background: string;
  /**
   * Image under /public/img/services/. The file does not need to exist —
   * if missing, the gradient background is shown. Drop in a JPG with the
   * matching slug to swap visuals without touching code.
   */
  image: string;
  /** Hero card gets a larger title and one-line description */
  hero?: boolean;
}

const layout: BentoCard[] = [
  {
    slug: "meta-ads",
    span: "md:col-span-3 md:row-span-1",
    background: "linear-gradient(135deg, #2a2a2a 0%, #0d0d0d 100%)",
    image: "/img/services/meta-ads.jpg",
  },
  {
    slug: "weby",
    span: "md:col-span-9 md:row-span-1",
    background:
      "linear-gradient(120deg, #1a1a1a 0%, #0d0d0d 60%, #2a2a2a 100%)",
    image: "/img/services/weby.jpg",
    hero: true,
  },
  {
    slug: "social-media",
    span: "md:col-span-3 md:row-span-2",
    background: "linear-gradient(180deg, #2a2a2a 0%, #0d0d0d 100%)",
    image: "/img/services/social-media.jpg",
  },
  {
    slug: "google-ads",
    span: "md:col-span-5 md:row-span-1",
    background: "linear-gradient(135deg, #0d0d0d 0%, #2a2a2a 100%)",
    image: "/img/services/google-ads.jpg",
  },
  {
    slug: "video",
    span: "md:col-span-4 md:row-span-1",
    background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    image: "/img/services/video.jpg",
  },
  {
    slug: "grafika",
    span: "md:col-span-9 md:row-span-1",
    background:
      "linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #0d0d0d 100%)",
    image: "/img/services/grafika.jpg",
  },
];

export function ServicesBento() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Animation only starts once the section's top has scrolled to 50% of the
    // viewport (i.e. the section is already meaningfully in view) and finishes
    // when the section center hits viewport center.
    offset: ["start 50%", "center center"],
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

  return (
    <motion.article
      style={{ scale, opacity, y, background: card.background }}
      className={cn(
        "relative overflow-hidden",
        "border border-divider hover:border-text/30",
        "min-h-[220px] md:min-h-0",
        "flex flex-col justify-end group transition-colors duration-300",
        card.span,
      )}
    >
      {/* Photo (silently removes itself if file is missing) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image}
        alt=""
        loading="lazy"
        onError={(e) => {
          e.currentTarget.remove();
        }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />

      {/* Bottom-up dark overlay for text legibility — same pattern used on
          portfolio tiles, keeps the visual language consistent. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"
      />

      {/* Top-right corner link (glassmorphism) */}
      <Link
        href={`/sluzby#${service.slug}`}
        aria-label={`Více o službě ${service.title}`}
        className={cn(
          "absolute top-4 right-4 md:top-5 md:right-5 z-10",
          "w-10 h-10 rounded-full",
          "bg-white/10 backdrop-blur-md border border-white/20",
          "flex items-center justify-center text-white",
          "hover:bg-accent hover:border-accent transition-all duration-200",
        )}
      >
        <ArrowUpRight className="w-4 h-4" />
      </Link>

      {/* Bottom content (red number eyebrow + white title) */}
      <div className="relative z-10 p-6 md:p-8">
        <span className="text-xs font-bold uppercase tracking-[2px] text-accent">
          {service.num}
        </span>
        <h3
          className={cn(
            "text-white mt-2 leading-[1.05] tracking-tight",
            card.hero
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-2xl md:text-3xl",
          )}
        >
          {service.title}
        </h3>
        {card.hero && (
          <p className="text-white/70 mt-3 max-w-md leading-relaxed text-sm md:text-base">
            {service.short}
          </p>
        )}
      </div>
    </motion.article>
  );
}
