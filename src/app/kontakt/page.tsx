import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Domluvte si nezávaznou schůzku s Adverse. Telefon, e-mail nebo formulář — co vám sedí.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Pojďme spolupracovat"
        description="Volejte přímo nám dvěma, napište e-mail nebo vyplňte formulář. Ozveme se zpravidla do dvou hodin."
      />

      {/* Contact cards */}
      <section className="mx-auto max-w-3xl grid sm:grid-cols-2 gap-6 px-6 my-16">
        {site.team.map((p) => (
          <article key={p.email} className="p-8 border border-divider bg-bg">
            <h3 className="text-base mb-2">{p.name}</h3>
            <span className="block text-xs uppercase tracking-[3px] text-accent mb-5">
              {p.role}
            </span>
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <a
                href={`tel:${p.phone}`}
                className="hover:text-accent transition-colors py-1"
              >
                {p.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <a
                href={`mailto:${p.email}`}
                className="hover:text-accent transition-colors py-1 break-all"
              >
                {p.email}
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* Form */}
      <section className="px-6 py-12 border-t border-divider">
        <h2 className="text-2xl md:text-3xl text-center mb-2">Napište nám</h2>
        <p className="text-text-muted text-center mb-10">
          Stačí pár vět o tom, co řešíte. Ozveme se a domluvíme krátký call.
        </p>
        <ContactForm />
      </section>
    </>
  );
}
