import type { Metadata } from "next";
import { PageHero, FinalCta } from "@/components/page-hero";
import { Eyebrow } from "@/components/eyebrow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Adverse jsou Jan a Ondřej — dva lidé, kteří každého klienta berou osobně. Realitní a cestovní agentury jsou náš domov.",
};

const values = [
  {
    title: "Osobní přístup",
    body: "Žádný account manager, který vaši zprávu jen předá dál. Voláme si přímo, řešíme věci napřímo. Když něco potřebujete, máte odpověď do dvou hodin, ne do dvou dnů.",
  },
  {
    title: "Rosteme spolu s vámi",
    body: "Váš úspěch je i ten náš. Do každé spolupráce dáváme maximum, protože s každou úspěšnou kampaní rosteme i my. Co zafunguje u jednoho klienta, zúročíme u dalšího.",
  },
  {
    title: "Fokus na váš obor",
    body: "Specializujeme se primárně na realitní trh a cestovní agentury. Známe vaši sezónnost, chování vašich klientů i nejčastější překážky. Neděláme všechno pro všechny — děláme to, čemu rozumíme.",
  },
  {
    title: "Tvrdá data, žádná mlha",
    body: 'Věříme jen tomu, co se dá změřit. Dostáváte od nás reporty každý týden a máte otevřený přístup ke všem číslům. Žádná „kreativní statistika“, jen jasně měřitelné výsledky.',
  },
];

const milestones = [
  { num: "12+", label: "Spokojených klientů" },
  { num: "2", label: "Obory: Reality & Travel" },
  { num: "100 %", label: "Osobní nasazení" },
];

export default function ONasPage() {
  return (
    <>
      <PageHero
        eyebrow="O nás"
        title="Dva lidi. Jeden přístup. Váš růst."
        description="Jsme Jan a Ondřej. Dva kluci, pro které je marketing mnohem víc než jen práce. Každého klienta bereme jako partnerství — protože vaše reálné výsledky jsou naše nejlepší vizitka."
      />

      {/* Team */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl grid gap-12 sm:grid-cols-2 px-6">
          {site.team.map((p) => (
            <article key={p.email} className="text-center">
              <div
                className="aspect-square bg-surface-alt border border-divider relative overflow-hidden mb-6"
                style={{
                  background: "linear-gradient(135deg,#0d0d0d,#444)",
                }}
              >
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
              </div>
              <h3 className="text-xl mb-1">{p.name}</h3>
              <span className="block text-xs uppercase tracking-[3px] text-accent mb-3">
                {p.role}
              </span>
              <p className="text-text-muted">{p.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-alt py-20 md:py-24">
        <div className="mx-auto max-w-(--container-default) px-6">
          <header className="text-center mb-12">
            <Eyebrow>Proč Adverse</Eyebrow>
            <h2 className="text-3xl md:text-4xl">
              4 věci, přes které u nás nejede vlak
            </h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-accent pt-4">
                <h3 className="text-base mb-3">{v.title}</h3>
                <p className="text-sm text-text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-(--container-default) px-6">
          <header className="text-center mb-12">
            <Eyebrow>Adverse v číslech</Eyebrow>
            <h2 className="text-3xl md:text-4xl">Naše dosavadní skóre</h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-3">
            {milestones.map((m) => (
              <div
                key={m.label}
                className="text-center p-6 border border-divider"
              >
                <span className="block font-display text-4xl md:text-5xl text-accent leading-none">
                  {m.num}
                </span>
                <span className="block text-xs uppercase tracking-[2px] text-text-faint mt-3">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="Pojďme se poznat"
        description="Telefon, káva, nebo rychlý video call — kde a jak vám to nejvíc vyhovuje."
      />
    </>
  );
}
