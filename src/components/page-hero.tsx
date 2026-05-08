import { Eyebrow } from "@/components/eyebrow";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="text-center px-6 py-24 md:py-28 border-b border-divider">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      {description && (
        <p className="text-text-muted max-w-xl mx-auto mt-4">{description}</p>
      )}
    </section>
  );
}

export function FinalCta({
  eyebrow = "Pojďme si promluvit",
  title,
  description,
  button = "Domluvit schůzku",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  button?: string;
}) {
  return (
    <section className="text-center py-24 px-6">
      <div className="max-w-(--container-narrow) mx-auto">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-4xl md:text-5xl mb-5">{title}</h2>
        {description && (
          <p className="text-text-muted max-w-xl mx-auto mb-8">{description}</p>
        )}
        <a
          href="/kontakt"
          className="inline-flex items-center justify-center bg-accent text-white border-2 border-accent text-xs font-bold uppercase tracking-[2px] px-6 py-3 rounded-sm hover:bg-accent-hover transition-colors"
        >
          {button}
        </a>
      </div>
    </section>
  );
}
