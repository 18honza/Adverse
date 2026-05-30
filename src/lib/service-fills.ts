/**
 * Per-service colour assignment used by both surfaces:
 *   - homepage bento (default dark, fills on hover)
 *   - /sluzby section panels (permanently filled)
 *
 * The position-based rotation (red / black / cream) gives the grid
 * rhythm without needing six separate colours, and the same indices
 * mean the two surfaces visually echo each other.
 */
export type ServiceFillKey = "red" | "black" | "cream";

export interface ServiceFill {
  bg: string;
  /** Text colour on the filled surface */
  text: string;
  /** Service-number colour on the filled surface */
  num: string;
  /** Eyebrow / accent colour on the filled surface */
  accent: string;
  /** Background colour of the round arrow link in the corner */
  arrowBg: string;
  /** Border colour of the round arrow link in the corner */
  arrowBorder: string;
  /** Foreground colour of the arrow icon */
  arrowText: string;
  /** Hairline / divider tint over the fill */
  divider: string;
}

export const FILLS: Record<ServiceFillKey, ServiceFill> = {
  red: {
    bg: "#e63030",
    text: "#ffffff",
    num: "#ffffff",
    accent: "rgba(255,255,255,0.78)",
    arrowBg: "rgba(255,255,255,0.18)",
    arrowBorder: "rgba(255,255,255,0.35)",
    arrowText: "#ffffff",
    divider: "rgba(255,255,255,0.2)",
  },
  black: {
    bg: "#0d0d0d",
    text: "#ffffff",
    num: "#e63030",
    accent: "#e63030",
    arrowBg: "rgba(255,255,255,0.12)",
    arrowBorder: "rgba(255,255,255,0.25)",
    arrowText: "#ffffff",
    divider: "rgba(255,255,255,0.12)",
  },
  cream: {
    bg: "#fafaf7",
    text: "#111111",
    num: "#e63030",
    accent: "#e63030",
    arrowBg: "rgba(17,17,17,0.08)",
    arrowBorder: "rgba(17,17,17,0.18)",
    arrowText: "#111111",
    divider: "rgba(17,17,17,0.1)",
  },
};

/** Default rotation across the bento + /sluzby ordering.
 *  Aligned with services.ts order: meta-ads, google-ads, social-media, weby, video, grafika.
 *  Bento layout reorders visually (weby is the hero), but the rotation
 *  here is keyed by slug to keep both surfaces in sync no matter how the
 *  bento grid spans cells. */
export const FILL_BY_SLUG: Record<string, ServiceFillKey> = {
  "meta-ads": "red",
  weby: "black",
  "social-media": "cream",
  "google-ads": "red",
  video: "black",
  grafika: "cream",
};

export function fillFor(slug: string): ServiceFill {
  const key = FILL_BY_SLUG[slug] ?? "red";
  return FILLS[key];
}
