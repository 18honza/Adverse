import { SmoothScroll } from "@/components/fable/smooth-scroll";
import { FableHeader } from "@/components/fable/fable-header";
import { HeroDrench } from "@/components/fable/hero-drench";
import { IntroClaim } from "@/components/fable/intro-claim";
import { LogoCarousel } from "@/components/fable/logo-carousel";
import { ServicesStack } from "@/components/fable/services-stack";
import { VelocityMarquee } from "@/components/fable/velocity-marquee";
import { PortfolioReveal } from "@/components/fable/portfolio-reveal";
import { QuoteBlock } from "@/components/fable/quote-block";
import { CtaFinal } from "@/components/fable/cta-final";
import { FableFooter } from "@/components/fable/fable-footer";
import { Grain } from "@/components/fable/grain";
import { CursorDot } from "@/components/fable/cursor-dot";

/**
 * FABLE — the art-directed concept variant of the Adverse homepage.
 * Lives beside the production site (which stays untouched at /).
 *
 * Narrative arc: red drench poster → paper manifesto → cycling logos →
 * service deck stacking under your scroll → velocity strip → ink work
 * index with cursor-trailing previews → one quiet quote → red close.
 */
export default function FablePage() {
  return (
    <SmoothScroll>
      <div className="fable-root relative">
        <FableHeader />
        <HeroDrench />
        <IntroClaim />
        <LogoCarousel />
        <ServicesStack />
        <VelocityMarquee />
        <PortfolioReveal />
        <QuoteBlock />
        <CtaFinal />
        <FableFooter />
        <Grain />
        <CursorDot />
      </div>
    </SmoothScroll>
  );
}
