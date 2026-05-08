export type PortfolioCategory = "web" | "ad" | "grafika" | "video";

export interface PortfolioItem {
  slug: string;
  category: PortfolioCategory;
  title: string;
  tag: string;
  /** Fallback gradient (when image is missing) */
  gradient: string;
  image?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "web-1",
    category: "web",
    title: "Realitní agentura — Praha",
    tag: "Web",
    gradient: "linear-gradient(135deg,#e63030,#0d0d0d)",
  },
  {
    slug: "ad-1",
    category: "ad",
    title: "Meta — výnos 4×",
    tag: "Reklama",
    gradient: "linear-gradient(135deg,#0d0d0d,#444)",
  },
  {
    slug: "grafika-1",
    category: "grafika",
    title: "Brand identita",
    tag: "Grafika",
    gradient: "linear-gradient(135deg,#666,#111)",
  },
  {
    slug: "video-1",
    category: "video",
    title: "Reklamní spot — Travel",
    tag: "Video",
    gradient: "linear-gradient(135deg,#0d0d0d,#e63030)",
  },
  {
    slug: "web-2",
    category: "web",
    title: "Travel — exotické dovolené",
    tag: "Web",
    gradient: "linear-gradient(135deg,#444,#e63030)",
  },
  {
    slug: "grafika-2",
    category: "grafika",
    title: "Letní kampaň — visual",
    tag: "Grafika",
    gradient: "linear-gradient(135deg,#e63030,#444)",
  },
  {
    slug: "ad-2",
    category: "ad",
    title: "Google — RoAS 6×",
    tag: "Reklama",
    gradient: "linear-gradient(135deg,#0d0d0d,#666)",
  },
  {
    slug: "video-2",
    category: "video",
    title: "Instagram reels — série",
    tag: "Video",
    gradient: "linear-gradient(135deg,#666,#e63030)",
  },
  {
    slug: "web-3",
    category: "web",
    title: "Landing page — kampaň",
    tag: "Web",
    gradient: "linear-gradient(135deg,#111,#444)",
  },
];

export const filterLabels: Record<"all" | PortfolioCategory, string> = {
  all: "Vše",
  web: "Weby",
  ad: "Reklamy",
  grafika: "Grafika",
  video: "Videa",
};
