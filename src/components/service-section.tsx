"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { cn } from "@/lib/cn";

interface Props {
  /** Service slug — full data is looked up inside (icon functions can't
   *  cross the RSC → Client boundary as props). */
  slug: string;
  index: number;
}

/**
 * Per-service detail panel for the /sluzby page. Alternating layout
 * (text left vs. visual left depending on index parity) matches the
 * cinematic agency-page rhythm. Scroll-tied scale + opacity on the
 * visual mirrors the homepage bento's grow-in feel; the body content
 * lifts up subtly as the section enters view.
 */

const VISUAL_BG: Record<string, string> = {
  "meta-ads":
    "radial-gradient(circle at 80% 20%, rgba(230,48,48,0.18) 0%, transparent 55%), linear-gradient(135deg, #1c1c1c 0%, #0d0d0d 100%)",
  "google-ads":
    "radial-gradient(circle at 20% 80%, rgba(230,48,48,0.16) 0%, transparent 55%), linear-gradient(135deg, #0d0d0d 0%, #1f1f1f 100%)",
  "social-media":
    "radial-gradient(circle at 50% 90%, rgba(230,48,48,0.15) 0%, transparent 55%), linear-gradient(180deg, #0d0d0d 0%, #220d0d 100%)",
  weby:
    "radial-gradient(circle at 90% 50%, rgba(230,48,48,0.18) 0%, transparent 50%), linear-gradient(135deg, #1c0d0d 0%, #0d0d0d 50%, #1f1f1f 100%)",
  video:
    "radial-gradient(circle at 75% 25%, rgba(230,48,48,0.15) 0%, transparent 55%), linear-gradient(135deg, #1f1f1f 0%, #0d0d0d 50%, #1a0a0a 100%)",
  grafika:
    "radial-gradient(circle at 25% 50%, rgba(230,48,48,0.15) 0%, transparent 50%), linear-gradient(90deg, #0d0d0d 0%, #1f0d0d 60%, #2a0d0d 100%)",
};

export function ServiceSection({ slug, index }: Props) {
  const service = services.find((s) => s.slug === slug);
  const ref = useRef<HTMLDivElement>(null);

  if (!service) return null;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Visual: scales up as the section enters and gently shrinks on exit
  const visualScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [0.92, 1, 1, 0.97],
  );
  const visualOpacity = useTransform(scrollYProgress, [0, 0.25], [0.35, 1]);

  // Body: lifts up while entering
  const bodyY = useTransform(scrollYProgress, [0, 0.35], [40, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

  const Icon = service.icon;
  const isOdd = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className="py-20 md:py-28 border-b border-divider scroll-mt-24"
    >
      <div ref={ref} className="mx-auto max-w-(--container-default) px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual panel */}
          <motion.div
            style={{ scale: visualScale, opacity: visualOpacity }}
            className={cn(
              "relative aspect-[5/4] md:aspect-[4/3] overflow-hidden border border-divider",
              isOdd && "md:order-2",
            )}
          >
            {/* Layered background (red glow + dark gradient) */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: VISUAL_BG[service.slug] }}
            />

            {/* Faint icon as ambient watermark */}
            <Icon
              aria-hidden="true"
              strokeWidth={1.1}
              className="absolute -bottom-12 -right-12 w-[70%] h-[70%] text-white/[0.07]"
            />

            {/* Service number, top-left */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
              <span className="font-display font-black text-3xl md:text-4xl text-white/40 leading-none">
                {service.num}
              </span>
              <span className="block text-[10px] tracking-[3px] text-accent uppercase font-bold mt-2">
                Služba
              </span>
            </div>

            {/* Decorative red corner accent, bottom-right */}
            <div
              aria-hidden="true"
              className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-[2px] bg-accent"
            />
          </motion.div>

          {/* Body */}
          <motion.div
            style={{ y: bodyY, opacity: bodyOpacity }}
            className={cn(isOdd && "md:order-1")}
          >
            <div className="font-display text-5xl md:text-6xl text-accent leading-none mb-3 opacity-90">
              {service.num}
            </div>
            <h2 className="text-3xl md:text-4xl mb-5">{service.title}</h2>
            <p className="text-lg text-text-muted mb-7 leading-relaxed">
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
