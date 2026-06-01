"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X, Play, ExternalLink, Share2 } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

/**
 * Flippable portfolio card — controlled by the parent so only one card can
 * be open at a time. The FRONT shows the cover (or gradient placeholder)
 * with tag + project title. Click flips 180° around Y while scaling up; the
 * BACK is a full-bleed media panel (photo / video / web mockup depending on
 * category) with a properly-oriented category label + client name and a
 * category-specific action: visit the site (web), play the clip in place
 * (video), or open the social profile (soc).
 */
export function PortfolioFlipCard({
  item,
  flipped,
  onOpen,
  onClose,
  className,
}: {
  item: PortfolioItem;
  flipped: boolean;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const frontRef = useRef<HTMLButtonElement>(null);

  // Esc to flip back
  useEffect(() => {
    if (!flipped) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flipped, onClose]);

  // Move focus to close button when flipped, back to card when unflipped
  useEffect(() => {
    if (flipped) closeRef.current?.focus({ preventScroll: true });
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
          onClick={onOpen}
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
            // Safari leaks the front face's content through to the back
            // (mirror-flipped) despite backface-visibility, so we hard-swap
            // each face's opacity to guarantee only one is ever painted.
            // The swap must fire exactly when the rotation crosses 90°
            // (edge-on). With the ease-out cubic-bezier(.22,1,.36,1) the
            // rotation reaches 90° at ~0.1s of the 0.75s animation — NOT at
            // the time-midpoint (0.375s). Swapping at 0.375s left the card
            // blank from ~0.1s onward (front already facing away, back not
            // yet shown). 0.1s keeps a visible face the whole flip.
            opacity: flipped ? 0 : 1,
            transition: "opacity 0s linear 0.1s",
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
            "bg-dark text-white border border-divider",
          )}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            // Inverse of the front — only receive clicks when this face
            // is the one facing the viewer.
            pointerEvents: flipped ? "auto" : "none",
            // Inverse of the front's opacity swap (see above) — appears as
            // the rotation crosses 90°, so a face is always visible and the
            // two never co-exist.
            opacity: flipped ? 1 : 0,
            transition: "opacity 0s linear 0.1s",
          }}
          aria-hidden={!flipped}
        >
          <BackContent item={item} active={flipped} />

          {/* Close button */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Zavřít detail"
            tabIndex={flipped ? 0 : -1}
            className={cn(
              "absolute top-3 right-3 z-30 w-8 h-8 rounded-full",
              "bg-white/15 backdrop-blur-md border border-white/25 text-white",
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

// ============ Back side content ============

function BackContent({ item, active }: { item: PortfolioItem; active: boolean }) {
  // Video plays inline once the user hits the play action.
  const [playing, setPlaying] = useState(false);

  // Reset playback whenever the card closes so reopening starts clean.
  useEffect(() => {
    if (!active) setPlaying(false);
  }, [active]);

  return (
    <div className="relative w-full h-full">
      {/* ---- Full-bleed media background ---- */}
      <div className="absolute inset-0">
        {item.category === "video" && playing && item.backVideo ? (
          <video
            src={item.backVideo}
            autoPlay
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
        ) : (
          <CategoryBackdrop category={item.category} />
        )}
      </div>

      {/* ---- Readability gradient (skip while a video is actively playing) ---- */}
      {!(item.category === "video" && playing) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
        />
      )}

      {/* ---- Foreground content (hidden while video plays so controls are usable) ---- */}
      {!(item.category === "video" && playing) && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-6">
          <span className="text-[10px] sm:text-xs uppercase tracking-[3px] font-bold text-accent">
            {item.tag}
          </span>
          <h3 className="font-display font-black uppercase text-lg sm:text-xl text-white mt-1 leading-tight">
            {item.client}
          </h3>

          {item.description && (
            <p className="text-xs text-white/70 leading-relaxed mt-2 max-w-[40ch] line-clamp-3">
              {item.description}
            </p>
          )}

          {/* Category-specific results (ad cards) */}
          {item.results && item.results.length > 0 && (
            <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
              {item.results.map((r) => (
                <li
                  key={r}
                  className="text-[10px] font-bold text-white uppercase tracking-[1px] border-l-2 border-accent pl-2 leading-tight"
                >
                  {r}
                </li>
              ))}
            </ul>
          )}

          {/* Category-specific action */}
          <div className="mt-4">
            <ActionButton item={item} onPlay={() => setPlaying(true)} />
          </div>
        </div>
      )}
    </div>
  );
}

// ============ Per-category action ============

function ActionButton({
  item,
  onPlay,
}: {
  item: PortfolioItem;
  onPlay: () => void;
}) {
  const base = cn(
    "inline-flex items-center gap-2 w-fit",
    "text-xs font-bold uppercase tracking-[2px]",
    "bg-white text-dark px-4 py-2.5",
    "hover:bg-accent hover:text-white transition-colors",
  );

  if (item.category === "web" && item.liveUrl) {
    return (
      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className={base}>
        Navštívit web
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    );
  }

  if (item.category === "soc" && item.socialUrl) {
    return (
      <a href={item.socialUrl} target="_blank" rel="noopener noreferrer" className={base}>
        Zobrazit profil
        <Share2 className="w-3.5 h-3.5" />
      </a>
    );
  }

  if (item.category === "video") {
    return (
      <button type="button" onClick={onPlay} className={cn(base, "cursor-pointer")}>
        Přehrát video
        <Play className="w-3.5 h-3.5 fill-current" />
      </button>
    );
  }

  // ad / grafika — no external destination, the visual + stats speak for it.
  return null;
}

// ============ Category-specific backdrop visuals (placeholders) ============

function CategoryBackdrop({ category }: { category: PortfolioItem["category"] }) {
  if (category === "video") {
    // Dark stage with a large play affordance
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundImage: "linear-gradient(135deg,#1a1a1a 0%,#0d0d0d 100%)" }}
      >
        <div className="w-16 h-16 rounded-full border-2 border-white/70 flex items-center justify-center text-white/90">
          <Play className="w-7 h-7 ml-1 fill-current" />
        </div>
      </div>
    );
  }

  if (category === "web") {
    // Stylised browser window mockup on a light surface
    return (
      <div
        className="absolute inset-0 flex items-center justify-center px-8"
        style={{ backgroundImage: "linear-gradient(135deg,#2a2a2a 0%,#161616 100%)" }}
      >
        <svg viewBox="0 0 320 180" className="w-full max-w-[260px] text-white/85">
          <g fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5">
            <rect x="20" y="20" width="280" height="140" rx="4" />
            <line x1="20" y1="44" x2="300" y2="44" />
          </g>
          <g fill="currentColor" fillOpacity="0.45">
            <circle cx="34" cy="32" r="3" />
            <circle cx="46" cy="32" r="3" />
            <circle cx="58" cy="32" r="3" />
          </g>
          <rect x="90" y="27" width="150" height="10" rx="5" fill="currentColor" fillOpacity="0.18" />
          <g fill="currentColor" fillOpacity="0.2">
            <rect x="40" y="62" width="100" height="8" />
            <rect x="40" y="76" width="70" height="6" />
            <rect x="40" y="92" width="80" height="6" />
          </g>
          <rect x="40" y="116" width="50" height="20" rx="2" fill="#e63030" />
          <rect x="170" y="62" width="110" height="76" rx="2" fill="currentColor" fillOpacity="0.12" />
        </svg>
      </div>
    );
  }

  if (category === "ad") {
    // Performance bars
    return (
      <div
        className="absolute inset-0 flex items-end justify-center gap-3 px-10 pb-16"
        style={{ backgroundImage: "linear-gradient(135deg,#2a2a2a 0%,#161616 100%)" }}
      >
        {[40, 60, 35, 80, 55, 95].map((h, i) => (
          <div
            key={i}
            className="w-6 sm:w-8 rounded-t-sm"
            style={{
              height: `${h}%`,
              backgroundColor: i === 3 || i === 5 ? "#e63030" : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>
    );
  }

  if (category === "soc") {
    // Instagram-style feed grid
    return (
      <div
        className="absolute inset-0 flex items-center justify-center px-10"
        style={{ backgroundImage: "linear-gradient(135deg,#2a2a2a 0%,#161616 100%)" }}
      >
        <div className="grid grid-cols-3 gap-1.5 w-full max-w-[220px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-[2px]"
              style={{
                backgroundColor:
                  i % 4 === 0 ? "#e63030" : "rgba(255,255,255,0.14)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // grafika — palette swatches
  return (
    <div
      className="absolute inset-0 flex items-center justify-center gap-2 px-8 pb-12"
      style={{ backgroundImage: "linear-gradient(135deg,#2a2a2a 0%,#161616 100%)" }}
    >
      {[
        "#e63030",
        "#ffffff",
        "rgba(255,255,255,0.55)",
        "rgba(255,255,255,0.3)",
        "rgba(255,255,255,0.15)",
      ].map((c, i) => (
        <div
          key={i}
          className="w-10 sm:w-14 h-16 sm:h-24 rounded-sm"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}
