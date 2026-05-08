import type { Metadata } from "next";
import { PageHero, FinalCta } from "@/components/page-hero";
import { PortfolioFilter } from "@/components/portfolio-filter";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Ukázky naší práce — weby, výkonnostní reklamy, grafické návrhy a videa pro realitní a cestovní klienty.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Naše práce"
        description="Vybrané projekty z poslední doby. Filtrujte podle typu — weby, výkonnostní reklamy, grafický design, videa."
      />
      <PortfolioFilter />
      <FinalCta
        title="Chcete být dalším projektem?"
        description="Nemusíte mít hotový brief. Stačí představa."
      />
    </>
  );
}
