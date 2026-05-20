"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Per-service decorative graphics rendered absolutely inside a card's
 * dark background. Designed to fit at any size (auto-scales via SVG
 * viewBox where possible). No real photos required — purely vector
 * compositions in the brand palette (white at varying opacities + red
 * accent for highlight elements).
 *
 * Universal layer: a subtle dot grid pattern in the background of every
 * card; per-service: a unique composition (target rings, browser frame,
 * stacked feeds, search bar, film strip, color palette).
 */
export function ServiceGraphic({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return (
    <>
      {/* Universal subtle dot grid */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 opacity-30",
          "[background-image:radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)]",
          "[background-size:16px_16px]",
          className,
        )}
      />

      {/* Per-service decoration */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {slug === "meta-ads" && <MetaAdsGraphic />}
        {slug === "google-ads" && <GoogleAdsGraphic />}
        {slug === "social-media" && <SocialMediaGraphic />}
        {slug === "weby" && <WebyGraphic />}
        {slug === "video" && <VideoGraphic />}
        {slug === "grafika" && <GrafikaGraphic />}
      </div>
    </>
  );
}

// ============ Individual service decorations ============

/** Meta Ads — concentric target rings + scattered audience dots */
function MetaAdsGraphic() {
  return (
    <svg
      viewBox="0 0 240 240"
      preserveAspectRatio="xMaxYMin slice"
      className="absolute -top-6 -right-6 w-[55%] h-[55%] text-white"
    >
      <g fill="none" stroke="currentColor">
        <circle cx="170" cy="70" r="60" strokeOpacity="0.06" strokeWidth="1.5" />
        <circle cx="170" cy="70" r="40" strokeOpacity="0.09" strokeWidth="1.5" />
        <circle cx="170" cy="70" r="22" strokeOpacity="0.13" strokeWidth="1.5" />
      </g>
      <circle cx="170" cy="70" r="6" fill="#e63030" />
      {/* Scattered audience dots */}
      <g fill="currentColor">
        <circle cx="60" cy="40" r="2" fillOpacity="0.25" />
        <circle cx="100" cy="20" r="2" fillOpacity="0.18" />
        <circle cx="40" cy="100" r="2" fillOpacity="0.22" />
        <circle cx="80" cy="130" r="2" fillOpacity="0.15" />
        <circle cx="200" cy="170" r="2" fillOpacity="0.2" />
        <circle cx="150" cy="200" r="2" fillOpacity="0.18" />
      </g>
    </svg>
  );
}

/** Google Ads — search bar mockup + result lines */
function GoogleAdsGraphic() {
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 right-0 w-full h-[60%] text-white"
    >
      {/* Search bar outline */}
      <g fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5">
        <rect x="30" y="40" width="260" height="32" rx="16" />
        <circle cx="265" cy="56" r="6" />
        <line x1="270" y1="61" x2="276" y2="67" />
      </g>
      {/* Result lines */}
      <g fill="currentColor" fillOpacity="0.13">
        <rect x="30" y="90" width="180" height="6" />
        <rect x="30" y="105" width="100" height="5" />
        <rect x="30" y="125" width="160" height="6" />
        <rect x="30" y="140" width="90" height="5" />
        <rect x="30" y="160" width="200" height="6" />
        <rect x="30" y="175" width="110" height="5" />
      </g>
      {/* "Ad" label dot */}
      <circle cx="40" cy="56" r="3" fill="#e63030" />
    </svg>
  );
}

/** Sociální sítě — stacked feed post cards (slight rotation for depth) */
function SocialMediaGraphic() {
  return (
    <svg
      viewBox="0 0 200 280"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full text-white"
    >
      {/* Three stacked phone-frame-ish cards */}
      <g stroke="currentColor" fill="none">
        <g transform="rotate(-6, 100, 200)" strokeOpacity="0.07">
          <rect x="40" y="120" width="120" height="160" rx="8" strokeWidth="1.5" />
          <line x1="40" y1="148" x2="160" y2="148" />
          <rect x="50" y="160" width="60" height="6" fill="currentColor" fillOpacity="0.08" stroke="none" />
          <rect x="50" y="174" width="100" height="6" fill="currentColor" fillOpacity="0.06" stroke="none" />
          <rect x="50" y="190" width="80" height="6" fill="currentColor" fillOpacity="0.06" stroke="none" />
        </g>
        <g transform="rotate(3, 100, 160)" strokeOpacity="0.11">
          <rect x="45" y="80" width="120" height="160" rx="8" strokeWidth="1.5" />
          <circle cx="60" cy="100" r="8" fill="currentColor" fillOpacity="0.1" stroke="none" />
          <rect x="76" y="96" width="50" height="5" fill="currentColor" fillOpacity="0.13" stroke="none" />
          <rect x="55" y="120" width="100" height="60" fill="currentColor" fillOpacity="0.06" stroke="none" />
          <rect x="55" y="190" width="80" height="6" fill="currentColor" fillOpacity="0.13" stroke="none" />
          <rect x="55" y="204" width="50" height="5" fill="currentColor" fillOpacity="0.1" stroke="none" />
          <path d="M 55 224 l 8 -8 l 8 8 l 8 -8" stroke="#e63030" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
        </g>
      </g>
    </svg>
  );
}

