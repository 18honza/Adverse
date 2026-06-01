import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/ui/button";
import { PortfolioTile } from "@/components/portfolio-tile";
import { HeroDisplay } from "@/components/hero-display";
import { LogoScroll } from "@/components/logo-scroll";
import { ServicesBento } from "@/components/services-bento";
import { TypewriterEffect } from "@/components/typewriter-effect";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { portfolioItems } from "@/lib/portfolio";
import { testimonials } from "@/lib/testimonials";

export default function HomePage() {
  const heroPortfolio = portfolioItems.slice(0, 4);
  const featured = testimonials[0];

  return (
    <>
      {/* HERO — massive typography + red squiggle on cream */}
      <HeroDisplay />

      {/* CLIENT LOGOS — scroll-assembling logo row */}
      <LogoScroll />

      {/* SERVICES — bento grid (dark, hover-fill per card) */}
      <ServicesBento />

      {/* BRIDGE — animated cycling intro to the work below */}
      <section
        data-section-theme="cream"
        data-theme-id="bridge"
        className="relative px-6 py-24 md:py-28 text-center"
      >
        <div className="mx-auto max-w-(--container-narrow)">
          <Eyebrow>Naše práce v kostce</Eyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.15]">
            Tvoříme{" "}
            <AnimatedTextCycle
              words={["kampaně", "weby", "videa", "značky", "strategie"]}
              interval={3500}
              className="text-accent"
            />
            ,
            <br className="hidden md:block" /> které pomáhají vašemu byznysu
            růst.
          </h2>
          <p className="text-lg text-[var(--theme-muted,#666)] max-w-xl mx-auto mt-8">
            Žádný šum, žádné šablony. Jen kampaně, weby a obsah šitý na míru
            realitním a cestovním agenturám v Česku.
          </p>
          <div className="mt-8">
            <Button href="#projekty" variant="outline">
              Podívejte se na naši práci ↓
            </Button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section
        id="projekty"
        data-section-theme="cream"
        data-theme-id="portfolio"
        className="py-20 md:py-24 scroll-mt-20"
      >
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

      {/* GROWTH SECTION — red drenched, the brand moment */}
      <section
        data-section-theme="red"
        data-theme-id="growth"
        className="relative overflow-hidden text-center px-6 py-28 md:py-32"
      >
        <div className="relative max-w-(--container-narrow) mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[4px] text-white/80 mb-4">
            Naše filozofie
          </span>
          <TypewriterEffect
            words={[
              { text: "Rosteme" },
              {
                text: "spolu",
                className: "text-accent",
                wrapperClassName: "bg-white px-3",
              },
              { text: "s" },
              { text: "vámi" },
            ]}
            ariaLabel="Rosteme spolu s vámi"
            delay={1200}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight mb-6 text-white"
            cursorClassName="h-[0.75em] w-[3px] bg-white"
          />
          <div className="w-16 h-[3px] bg-white/80 mx-auto my-6" />
          <p className="text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Každý nový klient nás posouvá. S každou kampaní se učíme, zlepšujeme
            nástroje a rozšiřujeme to, co umíme, a co se naučíme u jednoho
            klienta, posíláme dál ostatním.
          </p>
          <p className="font-serif italic text-lg mt-8 text-white">
            Proto do každé spolupráce dáváme všechno. Protože váš úspěch je i
            ten náš.
          </p>
        </div>
      </section>

      {/* TESTIMONIAL — dark surface, weighted social proof */}
      <section
        data-section-theme="dark"
        data-theme-id="testimonial"
        className="py-20 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span
            className="block font-serif text-7xl text-accent leading-none mb-2 select-none"
            aria-hidden="true"
          >
            „
          </span>
          <blockquote className="font-display text-2xl md:text-3xl leading-snug -tracking-[0.5px] mb-6 text-white">
            {featured.quote}
          </blockquote>
          <cite className="not-italic text-xs uppercase tracking-[3px] text-white/50">
            <strong className="block text-white tracking-[2px] mb-1">
              {featured.name}
            </strong>
            {featured.context}
          </cite>
        </div>
      </section>

      {/* FINAL CTA — back to cream, closes the loop */}
      <section
        data-section-theme="cream"
        data-theme-id="final"
        className="text-center py-24 px-6"
      >
        <div className="max-w-(--container-narrow) mx-auto">
          <Eyebrow>Pojďme si promluvit</Eyebrow>
          <h2 className="text-4xl md:text-5xl mb-5">
            Domluvte si nezávaznou schůzku
          </h2>
          <p className="text-[var(--theme-muted,#666)] max-w-xl mx-auto mb-8">
            Posloucháme nejdřív, pak navrhujeme. Žádné šablony, žádné
            automation, jen reálné výsledky pro váš byznys.
          </p>
          <Button href="/kontakt" variant="primary">
            Domluvit schůzku
          </Button>
        </div>
      </section>
    </>
  );
}
