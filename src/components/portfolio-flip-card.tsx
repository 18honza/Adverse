"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X, Play, ExternalLink } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

/**
 * Flippable portfolio card. Front shows the cover (or gradient placeholder)
 * with tag + title; click flips 180° around Y while scaling up so the back
 * has room to breathe. The back is a light, paper-like panel with the
 * project description and category-specific demo content. Click the close
 * X (or press Esc) to flip back — the card eases down to its original size.
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

  // Esc to flip back
  useEffect(() => {
    if (!flipped) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFlipped(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flipped]);

  // Move focus to close button when flipped, back to card when unflipped
  useEffect(() => {
    if (flipped) closeRef.current?.focus({ preventScroll: true });
    else frontRef.current?.focus({ preventScroll: true });
  }, [flipped]);

  return (
    <div
      className={cn("relative", className)}
      style={{
        perspective: "1500px",
        // Lift the flipped card above its neighbours so the scale-up
        // doesn't get clipped by adjacent cards in the grid.
        zIndex: flipped ? 30 : 1,
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: flipped ? 180 : 0,
          scale: flipped ? 1.35 : 1,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
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
            "absolute inset-0",
            "group block w-full text-left cursor-pointer",
            "overflow-hidden border border-divider bg-surface-alt",
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundImage: item.cover ? undefined : item.gradient,
            // 3D hit-testing is unreliable across browsers — explicitly
            // disable pointer events on the face that's facing away so
            // clicks always reach the visible side (especially the X
            // button on the back face).
            pointerEvents: flipped ? "none" : "auto",
          }}
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
            "absolute inset-0 overflow-hidden",
            "bg-bg text-text border border-divider",
            "flex flex-col",
          )}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            // Inverse of the front — only receive clicks when this face
            // is the one facing the viewer.
            pointerEvents: flipped ? "auto" : "none",
          }}
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
              "absolute top-3 right-3 z-20 w-8 h-8 rounded-full",
              "bg-text text-white",
              "flex items-center justify-center cursor-pointer",
              "hover:bg-accent transition-colors",
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ============ Back side content ============

function BackContent({ item }: { item: PortfolioItem }) {
  return (
    <>
      {/* Top media / preview area — light theme */}
      <div
        className={cn(
          "relative w-full aspect-[16/9] shrink-0 overflow-hidden",
          "bg-surface-alt border-b border-divider",
        )}
      >
        {/* Subtle category-tinted gradient backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-90"
          style={{ backgroundImage: backdropFor(item.category) }}
        />

        {/* Subtle dot grid for texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:14px_14px]"
        />

        {/* Real media if provided, otherwise a category visual placeholder */}
        {item.category === "video" && item.backVideo ? (
          <video
            src={item.backVideo}
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-cover bg-black"
          />
        ) : item.backImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.backImage}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <CategoryPlaceholder category={item.category} />
        )}
      </div>

      {/* Body */}
      <div className="flex-1 px-5 sm:px-6 pt-4 pb-5 flex flex-col min-h-0 overflow-y-auto">
        <span className="text-[10px] uppercase tracking-[3px] font-bold text-accent">
          {item.tag}
        </span>
        <h3 className="font-display font-black uppercase text-base sm:text-lg text-text mt-1 mb-2 leading-tight">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-3">
            {item.description}
          </p>
        )}

        {item.results && item.results.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1.5 mb-3">
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
              "bg-text text-white px-4 py-2 rounded-sm",
              "hover:bg-accent transition-colors",
            )}
          >
            Navštívit web
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {item.category !== "web" && (
          <span className="mt-auto text-[10px] uppercase tracking-[2px] text-text-faint">
            Stiskni ✕ pro zavření
          </span>
        )}
      </div>
    </>
  );
}

// ============ Category-specific placeholder visuals ============

function CategoryPlaceholder({ category }: { category: PortfolioItem["category"] }) {
  if (category === "video") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center text-accent bg-bg/80 backdrop-blur-sm">
          <Play className="w-6 h-6 ml-0.5 fill-current" />
        </div>
      </div>
    );
  }
  if (category === "web") {
    // Stylised browser window mockup
    return (
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <svg
          viewBox="0 0 320 180"
          className="w-full max-w-[260px] text-text"
        >
          <g fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5">
            <rect x="20" y="20" width="280" height="140" rx="4" />
            <line x1="20" y1="44" x2="300" y2="44" />
          </g>
          <g fill="currentColor" fillOpacity="0.5">
            <circle cx="34" cy="32" r="3" />
            <circle cx="46" cy="32" r="3" />
            <circle cx="58" cy="32" r="3" />
          </g>
          <rect x="90" y="27" width="150" height="10" rx="5" fill="currentColor" fillOpacity="0.13" />
          <g fill="currentColor" fillOpacity="0.18">
            <rect x="40" y="62" width="100" height="8" />
            <rect x="40" y="76" width="70" height="6" />
            <rect x="40" y="92" width="80" height="6" />
            <rect x="40" y="116" width="50" height="20" rx="2" fill="#e63030" fillOpacity="0.85" />
          </g>
          <rect x="170" y="62" width="110" height="76" rx="2" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>
    );
  }
  if (category === "ad") {
    // Stylised ad with bars (performance metaphor)
    return (
      <div className="absolute inset-0 flex items-end justify-center gap-3 px-10 pb-10">
        {[40, 60, 35, 80, 55, 95].map((h, i) => (
          <div
            key={i}
            className="w-6 sm:w-8 rounded-t-sm"
            style={{
              height: `${h}%`,
              backgroundColor:
                i === 3 || i === 5 ? "#e63030" : "rgba(17,17,17,0.18)",
            }}
          />
        ))}
      </div>
    );
  }
  // grafika — palette swatches
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2 px-8">
      {[
        "#e63030",
        "#111111",
        "rgba(17,17,17,0.5)",
        "rgba(17,17,17,0.25)",
        "rgba(17,17,17,0.12)",
      ].map((c, i) => (
        <div
          key={i}
          className="w-10 sm:w-14 h-16 sm:h-24 rounded-sm shadow-sm"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}

// ============ Per-category backdrop tint ============

function backdropFor(category: PortfolioItem["category"]) {
  switch (category) {
    case "web":
      return "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)";
    case "ad":
      return "linear-gradient(135deg, #fdfdfd 0%, #f5f5f5 100%)";
    case "grafika":
      return "linear-gradient(135deg, #fafafa 0%, #f3eded 100%)";
    case "video":
      return "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)";
  }
}
