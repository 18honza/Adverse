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
      "Kampaně, které prodávají nemovitosti a plní zájezdy dřív, než se objeví v katalozích.",
    lead: "Kampaně, které plní prohlídky a vyprodávají zájezdy. Cílené reklamy na Facebooku a Instagramu, postavené na tvrdých datech. Optimalizujeme každý týden, abyste nevyhazovali peníze oknem.",
    icon: Megaphone,
    bullets: [
      "Strategie a struktura: chytáme nové klienty (prospecting) a připomínáme se těm, co u vás už byli (retargeting).",
      "Úderné kreativy a copy: texty a vizuály, které lidi zastaví při scrollování a donutí je kliknout.",
      "Pokročilé měření: nasadíme Pixel a Conversions API, abychom přesně viděli, která reklama přináší peníze.",
      "A/B testování: neustále zkoušíme, co funguje nejlépe.",
    ],
  },
  {
    slug: "google-ads",
    num: "02",
    title: "Google Ads",
    short:
      "Buďte první ve vyhledávání přesně ve chvíli, kdy klienti hledají nový domov nebo dovolenou.",
    lead: "Buďte vidět přesně ve chvíli, kdy vás klienti hledají. Search, Display, Performance Max i remarketing. Dostaňte se na první pozice, když někdo na Googlu hledá „prodej bytu“ nebo „dovolená u moře“.",
    icon: Search,
    bullets: [
      "Přesná klíčová slova: platíte jen za relevantní návštěvníky, ne za náhodné klikače.",
      "Vyladění vstupních stránek: zlepšujeme vaše Quality Score, aby prokliky stály méně.",
      "Precizní analytika: napojení na Google Analytics 4 (GA4) a sledování reálných konverzí.",
      "Rozšíření reklam: aby vaše inzeráty zabraly na obrazovce co nejvíc místa.",
    ],
  },
  {
    slug: "social-media",
    num: "03",
    title: "Sociální sítě",
    short:
      "Budujeme osobní brand, který budí důvěru. Sítě, ze kterých se neochází, ale nakupuje.",
    lead: "Váš profil nebude jen vizitka. Bude to prodejní kanál. Strategie, obsah a komunikace — budujeme realitním a cestovním značkám jméno, které budí důvěru a ze kterého se nakupuje.",
    icon: MessageCircle,
    bullets: [
      "Obsahová strategie na míru: žádné bezúčelné postování, vše má svůj cíl.",
      "Tvorba příspěvků a Reels: vizuálně atraktivní obsah, který baví a informuje.",
      "Plánování a publikace: přebíráme kompletní agendu, vy se nemusíte o nic starat.",
      "Community management: odpovídáme na zprávy a budujeme vztahy s vašimi sledujícími.",
    ],
  },
  {
    slug: "weby",
    num: "04",
    title: "Tvorba webů",
    short:
      "Rychlé, čisté, SEO-friendly weby šité na míru. Bez šablon a zbytečných pluginů.",
    lead: "Rychlé weby bez balastu, co mění návštěvníky na klienty. Tvoříme čisté a SEO-friendly weby šité na míru. Zapomeňte na pomalé šablony plné zbytečných pluginů.",
    icon: Monitor,
    bullets: [
      "Návrh struktury a UX: aby klient hned našel, co hledá (a nakoupil).",
      "Copywriting a základy SEO: texty, kterým rozumí lidi i vyhledávače.",
      "Responzivní design: váš web bude vypadat skvěle na mobilu i na velkém monitoru.",
      "Dlouhodobá péče: nasadíme, zaškolíme vás a rádi se o web postaráme i do budoucna.",
    ],
  },
  {
    slug: "video",
    num: "05",
    title: "Video produkce",
    short:
      "Od atraktivních video-prohlídek nemovitostí až po dynamická promo destinací. Vizuály, které zastaví scrollování.",
    lead: "Vizuály, které prodávají emoce. Od videoprohlídek nemovitostí až po dynamická promo videa destinací. Obsah, který vás odliší.",
    icon: Video,
    bullets: [
      "Od scénáře po export: kompletní realizace od prvního nápadu.",
      "Natáčení v terénu: přijedeme za vámi, ať už jde o vzorový byt nebo resort.",
      "Moderní postprodukce: střih, barvy a dynamika, která udrží pozornost.",
      "Adaptace pro sítě: formáty připravené přesně pro TikTok, Reels nebo YouTube.",
    ],
  },
  {
    slug: "grafika",
    num: "06",
    title: "Grafický design",
    short:
      "Čistá vizuální identita a bannery, které vás na první pohled odliší od konkurence.",
    lead: "Konzistentní brand, který si lidé zapamatují. Čistá vizuální identita a materiály, které na první pohled křičí profesionalitou.",
    icon: Palette,
    bullets: [
      "Loga a vizuální styl: tvář vaší značky od nuly, nebo šetrný redesign.",
      "Kreativy pro kampaně: bannery, na které budou lidé chtít kliknout.",
      "Offline tiskoviny: reprezentativní vizitky, brožury a letáky na prohlídky.",
      "Brandbooky: manuály, aby vaše značka vypadala všude stejně dobře.",
    ],
  },
];
