import type { Metadata } from "next";
import { PageHero, FinalCta } from "@/components/page-hero";
import { Eyebrow } from "@/components/eyebrow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Adverse je dvojice studentů, kteří každého klienta berou osobně. Realitní a cestovní agentury jsou náš domov.",
};

const values = [
  {
    title: "Osobní přístup",
    body: "Žádný account manager mezi vámi a námi. Voláme si přímo, řešíme přímo, rozhodujeme přímo. Pokud něco nevíte, máte odpověď do dvou hodin.",
  },
  {
    title: "Rosteme spolu",
    body: "S každou novou spoluprací rosteme i my. Proto do každého klienta dáváme maximum — co se naučíme u jednoho, posunuje další dál. Váš úspěch je i ten náš.",
  },
  {
    title: "Fokus na obor",
    body: "Specializujeme se na realitní a cestovní agentury. Známe vaše klienty, vaše sezónnost, vaše překážky. Necháme si to ukázat — pak to děláme líp než ostatní.",
  },
  {
    title: "Měřitelnost",
    body: 'Jen to, co se dá změřit, se dá zlepšit. Reporty každý týden, otevřená data, jasné čtení čísel. Žádná „kreativní statistika".',
  },
];

const milestones = [
  { num: "12+", label: "Spokojených klientů" },
  { num: "2", label: "Specializované obory" },
  { num: "100 %", label: "Osobní přístup" },
];

export default function ONasPage() {
  return (
    <>
      <PageHero
        eyebrow="O nás"
        title="Dva lidé, jeden přístup"
        description="Jsme Jan a Ondřej. Dva 19letí studenti, pro které je marketing víc než práce. Každého klienta bereme jako partnerství — protože vaše výsledky jsou naše reference."
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
            <h2 className="text-3xl md:text-4xl">Čtyři věci, na kterých nám záleží</h2>
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
            <h2 className="text-3xl md:text-4xl">Zatím jen začínáme</h2>
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
        description="Telefon, káva, video call — kde vám to nejvíc sedí."
      />
    </>
  );
}
