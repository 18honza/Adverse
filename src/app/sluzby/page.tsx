import type { Metadata } from "next";
import { LineChart, MessagesSquare, Eye } from "lucide-react";
import { PageHero, FinalCta } from "@/components/page-hero";
import { Eyebrow } from "@/components/eyebrow";
import { ServiceSection } from "@/components/service-section";
import {
  AnimatedCard,
  CardBody,
  CardDescription,
  CardTitle,
  CardVisual,
} from "@/components/ui/animated-card";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Meta a Google reklamy, sociální sítě, tvorba webů, video produkce, grafický design. Marketingové služby pro realitní a cestovní agentury.",
};

const universals = [
  {
    icon: LineChart,
    title: "Týdenní reporty",
    description:
      "Každý týden vidíte přesně co se děje, kde rosteme a kde brzdíme. Žádné měsíční tichá období bez informací.",
    accent: "linear-gradient(135deg, #1c1c1c 0%, #0d0d0d 100%)",
    glow: "radial-gradient(circle at 80% 30%, rgba(230,48,48,0.18) 0%, transparent 55%)",
  },
  {
    icon: MessagesSquare,
    title: "Přímá komunikace",
    description:
      "Voláme si a píšeme s vámi přímo my dva. Žádný account manager, žádné prostředníky, žádné e-mailové ping-pongy.",
    accent: "linear-gradient(135deg, #1f1f1f 0%, #0d0d0d 100%)",
    glow: "radial-gradient(circle at 30% 70%, rgba(230,48,48,0.16) 0%, transparent 55%)",
  },
  {
    icon: Eye,
    title: "Otevřená data",
    description:
      "Sdílíme s vámi všechna čísla, do kterých vidíme. Co se dá změřit, to se dá zlepšit — a vy to vidíte se mnou.",
    accent: "linear-gradient(135deg, #0d0d0d 0%, #1f1f1f 100%)",
    glow: "radial-gradient(circle at 70% 50%, rgba(230,48,48,0.18) 0%, transparent 55%)",
  },
];

export default function SluzbyPage() {
  return (
    <>
      <PageHero
        eyebrow="Služby"
        title="Co pro vás děláme"
        description="Šest hlavních oblastí, ve kterých jsme doma. Pracujeme s realitními a cestovními agenturami v ČR — každý klient dostane osobní servis."
      />

      {/* Per-service detail sections (alternating layout) */}
      {services.map((service, i) => (
        <ServiceSection key={service.slug} slug={service.slug} index={i} />
      ))}

      {/* Universal commitments — 3 small cards */}
      <section className="bg-surface-alt py-20 md:py-24">
        <div className="mx-auto max-w-(--container-default) px-6">
          <header className="text-center mb-12 md:mb-14">
            <Eyebrow>Ke každé službě</Eyebrow>
            <h2 className="text-3xl md:text-4xl">Co dostanete vždycky</h2>
            <p className="text-text-muted max-w-xl mx-auto mt-4">
              Tři věci, které platí napříč všemi službami — protože tak děláme
              marketing my.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {universals.map(({ icon: Icon, ...u }) => (
              <AnimatedCard key={u.title}>
                <CardVisual
                  className="aspect-[2/1]"
                  style={{ backgroundImage: `${u.glow}, ${u.accent}` }}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.4}
                    className="absolute -bottom-4 -right-4 w-32 h-32 text-white/[0.08] transition-transform duration-500 group-hover/animated-card:scale-105"
                  />
                  <Icon
                    aria-hidden="true"
                    className="absolute top-5 left-5 w-6 h-6 text-accent"
                  />
                </CardVisual>
                <CardBody>
                  <CardTitle>{u.title}</CardTitle>
                  <CardDescription>{u.description}</CardDescription>
                </CardBody>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="Která služba je pro vás?"
        description="Nemusíte vědět dopředu. Domluvíme se, posoudíme a doporučíme."
      />
    </>
  );
}
