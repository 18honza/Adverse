import type { Metadata } from "next";
import { PageHero, FinalCta } from "@/components/page-hero";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Meta a Google reklamy, sociální sítě, tvorba webů, video produkce, grafický design. Marketingové služby pro realitní a cestovní agentury.",
};

export default function SluzbyPage() {
  return (
    <>
      <PageHero
        eyebrow="Služby"
        title="Co pro vás děláme"
        description="Šest hlavních oblastí, ve kterých jsme doma. Pracujeme s realitními a cestovními agenturami v ČR — každý klient dostane osobní servis."
      />

      {services.map((s, i) => (
        <section
          id={s.slug}
          key={s.slug}
          className={`py-20 md:py-24 border-b border-divider ${
            i % 2 === 1 ? "bg-surface-alt" : ""
          }`}
        >
          <div className="mx-auto max-w-(--container-default) px-6 grid gap-10 md:grid-cols-2 md:gap-16 items-start">
            <div>
              <div className="font-display text-5xl md:text-6xl text-accent leading-none mb-3 opacity-90">
                {s.num}
              </div>
              <h2 className="text-3xl md:text-4xl mb-4">{s.title}</h2>
              <p className="text-lg text-text-muted">{s.lead}</p>
            </div>
            <ul className="grid gap-3">
              {s.bullets.map((b) => (
                <li key={b} className="relative pl-7">
                  <span className="absolute left-0 top-3 w-3 h-[2px] bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <FinalCta
        title="Která služba je pro vás?"
        description="Nemusíte vědět dopředu. Domluvíme se, posoudíme a doporučíme."
      />
    </>
  );
}
