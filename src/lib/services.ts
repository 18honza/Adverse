import {
  Megaphone,
  Search,
  MessageCircle,
  Monitor,
  Video,
  Palette,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  num: string;
  title: string;
  short: string;
  lead: string;
  icon: LucideIcon;
  bullets: string[];
}

export const services: Service[] = [
  {
    slug: "meta-ads",
    num: "01",
    title: "Meta Ads",
    short:
      "Cílené Facebook a Instagram reklamy pro skutečnou návratnost. Optimalizace, reporty, výsledky.",
    lead: "Cílené reklamy na Facebooku a Instagramu, postavené na datech a optimalizované každý týden.",
    icon: Megaphone,
    bullets: [
      "Strategie a struktura kampaní (prospecting + retargeting)",
      "Kreativy a copy přizpůsobené publiku",
      "Pixel, Conversions API, eventy",
      "Týdenní reporty s vysvětlením toho, co a proč",
      "A/B testování a iterace",
    ],
  },
  {
    slug: "google-ads",
    num: "02",
    title: "Google Ads",
    short:
      "Search, Display, remarketing. Lidé vás najdou přesně ve chvíli, kdy něco hledají.",
    lead: "Search, Display, Performance Max, remarketing. Jste vidět přesně tam, kde lidé hledají.",
    icon: Search,
    bullets: [
      "Klíčová slova a struktura kampaní",
      "Optimalizace cílových stránek a Quality Score",
      "Conversion tracking a Google Analytics 4",
      "Ad rozšíření a kreativy",
      "Pravidelné reporty a iterace",
    ],
  },
  {
    slug: "social-media",
    num: "03",
    title: "Sociální sítě",
    short:
      "Strategie, obsah, plánování, komunikace. Vaši značku převezmeme od A do Z.",
    lead: "Strategie, obsah, plánování, komunita. Vaše značka v nejlepším světle, každý den.",
    icon: MessageCircle,
    bullets: [
      "Obsahová strategie šitá na míru",
      "Tvorba postů, příběhů a reels",
      "Plánovač a publikování",
      "Odpovídání na komentáře a zprávy",
      "Měsíční vyhodnocení dosahu a interakcí",
    ],
  },
  {
    slug: "weby",
    num: "04",
    title: "Tvorba webů",
    short:
      "Rychlé, čisté, SEO-friendly weby šité na míru. Bez šablon a zbytečných pluginů.",
    lead: "Rychlé, čisté, SEO-friendly weby šité na míru. Bez šablon a zbytečných pluginů.",
    icon: Monitor,
    bullets: [
      "Návrh struktury a UX",
      "Copywriting a SEO základy",
      "Vývoj responzivního webu",
      "Nasazení a školení správy",
      "Možnost dlouhodobé údržby",
    ],
  },
  {
    slug: "video",
    num: "05",
    title: "Video produkce",
    short:
      "Natáčení, střih, reels, reklamní spoty. Od scénáře po finální export.",
    lead: "Od scénáře po finální export. Reklamní spoty, reels, prezentační videa.",
    icon: Video,
    bullets: [
      "Scénář a storyboard",
      "Natáčení v terénu i ve studiu",
      "Postprodukce, střih, barevné korekce",
      "Adaptace pro jednotlivé platformy",
      "Animace a motion graphics",
    ],
  },
  {
    slug: "grafika",
    num: "06",
    title: "Grafický design",
    short:
      "Vizuální identita, materiály pro reklamu i tisk. Konzistentně, krásně, použitelně.",
    lead: "Vizuální identita, materiály pro reklamu i tisk. Konzistentně, krásně, použitelně.",
    icon: Palette,
    bullets: [
      "Logo a vizuální styl značky",
      "Brandbook a šablony",
      "Kreativy pro reklamy",
      "Tiskoviny — letáky, brožury, vizitky",
      "Sociální sítě a digitální assety",
    ],
  },
];
