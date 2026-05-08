import type { Metadata } from "next";
import { PageHero, FinalCta } from "@/components/page-hero";
import { Eyebrow } from "@/components/eyebrow";
import { TestimonialsColumn } from "@/components/testimonials-columns";
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
        <div
          className={
            "relative flex justify-center gap-6 mx-auto " +
            "max-h-[640px] md:max-h-[720px] overflow-hidden " +
            "[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
          }
        >
          <TestimonialsColumn
            testimonials={[testimonials[0], testimonials[3]]}
            duration={22}
          />
          <TestimonialsColumn
            testimonials={[testimonials[1], testimonials[4]]}
            duration={28}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={[testimonials[2], testimonials[5]]}
            duration={25}
            className="hidden lg:block"
          />
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
