import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/marquee";
import { StatCounter } from "@/components/stat-counter";
import { PortfolioTile } from "@/components/portfolio-tile";
import { FloatingPaths } from "@/components/floating-paths";
import { services } from "@/lib/services";
import { portfolioItems } from "@/lib/portfolio";
import { testimonials } from "@/lib/testimonials";

export default function HomePage() {
  const heroPortfolio = portfolioItems.slice(0, 4);
  const featured = testimonials[0];

  return (
    <>
      {/* HERO — animated paths background, dark, viewport-fit */}
      <section className="relative isolate overflow-hidden bg-dark text-white min-h-[85vh] flex items-center justify-center px-6 py-20">
        {/* Animated SVG paths — two layers for depth */}
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        {/* Subtle vignette to focus content */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none"
        />
        {/* Red top accent (consistent with header) */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] bg-accent/60"
        />

        <div className="relative z-10 max-w-(--container-narrow) mx-auto text-center">
          <Eyebrow className="text-accent">Digitální marketing</Eyebrow>
          <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight text-white">
            Výsledky,
            <br />
            které{" "}
            <span className="bg-accent text-white px-3 inline-block">
              vidíte.
            </span>
          </h1>
          <hr className="w-8 h-[2px] bg-accent border-0 my-4 mx-auto" />
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Meta &amp; Google reklamy, social media, weby a produkce.
            <span className="block mt-2 font-serif italic text-white/50 text-base">
              Každý klient je pro nás jedinečný.
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button href="/kontakt" variant="primary">
              Domluvit schůzku
            </Button>
            <Link
              href="#sluzby"
              className="inline-flex items-center justify-center font-sans text-xs font-bold uppercase tracking-[2px] rounded-sm px-6 py-3 border-2 border-white text-white bg-transparent hover:bg-white hover:text-dark transition-colors"
            >
              Naše služby ↓
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 sm:gap-12 mt-12 pt-6 border-t border-white/15 max-w-3xl mx-auto">
            <Stat
              value={
                <StatCounter
                  value={12}
                  suffix="+"
                  className="font-display text-3xl md:text-4xl font-black text-white"
                />
              }
              label="Spokojených klientů"
              dark
            />
            <Stat
              value={
                <span className="font-display text-3xl md:text-4xl font-black text-white">
                  META + GGL
                </span>
              }
              label="Certifikované reklamy"
              dark
            />
            <Stat
              value={
                <StatCounter
                  value={100}
                  suffix="%"
                  className="font-display text-3xl md:text-4xl font-black text-white"
                />
              }
              label="Osobní přístup"
              dark
            />
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section id="sluzby" className="bg-surface-alt py-20 md:py-24">
        <div className="mx-auto max-w-(--container-default) px-6">
          <header className="text-center mb-12">
            <Eyebrow>Co umíme</Eyebrow>
            <h2 className="text-4xl md:text-5xl">Marketing, který se vyplatí</h2>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.slug}
                  className="group p-8 border border-divider bg-bg transition-all duration-150 hover:border-accent hover:-translate-y-0.5"
                >
                  <Icon className="w-8 h-8 text-accent mb-4" strokeWidth={2} />
                  <h3 className="text-lg mb-3">{s.title}</h3>
                  <p className="text-sm text-text-muted mb-4">{s.short}</p>
                  <a
                    href={`/sluzby#${s.slug}`}
                    className="text-xs font-bold uppercase tracking-[2px] text-accent"
                  >
                    Více →
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-(--container-default) px-6">
          <header className="text-center mb-12">
            <Eyebrow>Naše práce</Eyebrow>
            <h2 className="text-4xl md:text-5xl">Vybrané projekty</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 md:h-[480px]">
            <PortfolioTile
              item={heroPortfolio[0]}
              className="md:col-span-1 md:row-span-2 h-56 md:h-auto"
              ariaLabel="Web pro realitní agenturu"
            />
            <PortfolioTile
              item={heroPortfolio[1]}
              className="md:col-start-2 md:col-span-1 md:row-span-1 h-56 md:h-auto"
            />
            <PortfolioTile
              item={heroPortfolio[2]}
              className="md:col-start-3 md:col-span-1 md:row-span-1 h-56 md:h-auto"
            />
            <PortfolioTile
              item={heroPortfolio[3]}
              className="md:col-start-2 md:col-span-2 md:row-span-1 h-56 md:h-auto"
            />
          </div>

          <div className="flex justify-center mt-12">
            <Button href="/portfolio" variant="outline">
              Celé portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* GROWTH SECTION */}
      <section className="relative overflow-hidden text-center px-6 py-28 md:py-32">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] aspect-square rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(230,48,48,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-(--container-narrow) mx-auto">
          <Eyebrow>Naše filozofie</Eyebrow>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Rosteme <span className="mark-box">spolu</span> s vámi
          </h2>
          <div className="shine-divider w-16 h-[3px] bg-accent mx-auto my-6" />
          <p className="text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
            Každý nový klient nás posouvá. S každou kampaní se učíme, zlepšujeme
            nástroje a rozšiřujeme to, co umíme — a co se naučíme u jednoho
            klienta, posíláme dál ostatním.
          </p>
          <p className="font-serif italic text-lg mt-8 text-text">
            Proto do každé spolupráce dáváme všechno. Protože váš úspěch je i
            ten náš.
          </p>
        </div>
      </section>

      <Marquee />

      {/* TESTIMONIAL */}
      <section className="bg-dark text-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span
            className="block font-serif text-7xl text-accent leading-none mb-2 select-none"
            aria-hidden="true"
          >
            „
          </span>
          <blockquote className="font-display text-2xl md:text-3xl leading-snug -tracking-[0.5px] mb-6">
            {featured.quote}
          </blockquote>
          <cite className="not-italic text-xs uppercase tracking-[3px] text-text-faint">
            <strong className="block text-white tracking-[2px] mb-1">
              {featured.name}
            </strong>
            {featured.context}
          </cite>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-24 px-6">
        <div className="max-w-(--container-narrow) mx-auto">
          <Eyebrow>Pojďme si promluvit</Eyebrow>
          <h2 className="text-4xl md:text-5xl mb-5">
            Domluvte si nezávaznou schůzku
          </h2>
          <p className="text-text-muted max-w-xl mx-auto mb-8">
            Posloucháme nejdřív, pak navrhujeme. Žádné šablony, žádné automation
            — jen reálné výsledky pro váš byznys.
          </p>
          <Button href="/kontakt" variant="primary">
            Domluvit schůzku
          </Button>
        </div>
      </section>
    </>
  );
}

function Stat({
  value,
  label,
  dark = false,
}: {
  value: React.ReactNode;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center">
      <div>{value}</div>
      <span
        className={`block text-xs uppercase tracking-[2px] mt-2 ${
          dark ? "text-white/55" : "text-text-faint"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
