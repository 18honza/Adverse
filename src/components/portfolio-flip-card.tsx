"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X, Play } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

/**
 * Flip card for the /portfolio grid. Front shows the project cover (or
 * gradient placeholder) with category tag + title. Click flips 180° around
 * the Y axis with a subtle scale-up; the back side shows a description and
 * category-specific content:
 *
 *   - web:       link button → liveUrl
 *   - ad:        result image (if any) + bullet stats
 *   - grafika:   supporting image
 *   - video:     embedded video / poster image
 *
 * Front cover photos are loaded from `item.cover` (drop a JPG/PNG into
 * /public/img/portfolio/ and reference it). When missing, the gradient
 * fallback shows.
 */
export function PortfolioFlipCard({
  item,
  className,
}: {
  item: PortfolioItem;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frontRef = useRef<HTMLButtonElement>(null);

  // Close on Escape when flipped — feels natural for "modal-ish" reveals
  useEffect(() => {
    if (!flipped) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFlipped(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flipped]);

  // Move focus to close button when flipped, back to front when unflipped
  useEffect(() => {
    if (flipped) closeRef.current?.focus();
    else frontRef.current?.focus({ preventScroll: true });
  }, [flipped]);

  return (
    <div
      className={cn("relative", className)}
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: flipped ? 180 : 0,
          scale: flipped ? 1.03 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ============ FRONT ============ */}
        <button
          ref={frontRef}
          type="button"
          onClick={() => setFlipped(true)}
          aria-label={`Zobrazit detail projektu: ${item.title}`}
          aria-expanded={flipped}
          tabIndex={flipped ? -1 : 0}
          className={cn(
            "absolute inset-0 backface-hidden",
            "group block w-full text-left cursor-pointer",
            "overflow-hidden border border-divider bg-surface-alt",
          )}
          style={item.cover ? undefined : { backgroundImage: item.gradient }}
        >
          {item.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.cover}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}

          {/* Bottom overlay for tag + title */}
          <div className="relative z-10 flex flex-col justify-end h-full bg-gradient-to-t from-black/85 via-black/0 to-transparent p-5 text-white">
            <span className="text-xs uppercase tracking-[2px] font-bold text-accent">
              {item.tag}
            </span>
            <h3 className="text-base text-white mt-1">{item.title}</h3>
          </div>

          {/* Click hint — appears on hover */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-4 right-4 z-10",
              "inline-flex items-center justify-center w-9 h-9 rounded-full",
              "bg-white/10 backdrop-blur-md border border-white/20 text-white",
              "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
              "transition-opacity duration-200",
            )}
          >
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </button>

        {/* ============ BACK ============ */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden",
            "bg-dark text-white border border-divider overflow-hidden flex flex-col",
          )}
          style={{ transform: "rotateY(180deg)" }}
          aria-hidden={!flipped}
        >
          <BackContent item={item} />

          {/* Close button */}
          <button
            ref={closeRef}
            type="button"
            onClick={() => setFlipped(false)}
            aria-label="Zavřít detail"
            tabIndex={flipped ? 0 : -1}
            className={cn(
              "absolute top-4 right-4 z-20 w-9 h-9 rounded-full",
              "bg-white/10 backdrop-blur-md border border-white/20 text-white",
              "flex items-center justify-center cursor-pointer",
              "hover:bg-accent hover:border-accent transition-colors",
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ============ Back side content (category-specific) ============

function BackContent({ item }: { item: PortfolioItem }) {
  const showMedia =
    (item.category === "video" && (item.backVideo || item.backImage)) ||
    ((item.category === "ad" || item.category === "grafika") && item.backImage);

  return (
    <>
      {/* Media area — placeholder gradient if no real media yet */}
      <div
        className="relative w-full aspect-[16/9] shrink-0 overflow-hidden"
        style={
          showMedia ? undefined : { backgroundImage: tintedGradient(item) }
        }
      >
        {item.category === "video" && item.backVideo ? (
          <video
            src={item.backVideo}
            controls
            playsInline
            className="w-full h-full object-cover bg-black"
          />
        ) : item.backImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.backImage}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : item.category === "video" ? (
          // Video placeholder — play icon centered on a dark surface
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center text-accent">
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </div>
          </div>
        ) : null}

        {/* Subtle bottom fade so the title at top of body reads cleanly */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark to-transparent pointer-events-none"
        />
      </div>

      {/* Body */}
      <div className="flex-1 px-5 sm:px-6 pb-6 pt-3 flex flex-col min-h-0">
        <span className="text-[10px] uppercase tracking-[3px] font-bold text-accent">
          {item.tag}
        </span>
        <h3 className="font-display font-black uppercase text-base sm:text-lg text-white mt-1 mb-3 leading-tight">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
            {item.description}
          </p>
        )}

        {item.results && item.results.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {item.results.map((r) => (
              <li
                key={r}
                className="text-[10px] font-bold text-accent uppercase tracking-[1px] border-l-2 border-accent pl-2 leading-tight"
              >
                {r}
              </li>
            ))}
          </ul>
        )}

        {item.category === "web" && item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-auto inline-flex items-center gap-2 w-fit",
              "text-xs font-bold uppercase tracking-[2px]",
              "text-accent hover:text-white",
              "border-b border-accent hover:border-white",
              "pb-1 transition-colors",
            )}
          >
            Navštívit web
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </>
  );
}

/** Tinted gradient for back-side media placeholder — slightly darker so
 *  any future poster image swaps in cleanly without contrast jump. */
function tintedGradient(item: PortfolioItem) {
  return item.gradient.replace(/#0d0d0d/g, "#0a0a0a");
}
