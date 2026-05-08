# Adverse

Web pro digitální marketingovou agenturu Adverse — Next.js 16 (App Router) + Tailwind v4 + Framer Motion. Cílová skupina: realitní a cestovní agentury v ČR.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (theme v `globals.css`)
- **Framer Motion** — animace (mobile menu, portfolio filter)
- **Resend** — kontaktní formulář (Server Action)
- **Lucide React** — ikony

## Lokální dev

```bash
npm install
npm run dev
```

Otevři <http://localhost:3000>.

## Environment variables

Zkopíruj `.env.example` do `.env.local` a vyplň:

```
RESEND_API_KEY=re_xxxxxxxx
```

Bez klíče lokální dev funguje — submission se logne do konzole a UI ukáže "úspěch" (vhodné pro testování).

## Struktura

```
src/
├── app/
│   ├── layout.tsx           Root layout + Inter font + meta
│   ├── page.tsx             Domů
│   ├── sluzby/page.tsx      Služby (6 bloků)
│   ├── portfolio/page.tsx   Portfolio + filter
│   ├── reference/page.tsx   Reference + case study
│   ├── o-nas/page.tsx       O nás (tým, hodnoty, čísla)
│   ├── kontakt/
│   │   ├── page.tsx
│   │   └── actions.ts       Server Action (Resend)
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── header.tsx           Sticky nav + mobile menu (Framer)
│   ├── footer.tsx           3-col + tým kontakty
│   ├── marquee.tsx          Scrolling services strip
│   ├── stat-counter.tsx     IntersectionObserver count-up
│   ├── portfolio-tile.tsx
│   ├── portfolio-filter.tsx Klient s Framer animacemi
│   ├── contact-form.tsx     useActionState
│   ├── page-hero.tsx        Sdílený PageHero + FinalCta
│   ├── eyebrow.tsx
│   └── ui/button.tsx
└── lib/
    ├── cn.ts                clsx + tailwind-merge
    ├── site.ts              Data webu (tým, navigace)
    ├── services.ts          6 služeb
    ├── portfolio.ts         9 portfolio položek
    └── testimonials.ts      6 referencí
```

## Design tokens

V `src/app/globals.css` (Tailwind v4 `@theme inline`):

| Token | Hodnota | Použití |
|---|---|---|
| `--color-bg` | `#ffffff` | Pozadí |
| `--color-text` | `#111111` | Hlavní text |
| `--color-text-muted` | `#666666` | Sekundární text |
| `--color-accent` | `#e63030` | Brand červená |
| `--color-dark` | `#0d0d0d` | Tmavé sekce |
| `--font-display` | Arial Black | Nadpisy |
| `--font-serif` | Georgia italic | Decentní detaily |

## Deploy

Nasaď přes [Vercel](https://vercel.com): `vercel deploy` nebo přes GitHub auto-import.
Po deploy přidej v Vercel projektu env var `RESEND_API_KEY`.

Doména `adverse.cz` se přesměruje DNS změnou v Wedos administraci:
- `A @ → 76.76.21.21`
- `CNAME www → cname.vercel-dns.com`
- MX záznamy zůstávají na Wedosu (e-maily nedotčené).