/** Tvorba webů — browser frame + code brackets */
function WebyGraphic() {
  return (
    <svg
      viewBox="0 0 480 220"
      preserveAspectRatio="xMaxYMid slice"
      className="absolute top-1/2 -translate-y-1/2 right-0 w-[70%] h-[80%] text-white"
    >
      {/* Browser window frame */}
      <g fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5">
        <rect x="60" y="30" width="320" height="180" rx="6" />
        <line x1="60" y1="58" x2="380" y2="58" />
      </g>
      {/* Window dots */}
      <g fill="currentColor" fillOpacity="0.2">
        <circle cx="78" cy="44" r="3" />
        <circle cx="92" cy="44" r="3" />
        <circle cx="106" cy="44" r="3" />
      </g>
      {/* URL bar */}
      <rect x="130" y="38" width="180" height="12" rx="6" fill="currentColor" fillOpacity="0.07" />
      {/* Content lines (left col) */}
      <g fill="currentColor" fillOpacity="0.1">
        <rect x="80" y="80" width="120" height="8" />
        <rect x="80" y="98" width="80" height="6" />
        <rect x="80" y="114" width="100" height="6" />
        <rect x="80" y="138" width="60" height="20" rx="2" fill="#e63030" fillOpacity="0.7" />
      </g>
      {/* Right column hero */}
      <rect x="230" y="80" width="130" height="100" rx="2" fill="currentColor" fillOpacity="0.06" />
    </svg>
  );
}

/** Video produkce — film strip + play triangle */
function VideoGraphic() {
  return (
    <svg
      viewBox="0 0 240 240"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full text-white"
    >
      {/* Vertical film strip on right */}
      <g fill="currentColor" fillOpacity="0.08">
        <rect x="170" y="10" width="50" height="220" />
      </g>
      {/* Sprocket holes */}
      <g fill="#0d0d0d">
        <rect x="175" y="20" width="6" height="10" rx="1" />
        <rect x="209" y="20" width="6" height="10" rx="1" />
        <rect x="175" y="70" width="6" height="10" rx="1" />
        <rect x="209" y="70" width="6" height="10" rx="1" />
        <rect x="175" y="120" width="6" height="10" rx="1" />
        <rect x="209" y="120" width="6" height="10" rx="1" />
        <rect x="175" y="170" width="6" height="10" rx="1" />
        <rect x="209" y="170" width="6" height="10" rx="1" />
      </g>
      {/* Frame outlines on strip */}
      <g fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1">
        <rect x="183" y="36" width="24" height="28" />
        <rect x="183" y="86" width="24" height="28" />
        <rect x="183" y="136" width="24" height="28" />
        <rect x="183" y="186" width="24" height="28" />
      </g>
      {/* Play button left */}
      <g transform="translate(70 110)">
        <circle r="34" fill="none" stroke="#e63030" strokeOpacity="0.6" strokeWidth="2" />
        <polygon points="-8,-12 14,0 -8,12" fill="#e63030" fillOpacity="0.8" />
      </g>
    </svg>
  );
}

/** Grafický design — color palette swatches + grid */
function GrafikaGraphic() {
  return (
    <svg
      viewBox="0 0 480 220"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 right-0 w-full h-[55%] text-white"
    >
      {/* Color palette row */}
      <g>
        <rect x="40" y="120" width="60" height="80" fill="#e63030" fillOpacity="0.85" />
        <rect x="105" y="120" width="60" height="80" fill="currentColor" fillOpacity="0.85" />
        <rect x="170" y="120" width="60" height="80" fill="currentColor" fillOpacity="0.18" />
        <rect x="235" y="120" width="60" height="80" fill="currentColor" fillOpacity="0.3" />
        <rect x="300" y="120" width="60" height="80" fill="currentColor" fillOpacity="0.55" />
        {/* Pen overlay */}
        <g transform="translate(390 105) rotate(-30)" stroke="currentColor" fill="currentColor" fillOpacity="0.12" strokeOpacity="0.18">
          <rect x="0" y="0" width="14" height="80" rx="2" strokeWidth="1.5" />
          <polygon points="0,80 7,95 14,80" />
        </g>
      </g>
      {/* Mini grid pattern bottom-left */}
      <g fill="currentColor" fillOpacity="0.12">
        <rect x="30" y="45" width="6" height="6" />
        <rect x="44" y="45" width="6" height="6" />
        <rect x="58" y="45" width="6" height="6" />
        <rect x="30" y="59" width="6" height="6" />
        <rect x="44" y="59" width="6" height="6" />
        <rect x="30" y="73" width="6" height="6" />
      </g>
    </svg>
  );
}

// ============ Optional animated pulse for hero card on bento ============

/** Subtle animated pulse ring — for the hero card extra polish */
export function AmbientPulse({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute rounded-full border border-accent/30 pointer-events-none",
        className,
      )}
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{ scale: 1.2, opacity: 0 }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}
