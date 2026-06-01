export type PortfolioCategory = "web" | "ad" | "grafika" | "video" | "soc";

export interface PortfolioItem {
  slug: string;
  category: PortfolioCategory;
  /** Project title — shown on the FRONT only */
  title: string;
  /** Short category label (e.g. "Web", "Reklama") — front badge + back label */
  tag: string;
  /** Client / company name the work was made for — shown on the BACK */
  client: string;
  /** Fallback gradient (when no cover image is provided) */
  gradient: string;

  /** FRONT — cover photo placed at /public/img/portfolio/{cover}.jpg or full URL */
  cover?: string;

  // ============ BACK side content ============
  /** Short project description shown on flip */
  description?: string;
  /** Web projects — link to the live site */
  liveUrl?: string;
  /** Social projects — link to the company's social profile (IG / FB …) */
  socialUrl?: string;
  /** Ad / graphics / social — supporting image on the back (full-bleed bg) */
  backImage?: string;
  /** Video projects — direct mp4/webm URL or embed */
  backVideo?: string;
  /** Optional bullet stats (e.g. "RoAS 4×", "CPL -38%") */
  results?: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "web-1",
    category: "web",
    title: "Realitní agentura — Praha",
    tag: "Web",
    client: "RK Bydlení Praha",
    gradient: "linear-gradient(135deg,#e63030,#0d0d0d)",
    description:
      "Kompletní redesign webu pro pražskou realitní kancelář. Nová struktura, copywriting, optimalizace konverze a základy SEO.",
    liveUrl: "#",
  },
  {
    slug: "ad-1",
    category: "ad",
    title: "Meta — výnos 4×",
    tag: "Reklama",
    client: "Exotica Travel",
    gradient: "linear-gradient(135deg,#0d0d0d,#444)",
    description:
      "Restruktura Meta kampaní pro luxury travel klienta. Nová sada kreativ + retargeting funnel za tři měsíce.",
    results: ["RoAS 4×", "CPL −38 %", "3 měsíce"],
  },
  {
    slug: "grafika-1",
    category: "grafika",
    title: "Brand identita",
    tag: "Grafika",
    client: "Nordic Estates",
    gradient: "linear-gradient(135deg,#666,#111)",
    description:
      "Kompletní vizuální identita — logo, brandbook, paleta a šablony pro tisk i digital.",
  },
  {
    slug: "video-1",
    category: "video",
    title: "Reklamní spot — Travel",
    tag: "Video",
    client: "Slunce Tours",
    gradient: "linear-gradient(135deg,#0d0d0d,#e63030)",
    description:
      "30 vteřinový reklamní spot pro letní kampaň cestovní kanceláře. Scénář, natáčení, postprodukce.",
  },
  {
    slug: "soc-1",
    category: "soc",
    title: "Instagram — realitní obsah",
    tag: "Sociální sítě",
    client: "RK Domov Brno",
    gradient: "linear-gradient(135deg,#e63030,#666)",
    description:
      "Správa Instagramu pro realitní kancelář — obsahový plán, vizuální konzistence a reels postavené na storytellingu.",
    socialUrl: "#",
  },
  {
    slug: "web-2",
    category: "web",
    title: "Travel — exotické dovolené",
    tag: "Web",
    client: "Paradiso Travel",
    gradient: "linear-gradient(135deg,#444,#e63030)",
    description:
      "Konverzní web s rezervačním formulářem, mapou destinací a fotogalerií. Responzivní, rychlý, SEO‑friendly.",
    liveUrl: "#",
  },
  {
    slug: "grafika-2",
    category: "grafika",
    title: "Letní kampaň — visual",
    tag: "Grafika",
    client: "Riviera Tours",
    gradient: "linear-gradient(135deg,#e63030,#444)",
    description:
      "Key visual letní kampaně — sjednocený vizuál pro print, OOH i digitální plochy.",
  },
  {
    slug: "ad-2",
    category: "ad",
    title: "Google — RoAS 6×",
    tag: "Reklama",
    client: "Reality Morava",
    gradient: "linear-gradient(135deg,#0d0d0d,#666)",
    description:
      "Performance Max kampaně pro realitní portfolio. Optimalizace klíčových slov a krajinkového cílení.",
    results: ["RoAS 6×", "Konverze +180 %", "Quality 8/10"],
  },
  {
    slug: "soc-2",
    category: "soc",
    title: "Facebook — cestovní kampaň",
    tag: "Sociální sítě",
    client: "Horizont Travel",
    gradient: "linear-gradient(135deg,#444,#e63030)",
    description:
      "Komplexní správa Facebooku — komunitní obsah, soutěže a sezónní kampaně s důrazem na engagement.",
    socialUrl: "#",
  },
  {
    slug: "video-2",
    category: "video",
    title: "Instagram reels — série",
    tag: "Video",
    client: "Adriatica Travel",
    gradient: "linear-gradient(135deg,#666,#e63030)",
    description:
      "Série 12 vertikálních reels postavená na storytellingu. Konzistentní vizuál, různé hooky.",
  },
  {
    slug: "web-3",
    category: "web",
    title: "Landing page — kampaň",
    tag: "Web",
    client: "Léto s námi",
    gradient: "linear-gradient(135deg,#111,#444)",
    description:
      "Single-page landing pro letní kampaň. Mobile-first, A/B testování headlinů, integrace s GA4.",
    liveUrl: "#",
  },
];

export const filterLabels: Record<"all" | PortfolioCategory, string> = {
  all: "Vše",
  web: "Weby",
  ad: "Reklamy",
  grafika: "Grafika",
  video: "Videa",
  soc: "Sociální sítě",
};
