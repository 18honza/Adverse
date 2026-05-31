/**
 * Per-service colour assignment used by both surfaces:
 *   - homepage bento (gray default → variant colour on hover, arcs reveal)
 *   - /sluzby section panels (permanently filled in the variant colour)
 *
 * Three variants in rotation — white, black, red — give the grid rhythm
 * without needing six unique palettes, and the same slug-to-variant map
 * means the two surfaces echo each other visually.
 */
export type ServiceFillKey = "white" | "black" | "red";

export interface ServiceFill {
  /** Fill background of the card / panel */
  bg: string;
  /** Foreground colour (title, icon, eyebrow, arcs) — always contrasts the bg */
  fg: string;
  /** Foreground at reduced emphasis (eyebrows, descriptions on hero card) */
  fgMuted: string;
  /** Background colour of the round arrow link in the corner */
  arrowBg: string;
  /** Foreground colour of the arrow icon */
  arrowText: string;
}

export const FILLS: Record<ServiceFillKey, ServiceFill> = {
  white: {
    bg: "#ffffff",
    fg: "#0d0d0d",
    fgMuted: "rgba(13,13,13,0.7)",
    arrowBg: "#0d0d0d",
    arrowText: "#ffffff",
  },
  black: {
    bg: "#0d0d0d",
    fg: "#ffffff",
    fgMuted: "rgba(255,255,255,0.72)",
    arrowBg: "#ffffff",
    arrowText: "#0d0d0d",
  },
  red: {
    bg: "#e63030",
    fg: "#ffffff",
    fgMuted: "rgba(255,255,255,0.82)",
    arrowBg: "#ffffff",
    arrowText: "#e63030",
  },
};

/** Slug → variant. Six services, cycle white / black / red across the
 *  grid so neighbours never share a fill. */
export const FILL_BY_SLUG: Record<string, ServiceFillKey> = {
  "meta-ads": "white",
  weby: "black",
  "social-media": "red",
  "google-ads": "white",
  video: "black",
  grafika: "red",
};

export function fillFor(slug: string): ServiceFill {
  const key = FILL_BY_SLUG[slug] ?? "white";
  return FILLS[key];
}
