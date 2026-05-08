import type { Metadata } from "next";
import { PageHero, FinalCta } from "@/components/page-hero";
import { Eyebrow } from "@/components/eyebrow";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Co o nás říkají naši klienti — realitní a cestovní agentury v Česku.",
};

export default function ReferencePage() {
  return (
    <>
      <PageHero
        eyebrow="Reference"
        title="Slovo klienta váží víc"
        description="Pracujeme tak, jako by váš byznys byl náš vlastní. Tady je, co o spolupráci říkají lidé, se kterými jsme pracovali."
      />

      <section className="mx-auto max-w-(--container-default) px-6 py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="p-8 border border-divider bg-bg flex flex-col gap-4"
            >
              <span className="text-xs font-bold uppercase tracking-[2px] text-accent self-start">
                {t.industry}
              </span>
              <span
                className="font-serif text-5xl text-accent leading-[0.6] -mb-2"
                aria-hidden="true"
              >
                „
              </span>
              <blockquote className="text-base leading-relaxed">
                {t.quote}
              </blockquote>
              <cite className="not-italic text-xs uppercase tracking-[2px] text-text-faint mt-auto">
                <strong className="block text-text tracking-[1px] mb-1">
                  {t.name}
                </strong>
                {t.context}
              </cite>
            </article>
          ))}
        </div>
      </section>

      {/* Case study */}
      <section className="bg-dark text-white py-24 md:py-28">
        <div className="mx-auto max-w-(--container-default) px-6">
          <Eyebrow>Případová studie</Eyebrow>
          <h2 className="text-3xl md:text-4xl text-white">
            Realitní agentura — 2× více poptávek za 3 měsíce
          </h2>
          <div className="grid gap-10 md:grid-cols-3 mt-10">
            <div>
              <h4 className="text-accent text-xs tracking-[2px] mb-3">
                Problém
              </h4>
              <p className="text-zinc-300">
                Klient měl Meta kampaně běžící na auto-pilotovi několik let.
                Náklady na poptávku byly nestabilní, výnos klesal a zacílení se
                rozjelo do širokých skupin.
              </p>
            </div>
            <div>
              <h4 className="text-accent text-xs tracking-[2px] mb-3">
                Řešení
              </h4>
              <p className="text-zinc-300">
                Restruktura kampaní (prospecting + retargeting), nová sada
                kreativ pro každý segment publika, weekly call s vyhodnocením a
                iterací.
              </p>
            </div>
            <div>
              <h4 className="text-accent text-xs tracking-[2px] mb-3">
                Výsledek
              </h4>
              <p className="text-zinc-300">
                Po třech měsících: 2× více poptávek při zachování rozpočtu,
                snížení cost per lead o 40 %, a stabilní výkon napříč týdny.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta title="Připravte se být dalším spokojeným klientem" />
    </>
  );
}
