"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
 * cinematic agency-page rhythm.
 *
 * Animations use `whileInView` triggers (animate once when entering
 * viewport, then stay) instead of scroll-tied scrubbing — this avoids the
 * "ghost / not loaded" look on long mobile pages where many sections sit
 * pre-animation at low opacity for a long time.
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

const VIEWPORT_TRIGGER = { once: true, amount: 0.2 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceSection({ slug, index }: Props) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  const Icon = service.icon;
  const isOdd = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className="py-14 md:py-24 lg:py-28 border-b border-divider scroll-mt-24"
    >
      <div className="mx-auto max-w-(--container-default) px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_TRIGGER}
            transition={{ duration: 0.7, ease: EASE }}
            className={cn(
              "relative aspect-[5/4] md:aspect-[4/3] overflow-hidden border border-divider w-full",
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
              className="absolute -bottom-10 -right-10 w-[70%] h-[70%] text-white/[0.07]"
            />

            {/* Service number, top-left */}
            <div className="absolute top-5 left-5 md:top-8 md:left-8 z-10">
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
              className="absolute bottom-5 right-5 md:bottom-8 md:right-8 w-12 h-[2px] bg-accent"
            />
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
